/* UI-only bilingual adapter. User-authored messages and records stay untouched. */
'use strict';
(() => {
 const dictionary={
 'انتقل إلى المحتوى':'Skip to content','القائمة الرئيسية':'Main navigation','إغلاق القائمة':'Close navigation',
 'تبديل احتياطي تلقائي عند التكامل لاحقًا':'Automatic fallback on future integration','مزودًا تجريبيًا':'sample providers',
 'البحث عن مزود ذكاء اصطناعي':'Search AI providers','ابحث عن مزود...':'Search providers…','تصفية حالة المزودين':'Filter provider status',
 'كل المزودين':'All providers','المفعّلون':'Enabled','المتوقفون':'Paused','صحة محدودة':'Limited health','محدود':'Limited',
 'النتائج:':'Results:','جرّب اسمًا أو حالة أخرى.':'Try another name or status.',
 'محادثة جديدة':'New conversation','ابحث في محادثاتك...':'Search conversations…','ابحث في محادثاتك':'Search conversations',
 'مساحات العمل':'Workspaces','مساحتك الذكية':'Your workspace','إعلانات الجامعة':'Campus news','محادثاتك الأخيرة':'Recent conversations',
 'النهارده':'Today','الأمس':'Yesterday','آخر ٧ أيام':'Previous 7 days','خطوة صغيرة، فكرة كبيرة.':'Small steps. Big ideas.',
 'مساحتك للتعلّم، كل يوم.':'A little learning, every day.','لوحة الإدارة التجريبية':'Demo admin dashboard',
 'طالب · تكنولوجيا المعلومات':'Student · Information technology','نسخة تجريبية':'Demo preview','طيبة 2.0':'Taiba 2.0',
 'فتح القائمة':'Open navigation','تفعيل المظهر الداكن':'Switch to dark theme','تفعيل المظهر الفاتح':'Switch to light theme',
 'إعلانات الجامعة، ثلاثة إعلانات جديدة':'Campus announcements','رسالتك إلى طيبة':'Your message to Taiba',
 'اسأل، فكّر، واستكشف مع طيبة...':'Ask, think, and explore with Taiba…','إرفاق ملف نصي':'Attach a text file',
 'مساعد الدراسة':'Study companion','تفكير إبداعي':'Creative thinking','مساعد البرمجة':'Coding companion',
 'Enter للإرسال':'Enter to send','إرسال الرسالة':'Send message','إيقاف الرد التجريبي':'Stop demo response',
 'طيبة رفيقك في التعلّم، وفكرك هو الأساس.':'Taiba supports your learning. Your thinking comes first.',
 'الردود تجريبية وليست من ذكاء اصطناعي مباشر.':'Responses are demo content, not live AI.',
 'صُنع لرحلتك الجامعية':'Made for your university journey','جامعة طيبة التكنولوجية':'Thebes Technological University',
 'عن طيبة':'About Taiba','رفيقك الجامعي، بطموحك':'Your campus companion. Your ambition.',
 'كل فكرة كبيرة، تبدأ':'Every big idea starts with','بسؤال.':'a question.',
 'نفهم الصعب، نرتّب الأفكار، ونكتشف أكتر.':'Understand the complex. Organize your thoughts. Explore more.',
 'إزاي أقدر أساعدك النهارده؟':'How can I help you today?',
 'إزاي أقدر':'How can I', 'أساعدك':'help you', 'النهارده؟':'today?',
 'رفيقك في الفهم، وتنظيم الأفكار، وكل خطوة في رحلتك الجامعية.':'Here to help you understand, organize your thoughts, and move forward.',
 'اشرحلي درس':'Explain a lesson','نفهمها ببساطة، خطوة بخطوة':'Make it simple, step by step',
 'نحلّ الواجب سوا':'Work on an assignment','نفكّر في الحل، مش بس الإجابة':'Understand the how, not just the answer',
 'لخّصلي محاضرة':'Summarize a lecture','أهم الأفكار، في سطور واضحة':'The big ideas, in a few clear lines',
 'نطوّر فكرة مشروع':'Explore a project idea','من أول فكرة لأول خطوة':'From the first idea to the first step',
 'مساحتك الخاصة للتعلّم، على مهلك.':'Your own space to learn, at your own pace.',
 'مساحة للتعلّم، سؤال ورا سؤال':'A space to learn, one question at a time',
 'محادثة توضيحية · الردود التالية محتوى تجريبي ثابت':'Demo conversation · the following responses are fixed sample content',
 'رد تجريبي':'Demo response','طيبة AI':'Taiba AI','رسالتك':'Your message','نسخ الكود':'Copy code','نسخ الرد':'Copy response',
 'رد مفيد':'Helpful response','إعادة عرض الرد التجريبي':'Replay demo response','إعادة المحاولة':'Try again',
 'تعذّر عرض الرد التجريبي. رسالتك محفوظة، جرّب تاني.':'The demo response could not load. Your message is saved. Please try again.',
 'تم النسخ.':'Copied.','تم حفظ رأيك محليًا.':'Your feedback was saved locally.','تم إلغاء التقييم.':'Feedback removed.',
 'مساحتك الشخصية':'Your personal space','حسابي وتفضيلاتي':'Profile & preferences','شاشة الدخول التجريبية':'Demo sign-in screen',
 'اختار أسلوب التجربة':'Choose a demo style','جرّب خطأ في الرد القادم':'Simulate an error in the next response',
 'مساحتك، بطريقتك':'Your space, your way','أهلًا بيك في مساحتك':'Make yourself at home.',
 'تفاصيلك وتفضيلاتك، كلها في مكان واحد.':'Your details and preferences, all in one place.',
 'حسابي':'My profile','الرقم الجامعي':'Student ID','البرنامج الدراسي':'Study program','السنة الدراسية':'Academic year',
 'حالة الحساب':'Account status','حساب تجريبي نشط':'Active demo account','تكنولوجيا المعلومات':'Information technology',
 'تكنولوجيا الميكاترونكس':'Mechatronics technology','تكنولوجيا الطاقة':'Energy technology','الفرقة الثالثة':'Third year',
 'تفاصيلك الشخصية':'Personal details','غيّر اسم العرض في التجربة. بريد الجامعة للعرض فقط.':'Update your demo display name. The university email is read-only.',
 'اسم العرض':'Display name','يظهر في التحية والمحادثات.':'Shown in your welcome and conversations.',
 'بريد الجامعة':'University email','البريد في هذا النموذج غير قابل للتعديل.':'The demo email cannot be changed.',
 'حفظ التغييرات':'Save changes','تم حفظ اسم العرض.':'Display name saved.',
 'على ذوقك':'Make it yours','اختار المظهر اللي يريحك في المذاكرة.':'Choose the theme that helps you focus.',
 'فاتح':'Light','داكن':'Dark','الأمان واللغة':'Security & language',
 'العربية والإنجليزية متاحتان، اختار اللغة اللي تريحك.':'Arabic and English are available. Choose the language you prefer.',
 'حقول كلمات المرور منفصلة عن مساحة المحادثة.':'Password fields are kept separate from chat.',
 'اللغة الحالية: العربية · English preview متاح أدناه.':'Arabic and English are available. Switch language below.',
 'تغيير كلمة المرور':'Change password','English interface preview':'العربية / English',
 'العودة لشاشة الدخول التجريبية':'Return to demo sign-in','تسجيل الدخول':'Sign in',
 'بداية جديدة، وأفكار أكتر':'A fresh start. More possibilities.','أهلًا بعودتك.':'Welcome back.',
 'ادخل مساحتك الجامعية، وكمّل من مكان ما وقفت.':'Step into your campus workspace, and pick up where you left off.',
 'طموحك كبير.':'Big ambitions.','وخُطوتك الجاية':'Your next step is','أقرب.':'closer.',
 'رفيق يفهم أسئلتك، ينظّم أفكارك، ويخلّي رحلتك الجامعية أبسط.':'A companion to help you explore questions, organize ideas, and make university life simpler.',
 'صُمّم لطلاب جامعة طيبة التكنولوجية.':'Designed for students at Thebes Technological University.',
 'مساحة للتعلّم، والاستكشاف، والبدايات الجديدة.':'A space for learning, discovery, and new beginnings.',
 'تجربة واجهة فقط، بدون تسجيل دخول حقيقي.':'Interface demo only. No real authentication.',
 'استخدم بيانات العرض التالية فقط؛ لا تدخل بياناتك الحقيقية.':'Use only the sample credentials below. Do not enter real credentials.',
 'البريد الجامعي':'University email','كلمة المرور التجريبية':'Demo password','الدخول إلى التجربة':'Enter demo',
 'أول مرة هنا؟ تعرّف على تغيير كلمة المرور':'First time here? Explore password setup',
 'إظهار كلمة المرور':'Show password','إخفاء كلمة المرور':'Hide password',
 'جارٍ فتح التجربة...':'Opening your demo…','خطوة لخصوصيتك':'A step for your privacy',
 'بداية آمنة لحسابك.':'A secure start for your account.',
 'واجهة تغيير كلمة المرور لأول استخدام. التحقق محلي فقط، ولا يتم حفظ أو إرسال كلمات المرور.':'First-time password setup. Validation is local only. Passwords are never saved or sent.',
 'كلمة المرور المؤقتة التجريبية':'Temporary demo password','استخدم TaibaDemo2026! للتجربة.':'Use TaibaDemo2026! for this demo.',
 'كلمة المرور الجديدة التجريبية':'New demo password','١٢ حرفًا على الأقل. استخدم قيمة وهمية فقط.':'At least 12 characters. Use a made-up value only.',
 'تأكيد كلمة المرور الجديدة':'Confirm new password','تأكيد التغيير التجريبي':'Confirm demo change','العودة للحساب':'Back to profile',
 'دايمًا في الصورة':'Stay in the loop','حياة جامعية، وأخبار تهمّك.':'Campus life. News that matters.',
 'آخر الإعلانات والفعاليات في جامعتك. جميع المحتويات تجريبية.':'The latest campus announcements and events. All content is sample data.',
 'كل الإعلانات':'All news','غير المقروءة':'Unread','المهمة':'Important','تصفية الإعلانات':'Filter announcements',
 'شؤون الطلاب':'Student affairs','فعالية':'Event','مهم':'Important','ورشة عمل':'Workshop',
 'التفاصيل':'Read more','إخفاء التفاصيل':'Show less','تمت القراءة':'Read',
 'أنت على اطّلاع بكل جديد.':'You’re all caught up.','مفيش إعلانات جديدة هنا حاليًا.':'No new announcements here right now.',
 'لوحة الإدارة':'Administration','إدارة أذكى، تجربة أفضل':'Smarter management. Better experiences.',
 'كل التفاصيل، في نظرة.':'The details, at a glance.','نموذج إدارة ببيانات محلية فقط. الصلاحيات والأرقام لا تمثّل نظامًا فعليًا.':'Local demo data only. Permissions and metrics do not represent a live system.',
 'وضع العرض':'Demo mode','نظرة عامة':'Overview','الطلاب':'Students','الإعلانات':'Announcements','مزودو الذكاء الاصطناعي':'AI providers',
 'إجمالي الطلاب':'Total students','محادثات هذا الشهر':'Conversations this month','المزودون المتاحون':'Available providers',
 'عن الشهر السابق':'vs. last month','فرص أكتر للتعلّم':'more learning moments','عرض تجريبي':'Sample data',
 'حتى ٢٢ مزودًا عند الربط':'Up to 22 when integrated','مساحة أكبر للتعلّم':'More room to learn',
 'نشاط المحادثات · آخر ٧ أيام · بيانات تجريبية':'Conversation activity · Last 7 days · Sample data','هذا الأسبوع':'This week',
 'السبت':'Sat','الأحد':'Sun','الاثنين':'Mon','الثلاثاء':'Tue','الأربعاء':'Wed','الخميس':'Thu','الجمعة':'Fri',
 'آخر النشاطات':'Recent activity','انضمام ١٨ طالبًا جديدًا':'18 new students joined','منذ ١٢ دقيقة · حسابات تجريبية':'12 minutes ago · Demo accounts',
 'نشر إعلان معرض المشروعات':'Project showcase announcement published','منذ ساعة · شؤون الطلاب':'1 hour ago · Student affairs',
 'فحص حالة المزودين':'Provider health checked','منذ ساعتين · كل المسارات جاهزة':'2 hours ago · Routes available',
 'ابحث بالاسم أو البريد...':'Search name or email…','إضافة طالب':'Add student','الطالب':'Student','الحالة':'Status','الإجراءات':'Actions',
 'نشط':'Active','غير نشط':'Inactive','لا توجد نتائج مطابقة.':'No matching results.',
 'كل الحسابات هنا بيانات عرض. إضافة الطلاب أو تعطيلهم لا تنشئ حسابات فعلية.':'These are sample accounts. Adding or disabling a student does not affect a real account.',
 'طالب جديد، بداية جديدة.':'A new student. A fresh start.','بيانات وهمية فقط. لن يتم إنشاء حساب أو إرسال بريد.':'Sample data only. No account is created and no email is sent.',
 'اسم الطالب':'Student name','البريد التجريبي':'Demo email','إضافة إلى النموذج':'Add to demo','إلغاء':'Cancel',
 'مسارات ذكية، تجربة مستمرة.':'Smart routing. A seamless experience.','تبديل احتياطي تلقائي عند التكامل لاحقًا · ٤ مزودين للعرض':'Automatic fallback on future integration · 4 sample providers',
 'فحص تجريبي':'Demo health check','جارٍ عرض الفحص...':'Running demo check…','متاح':'Available','متوقف':'Paused',
 'استهلاك الحصة التجريبي':'Sample quota usage','زمن الاستجابة الافتراضي':'Sample response time',
 'حالة مفتاح API':'API key status','غير مطلوب · محاكاة محلية':'Not needed · Local demo','تفعيل في النموذج':'Enabled in demo',
 'Google · المسار الأساسي':'Google · Primary route','مسار احتياطي سريع':'Fast fallback route','مسار احتياطي':'Fallback route',
 'بوابة نماذج متعددة':'Multi-model gateway',
 'لا توجد مفاتيح API أو طلبات شبكية. مؤشرات الصحة والحصص توضيحية. لا تدخل أي بيانات اعتماد حقيقية.':'No API keys or network requests. Health and quota indicators are sample data. Never enter real credentials.',
 'صوت الجامعة، يوصل لكل طالب.':'Campus news, for every student.','إنشاء وإدارة إعلانات محلية للتجربة.':'Create and manage local demo announcements.',
 'إعلان جديد':'New announcement','منشور محليًا':'Published locally','تعديل الإعلان':'Edit announcement','خبر يستحق المشاركة.':'News worth sharing.',
 'يُحفظ الإعلان في هذا المتصفح فقط.':'Saved in this browser only.','عنوان الإعلان':'Announcement title','نص الإعلان':'Announcement body',
 'نوع الإعلان':'Announcement type','حفظ الإعلان محليًا':'Save locally','حذف الإعلان؟':'Delete this announcement?',
 'سيختفي من لوحة الإدارة ومن موجز الإعلانات المحلي.':'It will be removed from the local dashboard and news feed.',
 'حذف الإعلان':'Delete announcement','حذف المحادثة؟':'Delete this conversation?','حذف المحادثة':'Delete conversation',
 'سيتم حذفها من هذا المتصفح فقط. لا يمكن التراجع عن الحذف.':'It will be removed from this browser only. This cannot be undone.',
 'احتفاظ بالمحادثة':'Keep conversation','إغلاق النافذة':'Close dialog','محلي فقط':'Local only',
 'الردود التالية محتوى تجريبي ثابت':'These responses are fixed demo content',
 };
 let language='ar';
 try { language=localStorage.getItem('taiba-original-refined-language')==='en'?'en':'ar'; }catch{}
 const originals=new WeakMap(),attributeOriginals=new WeakMap();
 function translate(value){
  const trimmed=value.trim();let translated=dictionary[trimmed];
  if(!translated&&/^هاي يا .+$/.test(trimmed))translated='Hi, '+trimmed.slice(7).trim()+'.';
  if(!translated&&/^أهلًا يا .+،$/.test(trimmed))translated='Hi, '+trimmed.slice(9,-1)+'.';
  if(!translated&&/^تفعيل (Gemini|Groq|Cerebras|OpenRouter)$/.test(trimmed))translated='Enable '+trimmed.slice(6);
  if(!translated)return value;
  return value.replace(trimmed,translated);
 }
 const observer=new MutationObserver(update);
 function observe(){observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label']});}
 function update(){
  observer.disconnect();
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
   if(node.parentElement.closest('script,style,.markdown,.user-bubble,.history-item,code,pre'))continue;
   if(!originals.has(node))originals.set(node,node.nodeValue);
   const original=originals.get(node);
   const next=language==='en'?translate(original):original;
   if(node.nodeValue!==next)node.nodeValue=next;
  }
  document.querySelectorAll('[placeholder],[aria-label]').forEach(el=>{
   let original=attributeOriginals.get(el);
   if(!original){original={};attributeOriginals.set(el,original);}
   ['placeholder','aria-label'].forEach(attr=>{if(el.hasAttribute(attr)){const current=el.getAttribute(attr);if(!original[attr]||current!==translate(original[attr]))original[attr]=current;const next=language==='en'?translate(original[attr]):original[attr];if(current!==next)el.setAttribute(attr,next);}});
  });
  observe();
 }
 function apply(){
  document.documentElement.lang=language;
  document.documentElement.dir=language==='en'?'ltr':'rtl';
  document.querySelector('#language-toggle').textContent=language==='en'?'ع':'EN';
  document.querySelector('#language-toggle').setAttribute('aria-label',language==='en'?'Switch to Arabic':'Switch to English');
  update();
  document.dispatchEvent(new CustomEvent('taiba:language'));
  try{localStorage.setItem('taiba-original-refined-language',language);}catch{}
 }
 const button=document.createElement('button');
 button.className='icon-button language-button';button.id='language-toggle';button.dataset.action='toggle-language';
 document.querySelector('.topbar-actions').prepend(button);
 window.taibaLanguage={toggle(){language=language==='ar'?'en':'ar';apply();}};
 apply();
})();
