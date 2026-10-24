'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const BASE_URL=process.env.BASE_URL||'http://127.0.0.1:4175';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_PATH||undefined,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage(),results=[],errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()+': '+r.failure()?.errorText));page.on('request',r=>requests.push(r.url()));
 const check=async(name,fn)=>{try{await fn();results.push({name,status:'PASS'});console.log('PASS',name)}catch(e){results.push({name,status:'FAIL',error:e.message});console.log('FAIL',name,e.message)}};
 const settled=()=>page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 const lang=async wanted=>{await page.evaluate(wanted=>{if(document.documentElement.lang!==wanted)window.taibaLanguage.toggle();},wanted);await settled();};
 const waitReply=()=>page.waitForFunction(()=>pending===null);
 const geometry=()=>page.evaluate(()=>({width:innerWidth,vh:visualViewport.height,vt:visualViewport.offsetTop,sw:document.documentElement.scrollWidth,bodyTop:document.body.scrollTop,docTop:document.documentElement.scrollTop,main:document.querySelector('#main-content').getBoundingClientRect().toJSON(),composer:document.querySelector('.composer-region').getBoundingClientRect().toJSON(),input:document.querySelector('#message-input').getBoundingClientRect().toJSON(),inputFont:parseFloat(getComputedStyle(document.querySelector('#message-input')).fontSize),app:document.querySelector('#app-shell').getBoundingClientRect().toJSON()}));
 const assertBounds=(m,label)=>{assert(m.sw<=m.width,label+' horizontal overflow');assert.equal(m.bodyTop,0,label+' body scroll');assert.equal(m.docTop,0,label+' document scroll');assert(m.composer.left>=-.2&&m.composer.right<=m.width+.2,label+' composer horizontal bounds');assert(m.composer.bottom<=m.vh+m.vt+.5,label+' composer below visible viewport');assert(m.composer.top>=m.main.bottom-.5,label+' main/composer overlap');assert(m.inputFont>=16,label+' input font below16px');};
 await page.goto(BASE_URL);await page.evaluate(()=>document.fonts.ready);await settled();
 await check('Exact textarea node/focus and zero induced blur across three sends, including the first',async()=>{
  await page.evaluate(()=>{newChat();window.originalInput=document.querySelector('#message-input');window.inputBlurs=0;window.originalInput.addEventListener('blur',()=>window.inputBlurs++);});
  await page.locator('#message-input').focus();
  for(let i=0;i<3;i++){
   await page.locator('#message-input').fill('اشرح البرمجة وكود Python، السؤال '+i);
   await page.locator('#send-button').click();
   const immediate=await page.evaluate(()=>({same:document.querySelector('#message-input')===window.originalInput,focused:document.activeElement===window.originalInput,blurs:window.inputBlurs}));
   assert(immediate.same&&immediate.focused);assert.equal(immediate.blurs,0);
   await page.locator('#message-input').fill('مسودة محفوظة أثناء عرض الرد '+i);
   await waitReply();
   assert.equal(await page.locator('#message-input').inputValue(),'مسودة محفوظة أثناء عرض الرد '+i);
   assert(await page.evaluate(()=>document.activeElement===window.originalInput&&window.inputBlurs===0));
  }
  assert.equal(await page.locator('.user-bubble').count(),3);
 });
 await check('Previous user/assistant articles retain DOM identity while the next response streams',async()=>{
  await page.locator('#message-input').fill('كود جديد لاختبار الحفاظ على عناصر المحادثة');await page.keyboard.press('Enter');
  await page.evaluate(()=>{window.previousUser=document.querySelector('[data-message="0"]');window.previousAssistant=document.querySelector('[data-message="1"]');});
  await page.waitForTimeout(850);
  assert(await page.evaluate(()=>window.previousUser===document.querySelector('[data-message="0"]')&&window.previousAssistant===document.querySelector('[data-message="1"]')));
  await waitReply();
  assert(await page.evaluate(()=>window.previousUser===document.querySelector('[data-message="0"]')&&window.previousAssistant===document.querySelector('[data-message="1"]')));
 });
 await check('Reading position away from the bottom remains stable during streaming and textarea expansion',async()=>{
  await page.locator('#message-input').fill('اشرح البرمجة مع كود');await page.keyboard.press('Enter');await page.waitForTimeout(750);
  await page.evaluate(()=>document.querySelector('#main-content').scrollTop=60);const before=await page.locator('#main-content').evaluate(el=>el.scrollTop);
  await page.waitForTimeout(350);assert(Math.abs(await page.locator('#main-content').evaluate(el=>el.scrollTop)-before)<1);
  await page.locator('#message-input').fill(Array(12).fill('مسودة طويلة متعددة السطور').join('\n'));await settled();
  assert(Math.abs(await page.locator('#main-content').evaluate(el=>el.scrollTop)-before)<1);await waitReply();
  assert(Math.abs(await page.locator('#main-content').evaluate(el=>el.scrollTop)-before)<1);
 });
 await check('patchAssistant preserves horizontal scroll in its code and table containers',async()=>{
  const result=await page.evaluate(()=>{
   const chat=currentChat(),index=chat.messages.length-1,msg=chat.messages[index],original=msg.text;
   const bt=String.fromCharCode(96),long='column_'.repeat(80);
   msg.text=bt.repeat(3)+'python\n'+long+'\n'+bt.repeat(3)+'\n\n| '+long+' | other |\n| --- | --- |\n| '+long+' | value |';
   patchAssistant(index);
   const article=document.querySelector('[data-message="'+index+'"]'),pre=article.querySelector('pre'),table=article.querySelector('.table-scroll');
   pre.scrollLeft=80;table.scrollLeft=65;const expected=[pre.scrollLeft,table.scrollLeft];
   msg.text+='\n\nA following paragraph.';patchAssistant(index);
   const actual=[article.querySelector('pre').scrollLeft,article.querySelector('.table-scroll').scrollLeft];
   msg.text=original;patchAssistant(index);return {expected,actual};
  });
  assert(result.expected.every(x=>x>0),'fixture must genuinely overflow');assert.deepEqual(result.actual,result.expected);
 });
 await check('Seven required widths, both themes and both languages: stable native viewport and empty directions',async()=>{
  for(const width of [320,360,375,390,430,768,1280])for(const theme of ['light','dark'])for(const language of ['ar','en']){
   await page.setViewportSize({width,height:900});await lang(language);await page.evaluate(theme=>{applyTheme(theme);newChat();},theme);await settled();
   const label=width+' '+theme+' '+language;assertBounds(await geometry(),label);
   assert.equal(await page.locator('#message-input').getAttribute('dir'),language==='ar'?'rtl':'ltr');
   const custom=await page.evaluate(()=>({height:document.documentElement.style.getPropertyValue('--app-height'),top:document.documentElement.style.getPropertyValue('--app-top')}));
   assert.deepEqual(custom,{height:'',top:''},label+' native dvh should not be overridden');
  }
 });
 await check('Short native portrait/landscape viewports retain composer without document scrolling',async()=>{
  for(const size of [{width:320,height:360},{width:390,height:420},{width:844,height:390}])for(const theme of ['light','dark'])for(const language of ['ar','en']){
   await page.setViewportSize(size);await lang(language);await page.evaluate(theme=>{applyTheme(theme);activeChat='sample-oop';navigate('chat');},theme);await settled();
   await page.locator('#message-input').focus();assertBounds(await geometry(),JSON.stringify({size,theme,language}));
  }
 });
 await check('Auto direction for entered text and capped expanding16px mobile textarea',async()=>{
  await page.setViewportSize({width:390,height:844});await lang('ar');await page.evaluate(()=>newChat());
  await page.locator('#message-input').fill('English content');assert.equal(await page.locator('#message-input').getAttribute('dir'),'auto');assert.equal(await page.locator('#message-input').evaluate(el=>getComputedStyle(el).direction),'ltr');
  await page.locator('#message-input').fill('محتوى عربي');assert.equal(await page.locator('#message-input').evaluate(el=>getComputedStyle(el).direction),'rtl');
  await page.locator('#message-input').fill(Array(30).fill('سطر عربي طويل').join('\n'));await settled();
  const box=await page.locator('#message-input').boundingBox();assert(box.height<=120.5&&box.height>=100);assertBounds(await geometry(),'expanded textarea');
  await page.locator('#message-input').fill('');assert.equal(await page.locator('#message-input').getAttribute('dir'),'rtl');
 });
 await check('Overlay/pan VisualViewport bridge coalesces one RAF, avoids unchanged style writes and never changes focus',async()=>{
  await page.setViewportSize({width:390,height:844});await page.locator('#message-input').focus();await page.waitForTimeout(70);
  await page.evaluate(()=>{
   window.savedSync=syncViewport;window.syncCalls=0;syncViewport=function(){window.syncCalls++;return window.savedSync();};
   window.mockVV={height:484,top:0,scale:1};window.vvDescriptors={};
   for(const key of ['height','offsetTop','scale'])window.vvDescriptors[key]=Object.getOwnPropertyDescriptor(visualViewport,key);
   Object.defineProperty(visualViewport,'height',{configurable:true,get:()=>window.mockVV.height});
   Object.defineProperty(visualViewport,'offsetTop',{configurable:true,get:()=>window.mockVV.top});
   Object.defineProperty(visualViewport,'scale',{configurable:true,get:()=>window.mockVV.scale});
   window.rootStyleWrites=0;window.styleObserver=new MutationObserver(records=>window.rootStyleWrites+=records.length);window.styleObserver.observe(document.documentElement,{attributes:true,attributeFilter:['style']});
   for(let i=0;i<5;i++){visualViewport.dispatchEvent(new Event('resize'));visualViewport.dispatchEvent(new Event('scroll'));}
  });await settled();
  assert.equal(await page.evaluate(()=>window.syncCalls),1,'burst should coalesce into one viewport calculation');
  assert.deepEqual(await page.evaluate(()=>({h:document.documentElement.style.getPropertyValue('--app-height'),top:document.documentElement.style.getPropertyValue('--app-top')})),{h:'484px',top:'0px'});
  assertBounds(await geometry(),'mock overlay');
  await page.evaluate(()=>{window.rootStyleWrites=0;window.syncCalls=0;visualViewport.dispatchEvent(new Event('resize'));visualViewport.dispatchEvent(new Event('scroll'));});await settled();
  assert.equal(await page.evaluate(()=>window.syncCalls),1);assert.equal(await page.evaluate(()=>window.rootStyleWrites),0,'unchanged measurements must not rewrite style');
  await page.evaluate(()=>{window.mockVV.top=45;visualViewport.dispatchEvent(new Event('scroll'));});await settled();
  assert.equal(await page.evaluate(()=>document.documentElement.style.getPropertyValue('--app-top')),'45px');assert.equal(Math.round((await geometry()).app.top),45);assertBounds(await geometry(),'mock overlay pan');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'message-input');
  await page.evaluate(()=>{window.rootStyleWrites=0;window.mockVV.scale=2;window.mockVV.height=300;visualViewport.dispatchEvent(new Event('resize'));});await settled();assert.equal(await page.evaluate(()=>window.rootStyleWrites),0,'pinch zoom should not trigger bridge writes');
  await page.evaluate(()=>{
   for(const key of ['height','offsetTop','scale']){const descriptor=window.vvDescriptors[key];if(descriptor)Object.defineProperty(visualViewport,key,descriptor);else delete visualViewport[key];}
   window.styleObserver.disconnect();syncViewport=window.savedSync;visualViewport.dispatchEvent(new Event('resize'));visualViewport.dispatchEvent(new Event('scroll'));
  });await settled();
  assert.deepEqual(await page.evaluate(()=>({h:document.documentElement.style.getPropertyValue('--app-height'),top:document.documentElement.style.getPropertyValue('--app-top')})),{h:'',top:''});assertBounds(await geometry(),'restored native viewport');
 });
 await check('No JavaScript errors, failed assets, or external service requests',async()=>{assert.deepEqual(errors,[]);assert(requests.every(url=>new URL(url).origin===new URL(BASE_URL).origin));});
 const report={testedAt:new Date().toISOString(),browser:await browser.version(),results,errors,requests:requests.length,limitations:['Headless Chromium on Linux only.','Viewport geometry simulations do not reproduce real iOS Safari or Android software keyboard animation, browser chrome, safe areas, IME composition, or password manager overlays.','No claim of real-device or Safari testing.']};
 fs.writeFileSync(path.join(__dirname,'keyboard-qa-results.json'),JSON.stringify(report,null,2));
 console.log('COMPLETE',results.filter(r=>r.status==='PASS').length,'/',results.length);await browser.close();if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});
