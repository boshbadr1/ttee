/* Taiba AI — standalone frontend demonstration. No authentication or API calls. */
'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const BT = String.fromCharCode(96);
const paths = {
  spark:'M12 2c1.1 6.4 3.6 8.9 10 10-6.4 1.1-8.9 3.6-10 10C10.9 15.6 8.4 13.1 2 12 8.4 10.9 10.9 8.4 12 2Z',
  plus:'M12 5v14M5 12h14',close:'m6 6 12 12M6 18 18 6',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  chat:'M20 11a8 8 0 0 1-8 8H7l-5 3 1-6a9 9 0 1 1 17-5ZM7 9h9M7 13h6',
  megaphone:'m3 10 15-6v16L3 14v-4Zm3 5 1 6h3l-1-5M21 9v6M3 10H1v4h2',
  history:'M3 11a9 9 0 1 1 2 7M3 4v7h7M12 7v5l3 2',
  graduation:'m2 9 10-5 10 5-10 5L2 9Zm4 2v6q6 5 12 0v-6M22 9v8',
  'arrow-up-left':'M17 17 7 7M7 17V7h10',chevrons:'m8 8 4-4 4 4m-8 8 4 4 4-4',
  grid:'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z',
  menu:'M4 6h16M4 12h16M4 18h16',panel:'M3 4h18v16H3V4Zm12 0v16M18 8h.01M18 12h.01',
  moon:'M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z',
  sun:'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  bell:'M18 8a6 6 0 0 0-12 0c0 7-3 8-3 9h18c0-1-3-2-3-9ZM10 21h4',
  edit:'M14 4 20 10M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14v6ZM13 21H3V8',
  'chevron-down':'m6 9 6 6 6-6','arrow-up':'m6 11 6-6 6 6M12 5v15',
  university:'m3 9 9-6 9 6H3ZM5 11v7m7-7v7m7-7v7M3 21h18M2 18h20',
  book:'M12 5C8 2 4 3 2 4v15c3-2 7-2 10 0 3-2 7-2 10 0V4c-3-2-7-2-10 1Zm0 0v14',
  pen:'m14 4 6 6M3 21l6-2L21 7a2 2 0 0 0-5-5L4 14l-1 7ZM4 14l5 5',
  document:'M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8M8 16h5',
  rocket:'M9 15 3 14l3-5h4M9 15l1 6 5-3v-4M9 15c-1-7 3-12 12-12 0 8-5 13-12 12ZM15 8h.01M4 19l-2 3 4-2',
  shield:'m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6l9-4Zm-4 10 3 3 5-6',
  copy:'M9 8h12v14H9V8ZM15 8V2H3v14h6',check:'m5 12 4 4 10-10',
  retry:'M20 7a9 9 0 1 0 1 9M20 2v6h-6',
  dislike:'M7 14H3V3h4m0 11 5 7 3-1-1-6h5l2-3-2-8H7v11Z',
  like:'M7 10H3v11h4m0-11 5-7 3 1-1 6h5l2 3-2 8H7V10Z',
  alert:'m12 3 10 18H2L12 3Zm0 6v5m0 3h.01',stop:'M6 6h12v12H6V6Z',
  user:'M17 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM3 22v-3c0-7 18-7 18 0v3',
  settings:'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM9 2l-1 3-3 1-3 4 2 3-1 4 4 3 3-1 4 3 4-2v-4l3-2-1-5-3-1-1-3-5-1Z',
  logout:'M10 3H3v18h7M8 12h14m-5-5 5 5-5 5',
  eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  'eye-off':'m3 3 18 18M10 5q7-2 12 7l-3 4M6 6q-3 2-4 6c4 7 10 9 15 5M9 9a4 4 0 0 0 6 6',
  lock:'M5 10h14v12H5V10Zm3 0V6a4 4 0 0 1 8 0v4M12 15v3',
  users:'M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM3 22v-3c0-6 16-6 16 0v3M18 4a4 4 0 0 1 0 7m3 4c3 2 3 3 3 7',
  activity:'M2 12h4l3-8 6 16 3-8h4',server:'M3 3h18v7H3V3Zm0 11h18v7H3v-7ZM7 6h.01M7 17h.01M11 6h6m-6 11h6',
  trash:'M3 6h18M9 6V3h6v3M5 6l1 16h12l1-16M10 10v8m4-8v8',
  download:'M12 3v12m-5-5 5 5 5-5M3 16v5h18v-5',
  calendar:'M3 5h18v17H3V5Zm0 5h18M7 2v6m10-6v6',
  key:'M14 9a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm-1 3 9 9m-4-4 3-3m-6 0 3-3',
  info:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 11v6m0-10h.01',
  mail:'M2 4h20v16H2V4Zm0 1 10 8L22 5',leaf:'M21 3C8 1 1 8 6 16S23 18 21 3ZM4 22 17 8',
};
function icon(name, cls = '') { return '<svg class="icon '+cls+'" viewBox="0 0 24 24" aria-hidden="true"><path d="'+(paths[name] || paths.spark)+'"/></svg>'; }
function hydrateIcons(root = document) { $$('[data-icon]', root).forEach(el => { el.innerHTML = icon(el.dataset.icon); }); }
function getStored() { try { return JSON.parse(localStorage.getItem('taiba-original-refined-v1')) || {}; } catch { return {}; } }
const saved = getStored();
const profile = {name:saved.name || 'بدر أحمد',email:'badr.ahmed@thebes.edu.eg',faculty:'تكنولوجيا المعلومات',year:'الفرقة الثالثة',id:'202403184'};
const programmingReply = 'أكيد يا بدر! خلّينا نبسّط الفكرة خطوة بخطوة.\n\n## يعني إيه البرمجة كائنية التوجّه؟\nهي طريقة لتنظيم الكود حوالين **كائنات (Objects)**، كل كائن بيجمع البيانات والسلوك المرتبط بيها. تخيّل إننا بنصمّم نظام للمكتبة الجامعية.\n\n### مثال بسيط باستخدام Python\n'+BT.repeat(3)+'python\nclass Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n\n    def describe(self):\n        return f"{self.title} by {self.author}"\n\nbook = Book("Clean Code", "Robert C. Martin")\nprint(book.describe())\n'+BT.repeat(3)+'\n\nفي المثال، '+BT+'Book'+BT+' هو القالب، و'+BT+'book'+BT+' نسخة فعلية منه.\n\n### أربع أفكار أساسية\n| المفهوم | معناه ببساطة | مثال |\n| --- | --- | --- |\n| التغليف Encapsulation | جمع البيانات والدوال في مكان واحد | بيانات الكتاب |\n| الوراثة Inheritance | إعادة استخدام خصائص كائن آخر | كتاب إلكتروني |\n| تعدد الأشكال Polymorphism | واجهة واحدة وتنفيذ مختلف | عرض أنواع الكتب |\n| التجريد Abstraction | إظهار المهم وإخفاء التفاصيل | استعارة كتاب |\n\n> جرّب بنفسك: أضف خاصية متاحة للاستعارة، ودالة تغيّر حالتها.\n\n1. ابدأ بكتابة القالب.\n2. أنشئ كتابين مختلفين.\n3. اطبع بيانات كل كتاب.\n\nتحب نحلّ تمرين صغير مع بعض؟';
const studyReply = 'خلّينا نحوّل المذاكرة لخطوات واضحة وسهلة.\n\n## خطة تناسب يومك\n- **٢٥ دقيقة تركيز:** اختار فكرة واحدة وافهمها كويس.\n- **٥ دقائق راحة:** ابعد عن الشاشة وارجع بنشاط.\n- **١٠ دقائق تطبيق:** حل سؤال من غير الرجوع للملاحظات.\n\n### من الفهم للتطبيق\nابدأ بكتابة أهم ٣ أفكار في المحاضرة بأسلوبك، وبعدها اربط كل فكرة بمثال عملي.\n\n| المرحلة | المهمة | المدة |\n| --- | --- | --- |\n| مراجعة | قراءة العناوين الرئيسية | ١٠ دقائق |\n| فهم | شرح فكرة بصوتك | ٢٥ دقيقة |\n| تطبيق | حل تمرين ومراجعته | ٢٠ دقيقة |\n\n> الفهم الحقيقي بيظهر لما تقدر تشرح المعلومة ببساطة لحد تاني.\n\nده محتوى توضيحي ثابت للتجربة. ابعت اسم المادة أو الجزء اللي عايز نشتغل عليه، وشوف شكل المحادثة.';
const initialChats = [
 {id:'sample-oop',title:'شرح البرمجة كائنية التوجه',group:'النهارده',messages:[{role:'user',text:'ممكن تشرحلي البرمجة كائنية التوجه بمثال بسيط في Python؟'},{role:'assistant',text:programmingReply}]},
 {id:'sample-project',title:'أفكار لمشروع التخرج',group:'النهارده',messages:[{role:'user',text:'عايز أفكار لمشروع تخرج يجمع بين الذكاء الاصطناعي والتعليم.'},{role:'assistant',text:'## فكرة تبدأ منها\nممكن تبني **مساعد لتنظيم التعلّم**: الطالب يضيف أهدافه الدراسية، والتطبيق يساعده ينظّم الوقت ويراجع تقدّمه.\n\n1. لوحة للمواد والمهام.\n2. بطاقات مراجعة للمفاهيم.\n3. تقارير تقدّم أسبوعية.\n\n> ابدأ بنسخة صغيرة تحل مشكلة واحدة كويس، وبعدها وسّعها.\n\nده مثال تجريبي، مش اقتراح مولّد من خدمة ذكاء اصطناعي مباشرة.'}]},
 {id:'sample-summary',title:'تلخيص محاضرة قواعد البيانات',group:'الأمس',messages:[{role:'user',text:'لخّصلي أهم مبادئ قواعد البيانات العلائقية.'},{role:'assistant',text:'## قواعد البيانات العلائقية\nالبيانات بتتنظّم في **جداول** مترابطة بمفاتيح.\n\n- **Primary Key:** معرّف فريد لكل صف.\n- **Foreign Key:** رابط بين جدولين.\n- **Normalization:** تنظيم يقلّل تكرار البيانات.\n\n'+BT.repeat(3)+'sql\nSELECT students.name, courses.title\nFROM students\nJOIN enrollments ON students.id = enrollments.student_id\nJOIN courses ON courses.id = enrollments.course_id;\n'+BT.repeat(3)+'\n\n> اختبر نفسك: إيه الفرق بين المفتاح الأساسي والمفتاح الأجنبي؟'}]},
 {id:'sample-plan',title:'خطة مذاكرة الأسبوع',group:'الأمس',messages:[{role:'user',text:'ساعدني أنظّم مذاكرتي الأسبوع ده.'},{role:'assistant',text:studyReply}]},
 {id:'sample-networks',title:'مراجعة أساسيات الشبكات',group:'آخر ٧ أيام',messages:[{role:'user',text:'إيه الفرق بين TCP و UDP؟'},{role:'assistant',text:'## الفرق الأساسي\n**TCP** يهتم بترتيب ووصول البيانات، و**UDP** يركّز على الإرسال السريع بدون ضمان تسليم.\n\n| البروتوكول | الاستخدام | السمة |\n| --- | --- | --- |\n| TCP | صفحات الويب ونقل الملفات | موثوق ومرتّب |\n| UDP | البث والمكالمات والألعاب | سريع وخفيف |\n\nالاختيار بيتحدد حسب احتياج التطبيق. ده مثال توضيحي للتصميم.'}]}
];
let chats = Array.isArray(saved.chats) ? saved.chats : initialChats;
// A page reload cancels the visual stream; leave a recoverable retry state.
chats.forEach(chat=>chat.messages.forEach(message=>{
 if(message.loading){message.loading=false;message.error=true;}
 if(message.streaming){message.streaming=false;message.text+='\n\n[توقّف العرض عند إعادة تحميل الصفحة.]';}
}));
let drafts = saved.drafts || {};
let activeChat = null;
let route = 'chat';
let theme = saved.theme === 'dark' ? 'dark' : 'light';
let mode = 'مساعد الدراسة';
let pending = null;
let errorNext = false;
let attachment = null;
let adminTab = 'overview';
let announcementFilter = 'all';
let searchQuery = '';
let toastTimer;
let popoverAnchor;
let lastModalFocus;
let readIds = new Set(saved.readIds || []);
let students = saved.students || [
 {id:1,name:'بدر أحمد',email:'badr.ahmed@thebes.edu.eg',faculty:'تكنولوجيا المعلومات',active:true},
 {id:2,name:'مريم محمد',email:'mariam@thebes.edu.eg',faculty:'تكنولوجيا المعلومات',active:true},
 {id:3,name:'عمر خالد',email:'omar@thebes.edu.eg',faculty:'تكنولوجيا الميكاترونكس',active:false},
 {id:4,name:'نور علي',email:'nour@thebes.edu.eg',faculty:'تكنولوجيا المعلومات',active:true},
 {id:5,name:'يوسف محمود',email:'youssef@thebes.edu.eg',faculty:'تكنولوجيا الطاقة',active:true}
];
let announcements = saved.announcements || [
 {id:1,title:'خطوتك الجاية تبدأ من هنا: معرض مشروعات التخرج',date:'٢٤ أكتوبر ٢٠٢٦',category:'event',priority:'فعالية',text:'فكرتك تستحق إنها تتشاف. شارك مشروعك في معرض الابتكار الجامعي، وقابل خبراء الصناعة وزملاءك من مختلف التخصصات.',detail:'المكان: مبنى الأنشطة، القاعة الرئيسية. الموعد التجريبي: الأحد ١ نوفمبر، من الساعة ١٠ صباحًا حتى ٣ عصرًا. التسجيل من خلال مكتب شؤون الطلاب. جميع المواعيد بيانات عرض تجريبية.'},
 {id:2,title:'جدول امتحانات منتصف الفصل الدراسي',date:'٢٣ أكتوبر ٢٠٢٦',category:'important',priority:'مهم',text:'الجدول التجريبي لامتحانات منتصف الفصل متاح الآن. راجع مواعيد المواد وجهّز خطة مذاكرتك مبكرًا.',detail:'تبدأ الفترة التجريبية يوم ٨ نوفمبر. يرجى مراجعة كود المادة ورقم اللجنة مع شؤون الطلاب. هذا الإعلان للعرض فقط ولا يُعد جدولًا رسميًا.'},
 {id:3,title:'ورشة عمل: أول خطوة في عالم الذكاء الاصطناعي',date:'٢٢ أكتوبر ٢٠٢٦',category:'event',priority:'ورشة عمل',text:'انضم لورشة تفاعلية تتعرّف فيها على أساسيات الذكاء الاصطناعي وتطبيقاته في مشروعاتك الجامعية. لا تحتاج خبرة سابقة.',detail:'المدة: ساعتان. المكان التجريبي: معمل الحاسب ٣. المحتوى: مبادئ التعلّم الآلي، أمثلة عملية، وأسئلة مفتوحة. تفاصيل تعليمية افتراضية للنموذج.'}
];
const providerDefaults = [
 {id:'gemini',name:'Gemini',letter:'G',subtitle:'Google · المسار الأساسي',active:true,usage:64,latency:340,health:'healthy'},
 {id:'groq',name:'Groq',letter:'g',subtitle:'مسار احتياطي سريع',active:true,usage:38,latency:180,health:'healthy'},
 {id:'cerebras',name:'Cerebras',letter:'C',subtitle:'مسار احتياطي',active:true,usage:21,latency:210,health:'healthy'},
 {id:'openrouter',name:'OpenRouter',letter:'O',subtitle:'بوابة نماذج متعددة',active:false,usage:0,latency:0,health:'healthy'},
 ...[
  ['openai','OpenAI','O',52,410],['anthropic','Anthropic','A',87,530],['mistral','Mistral','M',29,290],
  ['cohere','Cohere','C',18,420],['together','Together AI','T',46,320],['fireworks','Fireworks','F',61,260],
  ['deepseek','DeepSeek','D',42,390],['huggingface','Hugging Face','H',91,610],['sambanova','SambaNova','S',24,230],
  ['nvidia','NVIDIA NIM','N',37,280],['perplexity','Perplexity','P',33,460],['xai','xAI','x',58,370],
  ['ai21','AI21','A',14,450],['cloudflare','Cloudflare AI','C',26,240],['replicate','Replicate','R',0,0],
  ['novita','Novita','N',0,0],['siliconflow','SiliconFlow','S',0,0],['githubmodels','GitHub Models','G',0,0]
 ].map((p,index)=>({id:p[0],name:p[1],letter:p[2],subtitle:'مسار احتياطي',active:index<14,usage:p[3],latency:p[4],health:index===1||index===7?'limited':'healthy'}))
];
const savedProviders = Array.isArray(saved.providers) ? saved.providers : [];
// Extend earlier four-provider demos without overwriting the user's saved switches.
let providers = providerDefaults.map(p=>({...p,...savedProviders.find(s=>s.id===p.id)}));
providers.push(...savedProviders.filter(p=>!providerDefaults.some(d=>d.id===p.id)));
let providerQuery = '';
let providerFilter = 'all';
function save() {
 try { localStorage.setItem('taiba-original-refined-v1',JSON.stringify({theme,name:profile.name,chats,drafts,readIds:[...readIds],students,announcements,providers})); }
 catch { toast('التخزين المحلي غير متاح؛ التغييرات متاحة خلال الجلسة فقط.'); }
}
function toast(message) { $('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3600); }
function announce(message) { $('#live-status').textContent=message; }
function currentChat() { return chats.find(c=>c.id===activeChat); }
function applyTheme(value) {
 theme=value;document.documentElement.dataset.theme=theme;
 $('#theme-toggle').innerHTML=icon(theme==='light'?'moon':'sun');
 $('#theme-toggle').setAttribute('aria-label',theme==='light'?'تفعيل المظهر الداكن':'تفعيل المظهر الفاتح');
 $('meta[name="theme-color"]').content=theme==='light'?'#f9f9f7':'#191b1e';save();
}
function renderHistory() {
 const list=chats.filter(c=>c.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
 let last='';
 $('#history-list').innerHTML=list.length?list.map(c=>{
  const heading=c.group!==last?'<div class="history-group">'+esc(c.group)+'</div>':'';
  last=c.group;
  return heading+'<div class="history-item '+(c.id===activeChat?'selected':'')+'"><button data-action="open-chat" data-id="'+esc(c.id)+'">'+icon('chat')+'<span>'+esc(c.title)+'</span></button><button class="history-delete" data-action="delete-chat" data-id="'+esc(c.id)+'" aria-label="حذف '+esc(c.title)+'">'+icon('trash')+'</button></div>';
 }).join(''):'<p class="history-empty">لا توجد محادثات مطابقة.</p>';
 $('#account-name').textContent=profile.name;
 $('.account-button .avatar').textContent=profile.name[0];
 $('#announcement-count').textContent=announcements.filter(a=>!readIds.has(a.id)).length;
}
function welcomeHTML() {
 const suggestions=[['book','اشرحلي درس','نفهمها ببساطة، خطوة بخطوة','sage','اشرحلي درس البرمجة كائنية التوجه بمثال بسيط.'],['pen','نحلّ الواجب سوا','نفكّر في الحل، مش بس الإجابة','sand','ساعدني أفهم إزاي أحل واجب البرمجة.'],['document','لخّصلي محاضرة','أهم الأفكار، في سطور واضحة','blue','عايز ألخّص محاضرة قواعد البيانات.'],['rocket','نطوّر فكرة مشروع','من أول فكرة لأول خطوة','','ساعدني بأفكار لمشروع التخرج في تكنولوجيا المعلومات.']];
 return '<section class="welcome" aria-labelledby="welcome-title"><div class="welcome-eyebrow">'+icon('graduation')+'رفيقك الجامعي، بطموحك</div><div class="hero-symbol">'+icon('spark')+'<span class="orbit">'+icon('spark')+'</span></div><p class="hello">هاي يا '+esc(profile.name.split(' ')[0])+' <span class="greeting-wave" aria-hidden="true">👋</span></p><h1 id="welcome-title">إزاي أقدر <span>أساعدك</span> النهارده؟</h1><p class="welcome-description">رفيقك في الفهم، وتنظيم الأفكار، وكل خطوة في رحلتك الجامعية.</p><div class="suggestion-grid">'+suggestions.map(s=>'<button class="suggestion-card" data-action="suggest" data-prompt="'+esc(s[4])+'"><span class="suggestion-icon '+s[3]+'">'+icon(s[0])+'</span><span class="suggestion-arrow">'+icon('arrow-up-left')+'</span><strong>'+s[1]+'</strong><small>'+s[2]+'</small></button>').join('')+'</div><div class="welcome-bottom">'+icon('shield')+'مساحتك الخاصة للتعلّم، على مهلك.</div></section>';
}
/* Escaped, deliberately small Markdown renderer. Raw HTML/links never execute. */
function inline(text) {
 return esc(text).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\x60([^\x60]+)\x60/g,'<code dir="ltr">$1</code>');
}
function markdown(text) {
 const blocks=text.split(BT.repeat(3));
 return blocks.map((block,index)=>{
  if(index%2) {
   const lines=block.split('\n');const language=lines.shift()||'text';
   return '<div class="code-container"><div class="code-header"><span>'+esc(language)+'</span><button data-action="copy-code">'+icon('copy')+'نسخ الكود</button></div><pre tabindex="0"><code>'+esc(lines.join('\n').trim())+'</code></pre></div>';
  }
  const lines=block.split('\n');let result='',list=null;
  const closeList=()=>{if(list){result+='</'+list+'>';list=null;}};
  for(let i=0;i<lines.length;i++){
   const line=lines[i].trim();
   if(!line){closeList();continue;}
   if(line.startsWith('|')&&lines[i+1]?.match(/^\s*\|[\s:|-]+\|\s*$/)){
    closeList();const cells=s=>s.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
    result+='<div class="table-scroll" tabindex="0" role="region" aria-label="جدول قابل للتمرير"><table><thead><tr>'+cells(line).map(c=>'<th scope="col">'+inline(c)+'</th>').join('')+'</tr></thead><tbody>';
    i+=2;for(;i<lines.length&&lines[i].trim().startsWith('|');i++)result+='<tr>'+cells(lines[i]).map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>';
    i--;result+='</tbody></table></div>';continue;
   }
   const heading=line.match(/^(#{1,3})\s+(.*)/);
   if(heading){closeList();const tag=heading[1].length<3?'h2':'h3';result+='<'+tag+'>'+inline(heading[2])+'</'+tag+'>';continue;}
   if(line.startsWith('> ')){closeList();result+='<blockquote>'+inline(line.slice(2))+'</blockquote>';continue;}
   const item=line.match(/^(- |\d+\. )(.*)/);
   if(item){const type=item[1]==='- '?'ul':'ol';if(list!==type){closeList();list=type;result+='<'+type+'>';}result+='<li>'+inline(item[2])+'</li>';continue;}
   closeList();result+='<p>'+inline(line)+'</p>';
  }
  closeList();return result;
 }).join('');
}
function messageHTML(message,index) {
 if(message.role==='user')return '<article class="message user" data-message="'+index+'" aria-label="رسالتك"><div class="user-bubble" dir="auto">'+esc(message.text)+'</div></article>';
 const label='<div class="ai-label"><span class="small-mark">'+icon('spark')+'</span>طيبة AI<span class="demo-tag">رد تجريبي</span></div>';
 if(message.error)return '<article class="message assistant" data-message="'+index+'">'+label+'<div class="error-card">'+icon('alert')+'<div>تعذّر عرض الرد التجريبي. رسالتك محفوظة، جرّب تاني.<button data-action="retry" data-index="'+index+'">إعادة المحاولة</button></div></div></article>';
 if(message.loading)return '<article class="message assistant" data-message="'+index+'">'+label+'<div class="typing-indicator" aria-label="جاري تجهيز الرد التجريبي"><i></i><i></i><i></i></div></article>';
 return '<article class="message assistant" data-message="'+index+'">'+label+'<div class="markdown '+(message.streaming?'stream-cursor':'')+'" dir="auto">'+markdown(message.text)+'</div>'+(message.streaming?'':'<div class="message-actions"><button class="icon-button" data-action="copy-response" data-index="'+index+'" aria-label="نسخ الرد">'+icon('copy')+'</button><button class="icon-button '+(message.liked?'selected':'')+'" data-action="like-response" data-index="'+index+'" aria-label="رد مفيد" aria-pressed="'+!!message.liked+'">'+icon('like')+'</button><button class="icon-button" data-action="retry" data-index="'+index+'" aria-label="إعادة عرض الرد التجريبي">'+icon('retry')+'</button></div>')+'</article>';
}
function renderChat(scroll=false) {
 const c=currentChat();
 $('#main-content').innerHTML=c?'<section class="conversation" aria-label="المحادثة"><div class="conversation-date">مساحة للتعلّم، سؤال ورا سؤال</div><div class="demo-chat-notice">'+icon('info')+'محادثة توضيحية · الردود التالية محتوى تجريبي ثابت</div>'+c.messages.map(messageHTML).join('')+'</section>':welcomeHTML();
 $('#page-title').textContent=c?c.title:'محادثة جديدة';
 if(scroll)scrollBottom();
}
function scrollBottom() { const main=$('#main-content');requestAnimationFrame(()=>{main.scrollTop=main.scrollHeight;}); }
function nearMessageBottom(){const main=$('#main-content');return route==='chat'&&!!currentChat()&&main.scrollHeight-main.scrollTop-main.clientHeight<90;}
function preserveReading(change){
 const main=$('#main-content'),id=activeChat,wasPinned=nearMessageBottom(),top=main.scrollTop;
 change();
 if(route==='chat'&&id)requestAnimationFrame(()=>{
  if(route==='chat'&&activeChat===id)main.scrollTop=wasPinned?main.scrollHeight:top;
 });
}
function syncInputDirection(){const el=$('#message-input'),direction=el.value?'auto':document.documentElement.dir;if(el.dir!==direction)el.dir=direction;}
function setDraft() { $('#message-input').value=drafts[activeChat||'new']||'';syncInputDirection();resizeComposer();updateSend(); }
function resizeComposer(){
 const el=$('#message-input');
 syncInputDirection();
 preserveReading(()=>{el.style.height='auto';el.style.height=Math.min(el.scrollHeight,matchMedia('(max-width:600px)').matches?120:144)+'px';});
}
/* Patch only the changing assistant, preserving previous messages and reader position. */
function patchAssistant(index){
 if(route!=='chat')return;
 const main=$('#main-content'),msg=currentChat()?.messages[index];
 let article=main.querySelector('[data-message="'+index+'"]');
 if(!article||!msg)return;
 const wasPinned=nearMessageBottom(),top=main.scrollTop;
 const internal=$$('.code-container pre,.table-scroll',article).map(el=>({left:el.scrollLeft,top:el.scrollTop}));
 if(article.querySelector('.markdown')&&!msg.loading&&!msg.error){
  const content=article.querySelector('.markdown');
  content.innerHTML=markdown(msg.text);
  content.classList.toggle('stream-cursor',!!msg.streaming);
  if(!msg.streaming&&!article.querySelector('.message-actions')){
   const template=document.createElement('template');template.innerHTML=messageHTML(msg,index);
   const controls=template.content.querySelector('.message-actions');if(controls)article.append(controls);
  }
 }else{
  const template=document.createElement('template');template.innerHTML=messageHTML(msg,index);
  article.replaceWith(template.content);article=main.querySelector('[data-message="'+index+'"]');
 }
 $$('.code-container pre,.table-scroll',article).forEach((el,i)=>{if(internal[i]){el.scrollLeft=internal[i].left;el.scrollTop=internal[i].top;}});
 if(wasPinned)scrollBottom();else main.scrollTop=top;
}
function updateSend(){const busy=pending?.chatId===activeChat;$('#send-button').disabled=!busy&&!$('#message-input').value.trim();$('#send-button').innerHTML=icon(busy?'stop':'arrow-up');$('#send-button').setAttribute('aria-label',busy?'إيقاف الرد التجريبي':'إرسال الرسالة');}
function newChat(){activeChat=null;attachment=null;renderAttachment();navigate('chat');setDraft();renderHistory();}
function navigate(next) {
 closePopover();closeSidebar();route=next;
 if(location.hash!=='#'+next)history.replaceState(null,'','#'+next);
 $('.workspace').classList.toggle('no-composer',next!=='chat');
 $$('.main-nav a').forEach(a=>a.classList.toggle('active',a.dataset.nav===next));
 $('#main-content').scrollTop=0;
 if(next==='chat'){renderChat();setDraft();}
 else if(next==='profile')renderProfile();
 else if(next==='announcements')renderAnnouncements();
 else if(next==='admin')renderAdmin();
 else if(next==='login')renderLogin();
 else if(next==='password')renderPassword();
 renderHistory();
}
function closeSidebar(){$('#app-shell').classList.remove('drawer-open');$('#sidebar').removeAttribute('role');$('#sidebar').removeAttribute('aria-modal');$('.workspace').inert=false;syncSidebarAccessibility();}
function openSidebar(){closePopover();$('#app-shell').classList.add('drawer-open');$('#sidebar').inert=false;$('#sidebar').setAttribute('role','dialog');$('#sidebar').setAttribute('aria-modal','true');$('.workspace').inert=true;$('.sidebar .mobile-only').focus({preventScroll:true});}
function syncSidebarAccessibility(){$('#sidebar').inert=matchMedia('(max-width:900px)').matches&&!$('#app-shell').classList.contains('drawer-open');}
function renderAttachment(){$('#attachment-preview').innerHTML=attachment?'<div class="attachment-chip">'+icon('document')+'<span>'+esc(attachment.name)+' · محلي فقط</span><button class="icon-button" data-action="remove-attachment" aria-label="إزالة المرفق">'+icon('close')+'</button></div>':'';}
function selectResponse(text){
 if(document.documentElement.lang==='en'&&!/[\u0600-\u06ff]/.test(text))return '## A little structure goes a long way\nLet’s break this into manageable steps.\n\n1. **Choose one goal.** Write down what you want to understand.\n2. **Work through an example.** Connect the idea to something familiar.\n3. **Check your understanding.** Try explaining it in your own words.\n\n| Step | Activity | Time |\n| --- | --- | --- |\n| Review | Read your notes | 10 minutes |\n| Focus | Explore one concept | 25 minutes |\n| Practice | Try an exercise | 15 minutes |\n\n> This is a fixed demonstration, not a live AI response.\n\nWhat would you like to explore next?';
 return /برمج|كود|python|oop/i.test(text)?programmingReply:studyReply;
}
function sendMessage() {
 if(pending?.chatId===activeChat){stopStream();return;}
 const input=$('#message-input');const text=input.value.trim();if(!text)return;
 if(pending){toast('يوجد رد تجريبي قيد العرض في محادثة أخرى. أوقفه أولًا أو انتظر اكتماله.');return;}
 if(!currentChat()){const id='chat-'+Date.now();chats.unshift({id,title:text.slice(0,34),group:'النهارده',messages:[]});activeChat=id;delete drafts.new;}
 const c=currentChat();c.messages.push({role:'user',text:text+(attachment?'\n\n[ملف محلي: '+attachment.name+']':'')});
 c.messages.push({role:'assistant',text:'',loading:true});
 drafts[activeChat]='';input.value='';syncInputDirection();attachment=null;renderAttachment();resizeComposer();
 const nextError=errorNext;errorNext=false;
 pending={chatId:c.id,index:c.messages.length-1,timer:null};
 save();renderHistory();renderChat(true);updateSend();announce('تم إرسال الرسالة. يجري عرض رد تجريبي.');
 startResponse(c,selectResponse(text),nextError);
}
function startResponse(chat,reply,fail=false){
 pending.timer=setTimeout(()=>{
  if(!pending)return;
  const msg=chat.messages[pending.index];
  if(fail){Object.assign(msg,{loading:false,error:true});const index=pending.index;pending=null;save();if(route==='chat'&&activeChat===chat.id)patchAssistant(index);updateSend();announce('تعذّر الرد التجريبي. يمكنك إعادة المحاولة.');return;}
  msg.loading=false;msg.streaming=true;const words=reply.split(' ');let position=0;
  const tick=()=>{
   if(!pending)return;
   position=Math.min(position+7,words.length);msg.text=words.slice(0,position).join(' ');
   const index=pending.index;
   if(position===words.length){msg.streaming=false;pending=null;save();announce('اكتمل الرد التجريبي.');}
   if(route==='chat'&&activeChat===chat.id)patchAssistant(index);
   updateSend();if(pending)pending.timer=setTimeout(tick,45);
  };tick();
 },650);
}
function stopStream(){if(!pending)return;clearTimeout(pending.timer);const index=pending.index,c=chats.find(c=>c.id===pending.chatId);const msg=c?.messages[index];if(msg){msg.loading=false;msg.streaming=false;msg.text=msg.text||'تم إيقاف عرض الرد التجريبي.';}pending=null;save();if(route==='chat'&&activeChat===c?.id)patchAssistant(index);updateSend();announce('تم إيقاف عرض الرد.');}
function retry(index){if(pending){toast('انتظر اكتمال الرد الحالي أو أوقفه.');return;}const c=currentChat();if(!c)return;const msg=c.messages[index];Object.assign(msg,{text:'',error:false,loading:true});pending={chatId:c.id,index,timer:null};patchAssistant(index);updateSend();startResponse(c,selectResponse(c.messages[index-1]?.text||''));}
/* Account screens -------------------------------------------------------- */
function pageHeader(eyebrow,title,description,action=''){
 return '<div class="page-eyebrow">'+icon('spark')+eyebrow+'</div><div class="page-heading"><div><h1>'+title+'</h1><p>'+description+'</p></div>'+action+'</div>';
}
function field(label,id,type,value='',hint='',required=true){
 return '<div class="form-field"><label for="'+id+'">'+label+'</label><div class="'+(type==='password'?'input-wrap':'')+'"><input id="'+id+'" name="'+id+'" type="'+type+'" value="'+esc(value)+'" '+(required?'required ':'')+(type==='email'?'dir="ltr" autocomplete="username"':type==='password'?'autocomplete="'+(id.includes('new')||id.includes('confirm')?'new-password':'current-password')+'"': 'autocomplete="off"')+' aria-describedby="'+id+'-hint '+id+'-error">'+(type==='password'?'<button type="button" class="icon-button" data-action="show-password" data-target="'+id+'" aria-label="إظهار كلمة المرور">'+icon('eye')+'</button>':'')+'</div><small id="'+id+'-hint">'+hint+'</small><span class="field-error" id="'+id+'-error"></span></div>';
}
function renderProfile(){
 $('#page-title').textContent='حسابي';
 $('#main-content').innerHTML='<div class="page">'+pageHeader('مساحتك، بطريقتك','أهلًا بيك في مساحتك','تفاصيلك وتفضيلاتك، كلها في مكان واحد.')+
 '<section class="panel"><div class="profile-header"><span class="avatar large">'+esc(profile.name[0])+'</span><div><h2>'+esc(profile.name)+'</h2><p dir="ltr">'+esc(profile.email)+'</p></div></div><div class="info-grid">'+[['الرقم الجامعي',profile.id],['البرنامج الدراسي',profile.faculty],['السنة الدراسية',profile.year],['حالة الحساب','حساب تجريبي نشط']].map(x=>'<div class="info-item"><small>'+x[0]+'</small><strong>'+x[1]+'</strong></div>').join('')+'</div></section>'+
 '<section class="panel"><h2>تفاصيلك الشخصية</h2><p class="panel-description">غيّر اسم العرض في التجربة. بريد الجامعة للعرض فقط.</p><form id="profile-form" style="margin-top:20px"><div class="form-grid">'+field('اسم العرض','profile-name','text',profile.name,'يظهر في التحية والمحادثات.')+field('بريد الجامعة','profile-email','email',profile.email,'البريد في هذا النموذج غير قابل للتعديل.')+'</div><button class="primary-button" type="submit">حفظ التغييرات</button></form></section>'+
 '<section class="panel"><h2>على ذوقك</h2><p class="panel-description">اختار المظهر اللي يريحك في المذاكرة.</p><div class="theme-options"><button class="theme-option '+(theme==='light'?'selected':'')+'" data-action="set-theme" data-theme-value="light" aria-pressed="'+(theme==='light')+'">'+icon('sun')+'فاتح</button><button class="theme-option '+(theme==='dark'?'selected':'')+'" data-action="set-theme" data-theme-value="dark" aria-pressed="'+(theme==='dark')+'">'+icon('moon')+'داكن</button></div></section>'+
 '<section class="panel"><h2>الأمان واللغة</h2><div class="profile-actions"><p>حقول كلمات المرور منفصلة عن مساحة المحادثة.<br>العربية والإنجليزية متاحتان، اختار اللغة اللي تريحك.</p><a class="secondary-button" href="#password">'+icon('lock')+'تغيير كلمة المرور</a></div><div class="profile-actions"><button class="secondary-button" data-action="english-preview">العربية / English</button><button class="text-button" data-action="logout">العودة لشاشة الدخول التجريبية</button></div></section></div>';
 $('#profile-email').readOnly=true;
}
function brandHTML(){return '<div class="brand"><span class="brand-mark">'+icon('spark')+'</span><span>طيبة <b dir="ltr">AI</b><small>TAIBA · YOUR CAMPUS COMPANION</small></span></div>';}
function authFrame(content){return '<div class="auth-page"><section class="auth-story">'+brandHTML()+'<h1>طموحك كبير.<br>وخُطوتك الجاية <span>أقرب.</span></h1><p>رفيق يفهم أسئلتك، ينظّم أفكارك، ويخلّي رحلتك الجامعية أبسط.</p><div class="auth-story-note"><span class="suggestion-icon">'+icon('graduation')+'</span><p>صُمّم لطلاب جامعة طيبة التكنولوجية.<br>مساحة للتعلّم، والاستكشاف، والبدايات الجديدة.</p></div></section>'+content+'</div>';}
function renderLogin(){
 $('#page-title').textContent='تسجيل الدخول';
 $('#main-content').innerHTML=authFrame('<section class="auth-form"><div class="page-eyebrow">'+icon('leaf')+'بداية جديدة، وأفكار أكتر</div><h2>أهلًا بعودتك.</h2><p>ادخل مساحتك الجامعية، وكمّل من مكان ما وقفت.</p><div class="demo-credentials"><b>تجربة واجهة فقط، بدون تسجيل دخول حقيقي.</b><br>استخدم بيانات العرض التالية فقط؛ لا تدخل بياناتك الحقيقية.<code>badr.ahmed@thebes.edu.eg</code><code>TaibaDemo2026!</code></div><form id="login-form" novalidate>'+field('البريد الجامعي','login-email','email','badr.ahmed@thebes.edu.eg')+field('كلمة المرور التجريبية','login-password','password','')+'<div id="login-feedback" class="form-feedback" role="alert" tabindex="-1"></div><button type="submit" class="primary-button" id="login-submit">الدخول إلى التجربة '+icon('arrow-up-left')+'</button><div class="auth-form-footer"><button type="button" class="text-button" data-action="first-password">أول مرة هنا؟ تعرّف على تغيير كلمة المرور</button></div></form></section>');
}
function renderPassword(){
 $('#page-title').textContent='تغيير كلمة المرور';
 $('#main-content').innerHTML=authFrame('<section class="auth-form"><div class="page-eyebrow">'+icon('shield')+'خطوة لخصوصيتك</div><h2>بداية آمنة لحسابك.</h2><p>واجهة تغيير كلمة المرور لأول استخدام. التحقق محلي فقط، ولا يتم حفظ أو إرسال كلمات المرور.</p><form id="password-form" novalidate>'+field('كلمة المرور المؤقتة التجريبية','temporary-password','password','','استخدم TaibaDemo2026! للتجربة.')+field('كلمة المرور الجديدة التجريبية','new-password','password','','١٢ حرفًا على الأقل. استخدم قيمة وهمية فقط.')+field('تأكيد كلمة المرور الجديدة','confirm-password','password')+'<div id="password-feedback" class="form-feedback" role="alert" tabindex="-1"></div><button class="primary-button" type="submit">تأكيد التغيير التجريبي '+icon('check')+'</button><div class="auth-form-footer"><a class="text-button" href="#profile">العودة للحساب</a></div></form></section>');
}
/* University news -------------------------------------------------------- */
function renderAnnouncements(){
 $('#page-title').textContent='إعلانات الجامعة';
 const list=announcements.filter(a=>announcementFilter==='all'||(announcementFilter==='unread'?!readIds.has(a.id):a.category==='important'));
 $('#main-content').innerHTML='<div class="page">'+pageHeader('دايمًا في الصورة','حياة جامعية، وأخبار تهمّك.','آخر الإعلانات والفعاليات في جامعتك. جميع المحتويات تجريبية.')+
 '<div class="filter-tabs" aria-label="تصفية الإعلانات">'+[['all','كل الإعلانات'],['unread','غير المقروءة'],['important','المهمة']].map(x=>'<button data-action="filter-announcements" data-filter="'+x[0]+'" class="'+(announcementFilter===x[0]?'active':'')+'" aria-pressed="'+(announcementFilter===x[0])+'">'+x[1]+'</button>').join('')+'</div>'+
 (list.length?list.map(a=>'<article class="announcement-card"><span class="announcement-icon">'+icon(a.category==='important'?'calendar':'megaphone')+'</span><div class="announcement-content"><div class="announcement-meta"><span class="status '+(a.category==='important'?'warning':'neutral')+'">'+esc(a.priority)+'</span><time>'+esc(a.date)+'</time><span>شؤون الطلاب</span></div><h2>'+esc(a.title)+'</h2><p>'+esc(a.text)+'</p><div id="announcement-detail-'+a.id+'" hidden class="announcement-detail"><p>'+esc(a.detail)+'</p></div><button class="text-button" data-action="read-announcement" data-id="'+a.id+'" aria-expanded="false" aria-controls="announcement-detail-'+a.id+'">التفاصيل '+icon('arrow-up-left')+'</button>'+(readIds.has(a.id)?'<div class="announcement-read">'+icon('check')+'تمت القراءة</div>':'')+'</div></article>').join(''):'<div class="empty-state">'+icon('check')+'<h2>أنت على اطّلاع بكل جديد.</h2><p>مفيش إعلانات جديدة هنا حاليًا.</p></div>')+'</div>';
}
/* Management dashboard --------------------------------------------------- */
function renderAdmin(){
 $('#page-title').textContent='لوحة الإدارة';
 const tabs=[['overview','grid','نظرة عامة'],['students','users','الطلاب'],['announcements','megaphone','الإعلانات'],['providers','server','مزودو الذكاء الاصطناعي']];
 $('#main-content').innerHTML='<div class="page">'+pageHeader('إدارة أذكى، تجربة أفضل','كل التفاصيل، في نظرة.','نموذج إدارة ببيانات محلية فقط. الصلاحيات والأرقام لا تمثّل نظامًا فعليًا.','<span class="status neutral">'+icon('shield')+'وضع العرض</span>')+'<nav class="admin-tabs" aria-label="أقسام الإدارة">'+tabs.map(t=>'<button data-action="admin-tab" data-tab="'+t[0]+'" class="'+(adminTab===t[0]?'active':'')+'" aria-pressed="'+(adminTab===t[0])+'">'+icon(t[1])+t[2]+'</button>').join('')+'</nav><div id="admin-content"></div></div>';
 if(adminTab==='overview')renderOverview();
 if(adminTab==='students')renderStudents();
 if(adminTab==='announcements')renderAnnouncementAdmin();
 if(adminTab==='providers')renderProviders();
}
function renderOverview(){
 const stats=[['إجمالي الطلاب','1,284','users','+١٢٪','عن الشهر السابق'],['محادثات هذا الشهر','8,942','chat','+٢٤٪','فرص أكتر للتعلّم'],['المزودون المتاحون',providers.filter(p=>p.active).length+' / '+providers.length,'server','عرض تجريبي','حتى ٢٢ مزودًا عند الربط']];
 $('#admin-content').innerHTML='<div class="stats-grid">'+stats.map(s=>'<div class="stat-card"><div class="stat-title">'+s[0]+icon(s[2])+'</div><strong class="stat-number" dir="ltr">'+s[1]+'</strong><span class="stat-foot"><b>'+s[3]+'</b>'+s[4]+'</span></div>').join('')+'</div><div class="dashboard-grid"><section class="panel"><div class="panel-heading"><div><h2>مساحة أكبر للتعلّم</h2><p class="panel-description">نشاط المحادثات · آخر ٧ أيام · بيانات تجريبية</p></div><span class="status neutral">هذا الأسبوع</span></div><div class="chart" role="img" aria-label="المحادثات التجريبية خلال الأسبوع: السبت ٨٠، الأحد ١٢٠، الاثنين ١٠٠، الثلاثاء ١٥٠، الأربعاء ١٣٠، الخميس ١٨٠، الجمعة ١٦٠">'+[45,65,55,82,71,95,86].map((h,i)=>'<div class="chart-column"><span class="chart-bar" style="height:'+h+'%"></span><small>'+['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'][i]+'</small></div>').join('')+'</div></section><section class="panel"><h2>آخر النشاطات</h2>'+[['انضمام ١٨ طالبًا جديدًا','منذ ١٢ دقيقة · حسابات تجريبية'],['نشر إعلان معرض المشروعات','منذ ساعة · شؤون الطلاب'],['فحص حالة المزودين','منذ ساعتين · كل المسارات جاهزة']].map(a=>'<div class="activity-item"><span class="activity-dot"></span><div><strong>'+a[0]+'</strong><p>'+a[1]+'</p></div></div>').join('')+'</section></div><div class="notice">'+icon('info')+'الأرقام أعلاه بيانات توضيحية ثابتة. تبويبات الطلاب والإعلانات والمزودين تتيح تجربة التعديلات محليًا، بدون الاتصال بأي خدمة.</div>';
}
function renderStudents(){
 $('#admin-content').innerHTML='<div class="data-toolbar"><label class="sr-only" for="student-search">البحث عن طالب بالاسم أو البريد</label><input type="search" id="student-search" placeholder="ابحث بالاسم أو البريد..." autocomplete="off"><button class="primary-button" data-action="add-student">'+icon('plus')+'إضافة طالب</button></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th scope="col">الطالب</th><th scope="col">البرنامج الدراسي</th><th scope="col">الحالة</th><th scope="col">الإجراءات</th></tr></thead><tbody id="student-rows"></tbody></table></div><div class="notice">'+icon('shield')+'كل الحسابات هنا بيانات عرض. إضافة الطلاب أو تعطيلهم لا تنشئ حسابات فعلية.</div>';
 renderStudentRows('');
}
function renderStudentRows(query){
 const list=students.filter(s=>(s.name+' '+s.email).toLowerCase().includes(query.toLowerCase()));
 $('#student-rows').innerHTML=list.length?list.map(s=>'<tr><td><div class="student-cell"><span class="avatar">'+esc(s.name[0])+'</span><div>'+esc(s.name)+'<small dir="ltr">'+esc(s.email)+'</small></div></div></td><td>'+esc(s.faculty)+'</td><td><span class="status '+(s.active?'':'neutral')+'"><i class="status-dot"></i>'+(s.active?'نشط':'غير نشط')+'</span></td><td><div class="row-actions"><button class="icon-button" data-action="toggle-student" data-id="'+s.id+'" aria-label="'+(s.active?'تعطيل':'تفعيل')+' '+esc(s.name)+'" title="'+(s.active?'تعطيل':'تفعيل')+'">'+icon(s.active?'lock':'check')+'</button><button class="icon-button" data-action="reset-student" data-id="'+s.id+'" aria-label="إعادة تعيين كلمة مرور '+esc(s.name)+'" title="إعادة تعيين كلمة المرور">'+icon('key')+'</button></div></td></tr>').join(''):'<tr><td colspan="4">لا توجد نتائج مطابقة.</td></tr>';
}
function renderProviders(){
 $('#admin-content').innerHTML='<div class="panel-heading"><div><h2 class="section-title" style="margin:0">مسارات ذكية، تجربة مستمرة.</h2><p class="panel-description"><span>تبديل احتياطي تلقائي عند التكامل لاحقًا</span> · <span dir="ltr">'+providers.length+'</span> <span>مزودًا تجريبيًا</span></p></div><button class="secondary-button" data-action="check-providers">'+icon('retry')+'فحص تجريبي</button></div><div class="provider-toolbar"><label class="provider-search-field" for="provider-search">'+icon('search')+'<span class="sr-only">البحث عن مزود ذكاء اصطناعي</span><input type="search" id="provider-search" placeholder="ابحث عن مزود..." value="'+esc(providerQuery)+'" autocomplete="off"></label><label for="provider-filter" class="sr-only">تصفية حالة المزودين</label><select id="provider-filter"><option value="all" '+(providerFilter==='all'?'selected':'')+'>كل المزودين</option><option value="active" '+(providerFilter==='active'?'selected':'')+'>المفعّلون</option><option value="paused" '+(providerFilter==='paused'?'selected':'')+'>المتوقفون</option><option value="limited" '+(providerFilter==='limited'?'selected':'')+'>صحة محدودة</option></select><span class="provider-results" id="provider-results" role="status" aria-live="polite" aria-atomic="true"></span></div><div class="provider-grid" id="provider-cards"></div><div class="notice">'+icon('shield')+'لا توجد مفاتيح API أو طلبات شبكية. مؤشرات الصحة والحصص توضيحية. لا تدخل أي بيانات اعتماد حقيقية.</div>';
 renderProviderCards();
}
function renderProviderCards(){
 const list=providers.filter(p=>(p.name+' '+p.subtitle).toLowerCase().includes(providerQuery.trim().toLowerCase())&&(providerFilter==='all'||(providerFilter==='active'&&p.active)||(providerFilter==='paused'&&!p.active)||(providerFilter==='limited'&&p.active&&p.health==='limited')));
 $('#provider-results').innerHTML='<span>النتائج:</span> <span dir="ltr">'+list.length+' / '+providers.length+'</span>';
 $('#provider-cards').innerHTML=list.length?list.map(p=>'<article class="provider-card"><div class="provider-head"><span class="provider-logo">'+esc(p.letter)+'</span><div class="provider-name"><strong>'+esc(p.name)+'</strong><small>'+esc(p.subtitle)+'</small></div><span class="status '+(!p.active?'neutral':p.health==='limited'?'warning':'')+'"><i class="status-dot"></i>'+(p.active?(p.health==='limited'?'محدود':'متاح'):'متوقف')+'</span></div><div class="provider-meta"><span>استهلاك الحصة التجريبي</span><span dir="ltr">'+p.usage+' / 100%</span></div><div class="usage-track" role="meter" aria-label="استهلاك '+esc(p.name)+'" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+p.usage+'"><span style="width:'+p.usage+'%"></span></div><div class="provider-meta"><span>زمن الاستجابة الافتراضي</span><span dir="ltr">'+(p.latency?p.latency+' ms':'—')+'</span></div><div class="provider-meta"><span>حالة مفتاح API</span><span>غير مطلوب · محاكاة محلية</span></div><div class="provider-foot"><span>تفعيل في النموذج</span><button role="switch" class="toggle" aria-checked="'+p.active+'" aria-label="تفعيل '+esc(p.name)+'" data-action="toggle-provider" data-id="'+esc(p.id)+'"></button></div></article>').join(''):'<div class="empty-state"><h3>لا توجد نتائج مطابقة.</h3><p>جرّب اسمًا أو حالة أخرى.</p></div>';
}
function renderAnnouncementAdmin(){
 $('#admin-content').innerHTML='<div class="panel-heading"><div><h2>صوت الجامعة، يوصل لكل طالب.</h2><p class="panel-description">إنشاء وإدارة إعلانات محلية للتجربة.</p></div><button class="primary-button" data-action="add-announcement">'+icon('plus')+'إعلان جديد</button></div>'+announcements.map(a=>'<article class="panel"><div class="panel-heading"><span class="status neutral">'+esc(a.priority)+'</span><div class="row-actions"><button class="icon-button" data-action="edit-announcement" data-id="'+a.id+'" aria-label="تعديل '+esc(a.title)+'">'+icon('edit')+'</button><button class="icon-button" data-action="delete-announcement" data-id="'+a.id+'" aria-label="حذف '+esc(a.title)+'">'+icon('trash')+'</button></div></div><h2>'+esc(a.title)+'</h2><p class="panel-description">'+esc(a.text)+'</p><small style="color:var(--muted)">'+esc(a.date)+' · منشور محليًا</small></article>').join('');
}
/* Accessible overlays and all actions ------------------------------------ */
function showModal(title,description,body){
 closePopover();lastModalFocus=document.activeElement;
 $('#modal-content').innerHTML='<div class="modal-heading"><h2 id="modal-title">'+title+'</h2><button class="icon-button" data-action="close-modal" aria-label="إغلاق النافذة">'+icon('close')+'</button></div><p class="modal-description">'+description+'</p>'+body;
 $('#modal').showModal();
}
function closeModal(){$('#modal').close();if(lastModalFocus?.isConnected)lastModalFocus.focus({preventScroll:true});}
function openPopover(anchor,html){
 const isSame=popoverAnchor===anchor&&$('#popover-root').children.length;
 closePopover();if(isSame)return;
 popoverAnchor=anchor;anchor.setAttribute('aria-expanded','true');
 $('#popover-root').innerHTML='<div class="popover" role="group" aria-label="خيارات">'+html+'</div>';
 const r=anchor.getBoundingClientRect(),p=$('.popover');
 p.style.right=Math.max(12,Math.min(innerWidth-r.right,innerWidth-p.offsetWidth-12))+'px';
 const vv=window.visualViewport,visibleTop=vv&&vv.scale===1?vv.offsetTop:0,visibleBottom=visibleTop+(vv&&vv.scale===1?vv.height:innerHeight);
 p.style.top=(r.bottom+p.offsetHeight+12<visibleBottom?r.bottom+8:Math.max(visibleTop+10,r.top-p.offsetHeight-8))+'px';
 $('button,a',p)?.focus({preventScroll:true});
}
function closePopover(returnFocus=false){
 if(popoverAnchor){popoverAnchor.setAttribute('aria-expanded','false');if(returnFocus&&popoverAnchor.isConnected)popoverAnchor.focus({preventScroll:true});}
 $('#popover-root').innerHTML='';popoverAnchor=null;
}
function addStudentModal(){
 showModal('طالب جديد، بداية جديدة.','بيانات وهمية فقط. لن يتم إنشاء حساب أو إرسال بريد.', '<form id="student-form" novalidate>'+field('اسم الطالب','student-name','text')+field('البريد التجريبي','student-email','email')+'<div class="form-field"><label for="student-faculty">البرنامج الدراسي</label><select id="student-faculty"><option>تكنولوجيا المعلومات</option><option>تكنولوجيا الميكاترونكس</option><option>تكنولوجيا الطاقة</option></select></div><div class="form-feedback" id="student-feedback" role="alert"></div><div class="form-actions"><button class="primary-button" type="submit">إضافة إلى النموذج</button><button class="secondary-button" type="button" data-action="close-modal">إلغاء</button></div></form>');
}
function announcementModal(id){
 const a=announcements.find(a=>a.id===id);
 showModal(a?'تعديل الإعلان':'خبر يستحق المشاركة.','يُحفظ الإعلان في هذا المتصفح فقط.','<form id="announcement-form" data-id="'+(a?.id||'')+'" novalidate>'+field('عنوان الإعلان','announcement-title','text',a?.title||'')+'<div class="form-field"><label for="announcement-body">نص الإعلان</label><textarea id="announcement-body" required>'+esc(a?.text||'')+'</textarea></div><div class="form-field"><label for="announcement-priority">نوع الإعلان</label><select id="announcement-priority"><option value="event" '+(a?.category==='event'?'selected':'')+'>فعالية</option><option value="important" '+(a?.category==='important'?'selected':'')+'>مهم</option></select></div><div class="form-feedback" id="announcement-feedback" role="alert"></div><div class="form-actions"><button class="primary-button" type="submit">حفظ الإعلان محليًا</button><button class="secondary-button" type="button" data-action="close-modal">إلغاء</button></div></form>');
}
async function copyText(text){try{await navigator.clipboard.writeText(text);toast('تم النسخ.');}catch{toast('تعذّر النسخ التلقائي؛ يمكنك تحديد النص ونسخه يدويًا.');}}
const actions={
 'open-sidebar':openSidebar,'close-sidebar':closeSidebar,'new-chat':newChat,
 'toggle-language':()=>window.taibaLanguage?.toggle(),
 'toggle-theme':()=>{applyTheme(theme==='light'?'dark':'light');if(route==='profile')renderProfile();},
 'set-theme':el=>{applyTheme(el.dataset.themeValue);renderProfile();},
 'notifications':()=>navigate('announcements'),
 'suggest':el=>{
  const englishPrompts=['Explain object-oriented programming with a simple example.','Help me work through a programming assignment.','Help me summarize a database lecture.','Explore graduation project ideas for information technology.'];
  const prompt=document.documentElement.lang==='en'?englishPrompts[$$('.suggestion-card').indexOf(el)]:el.dataset.prompt;
  $('#message-input').value=prompt;drafts[activeChat||'new']=prompt;resizeComposer();updateSend();$('#message-input').focus({preventScroll:true});save();
 },
 'open-chat':el=>{activeChat=el.dataset.id;attachment=null;renderAttachment();navigate('chat');},
 'delete-chat':el=>{
  const id=el.dataset.id;if(pending?.chatId===id){toast('أوقف الرد التجريبي قبل حذف المحادثة.');return;}
  showModal('حذف المحادثة؟','سيتم حذفها من هذا المتصفح فقط. لا يمكن التراجع عن الحذف.','<div class="form-actions"><button class="danger-button" data-action="confirm-delete-chat" data-id="'+esc(id)+'">حذف المحادثة</button><button class="secondary-button" data-action="close-modal">احتفاظ بالمحادثة</button></div>');
 },
 'confirm-delete-chat':el=>{const id=el.dataset.id;chats=chats.filter(c=>c.id!==id);delete drafts[id];if(activeChat===id)activeChat=null;save();closeModal();renderHistory();if(route==='chat'){renderChat();setDraft();}toast('تم حذف المحادثة.');},
 'account-menu':el=>openPopover(el,'<div class="popover-label">مساحتك الشخصية</div><a href="#profile">'+icon('user')+'حسابي وتفضيلاتي</a><a href="#admin">'+icon('grid')+'لوحة الإدارة التجريبية</a><hr><button data-action="logout">'+icon('logout')+'شاشة الدخول التجريبية</button>'),
 'mode-menu':el=>openPopover(el,'<div class="popover-label">اختار أسلوب التجربة</div>'+['مساعد الدراسة','تفكير إبداعي','مساعد البرمجة'].map(m=>'<button data-action="select-mode" data-mode="'+m+'" class="'+(mode===m?'selected':'')+'">'+icon(m==='مساعد البرمجة'?'document':m==='تفكير إبداعي'?'rocket':'book')+m+'</button>').join('')+'<hr><button data-action="simulate-error">'+icon('alert')+'جرّب خطأ في الرد القادم</button>'),
 'select-mode':el=>{mode=el.dataset.mode;$('#mode-label').textContent=mode;closePopover(true);toast('تم تغيير أسلوب العرض إلى '+mode+'؛ الردود تظل تجريبية.');},
 'simulate-error':()=>{errorNext=true;closePopover(true);toast('الرسالة القادمة ستعرض حالة خطأ تجريبية قابلة لإعادة المحاولة.');},
 'attach':()=>$('#file-input').click(),
 'remove-attachment':()=>{attachment=null;renderAttachment();},
 'copy-code':el=>copyText(el.closest('.code-container').querySelector('code').textContent),
 'copy-response':el=>copyText(currentChat()?.messages[+el.dataset.index]?.text||''),
 'like-response':el=>{const message=currentChat()?.messages[+el.dataset.index];if(message){message.liked=!message.liked;el.setAttribute('aria-pressed',message.liked);save();toast(message.liked?'تم حفظ رأيك محليًا.':'تم إلغاء التقييم.');}},
 'retry':el=>retry(+el.dataset.index),
 'close-modal':closeModal,
 'show-password':el=>{const input=document.getElementById(el.dataset.target);const visible=input.type==='password';input.type=visible?'text':'password';el.innerHTML=icon(visible?'eye-off':'eye');el.setAttribute('aria-label',visible?'إخفاء كلمة المرور':'إظهار كلمة المرور');},
 'first-password':()=>navigate('password'),'logout':()=>{stopStream();navigate('login');},
 'filter-announcements':el=>{announcementFilter=el.dataset.filter;renderAnnouncements();},
 'read-announcement':el=>{const detail=document.getElementById('announcement-detail-'+el.dataset.id);detail.hidden=!detail.hidden;el.setAttribute('aria-expanded',!detail.hidden);el.innerHTML=(detail.hidden?'التفاصيل':'إخفاء التفاصيل')+' '+icon('arrow-up-left');if(!detail.hidden){readIds.add(+el.dataset.id);save();renderHistory();if(!el.parentElement.querySelector('.announcement-read'))el.insertAdjacentHTML('afterend','<div class="announcement-read">'+icon('check')+'تمت القراءة</div>');}},
 'admin-tab':el=>{adminTab=el.dataset.tab;renderAdmin();},
 'add-student':addStudentModal,
 'toggle-student':el=>{const s=students.find(s=>s.id===+el.dataset.id);s.active=!s.active;save();renderStudentRows($('#student-search').value);toast(s.active?'تم تفعيل الطالب محليًا.':'تم تعطيل الطالب محليًا.');},
 'reset-student':el=>{const s=students.find(s=>s.id===+el.dataset.id);showModal('إعادة تعيين كلمة المرور','حساب '+esc(s.name)+' · محاكاة واجهة فقط، لا تُرسل رسائل بريد.','<div class="notice">'+icon('key')+'ستظهر في النظام الحقيقي رسالة إعادة تعيين للبريد الجامعي. النموذج لا ينشئ كلمة مرور ولا يغيّر أي حساب.</div><button class="primary-button" data-action="confirm-reset">تأكيد المحاكاة</button>');},
 'confirm-reset':()=>{closeModal();toast('نجحت محاكاة إعادة التعيين. لم يُرسل أي بريد.');},
 'toggle-provider':el=>{const p=providers.find(p=>p.id===el.dataset.id);p.active=!p.active;save();renderProviders();toast('تم تحديث حالة المزود محليًا فقط.');},
 'check-providers':el=>{el.disabled=true;el.textContent='جارٍ عرض الفحص...';setTimeout(()=>{if(route==='admin'&&adminTab==='providers')renderProviders();toast('اكتمل الفحص التوضيحي؛ لم يتم الاتصال بالمزودين.');},800);},
 'add-announcement':()=>announcementModal(),
 'edit-announcement':el=>announcementModal(+el.dataset.id),
 'delete-announcement':el=>showModal('حذف الإعلان؟','سيختفي من لوحة الإدارة ومن موجز الإعلانات المحلي.','<div class="form-actions"><button class="danger-button" data-action="confirm-delete-announcement" data-id="'+el.dataset.id+'">حذف الإعلان</button><button class="secondary-button" data-action="close-modal">إلغاء</button></div>'),
 'confirm-delete-announcement':el=>{announcements=announcements.filter(a=>a.id!==+el.dataset.id);save();closeModal();renderAnnouncementAdmin();renderHistory();toast('تم حذف الإعلان محليًا.');},
 'about':()=>showModal('طيبة AI، مساحة لأفكارك.','نموذج تصميم مستقل لجامعة طيبة التكنولوجية.','<div class="modal-body"><p>واجهة عربية تساعدك تتخيّل تجربة تعلّم أبسط: محادثات، ملخصات، أفكار، وأخبار جامعتك.</p><p>كل الردود والحسابات والإعلانات هنا تجريبية. لا توجد خدمات ذكاء اصطناعي أو مصادقة أو قاعدة بيانات متصلة.</p><p>اختصارات: Ctrl / ⌘ + K لمحادثة جديدة، / للبحث، Shift + Enter لسطر جديد، وEsc لإغلاق القوائم.</p><p>صُمّم بـ HTML وCSS وJavaScript، مع إمكانية ربطه بالخدمات الحقيقية لاحقًا.</p></div><button class="primary-button" data-action="close-modal">نبدأ بفكرة</button>'),
 'english-preview':()=>{
  window.taibaLanguage?.toggle();
 },
 'english-chat':()=>{
  closeModal();stopStream();const id='english-'+Date.now();chats.unshift({id,title:'Your study companion · English',group:'النهارده',messages:[{role:'user',text:'Help me plan a productive study session.'},{role:'assistant',text:'## Make room for a good idea\nStart small. Choose one topic you want to understand today.\n\n1. **Focus for 25 minutes.** Read actively and take short notes.\n2. **Take a 5-minute break.** Step away from your screen.\n3. **Test your understanding.** Explain the idea in your own words.\n\n> Progress comes from understanding, not just memorizing.\n\nThis is a fixed demo response, not a live AI answer.'}]});activeChat=id;save();navigate('chat');
 }
};
document.addEventListener('click',event=>{
 const action=event.target.closest('[data-action]');
 if(action){event.preventDefault();actions[action.dataset.action]?.(action);return;}
 const link=event.target.closest('a[href^="#"]');
 if(link&&link.hash!=='#main-content'){event.preventDefault();navigate(link.hash.slice(1));return;}
 if(!event.target.closest('.popover'))closePopover();
});
$('#drawer-scrim').addEventListener('click',()=>{closeSidebar();$('[data-action="open-sidebar"]').focus({preventScroll:true});});
$('#modal').addEventListener('click',e=>{if(e.target===$('#modal')){const r=$('#modal').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();}});
$('#modal').addEventListener('cancel',e=>{e.preventDefault();closeModal();});
document.addEventListener('keydown',event=>{
 const typing=event.target.matches('input,textarea,select,[contenteditable]');
 if(event.key==='Escape'){if($('#modal').open)return;if($('#app-shell').classList.contains('drawer-open')){closeSidebar();$('[data-action="open-sidebar"]').focus({preventScroll:true});}else closePopover(true);}
 if($('#modal').open)return;
 if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();newChat();$('#message-input').focus({preventScroll:true});}
 if(event.key==='/'&&!typing){event.preventDefault();if(matchMedia('(max-width:900px)').matches)openSidebar();$('#chat-search').focus({preventScroll:true});}
 if(event.key==='Tab'&&$('#app-shell').classList.contains('drawer-open')){const nodes=$$('button,a,input', $('#sidebar')).filter(n=>!n.disabled&&n.offsetParent);const first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
});
$('#chat-search').addEventListener('input',e=>{searchQuery=e.target.value;renderHistory();});
document.addEventListener('input',e=>{
 if(e.target.id==='student-search')renderStudentRows(e.target.value);
 if(e.target.id==='provider-search'){providerQuery=e.target.value;renderProviderCards();}
});
document.addEventListener('change',e=>{
 if(e.target.id==='provider-filter'){providerFilter=e.target.value;renderProviderCards();}
});
$('#message-input').addEventListener('input',()=>{drafts[activeChat||'new']=$('#message-input').value;syncInputDirection();resizeComposer();updateSend();save();});
$('#message-input').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();if(pending?.chatId===activeChat){toast('يمكنك مواصلة الكتابة. انتظر اكتمال الرد لإرسال رسالة أخرى.');return;}sendMessage();}});
$('#composer-form').addEventListener('submit',e=>{e.preventDefault();sendMessage();});
/* Do not transfer focus from the textarea on pointer send; mobile keyboards stay open. */
$('#send-button').addEventListener('pointerdown',e=>{if(document.activeElement===$('#message-input'))e.preventDefault();});
$('#file-input').addEventListener('change',e=>{
 const file=e.target.files[0];if(!file)return;
 if(file.size>1024*1024){toast('اختر ملفًا نصيًا أصغر من ١ ميجابايت.');e.target.value='';return;}
 if(!/\.(txt|md|csv)$/i.test(file.name)){toast('الصيغ المدعومة: TXT وMD وCSV.');e.target.value='';return;}
 attachment={name:file.name};renderAttachment();toast('تم إرفاق اسم الملف محليًا للعرض فقط. لن يتم رفعه أو تحليل محتواه.');e.target.value='';
});
function setFeedback(id,message,success=false){const el=document.getElementById(id);el.textContent=message;el.className='form-feedback '+(success?'success':'error');if(!success)el.focus({preventScroll:true});}
function invalidate(id,message){const el=document.getElementById(id);el.setAttribute('aria-invalid',!!message);document.getElementById(id+'-error').textContent=message;}
document.addEventListener('submit',async e=>{
 const form=e.target;if(form.id==='composer-form')return;e.preventDefault();
 if(form.id==='profile-form'){const name=$('#profile-name').value.trim();if(name.length<2||name.length>60){invalidate('profile-name','اكتب اسمًا من حرفين إلى ٦٠ حرفًا.');$('#profile-name').focus();return;}profile.name=name;save();renderProfile();renderHistory();toast('تم حفظ اسم العرض.');}
 if(form.id==='login-form'){
  const email=$('#login-email').value.trim(),password=$('#login-password').value;
  invalidate('login-email',email===profile.email?'':'استخدم بريد العرض: '+profile.email);
  invalidate('login-password',password==='TaibaDemo2026!'?'':'استخدم كلمة العرض: TaibaDemo2026!');
  if(email!==profile.email||password!=='TaibaDemo2026!'){setFeedback('login-feedback','بيانات العرض غير مطابقة. لا تستخدم أي بيانات حقيقية.');return;}
  const button=$('#login-submit');button.disabled=true;button.textContent='جارٍ فتح التجربة...';button.setAttribute('aria-busy','true');
  await new Promise(r=>setTimeout(r,700));
  form.reset();navigate('chat');toast('أهلًا بيك! أنت في تجربة الواجهة، بدون مصادقة فعلية.');
 }
 if(form.id==='password-form'){
  const temporary=$('#temporary-password').value,next=$('#new-password').value,confirm=$('#confirm-password').value;
  const errors=[temporary!=='TaibaDemo2026!'?'استخدم كلمة المرور المؤقتة التجريبية TaibaDemo2026!':'',next.length<12?'كلمة المرور لازم تكون ١٢ حرفًا على الأقل.':next===temporary?'اختار كلمة مختلفة عن المؤقتة.':'',confirm!==next||!confirm?'تأكيد كلمة المرور غير مطابق.':''];
  ['temporary-password','new-password','confirm-password'].forEach((id,i)=>invalidate(id,errors[i]));
  if(errors.some(Boolean)){setFeedback('password-feedback','راجع الحقول الموضّحة قبل المتابعة.');return;}
  form.reset();setFeedback('password-feedback','نجح التحقق التجريبي. لم تُحفظ أو تُرسل كلمة المرور، وبيانات الدخول التجريبية لم تتغيّر.',true);toast('اكتمل التحقق التجريبي بنجاح.');
 }
 if(form.id==='student-form'){
  const name=$('#student-name').value.trim(),email=$('#student-email').value.trim();
  if(name.length<2||!$('#student-email').validity.valid||!email){setFeedback('student-feedback','اكتب اسمًا من حرفين على الأقل وبريدًا صالح الصيغة.');return;}
  if(students.some(s=>s.email.toLowerCase()===email.toLowerCase())){setFeedback('student-feedback','البريد موجود بالفعل في النموذج.');return;}
  students.push({id:Date.now(),name,email,faculty:$('#student-faculty').value,active:true});save();closeModal();renderStudents();toast('تمت إضافة الطالب محليًا.');
 }
 if(form.id==='announcement-form'){
  const title=$('#announcement-title').value.trim(),text=$('#announcement-body').value.trim();
  if(title.length<4||text.length<10){setFeedback('announcement-feedback','العنوان ٤ أحرف على الأقل، والنص ١٠ أحرف على الأقل.');return;}
  const category=$('#announcement-priority').value;
  const data={title,text,category,priority:category==='important'?'مهم':'فعالية',detail:text,date:new Intl.DateTimeFormat('ar-EG',{day:'numeric',month:'long',year:'numeric',timeZone:'Africa/Cairo'}).format(new Date())};
  if(form.dataset.id)Object.assign(announcements.find(a=>a.id===+form.dataset.id),data);
  else announcements.unshift({id:Date.now(),...data});
  save();closeModal();renderAnnouncementAdmin();renderHistory();toast('تم حفظ الإعلان محليًا.');
 }
});
/* One sizing authority: native dvh, with a single coalesced overlay/pan bridge.
   Android resizes-content normally needs zero CSS overrides. No focus/blur here. */
let viewportFrame=0,lastViewportHeight='',lastViewportTop='';
function syncViewport(){
 const vv=window.visualViewport;
 if(vv&&vv.scale!==1)return; // Preserve native pinch zoom.
 const narrow=matchMedia('(max-width:900px)').matches;
 const overlay=narrow&&vv&&(vv.height<document.documentElement.clientHeight-2||vv.offsetTop>1);
 const height=overlay?Math.round(vv.height)+'px':'';
 const top=overlay?Math.max(0,Math.round(vv.offsetTop))+'px':'';
 if(height!==lastViewportHeight||top!==lastViewportTop){
  preserveReading(()=>{
   const root=document.documentElement.style;
   if(height)root.setProperty('--app-height',height);else root.removeProperty('--app-height');
   if(top)root.setProperty('--app-top',top);else root.removeProperty('--app-top');
   lastViewportHeight=height;lastViewportTop=top;
  });
 }
 if(!narrow&&$('#app-shell').classList.contains('drawer-open'))closeSidebar();
 syncSidebarAccessibility();
}
function scheduleViewport(){
 if(viewportFrame)return;
 viewportFrame=requestAnimationFrame(()=>{viewportFrame=0;syncViewport();});
}
window.visualViewport?.addEventListener('resize',scheduleViewport,{passive:true});
window.visualViewport?.addEventListener('scroll',scheduleViewport,{passive:true});
window.addEventListener('resize',scheduleViewport,{passive:true});
document.addEventListener('taiba:language',()=>{syncInputDirection();scheduleViewport();});
window.addEventListener('hashchange',()=>navigate(location.hash.slice(1)||'chat'));
hydrateIcons();applyTheme(theme);syncViewport();syncSidebarAccessibility();
const initialRoute=location.hash.slice(1);
navigate(['chat','profile','announcements','admin','login','password'].includes(initialRoute)?initialRoute:'chat');
