/* RIWAQ — a standalone, local-data learning studio. No real authentication or AI. */
'use strict';
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const BT=String.fromCharCode(96);
const iconPaths={
 plus:'M12 5v14M5 12h14',close:'m6 6 12 12M6 18 18 6',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
 arrow:'M4 12h16m-6-6 6 6-6 6',check:'m5 12 4 4 10-10',eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
 lock:'M5 10h14v12H5V10Zm3 0V6a4 4 0 0 1 8 0v4M12 15v3',user:'M17 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM3 22v-3c0-7 18-7 18 0v3',
 users:'M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM3 22v-3c0-6 16-6 16 0v3M18 4a4 4 0 0 1 0 7m3 4c3 2 3 3 3 7',
 grid:'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z',
 news:'M4 4h13v17H4V4Zm13 5h4v10a2 2 0 0 1-4 0M7 8h7M7 12h7M7 16h5',
 activity:'M2 12h4l3-8 6 16 3-8h4',server:'M3 3h18v7H3V3Zm0 11h18v7H3v-7ZM7 6h.01M7 17h.01M11 6h6m-6 11h6',
 edit:'m14 4 6 6M3 21l6-2L21 7a2 2 0 0 0-5-5L4 14l-1 7Z',
 trash:'M3 6h18M9 6V3h6v3M5 6l1 16h12l1-16M10 10v8m4-8v8',
 moon:'M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z',
 sun:'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
 book:'M12 5C8 2 4 3 2 4v15c3-2 7-2 10 0 3-2 7-2 10 0V4c-3-2-7-2-10 1Zm0 0v14',
 copy:'M9 8h12v14H9V8ZM15 8V2H3v14h6',download:'M12 3v12m-5-5 5 5 5-5M3 16v5h18v-5',
 info:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 11v6m0-10h.01',
 key:'M14 9a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm-1 3 9 9m-4-4 3-3m-6 0 3-3',
 chevron:'m6 9 6 6 6-6',history:'M3 11a9 9 0 1 1 2 7M3 4v7h7M12 7v5l3 2',
 bulb:'M8 17c0-3-3-4-3-8a7 7 0 0 1 14 0c0 4-3 5-3 8H8Zm1 3h6m-5 3h4M12 6v4m-2-2h4',
 code:'m8 7-5 5 5 5m8-10 5 5-5 5M14 3l-4 18',
 paper:'M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8M8 16h5',
 timer:'M18 3l2 2M9 2h6M12 2v3M21 14a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 8v6l3 2',
 reset:'M20 7a9 9 0 1 0 1 9M20 2v6h-6',pin:'M9 3h6l-1 6 4 4H6l4-4-1-6Zm3 10v9',
 stop:'M6 6h12v12H6V6Z',play:'m8 4 12 8-12 8V4Z',pause:'M8 4v16M16 4v16',
 command:'M9 9H5a3 3 0 1 1 3-3v12a3 3 0 1 1-3-3h13a3 3 0 1 1-3 3V6a3 3 0 1 1 3 3H9Z',
 attachment:'m8 13 7-7a3 3 0 0 1 4 4L9 20a5 5 0 0 1-7-7L13 2',
 arrowleft:'M20 12H4m6-6-6 6 6 6',logout:'M10 3H3v18h7M8 12h14m-5-5 5 5-5 5',
 home:'m3 10 9-7 9 7v11h-7v-8h-4v8H3V10Z'
};
function icon(name){return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="'+(iconPaths[name]||iconPaths.grid)+'"/></svg>';}
function mark(){return '<svg viewBox="0 0 44 48" aria-hidden="true"><path d="M8 42V25a14 14 0 0 1 28 0v17M16 42V25a6 6 0 0 1 12 0v17" fill="none" stroke="currentColor" stroke-width="2.8"/><circle class="brand-dot" cx="22" cy="4" r="3" fill="currentColor"/></svg>';}
function load(){try{return JSON.parse(localStorage.getItem('taiba-riwaq-v2'))||{};}catch{return {};}}
const stored=load();
const sampleCode='## الفكرة قبل المصطلح\nتخيّل إنك بتعلّم طفل يميّز التفاح من البرتقال. بدل ما تكتب كل قاعدة بإيدك، بتوريه أمثلة. ده أساس **التعلّم الآلي**: استخراج نمط من البيانات، واستخدامه مع أمثلة جديدة.\n\n### نجربها بكود صغير\n'+BT.repeat(3)+'python\nfrom sklearn.tree import DecisionTreeClassifier\n\n# [weight, texture] — simple demonstration data\nexamples = [[150, 0], [170, 0], [140, 1], [160, 1]]\nlabels = ["apple", "apple", "orange", "orange"]\n\nmodel = DecisionTreeClassifier(random_state=42)\nmodel.fit(examples, labels)\nprint(model.predict([[155, 0]]))\n'+BT.repeat(3)+'\n\n## ثلاثة طرق للتعلّم\n| الطريقة | الفكرة | مثال |\n| --- | --- | --- |\n| تعلّم موجّه | أمثلة بإجابات معروفة | تصنيف الصور |\n| تعلّم غير موجّه | اكتشاف أنماط بدون إجابات | تجميع العملاء |\n| تعلّم معزّز | تحسين القرارات بالمكافآت | تدريب روبوت |\n\n> النموذج مش بيحفظ إجابة لكل سؤال؛ هو بيتعلّم طريقة يقرّب بيها الإجابة.\n\n1. نجهّز بيانات مناسبة.\n2. ندرّب نموذجًا على جزء منها.\n3. نختبره على بيانات لم يرها من قبل.\n\n**جرّب تفكّر:** إيه اللي ممكن يحصل لو كل أمثلة التدريب من نوع واحد؟\n\nالمحتوى ده مثال تعليمي ثابت لعرض الواجهة، مش رد مولّد من خدمة مباشرة.';
const samplePlan='## خُطوة صغيرة، فهم حقيقي.\nمش محتاج تبدأ بكل حاجة. اختار فكرة واحدة من المحاضرة واشتغل عليها بتركيز.\n\n1. **افهم:** اقرأ الفكرة واكتب معناها بأسلوبك.\n2. **جرّب:** طبّقها على مثال بسيط.\n3. **احكي:** اشرحها لزميل من غير ملاحظات.\n\n| الخطوة | المدة |\n| --- | --- |\n| قراءة نشطة | ١٠ دقائق |\n| تجربة وتطبيق | ٢٥ دقيقة |\n| مراجعة الفهم | ٥ دقائق |\n\n> السؤال اللي بتسأله بنفسك أهم من إجابة بتحفظها.\n\nاحفظ أهم فكرة في الدفتر بجانبك وارجع لها وقت المراجعة. ده محتوى تجريبي ثابت، وليس ردًا مباشرًا من ذكاء اصطناعي.';
const englishReply='## Start with the idea, not the terminology.\nA useful way to learn is to work through one small example before adding complexity.\n\n1. **Understand:** describe the idea in your own words.\n2. **Experiment:** try a simple example and observe what changes.\n3. **Reflect:** explain what you learned to a classmate.\n\n| Stage | Activity | Time |\n| --- | --- | --- |\n| Explore | Read actively | 10 minutes |\n| Practice | Work through an example | 25 minutes |\n| Reflect | Write a short note | 5 minutes |\n\n> A good question opens more than one path.\n\nPin the main idea to your notebook. This is fixed demonstration content, not a live AI response.';
const defaults={
 lang:'ar',theme:'light',profile:{name:'بدر أحمد',email:'badr.ahmed@thebes.edu.eg',faculty:'تكنولوجيا المعلومات',year:'الفرقة الثالثة'},
 notes:'أفكار تستحق الرجوع لها…\n\nأفهم الفكرة قبل ما أحفظها.\nأجرّب مثال بإيدي.\nأسأل سؤالًا أحسن.',
 focus:{duration:25*60,remaining:25*60,running:false,deadline:0},drafts:{},activeChat:null,mode:'understand',readNews:[],
 chats:[
  {id:'machine-learning',title:'كيف تتعلّم الآلة؟',category:'code',date:'2026-10-24',exchanges:[{q:'اشرحلي التعلّم الآلي بمثال بسيط وكود Python.',a:sampleCode}]},
  {id:'graduation-project',title:'فكرة مشروع تستحق البداية',category:'projects',date:'2026-10-23',exchanges:[{q:'إزاي أختار فكرة مشروع تخرج تفيد الطلاب؟',a:'## ابدأ بالمشكلة، مش بالتقنية.\nراقب حاجة بتاخد وقت من الطلاب كل يوم. ممكن تكون متابعة المهام، الوصول للمحاضرات، أو إيجاد زميل للمذاكرة.\n\n- اسأل خمسة طلاب عن المشكلة.\n- اختار أصغر حل ممكن تختبره.\n- سجّل ملاحظاتهم قبل ما تزود المزايا.\n\n> مشروع بسيط بيحل مشكلة حقيقية أحسن من مشروع كبير مش واضح لمين.\n\nده اقتراح ثابت للتجربة فقط.'}]},
  {id:'study-plan',title:'مساحة أهدأ للمذاكرة',category:'study',date:'2026-10-22',exchanges:[{q:'ساعدني أبني خطة مذاكرة مريحة وممكن ألتزم بيها.',a:samplePlan}]}
 ],
 announcements:[
  {id:1,title:'فكرتك على المسرح: يوم مشروعات التخرّج',body:'مساحة تجمع أفكار الطلاب وخبراء الصناعة. جهّز فكرة مشروعك وشاركها مع مجتمع جامعتك. تفاصيل ومواعيد العرض هنا تجريبية.',date:'2026-10-24',kind:'event'},
  {id:2,title:'موعدك مع امتحانات منتصف الفصل',body:'الجدول التجريبي للامتحانات متاح للمراجعة. نظّم أولوياتك، وخلي في خطتك وقت للفهم والتطبيق والراحة. لا يمثّل هذا الإعلان جدولًا رسميًا.',date:'2026-10-23',kind:'important'},
  {id:3,title:'من أول سطر كود: ورشة Python',body:'ورشة تطبيقية للمبتدئين تتناول أساسيات البرمجة بمشروعات صغيرة. المكان والموعد يُحددان في النظام الفعلي لاحقًا. هذا إعلان لعرض التصميم فقط.',date:'2026-10-22',kind:'event'}
 ]
};
const state={...defaults,...stored,profile:{...defaults.profile,...stored.profile},focus:{...defaults.focus,...stored.focus}};
state.chats.forEach(c=>c.exchanges.forEach(e=>{if(e.loading){e.loading=false;e.error=true;}if(e.streaming)e.streaming=false;}));
let route=['studio','history','campus','profile','admin','login','password'].includes(location.hash.slice(1))?location.hash.slice(1):'studio';
let pending=null,attached=null,errorNext=false,archiveQuery='',archiveFilter='all',newsFilter='all',toastTimeout,previousFocus;
const t=(ar,en)=>state.lang==='en'?en:ar;
function save(){try{localStorage.setItem('taiba-riwaq-v2',JSON.stringify(state));}catch{/* In private file contexts, the current session still works. */}}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$('#toast').classList.remove('visible'),3700);}
function live(message){$('#live').textContent=message;}
function active(){return state.chats.find(c=>c.id===state.activeChat);}
function dateLabel(date){return new Intl.DateTimeFormat(state.lang==='en'?'en-GB':'ar-EG',{day:'numeric',month:'short',timeZone:'Africa/Cairo'}).format(new Date(date+'T12:00:00Z'));}
function setTheme(theme){state.theme=theme;save();render();}
function header(){
 const navs=[['studio','01',t('الاستوديو','Studio')],['history','02',t('دفتر المحادثات','Conversations')],['campus','03',t('الحرم الجامعي','Campus')],['admin','04',t('الإدارة','Admin')]];
 return '<a class="wordmark" href="#studio" aria-label="'+t('طيبة رواق، الرئيسية','Taiba Riwaq home')+'"><span class="brand-symbol">'+mark()+'</span><span class="wordmark-copy">'+t('طيبة','taiba')+' <b dir="ltr">AI</b><small>'+t('رواق التعلّم','THE LEARNING STUDIO')+'</small></span></a><nav class="header-nav" aria-label="'+t('التنقّل الرئيسي','Main navigation')+'">'+navs.map(n=>'<a href="#'+n[0]+'" class="'+(route===n[0]?'active':'')+'" '+(route===n[0]?'aria-current="page"':'')+'><span class="nav-index">'+n[1]+'</span>'+n[2]+'</a>').join('')+'</nav><div class="header-actions"><button class="icon-btn command-button" data-action="commands" aria-label="'+t('البحث والتنقّل السريع','Search and quick navigation')+'">'+icon('command')+'</button><button class="icon-btn lang-btn" data-action="language" aria-label="'+t('Switch to English','التبديل إلى العربية')+'">'+t('EN','ع')+'</button><button class="icon-btn" data-action="theme" aria-label="'+t('تبديل المظهر','Toggle theme')+'">'+icon(state.theme==='light'?'moon':'sun')+'</button><span class="header-divider"></span><button class="avatar-btn" data-action="account" aria-label="'+t('الحساب والخيارات','Account and options')+'">'+esc(state.profile.name[0])+'</button></div>';
}
function dock(){return [['studio','home',t('مساحتك','Studio')],['history','history',t('المحادثات','History')],['campus','news',t('الجامعة','Campus')],['profile','user',t('حسابك','You')]].map(n=>'<a href="#'+n[0]+'" class="'+(route===n[0]?'active':'')+'" '+(route===n[0]?'aria-current="page"':'')+'>'+icon(n[1])+'<span>'+n[2]+'</span></a>').join('');}
function render(){
 document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==='ar'?'rtl':'ltr';document.documentElement.dataset.theme=state.theme;
 $('meta[name="theme-color"]').content=state.theme==='light'?'#f4f1e9':'#20241f';
 $('#masthead').innerHTML=header();$('#mobile-dock').innerHTML=dock();
 $('#statusbar').innerHTML='<span>'+markMini()+t('جامعة طيبة التكنولوجية','Thebes Technological University')+'</span><span><i class="status-dot"></i>'+t('مساحة تجريبية · أفكار حقيقية','A demo workspace. Real possibilities.')+'</span><a href="concepts.html">'+t('حكاية التصميم','Behind the design')+' '+icon('arrow')+'</a>';
 $('#view').className='route-'+route;
 if(route==='studio')$('#view').innerHTML=active()?reading():studio();
 else if(route==='history')$('#view').innerHTML=historyView();
 else if(route==='campus')$('#view').innerHTML=campus();
 else $('#view').innerHTML=window.TaibaScreens?window.TaibaScreens.render(route):'<div class="page-wrap">Loading…</div>';
 if(route==='studio')restoreEditor();
 updateFocusDOM();
}
function markMini(){return '<span style="width:12px;height:16px;display:inline-flex">'+mark()+'</span>';}
function studio(){
 const starters=[[t('نفهم فكرة صعبة','Understand a hard idea'),t('اشرحلي التعلّم الآلي بمثال وكود بسيط.','Explain machine learning with a simple example.')],[t('نلخّص محاضرة','Summarize a lecture'),t('ساعدني ألخّص محاضرة قواعد البيانات.','Help me summarize a database lecture.')],[t('نرتّب خطة مذاكرة','Build a study plan'),t('ساعدني أعمل خطة مذاكرة أقدر ألتزم بيها.','Help me build a realistic study plan.')],[t('نطوّر فكرة مشروع','Explore a project'),t('خلّينا نفكّر في مشروع تخرج يفيد الطلاب.','Explore a graduation project that helps students.')]];
 return '<div class="studio-grid"><section class="inquiry-desk" aria-labelledby="studio-title"><div class="desk-caption"><span>'+t('أهلًا '+esc(state.profile.name.split(' ')[0])+'، المساحة مساحتك.','Hi '+esc(state.profile.name.split(' ')[0])+'. Make room for an idea.')+'</span><span class="caption-date">YOUR NEXT CHAPTER / 01</span></div><div class="studio-title"><h1 id="studio-title">'+t('فكرة بتفتح<br><em>ألف طريق.</em>','One thought.<br><em>New worlds.</em>')+'</h1><div class="studio-stamp" aria-hidden="true"><span class="stamp-glyph">'+mark()+'</span><span class="stamp-caption">STAY CURIOUS</span></div></div><p class="desk-explainer">'+t('اسأل بفضول. فكّر بصوت عالي. خلّي الصعب واضح.<br>هنا مش بس تلاقي إجابة، هنا تبدأ تفهم.','Ask with curiosity. Think out loud. Make the complex clear.<br>More than finding an answer. A place to understand.')+'</p>'+editor(false)+'<div class="starter-list" aria-label="'+t('بدايات للأسئلة','Starting points')+'">'+starters.map((s,i)=>'<button class="starter" data-action="starter" data-prompt="'+esc(s[1])+'"><span>0'+(i+1)+'</span><span>'+s[0]+'</span>'+icon('arrow')+'</button>').join('')+'</div><div class="continue-heading"><h2>'+t('نكمّل من هنا؟','Pick up a thought.')+'</h2><a href="#history" class="text-link">'+t('كل المحادثات','All conversations')+icon('arrow')+'</a></div>'+state.chats.slice(0,2).map((c,i)=>resume(c,i)).join('')+'<button class="mobile-notebook" data-action="notebook"><span>'+icon('book')+'<span><strong>'+t('دفتر أفكارك','Your notebook')+'</strong><small>'+t('فكرة صغيرة تستحق الحفظ.','Small thoughts worth keeping.')+'</small></span></span>'+icon('arrow')+'</button></section>'+companion()+'</div>';
}
function resume(c,i){return '<a href="#studio" class="resume-line" data-action="open-chat" data-id="'+esc(c.id)+'"><span class="folio-number">0'+(i+1)+'</span><span class="resume-title"><strong>'+esc(c.title)+'</strong><small>'+t('آخر فكرة: ','Last thought: ')+dateLabel(c.date)+'</small></span>'+icon('arrow')+'</a>';}
function editor(compact){
 const modes=[['understand','bulb',t('نفهم','Explore')],['summarize','paper',t('نلخّص','Summary')],['code','code',t('نكتب كود','Code')]];
 const busy=pending?.chatId===state.activeChat;
 return '<form class="question-sheet" id="question-form"><div class="sheet-topline"><label class="sheet-label" for="inquiry">'+icon('edit')+t(compact?'السؤال التالي':'مساحة السؤال',compact?'Your next question':'THE INQUIRY DESK')+'</label><span class="sheet-index">THINK / ASK / DISCOVER</span></div>'+ (attached?'<div class="attachment-name"><span>'+esc(attached)+'</span><button type="button" data-action="remove-file" aria-label="'+t('إزالة المرفق','Remove attachment')+'">'+icon('close')+'</button></div>':'')+'<textarea id="inquiry" name="inquiry-message" class="inquiry-input" rows="1" dir="auto" autocomplete="off" data-lpignore="true" data-1p-ignore placeholder="'+t(compact?'خلّينا نكمّل الفكرة…':'إيه الفكرة اللي شاغلة بالك؟',compact?'Follow your next thought…':'What’s on your mind?')+'"></textarea><div class="sheet-bottom"><div class="question-modes" aria-label="'+t('أسلوب التفكير','Thinking mode')+'">'+modes.map(m=>'<button type="button" data-action="mode" data-mode="'+m[0]+'" class="mode-tab '+(state.mode===m[0]?'active':'')+'" aria-pressed="'+(state.mode===m[0])+'">'+icon(m[1])+m[2]+'</button>').join('')+'</div><div class="sheet-utilities"><button class="icon-btn" type="button" data-action="attach" aria-label="'+t('إرفاق اسم ملف محلي','Attach a local filename')+'">'+icon('attachment')+'</button><button class="ask-button '+(busy?'stop':'')+'" id="ask-button" type="submit" aria-label="'+t(busy?'إيقاف الرد التجريبي':'أرسل سؤالك',busy?'Stop demo response':'Send your question')+'" '+(!busy&&!state.drafts[state.activeChat||'new']?.trim()?'disabled':'')+'>'+icon(busy?'stop':'arrow')+'</button></div></div></form><p class="desk-demo-note">'+icon('info')+t('الردود محتوى تجريبي ثابت، مش ذكاء اصطناعي مباشر.','Responses are fixed demo content, not live AI.')+'<span class="keyboard-hint">Shift + Enter ↵</span></p>';
}
function companion(){
 return '<aside class="desk-companion" aria-label="'+t('دفتر التعلّم والتركيز','Learning notebook and focus')+'"><div class="companion-heading"><span>'+t('الهامش بتاعك','A little room to think')+'</span><small>FIELDNOTES / 01</small></div><section class="field-note"><label class="note-label" for="fieldnote">'+icon('edit')+t('أفكار على الهامش','Thoughts in the margin')+'</label><textarea id="fieldnote" class="note-textarea" spellcheck="false" aria-describedby="note-hint">'+esc(state.notes)+'</textarea><div class="note-footer"><span id="note-hint">'+icon('check')+t('بيتحفظ على جهازك','Saved on this device')+'</span><button data-action="clear-notes" aria-label="'+t('مسح الدفتر','Clear notebook')+'">'+icon('trash')+'</button></div></section><section class="focus-section" aria-labelledby="focus-heading"><div class="focus-heading"><h2 id="focus-heading" style="font:inherit">'+t('وقت أقل. تركيز أعمق.','Less noise. More focus.')+'</h2>'+icon('timer')+'</div><div class="focus-dial"><svg viewBox="0 0 175 175" aria-hidden="true"><circle class="dial-marks" cx="87.5" cy="87.5" r="79"/><circle cx="87.5" cy="87.5" r="70"/><circle class="progress" cx="87.5" cy="87.5" r="70"/></svg><strong class="focus-time" id="focus-time">25:00</strong><span class="focus-caption">'+t('مساحة لفكرة واحدة','Make room for one idea')+'</span></div><div class="focus-actions"><button class="btn btn-ink" data-action="focus-toggle" id="focus-toggle">'+icon(state.focus.running?'pause':'play')+t(state.focus.running?'وقفة':'نبدأ؟',state.focus.running?'Pause':'Start focus')+'</button><button class="icon-btn" data-action="focus-reset" aria-label="'+t('إعادة ضبط المؤقت','Reset focus timer')+'">'+icon('reset')+'</button></div><div class="focus-options"><button data-action="focus-duration" data-minutes="25" class="'+(state.focus.duration===1500?'active':'')+'">'+t('٢٥ دقيقة تركيز','25 min focus')+'</button><button data-action="focus-duration" data-minutes="5" class="'+(state.focus.duration===300?'active':'')+'">'+t('٥ دقائق راحة','5 min break')+'</button></div></section><section class="campus-slip"><div class="eyebrow">'+icon('news')+t('من الحرم الجامعي','From your campus')+'</div><h3>'+esc(state.announcements[0]?.title||t('أنت على اطّلاع بكل جديد.','You’re all caught up.'))+'</h3><p>'+t('أفكارك ليها مكان خارج المحاضرة كمان.','Your ideas belong beyond the lecture room, too.')+'</p><a href="#campus" class="text-link">'+t('استكشف الخبر','Explore the news')+icon('arrow')+'</a></section></aside>';
}
function reading(){
 const c=active();
 return '<div class="conversation-view"><section class="reading-studio" aria-label="'+t('مساحة المحادثة','Conversation workspace')+'"><div class="reading-topline"><div class="reading-title"><span class="folio-number">FOLIO / '+String(state.chats.indexOf(c)+1).padStart(2,'0')+'</span><h1>'+esc(c.title)+'</h1></div><div class="reading-controls"><button class="icon-btn" data-action="notebook" aria-label="'+t('افتح دفتر الأفكار','Open notebook')+'">'+icon('book')+'</button><button class="icon-btn" data-action="response-options" aria-label="'+t('خيارات تجربة الردود','Response demo options')+'">'+icon('activity')+'</button><button class="icon-btn" data-action="new-chat" aria-label="'+t('سؤال جديد','New conversation')+'">'+icon('plus')+'</button></div></div><div class="message-scroll" id="messages" aria-label="'+t('الأسئلة والإجابات','Questions and responses')+'">'+c.exchanges.map(exchangeHTML).join('')+'</div><div class="reading-compose">'+editor(true)+'</div></section>'+companion()+'</div>';
}
function exchangeHTML(exchange,index){
 let response='';
 if(exchange.loading)response='<div class="typing-state" role="status">'+t('بنجهّز الرد التجريبي','Preparing the demo response')+'<i></i><i></i><i></i></div>';
 else if(exchange.error)response='<div class="reply-error">'+t('الفكرة محفوظة. حصل خطأ تجريبي في عرض الرد.','Your question is saved. The demo response encountered an error.')+'<button data-action="retry" data-index="'+index+'">'+t('نجرّب تاني؟','Try again')+'</button></div>';
 else response='<div class="markdown" dir="auto">'+markdown(exchange.a||'')+'</div>'+(exchange.streaming?'':'<div class="response-actions"><button data-action="pin" data-index="'+index+'">'+icon('pin')+t('فكرة للدفتر','Pin to notebook')+'</button><button data-action="copy-response" data-index="'+index+'">'+icon('copy')+t('نسخ','Copy')+'</button><button data-action="retry" data-index="'+index+'">'+icon('reset')+t('إعادة العرض','Replay')+'</button></div>');
 return '<article class="exchange '+(exchange.streaming?'streaming':'')+'" data-exchange="'+index+'"><div class="message-user"><span class="user-index">Q / '+String(index+1).padStart(2,'0')+'</span><div class="user-question" dir="auto">'+esc(exchange.q)+'</div></div><div class="ai-byline"><span class="ai-mark">'+mark()+'</span>'+t('طيبة · نفكّر سوا','Taiba · think together')+'<span class="demo-label">'+t('محتوى تجريبي','DEMO CONTENT')+'</span></div>'+response+'</article>';
}
function inline(text){return esc(text).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\x60([^\x60]+)\x60/g,'<code dir="ltr">$1</code>');}
function markdown(text){
 return text.split(BT.repeat(3)).map((block,part)=>{
  if(part%2){const lines=block.split('\n'),language=lines.shift();return '<div class="code-block"><div class="code-bar"><span>'+esc(language||'text')+'</span><button data-action="copy-code">'+icon('copy')+t('نسخ الكود','Copy code')+'</button></div><pre tabindex="0"><code>'+esc(lines.join('\n').trim())+'</code></pre></div>';}
  const lines=block.split('\n');let html='',list='';
  const close=()=>{if(list){html+='</'+list+'>';list='';}};
  for(let i=0;i<lines.length;i++){
   const line=lines[i].trim();if(!line){close();continue;}
   if(line.startsWith('|')&&/^\s*\|[\s:|-]+\|\s*$/.test(lines[i+1]||'')){
    close();const cells=l=>l.trim().replace(/^\||\|$/g,'').split('|').map(s=>s.trim());
    html+='<div class="table-wrapper" role="region" tabindex="0" aria-label="'+t('جدول قابل للتمرير','Scrollable table')+'"><table><thead><tr>'+cells(line).map(c=>'<th scope="col">'+inline(c)+'</th>').join('')+'</tr></thead><tbody>';
    i+=2;for(;i<lines.length&&lines[i].trim().startsWith('|');i++)html+='<tr>'+cells(lines[i]).map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>';
    i--;html+='</tbody></table></div>';continue;
   }
   const heading=line.match(/^(#{1,3})\s+(.*)/);
   if(heading){close();const tag=heading[1].length<3?'h2':'h3';html+='<'+tag+'>'+inline(heading[2])+'</'+tag+'>';continue;}
   const item=line.match(/^(- |\d+\. )(.*)/);
   if(item){const type=item[1]==='- '?'ul':'ol';if(type!==list){close();list=type;html+='<'+type+'>';}html+='<li>'+inline(item[2])+'</li>';continue;}
   close();html+=line.startsWith('> ')?'<blockquote>'+inline(line.slice(2))+'</blockquote>':'<p>'+inline(line)+'</p>';
  }close();return html;
 }).join('');
}
function historyView(){
 const filtered=state.chats.filter(c=>(archiveFilter==='all'||c.category===archiveFilter)&&(c.title+' '+c.exchanges.map(e=>e.q).join(' ')).toLowerCase().includes(archiveQuery.toLowerCase()));
 return '<div class="page-wrap"><div class="page-heading"><div><p class="eyebrow"><span class="eyebrow-line"></span>'+t('أفكارك، مش مجرد رسائل','YOUR THINKING, COLLECTED')+'</p><h1>'+t('كل سؤال، له حكاية.','Every question has a story.')+'</h1><p>'+t('ارجع لفكرة، كمّل نقاش، أو افتح بابًا جديدًا.','Revisit an idea, continue a conversation, or open a new door.')+'</p></div><button class="btn btn-ink" data-action="new-chat">'+icon('plus')+t('محادثة جديدة','New conversation')+'</button></div><div class="archive-toolbar"><label class="archive-search">'+icon('search')+'<span class="sr-only">'+t('ابحث في المحادثات','Search conversations')+'</span><input type="search" id="archive-search" placeholder="'+t('دوّر على فكرة…','Find a thought…')+'" value="'+esc(archiveQuery)+'" autocomplete="off"></label><div class="archive-filters">'+[['all',t('كل الأفكار','All thoughts')],['study',t('مذاكرة','Study')],['code',t('برمجة','Coding')],['projects',t('مشروعات','Projects')]].map(f=>'<button data-action="archive-filter" data-filter="'+f[0]+'" class="'+(archiveFilter===f[0]?'active':'')+'" aria-pressed="'+(archiveFilter===f[0])+'">'+f[1]+'</button>').join('')+'</div></div><div id="archive-results">'+archiveRows(filtered)+'</div><div class="archive-bottom"><span>'+t('محفوظة محليًا على جهازك فقط.','Stored locally on this device only.')+'</span><span>RIWAQ / YOUR THINKING ARCHIVE</span></div></div>';
}
function archiveRows(list){return list.length?list.map((c,i)=>'<article class="archive-row"><span class="folio-number">'+String(i+1).padStart(2,'0')+'</span><button class="archive-open" data-action="open-chat" data-id="'+esc(c.id)+'"><h2>'+esc(c.title)+'</h2><p>'+esc(c.exchanges[0]?.q||'')+'</p></button><span class="archive-time">'+dateLabel(c.date)+'</span><button class="icon-btn" data-action="delete-chat" data-id="'+esc(c.id)+'" aria-label="'+t('حذف ','Delete ')+esc(c.title)+'">'+icon('trash')+'</button></article>').join(''):'<div class="empty-state"><h2>'+t('لسه في مساحة لفكرة جديدة.','Room for a new thought.')+'</h2><p>'+t('مفيش محادثات مطابقة للبحث.','No conversations match your search.')+'</p></div>';}
function campus(){
 const news=state.announcements.filter(n=>newsFilter==='all'||(newsFilter==='unread'?!state.readNews.includes(n.id):n.kind==='important'));
 return '<div class="page-wrap"><div class="campus-hero"><div><p class="eyebrow">'+t('من الجامعة، ليك','FROM YOUR CAMPUS, FOR YOU')+'</p><h1>'+t('الحياة<br><span>خارج المحاضرة.</span>','Life beyond<br><span>the lecture.</span>')+'</h1><p>'+t('مساحة للأخبار، والفرص، والبدايات الجديدة. بيانات عرض تجريبية.','News, opportunities, and new beginnings. Sample content only.')+'</p></div><span class="bulletin-stamp">THE CAMPUS BULLETIN / 2026</span></div><div class="archive-filters" style="margin-block:15px">'+[['all',t('الكل','All news')],['unread',t('غير المقروء','Unread')],['important',t('المهم','Important')]].map(f=>'<button data-action="news-filter" data-filter="'+f[0]+'" class="'+(newsFilter===f[0]?'active':'')+'" aria-pressed="'+(newsFilter===f[0])+'">'+f[1]+'</button>').join('')+'</div>'+ (news.length?news.map(n=>'<article class="bulletin-item"><div class="bulletin-date"><strong>'+String(new Date(n.date+'T12:00:00Z').getUTCDate()).padStart(2,'0')+'</strong><span>'+new Intl.DateTimeFormat('en',{month:'short'}).format(new Date(n.date+'T12:00:00Z')).toUpperCase()+'</span></div><div><span class="tag">'+t(n.kind==='important'?'يستحق الانتباه':'فرصة جديدة',n.kind==='important'?'IMPORTANT':'OPPORTUNITY')+'</span><h2>'+esc(n.title)+'</h2><p>'+esc(n.body)+'</p><div class="bulletin-details" id="news-detail-'+n.id+'" hidden><p>'+t('إعلان توضيحي من شؤون الطلاب. راجع قنوات الجامعة الرسمية للمواعيد والتسجيل. لا يتم إجراء تسجيل أو حجز من هذا النموذج.','Sample student-affairs announcement. Refer to official university channels for dates and registration. This prototype does not book or register anything.')+'</p></div><button class="text-link" data-action="news-details" data-id="'+n.id+'" aria-expanded="false" aria-controls="news-detail-'+n.id+'">'+t('نقرأ التفاصيل','Read the details')+icon('arrow')+'</button>'+ (state.readNews.includes(n.id)?'<div class="campus-read">'+t('تمت القراءة','Read')+'</div>':'')+'</div></article>').join(''):'<div class="empty-state"><h2>'+t('أنت على اطّلاع بكل جديد.','You’re all caught up.')+'</h2></div>')+'</div>';
}
/* Interaction model ----------------------------------------------------- */
function navigate(next){
 if(!['studio','history','campus','profile','admin','login','password'].includes(next))next='studio';
 if($('#dialog').open)closeDialog();
 route=next;history.replaceState(null,'','#'+route);render();$('#view').scrollTop=0;
}
function newChat(){state.activeChat=null;attached=null;save();navigate('studio');}
function restoreEditor(){
 const input=$('#inquiry');if(!input)return;
 input.value=state.drafts[state.activeChat||'new']||'';input.dir=input.value?'auto':document.documentElement.dir;resizeInput();updateAsk();
}
function resizeInput(){const el=$('#inquiry');if(!el)return;el.style.height='auto';const limit=active()?(innerWidth<=650?112:130):(innerWidth<=650?150:168);el.style.height=Math.min(el.scrollHeight,limit)+'px';}
function updateAsk(){
 const button=$('#ask-button');if(!button)return;
 const busy=pending?.chatId===state.activeChat;
 button.disabled=!busy&&!$('#inquiry')?.value.trim();
 button.classList.toggle('stop',busy);button.innerHTML=icon(busy?'stop':'arrow');
 button.setAttribute('aria-label',t(busy?'إيقاف الرد التجريبي':'أرسل سؤالك',busy?'Stop demo response':'Send your question'));
}
function scrollMessages(){const box=$('#messages');if(box)requestAnimationFrame(()=>{box.scrollTop=box.scrollHeight;});}
function updateMessages(forceScroll=false){
 const box=$('#messages');if(!box||!active())return;
 const shouldScroll=forceScroll||box.scrollHeight-box.scrollTop-box.clientHeight<130;
 const top=box.scrollTop;
 box.innerHTML=active().exchanges.map(exchangeHTML).join('');
 if(shouldScroll)scrollMessages();else box.scrollTop=top;
}
function send(){
 if(pending?.chatId===state.activeChat){stop();return;}
 const input=$('#inquiry'),question=input?.value.trim();if(!question)return;
 const wasFocused=document.activeElement===input,wasReading=!!$('#messages');
 if(pending){toast(t('في رد قيد العرض بمحادثة تانية. انتظر اكتماله أو أوقفه.','A response is playing in another conversation. Wait or stop it first.'));return;}
 if(!active()){
  state.activeChat='thought-'+Date.now();
  state.chats.unshift({id:state.activeChat,title:question.slice(0,45),category:state.mode==='code'?'code':'study',date:new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo'}).format(new Date()),exchanges:[]});
  delete state.drafts.new;
 }
 const chat=active();
 chat.exchanges.push({q:question+(attached?'\n['+t('مرفق محلي: ','Local filename: ')+attached+']':''),a:'',loading:true});
 state.drafts[state.activeChat]='';attached=null;
 const fail=errorNext;errorNext=false;
 pending={chatId:chat.id,index:chat.exchanges.length-1,timer:null};
 save();
 if(wasReading){
  input.value='';input.dir=document.documentElement.dir;resizeInput();$('.attachment-name')?.remove();updateMessages(true);
 }else{
  render();
  // Only the first inquiry changes composition; later sends keep the same DOM input.
  if(wasFocused)$('#inquiry').focus({preventScroll:true});
 }
 scrollMessages();updateAsk();
 live(t('تم إرسال السؤال. يتم عرض رد تجريبي.','Question sent. A demo response is being displayed.'));
 startResponse(chat,chooseReply(question),fail);
}
function chooseReply(question){return state.lang==='en'&&!/[\u0600-\u06ff]/.test(question)?englishReply:(state.mode==='code'||/كود|تعلّم|تعلم|آلة|python/i.test(question)?sampleCode:samplePlan);}
function startResponse(chat,answer,fail=false){
 pending.timer=setTimeout(()=>{
  if(!pending)return;
  const e=chat.exchanges[pending.index];e.loading=false;
  if(fail){e.error=true;pending=null;save();if(state.activeChat===chat.id&&route==='studio')updateMessages(true);updateAsk();live(t('حدث خطأ تجريبي. يمكنك إعادة المحاولة.','Demo error. You can try again.'));return;}
  e.streaming=true;const words=answer.split(' ');let count=0;
  function tick(){
   if(!pending)return;
   count=Math.min(count+8,words.length);e.a=words.slice(0,count).join(' ');
   if(count===words.length){e.streaming=false;pending=null;save();live(t('اكتمل عرض الرد التجريبي.','The demo response is complete.'));}
   if(state.activeChat===chat.id&&route==='studio')updateMessages();
   updateAsk();if(pending)pending.timer=setTimeout(tick,40);
  }tick();
 },600);
}
function stop(){
 if(!pending)return;clearTimeout(pending.timer);
 const chat=state.chats.find(c=>c.id===pending.chatId),exchange=chat?.exchanges[pending.index];
 if(exchange){exchange.loading=false;exchange.streaming=false;exchange.a=exchange.a||t('تم إيقاف عرض الرد التجريبي.','The demo response was stopped.');}
 pending=null;save();if(route==='studio')updateMessages();updateAsk();live(t('تم الإيقاف.','Stopped.'));
}
function retry(index){
 if(pending){toast(t('انتظر اكتمال الرد الحالي أو أوقفه أولًا.','Wait for the current response or stop it first.'));return;}
 const chat=active(),exchange=chat?.exchanges[index];if(!exchange)return;
 Object.assign(exchange,{a:'',error:false,loading:true});pending={chatId:chat.id,index,timer:null};
 save();updateMessages(true);updateAsk();startResponse(chat,chooseReply(exchange.q));
}
function dialog(title,body){
 previousFocus=document.activeElement;
 $('#dialog-body').innerHTML='<div class="dialog-heading"><h2 id="dialog-title">'+esc(title)+'</h2><button class="icon-btn" data-action="close-dialog" aria-label="'+t('إغلاق النافذة','Close dialog')+'">'+icon('close')+'</button></div><div class="dialog-content">'+body+'</div>';
 if(!$('#dialog').open)$('#dialog').showModal();
}
function closeDialog(){$('#dialog').close();if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});}
function notebookDialog(){
 dialog(t('فكرة تستحق الهامش.','A thought worth keeping.'),'<div class="field-note mobile-note-modal"><label for="mobile-fieldnote" class="note-label">'+t('دفتر أفكارك · يُحفظ على الجهاز فقط','Your notebook · saved on this device')+'</label><textarea id="mobile-fieldnote" class="note-textarea" rows="6">'+esc(state.notes)+'</textarea></div><div style="display:flex;align-items:center;justify-content:space-between;gap:15px;margin-top:22px"><span id="mobile-focus-time" class="focus-time">25:00</span><button class="btn btn-ink" data-action="focus-toggle">'+icon(state.focus.running?'pause':'play')+t(state.focus.running?'وقفة':'ابدأ التركيز',state.focus.running?'Pause':'Start focus')+'</button></div><div class="dialog-actions"><button class="btn btn-outline" data-action="close-dialog">'+t('حفظ وإغلاق','Save and close')+'</button></div>');
 updateFocusDOM();
}
function remaining(){return state.focus.running?Math.max(0,Math.ceil((state.focus.deadline-Date.now())/1000)):state.focus.remaining;}
function updateFocusDOM(){
 const seconds=remaining(),formatted=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
 ['#focus-time','#mobile-focus-time'].forEach(id=>{const el=$(id);if(el)el.textContent=formatted;});
 const progress=$('.focus-dial .progress');if(progress)progress.style.strokeDashoffset=440*(1-seconds/state.focus.duration);
 const button=$('#focus-toggle');if(button)button.innerHTML=icon(state.focus.running?'pause':'play')+t(state.focus.running?'وقفة':'نبدأ؟',state.focus.running?'Pause':'Start focus');
 if(state.focus.running&&seconds===0){state.focus.running=false;state.focus.remaining=0;save();toast(t('خلص وقت التركيز. خُد نفس، وافتكر الفكرة اللي وصلت لها.','Your focus session is complete. Take a breath and reflect.'));updateFocusDOM();}
}
async function copy(text){try{await navigator.clipboard.writeText(text);toast(t('اتنسخت الفكرة.','Copied.'));}catch{toast(t('النسخ التلقائي غير متاح. حدّد النص وانسخه يدويًا.','Automatic copying is unavailable. Select and copy the text manually.'));}}
const actions={
 'language':()=>{state.lang=state.lang==='ar'?'en':'ar';save();render();},
 'theme':()=>setTheme(state.theme==='light'?'dark':'light'),
 'new-chat':newChat,
 'starter':el=>{const input=$('#inquiry');input.value=el.dataset.prompt;input.dir='auto';state.drafts[state.activeChat||'new']=input.value;save();resizeInput();updateAsk();input.focus({preventScroll:true});},
 'mode':el=>{state.mode=el.dataset.mode;save();$$('.mode-tab').forEach(b=>{b.classList.toggle('active',b.dataset.mode===state.mode);b.setAttribute('aria-pressed',b.dataset.mode===state.mode);});},
 'open-chat':el=>{state.activeChat=el.dataset.id;attached=null;save();navigate('studio');},
 'delete-chat':el=>{const id=el.dataset.id;if(pending?.chatId===id){toast(t('أوقف الرد قبل حذف المحادثة.','Stop the response before deleting.'));return;}dialog(t('نحتفظ بالفكرة؟','Keep this thought?'),'<p>'+t('حذف المحادثة من هذا الجهاز لا يمكن التراجع عنه.','Deleting this conversation from this device cannot be undone.')+'</p><div class="dialog-actions"><button class="btn btn-ink" data-action="confirm-delete" data-id="'+esc(id)+'">'+t('حذف المحادثة','Delete conversation')+'</button><button class="btn btn-outline" data-action="close-dialog">'+t('احتفاظ','Keep it')+'</button></div>');},
 'confirm-delete':el=>{state.chats=state.chats.filter(c=>c.id!==el.dataset.id);delete state.drafts[el.dataset.id];if(state.activeChat===el.dataset.id)state.activeChat=null;save();closeDialog();render();toast(t('تم حذف المحادثة محليًا.','Conversation deleted locally.'));},
 'archive-filter':el=>{archiveFilter=el.dataset.filter;render();},
 'notebook':notebookDialog,
 'clear-notes':()=>dialog(t('صفحة جديدة؟','A fresh page?'),'<p>'+t('سيتم مسح ملاحظات الدفتر على هذا الجهاز.','Your notebook on this device will be cleared.')+'</p><div class="dialog-actions"><button class="btn btn-ink" data-action="confirm-clear-notes">'+t('مسح الدفتر','Clear notebook')+'</button><button class="btn btn-outline" data-action="close-dialog">'+t('إلغاء','Cancel')+'</button></div>'),
 'confirm-clear-notes':()=>{state.notes='';save();closeDialog();const note=$('#fieldnote');if(note)note.value='';toast(t('دفترك جاهز لفكرة جديدة.','Your notebook is ready for a new thought.'));},
 'pin':el=>{const text=active()?.exchanges[+el.dataset.index]?.a;if(!text)return;const excerpt=text.replace(/[#*|>]/g,'').replace(/\x60/g,'').trim().slice(0,240);state.notes+=(state.notes?'\n\n':'')+excerpt;save();const note=$('#fieldnote');if(note)note.value=state.notes;toast(t('اتحفظت بداية الفكرة في دفترِك.','The opening idea was pinned to your notebook.'));},
 'copy-response':el=>copy(active()?.exchanges[+el.dataset.index]?.a||''),
 'copy-code':el=>copy(el.closest('.code-block').querySelector('code').textContent),
 'retry':el=>retry(+el.dataset.index),
 'attach':()=>$('#file-picker').click(),
 'remove-file':()=>{attached=null;render();},
 'response-options':()=>dialog(t('جرّب حالات الرد','Explore response states'),'<p>'+t('اختبر الانتظار والعرض التدريجي والإيقاف، أو اعرض خطأ قابلًا لإعادة المحاولة. كل الردود محلية وتجريبية.','Explore loading, streaming, stopping, and retryable errors. All responses are local demonstrations.')+'</p><div class="command-list"><button data-action="simulate-error">'+icon('activity')+t('خطأ تجريبي في السؤال القادم','Simulate an error on the next question')+'</button><button data-action="stop-stream">'+icon('stop')+t('إيقاف الرد الحالي','Stop current response')+'</button></div>'),
 'simulate-error':()=>{errorNext=true;closeDialog();toast(t('السؤال القادم سيعرض خطأ تجريبيًا، ثم يمكنك إعادة المحاولة.','Your next question will show a retryable demo error.'));},
 'stop-stream':()=>{stop();closeDialog();},
 'focus-toggle':()=>{if(state.focus.running){state.focus.remaining=remaining();state.focus.running=false;}else{if(state.focus.remaining<=0)state.focus.remaining=state.focus.duration;state.focus.running=true;state.focus.deadline=Date.now()+state.focus.remaining*1000;}save();updateFocusDOM();if($('#dialog').open&&$('#mobile-fieldnote')){const value=$('#mobile-fieldnote').value;notebookDialog();$('#mobile-fieldnote').value=value;}},
 'focus-reset':()=>{state.focus.running=false;state.focus.remaining=state.focus.duration;save();updateFocusDOM();},
 'focus-duration':el=>{state.focus.duration=+el.dataset.minutes*60;state.focus.remaining=state.focus.duration;state.focus.running=false;save();updateFocusDOM();$$('.focus-options button').forEach(b=>b.classList.toggle('active',+b.dataset.minutes*60===state.focus.duration));},
 'news-filter':el=>{newsFilter=el.dataset.filter;render();},
 'news-details':el=>{const detail=document.getElementById('news-detail-'+el.dataset.id);detail.hidden=!detail.hidden;el.setAttribute('aria-expanded',!detail.hidden);if(!detail.hidden&&!state.readNews.includes(+el.dataset.id)){state.readNews.push(+el.dataset.id);save();el.insertAdjacentHTML('afterend','<div class="campus-read">'+t('تمت القراءة','Read')+'</div>');}},
 'close-dialog':closeDialog,
 'design-story':()=>dialog(t('ثلاث طرق، ورواق واحد.','Three directions. One Riwaq.'),'<h3>'+t('A / ذكاء تحريري','A / Editorial Intelligence')+'</h3><p>'+t('تكوين مجلة: أعمدة قراءة، وفهرس فصول، وهوامش للإجابات.','A journal composition with reading columns, a chapter index, and marginal response tools.')+'</p><h3>'+t('B / ذكاء مستقبلي','B / Future Intelligence')+'</h3><p>'+t('مسرح عمل سياقي: شريط أدوات نحيف، ولوحات تظهر حسب المهمة، وأوامر سريعة.','A contextual instrument stage with a narrow utility rail, task-based panels, and a command palette.')+'</p><h3>'+t('C / رواق التعلّم · الاتجاه المختار','C / Riwaq Learning Studio · selected')+'</h3><p>'+t('مكتب للتفكير: مساحة سؤال، ودفتر يعمل، ومؤقّت تركيز. المحادثات وجهة مستقلة والتنقّل على الهاتف سفلي.','A working desk with an inquiry surface, a live notebook, and a focus timer. Conversation history is a destination and mobile navigation lives at the bottom.')+'</p><div class="dialog-actions"><button class="btn btn-ink" data-action="close-dialog">'+t('ارجع للاستوديو','Back to the studio')+'</button></div>'),
 'goto':el=>navigate(el.dataset.route),
 'account':()=>dialog(t('مساحتك في رواق','Your place in Riwaq'),'<p>'+esc(state.profile.name)+'<br><span dir="ltr">'+esc(state.profile.email)+'</span></p><div class="command-list"><button data-action="goto" data-route="profile">'+icon('user')+t('الحساب والتفضيلات','Profile and preferences')+'</button><button data-action="notebook">'+icon('book')+t('دفتر الأفكار والتركيز','Notebook and focus')+'</button><button data-action="goto" data-route="admin">'+icon('grid')+t('الإدارة التجريبية','Demo administration')+'</button><button data-action="goto" data-route="login">'+icon('logout')+t('شاشة الدخول التجريبية','Demo sign-in screen')+'</button></div>'),
 'commands':()=>dialog(t('باب لفكرة أسرع.','A shortcut to your next idea.'),'<div class="command-list">'+[['studio','home',t('الاستوديو','Studio')],['history','history',t('دفتر المحادثات','Conversations')],['campus','news',t('الحرم الجامعي','Campus')],['profile','user',t('الحساب','Profile')],['admin','grid',t('الإدارة','Admin')]].map(n=>'<button data-action="goto" data-route="'+n[0]+'">'+icon(n[1])+n[2]+'</button>').join('')+'<button data-action="new-chat">'+icon('plus')+t('محادثة جديدة','New conversation')+'<kbd>Ctrl ⇧ N</kbd></button></div>')
};
document.addEventListener('click',event=>{
 const action=event.target.closest('[data-action]');
 if(action){event.preventDefault();actions[action.dataset.action]?.(action);return;}
 const anchor=event.target.closest('a[href^="#"]');
 if(anchor&&anchor.hash!=='#view'){event.preventDefault();navigate(anchor.hash.slice(1));}
});
document.addEventListener('input',event=>{
 const input=event.target;
 if(input.id==='inquiry'){input.dir=input.value?'auto':document.documentElement.dir;state.drafts[state.activeChat||'new']=input.value;resizeInput();updateAsk();save();}
 if(input.id==='fieldnote'||input.id==='mobile-fieldnote'){state.notes=input.value;save();const other=input.id==='fieldnote'?$('#mobile-fieldnote'):$('#fieldnote');if(other)other.value=input.value;}
 if(input.id==='archive-search'){archiveQuery=input.value;const list=state.chats.filter(c=>(archiveFilter==='all'||c.category===archiveFilter)&&(c.title+' '+c.exchanges.map(e=>e.q).join(' ')).toLowerCase().includes(archiveQuery.toLowerCase()));$('#archive-results').innerHTML=archiveRows(list);}
});
document.addEventListener('submit',event=>{if(event.target.id==='question-form'){event.preventDefault();send();}});
document.addEventListener('keydown',event=>{
 if(event.target.id==='inquiry'&&event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();if(pending?.chatId===state.activeChat){toast(t('كمّل كتابة، وبعد اكتمال الرد ابعت سؤالك الجديد.','Keep writing. Send your next question when the response finishes.'));return;}send();}
 if($('#dialog').open)return;
 if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();actions.commands();}
 if((event.ctrlKey||event.metaKey)&&event.shiftKey&&event.key.toLowerCase()==='n'){event.preventDefault();newChat();}
 if(event.key==='/'&&!event.target.matches('input,textarea,select,[contenteditable]')){event.preventDefault();navigate('history');$('#archive-search').focus({preventScroll:true});}
});
document.addEventListener('pointerdown',event=>{if(event.target.closest('#ask-button')&&document.activeElement?.id==='inquiry')event.preventDefault();});
$('#dialog').addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
$('#dialog').addEventListener('click',event=>{if(event.target!==$('#dialog'))return;const r=$('#dialog').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();});
$('#file-picker').addEventListener('change',event=>{
 const file=event.target.files[0];if(!file)return;
 if(file.size>1024*1024||!/\.(txt|md|csv)$/i.test(file.name)){toast(t('اختر ملف TXT أو MD أو CSV أصغر من ١ ميجابايت.','Choose a TXT, MD, or CSV file smaller than 1 MB.'));event.target.value='';return;}
 attached=file.name;render();toast(t('تم إرفاق اسم الملف فقط. لم يُقرأ محتواه أو يُرفع.','Filename attached only. Its contents were not read or uploaded.'));event.target.value='';
});
let viewportBaseline=innerHeight,viewportWidth=innerWidth;
function syncViewport(){
 if(!window.visualViewport||innerWidth>850){document.documentElement.style.removeProperty('--app-height');$('#shell').classList.remove('keyboard-open');return;}
 const vp=window.visualViewport;if(vp.scale!==1)return;
 if(Math.abs(innerWidth-viewportWidth)>80){viewportBaseline=vp.height;viewportWidth=innerWidth;}
 viewportBaseline=Math.max(viewportBaseline,vp.height);
 document.documentElement.style.setProperty('--app-height',Math.round(vp.height)+'px');
 $('#shell').classList.toggle('keyboard-open',document.activeElement?.id==='inquiry'&&viewportBaseline-vp.height>140);
}
window.visualViewport?.addEventListener('resize',syncViewport,{passive:true});
window.addEventListener('resize',syncViewport,{passive:true});
document.addEventListener('focusin',syncViewport);document.addEventListener('focusout',()=>requestAnimationFrame(syncViewport));
window.addEventListener('hashchange',()=>navigate(location.hash.slice(1)));
window.Taiba={state,icon,esc,t,save,toast,navigate,render,setTheme,dialog,closeDialog};
document.addEventListener('DOMContentLoaded',()=>{render();syncViewport();setInterval(updateFocusDOM,1000);});
