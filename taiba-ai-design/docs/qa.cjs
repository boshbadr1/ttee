const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const out=require('path').resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.BROWSER_PATH || undefined,headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[],requests=[],results=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()+': '+r.failure().errorText));page.on('request',r=>requests.push(r.url()));
 const check=(name,fn)=>Promise.resolve().then(fn).then(()=>{results.push({name,status:'PASS'});console.log('PASS',name);});
 const action=(name)=>page.locator('[data-action="'+name+'"]');
 const nav=async name=>{await page.evaluate(name=>navigate(name),name);await page.waitForTimeout(30);};
 const visible=async selector=>assert(await page.locator(selector).isVisible(),selector+' must be visible');
 await page.goto('http://127.0.0.1:4173');await page.evaluate(()=>document.fonts.ready);
 await check('Seven required viewport widths, both themes: shell and composer bounds',async()=>{
  for(const width of [320,360,375,390,430,768,1280]){
   await page.setViewportSize({width,height:900});
   for(const theme of ['light','dark']){
    await page.evaluate(t=>applyTheme(t),theme);await page.waitForTimeout(50);
    const geometry=await page.evaluate(()=>{const composer=document.querySelector('.composer').getBoundingClientRect();return {scroll:document.documentElement.scrollWidth,width:innerWidth,body:document.body.scrollHeight,height:innerHeight,composer:{left:composer.left,right:composer.right,bottom:composer.bottom,top:composer.top},main:document.querySelector('main').getBoundingClientRect().toJSON()};});
    assert(geometry.scroll<=width,'horizontal document overflow at '+width);
    assert(geometry.body<=902,'page scroll at '+width);
    assert(geometry.composer.left>=0&&geometry.composer.right<=width,'composer horizontal bounds '+width);
    assert(geometry.composer.bottom<=901,'composer below viewport '+width);
    assert(geometry.main.bottom<=geometry.composer.top,'composer overlaps content '+width);
   }
  }
 });
 await page.setViewportSize({width:1280,height:900});await page.evaluate(()=>applyTheme('light'));await page.waitForTimeout(150);await page.screenshot({path:out+'/screenshots/desktop-light.png'});
 await page.evaluate(()=>applyTheme('dark'));await page.waitForTimeout(150);await page.screenshot({path:out+'/screenshots/desktop-dark.png'});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:out+'/screenshots/mobile-dark.png'});
 await page.evaluate(()=>applyTheme('light'));await page.waitForTimeout(150);await page.screenshot({path:out+'/screenshots/mobile-light.png'});
 await check('Mobile drawer focus trap and Escape',async()=>{
  await action('open-sidebar').click();await visible('.sidebar [data-action="new-chat"]');
  assert(await page.locator('.workspace').evaluate(el=>el.inert));
  await page.keyboard.press('Shift+Tab');await page.keyboard.press('Shift+Tab');assert(await page.locator('.sidebar [data-action="account-menu"]').evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Escape');assert(!(await page.locator('.workspace').evaluate(el=>el.inert)));assert(await page.locator('#sidebar').evaluate(el=>el.inert));
 });
 await check('Draft survives screen navigation and new-chat suggestions',async()=>{
  await page.locator('#message-input').fill('مسودة عربية مع English ومصطلح API');await nav('profile');await nav('chat');assert.equal(await page.locator('#message-input').inputValue(),'مسودة عربية مع English ومصطلح API');
  await action('suggest').first().click();assert((await page.locator('#message-input').inputValue()).includes('البرمجة'));
 });
 await check('Consecutive sends, composer focus, streamed demo and Markdown code/table copying',async()=>{
  await page.locator('#message-input').focus();await page.locator('#send-button').click();assert(await page.locator('#message-input').evaluate(el=>document.activeElement===el));
  await page.waitForFunction(()=>!pending);await visible('.code-container');await visible('.table-scroll');
  assert(await page.locator('.code-container code').textContent().then(t=>t.includes('class Book')));
  await page.locator('#message-input').fill('شكرا، ساعدني في خطة مذاكرة');await page.keyboard.press('Enter');await page.waitForFunction(()=>!pending);assert.equal(await page.locator('.user-bubble').count(),2);
  await page.locator('#message-input').fill('رسالة ثالثة للاختبار');await page.keyboard.press('Enter');await page.waitForFunction(()=>!pending);assert.equal(await page.locator('.user-bubble').count(),3);
  await context.grantPermissions(['clipboard-read','clipboard-write']);await action('copy-code').first().click();assert((await page.evaluate(()=>navigator.clipboard.readText())).includes('class Book'));
 });
 await check('Recoverable demo error, draft preservation and retry',async()=>{
  await action('mode-menu').click();await action('simulate-error').click();await page.locator('#message-input').fill('جرّب حالة الخطأ');await page.keyboard.press('Enter');await page.waitForFunction(()=>!pending);await visible('.error-card');
  await page.locator('#message-input').fill('هكتب الرسالة القادمة');await page.locator('.error-card [data-action="retry"]').click();await page.waitForFunction(()=>!pending);assert.equal(await page.locator('.error-card').count(),0);assert.equal(await page.locator('#message-input').inputValue(),'هكتب الرسالة القادمة');
 });
 await check('Composer expands with capped height; long Arabic and English tokens do not overflow',async()=>{
  await page.locator('#message-input').fill(Array(25).fill('سطر تجريبي طويل باللغة العربية مع English').join('\n'));
  const bounds=await page.locator('#message-input').boundingBox();assert(bounds.height<=121&&bounds.height>=100);
  await page.locator('#message-input').fill('ع'.repeat(1000)+' '+'https://example.com/'+'longtoken'.repeat(100));await page.keyboard.press('Enter');await page.waitForFunction(()=>!pending);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);
 });
 await check('Reduced mobile viewport (keyboard approximation), portrait and landscape',async()=>{
  for(const size of [{width:390,height:420},{width:844,height:390},{width:320,height:360}]){
   await page.setViewportSize(size);await page.waitForTimeout(50);await page.locator('#message-input').focus();
   const box=await page.locator('.composer').boundingBox();assert(box.y>=0&&box.y+box.height<=size.height);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),size.width);
  }
 });
 await page.setViewportSize({width:1280,height:900});await page.evaluate(()=>applyTheme('dark'));await page.evaluate(()=>{activeChat='sample-oop';navigate('chat');});await page.screenshot({path:out+'/screenshots/conversation-desktop-dark.png'});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:out+'/screenshots/conversation-mobile-dark.png'});
 await check('Local demo login: validation, show/hide, loading and success',async()=>{
  await nav('login');await page.locator('#login-password').fill('wrong');await page.locator('#login-submit').click();await visible('#login-feedback.error');
  await page.locator('#login-password').fill('TaibaDemo2026!');await page.locator('[data-target="login-password"]').click();assert.equal(await page.locator('#login-password').getAttribute('type'),'text');
  await page.locator('#login-submit').click();await page.waitForFunction(()=>route==='chat');assert.equal(await page.locator('input[type="password"]').count(),0);
 });
 await check('Password change: 12-character minimum, matching and local-only success',async()=>{
  await nav('password');await page.locator('#temporary-password').fill('TaibaDemo2026!');await page.locator('#new-password').fill('short');await page.locator('#confirm-password').fill('different');await page.locator('#password-form button[type="submit"]').click();assert.equal(await page.locator('#new-password').getAttribute('aria-invalid'),'true');
  await page.locator('#new-password').fill('DemoOnlyPassword123!');await page.locator('#confirm-password').fill('DemoOnlyPassword123!');await page.locator('#password-form button[type="submit"]').click();await visible('#password-feedback.success');
  const storage=await page.evaluate(()=>JSON.stringify(localStorage));assert(!storage.includes('DemoOnlyPassword123!'));assert.equal(await page.locator('#new-password').inputValue(),'');
 });
 await check('Profile preferences and dynamic greeting',async()=>{
  await nav('profile');await page.locator('#profile-name').fill('بدر علي');await page.locator('#profile-form button[type="submit"]').click();await nav('chat');await page.evaluate(()=>newChat());assert((await page.locator('.hello').textContent()).includes('بدر'));
 });
 await check('Announcements: details, read/unread and filters',async()=>{
  await nav('announcements');await action('read-announcement').first().click();assert.equal(await page.locator('.announcement-read').count(),1);await page.locator('[data-filter="unread"]').click();assert.equal(await page.locator('.announcement-card').count(),2);await page.locator('[data-filter="important"]').click();assert.equal(await page.locator('.announcement-card').count(),1);
 });
 await page.setViewportSize({width:1280,height:900});
 await check('Admin: add/search/activate student and simulate reset',async()=>{
  await nav('admin');await page.locator('[data-tab="students"]').click();await action('add-student').click();await page.locator('#student-name').fill('طالب تجريبي');await page.locator('#student-email').fill('demo.test@thebes.edu.eg');await page.locator('#student-form button[type="submit"]').click();
  await page.locator('#student-search').fill('demo.test');assert.equal(await page.locator('#student-rows tr').count(),1);await action('toggle-student').click();assert((await page.locator('#student-rows').textContent()).includes('غير نشط'));
  await action('reset-student').click();await action('confirm-reset').click();assert(!(await page.locator('#modal').isVisible()));
 });
 await check('Admin: create, edit and remove local announcement',async()=>{
  await page.locator('[data-tab="announcements"]').click();await action('add-announcement').click();await page.locator('#announcement-title').fill('إعلان الاختبار التجريبي');await page.locator('#announcement-body').fill('هذا نص إعلان تجريبي للاختبار فقط.');await page.locator('#announcement-form button[type="submit"]').click();assert.equal(await page.locator('#admin-content .panel').count(),4);
  await action('edit-announcement').first().click();await page.locator('#announcement-title').fill('إعلان معدل محليًا');await page.locator('#announcement-form button[type="submit"]').click();assert((await page.locator('#admin-content').textContent()).includes('إعلان معدل محليًا'));
  await action('delete-announcement').first().click();await action('confirm-delete-announcement').click();assert.equal(await page.locator('#admin-content .panel').count(),3);
 });
 await check('Provider toggles and demo health check',async()=>{
  await page.locator('[data-tab="providers"]').click();const toggle=action('toggle-provider').first();await toggle.click();assert.equal(await toggle.getAttribute('aria-checked'),'false');await action('check-providers').click();await page.waitForTimeout(900);assert(!(await action('check-providers').isDisabled()));
 });
 await page.locator('[data-tab="overview"]').click();await page.screenshot({path:out+'/screenshots/admin-desktop-dark.png'});
 await check('English UI, LTR shell, English sample response and language persistence',async()=>{
  await action('toggle-language').click();assert.equal(await page.locator('html').getAttribute('dir'),'ltr');assert.equal(await page.locator('html').getAttribute('lang'),'en');await page.waitForTimeout(50);assert((await page.locator('h1').textContent()).includes('glance'));
  await nav('chat');await page.locator('#message-input').fill('Help me study today.');await page.keyboard.press('Enter');await page.waitForFunction(()=>!pending);assert((await page.locator('.markdown').last().textContent()).includes('structure'));
  await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'en');await page.setViewportSize({width:320,height:700});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),320);await action('toggle-language').click();
 });
 await check('No JavaScript errors, failed assets or external service requests',async()=>{assert.deepEqual(errors,[]);assert(requests.every(u=>u.startsWith('http://127.0.0.1:4173')));});
 fs.writeFileSync(out+'/docs/test-results.json',JSON.stringify({testedAt:new Date().toISOString(),browser:await browser.version(),results,errors,notes:['Headless Chromium only. Real iOS/Android software keyboards and browser chrome require physical-device testing.','Screenshots use reduced-motion preference to capture settled layouts.']},null,2));
 await browser.close();console.log('ALL',results.length,'CHECK GROUPS PASSED');
})().catch(e=>{console.error(e);process.exit(1)});
