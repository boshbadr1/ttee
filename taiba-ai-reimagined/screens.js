/* Riwaq · account and administration surfaces. Demo data only. */
'use strict';
(() => {
  let adminSection = 'overview';
  let studentQuery = '';
  let providerQuery = '';
  let providerCheckTimer;
  const A = () => window.Taiba;
  const t = (ar,en) => A().t(ar,en);
  const e = value => A().esc(value);
  const i = name => A().icon(name);
  const action = (name,label,icon,extra='',style='s-button') => '<button type="button" class="'+style+'" data-s-action="'+name+'" '+extra+'>'+(icon?i(icon):'')+label+'</button>';

  function initialize() {
    const s=A().state;
    if(!Array.isArray(s.students)) s.students=[
      {id:'s1',name:'بدر أحمد',email:'badr.ahmed@thebes.edu.eg',faculty:'تكنولوجيا المعلومات',active:true},
      {id:'s2',name:'مريم حسن',email:'mariam.h@thebes.edu.eg',faculty:'تكنولوجيا المعلومات',active:true},
      {id:'s3',name:'عمر محمود',email:'omar.m@thebes.edu.eg',faculty:'تكنولوجيا الميكاترونكس',active:true},
      {id:'s4',name:'نور محمد',email:'nour.m@thebes.edu.eg',faculty:'تكنولوجيا الطاقة',active:false},
      {id:'s5',name:'يوسف خالد',email:'youssef.k@thebes.edu.eg',faculty:'تكنولوجيا المعلومات',active:true},
      {id:'s6',name:'سارة علي',email:'sara.a@thebes.edu.eg',faculty:'تكنولوجيا الطاقة',active:true}
    ];
    if(!Array.isArray(s.providers)) {
      const names=['Gemini','Groq','Cerebras','OpenRouter','OpenAI','Anthropic','Mistral','Cohere','Together AI','Fireworks','DeepSeek','Hugging Face','SambaNova','NVIDIA NIM','Perplexity','xAI','AI21','Cloudflare AI','Replicate','Novita','SiliconFlow','GitHub Models'];
      s.providers=names.map((name,n)=>({id:'provider-'+n,name,enabled:n<16,health:n===5||n===11?'limited':'healthy',quota:[64,38,21,47,83,92,32,18,59,71,46,89,26,52,11,42,0,0,0,0,0,0][n],latency:170+n*28,priority:n+1}));
    }
    if(!Array.isArray(s.announcements)) s.announcements=[
      {id:'a1',title:'معرض مشروعات التخرج: فكرتك تستحق المساحة',body:'استعد لعرض مشروعك وتبادل الأفكار مع زملائك. بيانات الموعد والمكان في هذا النموذج توضيحية فقط.',date:'2026-11-01',kind:'event'},
      {id:'a2',title:'مراجعة جدول امتحانات منتصف الفصل',body:'راجع مواعيد المواد وجهّز خطة المذاكرة الخاصة بك. هذا إعلان تجريبي وليس جدولًا جامعيًا رسميًا.',date:'2026-10-28',kind:'important'}
    ];
  }
  function intro(kicker,title,body,tools=''){
    return '<header class="s-page-intro"><div><span class="s-kicker">'+kicker+'</span><h1>'+title+'</h1><p>'+body+'</p></div>'+tools+'</header>';
  }
  function field(label,id,type='text',value='',hint='',attrs=''){
    const password=type==='password';
    return '<div class="s-field"><label for="'+id+'">'+label+'</label><div class="s-input-wrap"><input id="'+id+'" name="'+id+'" type="'+type+'" value="'+e(value)+'" '+attrs+' aria-describedby="'+id+'-hint '+id+'-error">'+(password?'<button class="s-reveal" type="button" data-s-action="password-visibility" data-target="'+id+'" aria-label="'+t('إظهار كلمة المرور','Show password')+'">'+i('eye')+'</button>':'')+'</div><small id="'+id+'-hint">'+hint+'</small><span id="'+id+'-error" class="s-error"></span></div>';
  }
  function feedback(id){return '<div id="'+id+'" class="s-feedback" role="alert" tabindex="-1"></div>';}
  function tag(text,type=''){return '<span class="s-status '+type+'"><span></span>'+text+'</span>';}
  function sectionTitle(number,title,subtitle=''){
    return '<div class="s-section-title"><span class="s-number">'+number+'</span><div><h2>'+title+'</h2>'+(subtitle?'<p>'+subtitle+'</p>':'')+'</div></div>';
  }
  function profile(){
    const {profile:p,theme,lang}=A().state;
    return '<section class="s-account page-wrap">'+intro(t('مساحتك الشخصية / ٠١','YOUR ACCOUNT / 01'),t('حضورك، بطريقتك.','Your presence. Your way.'),t('تفاصيل صغيرة تصنع مساحة تشبهك.','Small details that make this space yours.'))+
      '<div class="s-profile-layout"><aside class="s-identity"><span class="s-monogram">'+e(p.name[0])+'</span><span class="s-kicker">'+t('بطاقة الطالب','STUDENT PASS')+'</span><h2>'+e(p.name)+'</h2><p dir="ltr">'+e(p.email)+'</p><div class="s-identity-rule"></div><dl><div><dt>'+t('البرنامج','PROGRAM')+'</dt><dd>'+e(p.faculty)+'</dd></div><div><dt>'+t('المستوى الدراسي','ACADEMIC YEAR')+'</dt><dd>'+e(p.year)+'</dd></div><div><dt>'+t('الحالة','STATUS')+'</dt><dd>'+tag(t('حساب عرض نشط','Active demo account'))+'</dd></div></dl><span class="s-student-serial" dir="ltr">RIWAQ / STUDENT 03184</span></aside>'+
      '<div class="s-profile-details"><section class="s-ruled-section">'+sectionTitle('01',t('التفاصيل الأساسية','The essentials'),t('اسمك هنا بداية كل فكرة.','Your name is where every idea begins.'))+
      '<form data-s-form="profile" class="s-form">'+field(t('اسم العرض','Display name'),'s-profile-name','text',p.name,t('بين حرفين و٦٠ حرفًا. يظهر في تحية الاستوديو.','2–60 characters. Shown in your studio greeting.'),'autocomplete="name" required minlength="2" maxlength="60"')+
      field(t('البريد الجامعي','University email'),'s-profile-email','email',p.email,t('حقل للعرض فقط في هذا النموذج.','Read-only in this prototype.'),'readonly dir="ltr" autocomplete="username"')+feedback('s-profile-feedback')+'<button type="submit" class="s-button s-button-ink">'+t('حفظ التفاصيل','Save details')+i('arrow')+'</button></form></section>'+
      '<section class="s-ruled-section">'+sectionTitle('02',t('إيقاع المساحة','The mood of your space'),t('الإضاءة واللغة، على راحتك.','Light and language, to suit you.'))+
      '<div class="s-preferences"><div><span class="s-preference-label">'+t('المظهر','APPEARANCE')+'</span><div class="s-choice-row">'+action('theme',t('ورق النهار','Day paper'),'sun','data-theme="light" aria-pressed="'+(theme==='light')+'"','s-choice '+(theme==='light'?'is-selected':''))+action('theme',t('حبر الليل','Night ink'),'moon','data-theme="dark" aria-pressed="'+(theme==='dark')+'"','s-choice '+(theme==='dark'?'is-selected':''))+'</div></div><div><span class="s-preference-label">'+t('اللغة','LANGUAGE')+'</span><div class="s-choice-row">'+action('language','العربية','','data-language="ar" aria-pressed="'+(lang==='ar')+'"','s-choice '+(lang==='ar'?'is-selected':''))+action('language','English','','data-language="en" aria-pressed="'+(lang==='en')+'"','s-choice '+(lang==='en'?'is-selected':''))+'</div></div></div></section>'+
      '<section class="s-ruled-section">'+sectionTitle('03',t('مفاتيح الدخول','Your access'),t('نماذج مستقلة عن مساحة الكتابة، وبيانات عرض فقط.','Separate account forms. Demo credentials only.'))+
      '<div class="s-access-line"><div><strong>'+t('كلمة المرور','Password')+'</strong><p>'+t('استكشف التحقق والتغيير دون حفظ كلمات مرور.','Explore validation without storing passwords.')+'</p></div>'+action('go',t('تغيير تجريبي','Demo change'),'lock','data-to="password"','s-button s-button-outline')+'</div>'+
      '<div class="s-access-line"><div><strong>'+t('جلسة العرض','Demo session')+'</strong><p>'+t('لا توجد مصادقة أو حسابات إنتاج متصلة.','No authentication or production accounts are connected.')+'</p></div>'+action('go',t('شاشة الدخول','Sign-in screen'),'arrow','data-to="login"','s-button s-button-text')+'</div></section></div></div></section>';
  }
  function authFrame(title,copy,content,kind){
    return '<section class="s-auth"><div class="s-auth-story"><span class="s-kicker" dir="ltr">TAIBA AI / RIWAQ</span><span class="s-auth-edition" dir="ltr">EDUCATION<br>WITHOUT<br>EDGES.</span><div class="s-auth-arch" aria-hidden="true"><span></span><span></span><span></span></div><p class="s-auth-display">'+title+'</p><p>'+copy+'</p><span class="s-auth-foot">'+t('جامعة طيبة التكنولوجية · مساحة لاحتمالاتك','Thebes Technological University · A space for possibility')+'</span></div><div class="s-auth-form-area"><div class="s-auth-top">'+action('go',t('العودة إلى الاستوديو','Back to the studio'),'arrow','data-to="studio"','s-button s-button-text')+'<span class="s-auth-step">'+(kind==='password'?'02 / 02':'01 / 02')+'</span></div>'+content+'</div></section>';
  }
  function login(){
    const email=A().state.profile.email;
    return authFrame(t('كل بداية،<br>تفتح باب.','Every beginning<br>opens a door.'),t('أفكارك تستحق مساحة. ادخل رواقك، وخد خطوتك الجاية على مهلك.','Your ideas deserve a space. Step into your studio, and take your next step at your own pace.'),
      '<div class="s-auth-form-copy"><span class="s-kicker">'+t('أهلًا بعودتك','GOOD TO HAVE YOU BACK')+'</span><h1>'+t('نكمّل من هنا.','Pick up from here.')+'</h1><p>'+t('دخول تجريبي إلى مساحتك الجامعية.','A demo sign-in to your university workspace.')+'</p></div><div class="s-demo-slip">'+i('info')+'<div><strong>'+t('واجهة فقط، دون مصادقة حقيقية.','Interface only. No real authentication.')+'</strong><p>'+t('استخدم بيانات العرض. لا تدخل بياناتك الحقيقية.','Use the sample credentials. Never enter real credentials.')+'</p><code dir="ltr">'+e(email)+'<br>TaibaDemo2026!</code></div></div>'+
      '<form data-s-form="login" class="s-form" novalidate>'+field(t('بريد العرض الجامعي','Demo university email'),'s-login-email','email',email,'','autocomplete="username" dir="ltr" required')+field(t('كلمة مرور العرض','Demo password'),'s-login-password','password','','','autocomplete="current-password" required')+feedback('s-login-feedback')+'<button class="s-button s-button-ink s-auth-submit" type="submit">'+t('ادخل التجربة','Enter the demo')+i('arrow')+'</button></form><div class="s-auth-help"><p>'+t('أول زيارة للمساحة؟','Your first visit?')+'</p>'+action('go',t('جرّب إعداد كلمة المرور','Explore password setup'),'key','data-to="password"','s-button s-button-text')+'</div>','login');
  }
  function password(){
    return authFrame(t('مساحة تخصّك.<br>ومفتاح بإيدك.','Your own space.<br>Your own key.'),t('تفاصيل الأمان الواضحة جزء من تجربة مريحة. هنا نستعرض التحقق فقط، دون حفظ أو إرسال أي كلمة مرور.','Clear security details are part of a comfortable experience. Here we demonstrate validation without saving or sending a password.'),
      '<div class="s-auth-form-copy"><span class="s-kicker">'+t('الخطوة الأولى لحسابك','YOUR FIRST ACCOUNT STEP')+'</span><h1>'+t('غيّر كلمة المرور.','Make your own key.')+'</h1><p>'+t('نموذج تحقق محلي. استخدم كلمات وهمية للتجربة.','Local validation only. Use made-up passwords for the demo.')+'</p></div>'+
      '<form data-s-form="password" class="s-form" novalidate>'+field(t('كلمة المرور المؤقتة التجريبية','Temporary demo password'),'s-temporary','password','',t('للعرض: TaibaDemo2026!','For the demo: TaibaDemo2026!'),'autocomplete="current-password" required')+
      field(t('كلمة المرور الجديدة التجريبية','New demo password'),'s-new','password','',t('١٢ حرفًا على الأقل، مختلفة عن المؤقتة.','At least 12 characters, different from the temporary password.'),'autocomplete="new-password" required minlength="12"')+
      field(t('تأكيد كلمة المرور الجديدة','Confirm new password'),'s-confirm','password','','','autocomplete="new-password" required')+feedback('s-password-feedback')+'<button class="s-button s-button-ink s-auth-submit" type="submit">'+t('تأكيد التحقق التجريبي','Confirm demo validation')+i('check')+'</button></form><p class="s-password-note">'+i('lock')+t('لا تُحفظ كلمات المرور، وبيانات الدخول التجريبية لا تتغيّر.','Passwords are never saved. The demo sign-in credentials do not change.')+'</p>','password');
  }
  function admin(){
    const tabs=[['overview','grid',t('المشهد العام','Overview')],['students','users',t('الطلاب','Students')],['announcements','news',t('النشرة','Announcements')],['providers','server',t('شبكة الذكاء','AI network')]];
    const body=adminSection==='students'?students():adminSection==='announcements'?announcements():adminSection==='providers'?providers():overview();
    return '<section class="s-admin page-wrap">'+intro(t('غرفة العمليات / عرض تجريبي','OPERATIONS / DEMO WORKSPACE'),t('صورة أوضح.<br>قرارات أهدى.','A clearer picture.<br>A steadier hand.'),t('طلاب الجامعة ومسارات التعلّم، في مساحة إدارة واحدة.','Students and learning pathways, in one management workspace.'),'<div class="s-admin-stamp">'+i('lock')+'<span>'+t('وضع العرض','DEMO MODE')+'<small>'+t('بدون صلاحيات فعلية','No live privileges')+'</small></span></div>')+
      '<nav class="s-admin-nav" aria-label="'+t('أقسام الإدارة','Administration sections')+'">'+tabs.map(x=>action('admin-tab',x[2],x[1],'data-tab="'+x[0]+'" aria-pressed="'+(adminSection===x[0])+'"','s-admin-tab '+(adminSection===x[0]?'is-selected':''))).join('')+'</nav><div class="s-admin-body">'+body+'</div></section>';
  }
  function overview(){
    const enabled=A().state.providers.filter(p=>p.enabled).length;
    return '<div class="s-overview"><div class="s-metric-ribbon"><div class="s-metric"><span>'+t('طلاب في رحلتهم','STUDENTS ON THEIR JOURNEY')+'</span><strong dir="ltr">1,284<span>↗ 12%</span></strong><small>'+t('نمو تجريبي مقارنة بالشهر الماضي','Sample growth over the previous month')+'</small></div><div class="s-metric"><span>'+t('سؤال فتح احتمال جديد','QUESTIONS THAT OPENED A POSSIBILITY')+'</span><strong dir="ltr">8,942<span>↗ 24%</span></strong><small>'+t('محادثات توضيحية خلال الشهر','Sample conversations this month')+'</small></div><div class="s-metric"><span>'+t('مسار جاهز في النموذج','ROUTES ENABLED IN THE DEMO')+'</span><strong dir="ltr">'+enabled+'<em>/ 22</em></strong><small>'+t('مؤشرات محلية، وليست حالة خدمات حقيقية','Local indicators, not live service health')+'</small></div></div>'+
      '<div class="s-overview-columns"><section class="s-activity-chart">'+sectionTitle('01',t('نبض التعلّم','The learning pulse'),t('آخر ٧ أيام · بيانات توضيحية','Last 7 days · Sample data'))+
      '<div class="s-chart-top"><span>'+t('المحادثات','CONVERSATIONS')+'</span><span dir="ltr">+24.6% <small>'+t('هذا الأسبوع','this week')+'</small></span></div><div class="s-chart" role="img" aria-label="'+t('بيانات محادثات تجريبية على مدار الأسبوع: ٨٠، ١٢٠، ١٠٥، ١٦٠، ١٣٠، ١٨٠، ٢٠٠','Sample weekly conversation counts: 80, 120, 105, 160, 130, 180, 200')+'"><div class="s-chart-grid"><span>200</span><span>150</span><span>100</span><span>50</span></div><svg viewBox="0 0 600 220" preserveAspectRatio="none" aria-hidden="true"><path class="s-chart-area" d="M0 165 100 120 200 138 300 75 400 110 500 50 600 25V220H0Z"/><path class="s-chart-line" d="M0 165 100 120 200 138 300 75 400 110 500 50 600 25"/><circle cx="600" cy="25" r="5"/></svg></div><div class="s-chart-days">'+[t('سبت','Sat'),t('أحد','Sun'),t('اثنين','Mon'),t('ثلاثاء','Tue'),t('أربعاء','Wed'),t('خميس','Thu'),t('جمعة','Fri')].map(d=>'<span>'+d+'</span>').join('')+'</div></section>'+
      '<aside class="s-operations-log">'+sectionTitle('02',t('على الهامش الإداري','Operations notes'))+'<ol>'+[[t('انضمام ١٨ طالبًا جديدًا','18 new students joined'),t('منذ ١٢ دقيقة · حسابات عرض','12 min ago · Sample accounts')],[t('تم نشر نشرة معرض المشروعات','Project showcase notice published'),t('منذ ساعة · شؤون الطلاب','1 hour ago · Student affairs')],[t('مراجعة شبكة المزودين','Provider network reviewed'),t('منذ ساعتين · فحص محلي','2 hours ago · Local demo check')]].map(x=>'<li><span class="s-log-point"></span><div><strong>'+x[0]+'</strong><p>'+x[1]+'</p></div></li>').join('')+'</ol>'+action('admin-tab',t('راجع شبكة الذكاء','Inspect the AI network'),'arrow','data-tab="providers"','s-button s-button-text')+'</aside></div><div class="s-footnote">'+i('info')+t('كل الأرقام والأنشطة هنا بيانات توضيحية. التعديلات في التبويبات الأخرى تُحفظ محليًا في المتصفح فقط.','All metrics and activities are sample data. Changes in the other sections are saved only in this browser.')+'</div></div>';
  }
  function students(){
    return '<section class="s-students"><div class="s-management-heading"><div><span class="s-kicker">'+t('دليل الطلاب','STUDENT DIRECTORY')+'</span><h2>'+t('لكل طالب، بداية.','Every student, a beginning.')+'</h2></div>'+action('student-new',t('إضافة طالب','Add student'),'plus','','s-button s-button-ink')+'</div><div class="s-filter-line"><label for="s-student-search">'+i('search')+'<input type="search" id="s-student-search" placeholder="'+t('ابحث باسم أو بريد الطالب','Search a student name or email')+'" value="'+e(studentQuery)+'" autocomplete="off"></label><span id="s-student-count">'+A().state.students.length+' '+t('طالب في النموذج','demo students')+'</span></div><div class="s-data-scroll"><table class="s-data-table"><thead><tr><th scope="col">'+t('الطالب','Student')+'</th><th scope="col">'+t('البرنامج','Program')+'</th><th scope="col">'+t('الحالة','Status')+'</th><th scope="col">'+t('الإجراءات','Actions')+'</th></tr></thead><tbody id="s-student-rows">'+studentRows()+'</tbody></table></div><p class="s-footnote">'+i('info')+t('الإضافة والتعديل وتعطيل الحسابات تجريبية، ولا تؤثر على حسابات حقيقية.','Adding, editing, and disabling accounts are local demo operations only.')+'</p></section>';
  }
  function studentRows(){
    const list=A().state.students.filter(s=>(s.name+' '+s.email).toLowerCase().includes(studentQuery.toLowerCase()));
    return list.length?list.map((s,n)=>'<tr><td><div class="s-student-cell"><span class="s-mini-monogram">'+e(s.name[0])+'</span><div><strong>'+e(s.name)+'</strong><small dir="ltr">'+e(s.email)+'</small></div></div></td><td>'+e(s.faculty)+'</td><td>'+tag(s.active?t('نشط','Active'):t('متوقف','Disabled'),s.active?'':'s-status-muted')+'</td><td><div class="s-row-actions">'+action('student-edit','', 'edit','data-id="'+e(s.id)+'" aria-label="'+t('تعديل بيانات ','Edit ')+e(s.name)+'"','s-icon-btn')+action('student-toggle','', s.active?'lock':'check','data-id="'+e(s.id)+'" aria-label="'+(s.active?t('تعطيل ','Disable '):t('تفعيل ','Activate '))+e(s.name)+'"','s-icon-btn')+action('student-reset','', 'key','data-id="'+e(s.id)+'" aria-label="'+t('إعادة تعيين كلمة مرور ','Reset password for ')+e(s.name)+'"','s-icon-btn')+'</div></td></tr>').join(''):'<tr><td colspan="4" class="s-no-results">'+t('لا توجد نتائج مطابقة. جرّب اسمًا آخر.','No matching students. Try another name.')+'</td></tr>';
  }
  function announcements(){
    const list=A().state.announcements;
    return '<section><div class="s-management-heading"><div><span class="s-kicker">'+t('نشرة الحرم','CAMPUS BULLETIN')+'</span><h2>'+t('أخبار تستحق أن تصل.','News worth sharing.')+'</h2></div>'+action('announcement-new',t('نشرة جديدة','New announcement'),'plus','','s-button s-button-ink')+'</div><div class="s-announcement-register">'+(list.length?list.map((a,n)=>'<article class="s-register-entry"><span class="s-register-no" dir="ltr">'+String(n+1).padStart(2,'0')+'</span><div><div class="s-register-meta"><time>'+e(a.date)+'</time><span>'+t(a.kind==='important'?'مهم':'فعالية',a.kind==='important'?'Important':'Event')+'</span></div><h3>'+e(a.title)+'</h3><p>'+e(a.body)+'</p></div><div class="s-row-actions">'+action('announcement-edit','', 'edit','data-id="'+e(a.id)+'" aria-label="'+t('تعديل ','Edit ')+e(a.title)+'"','s-icon-btn')+action('announcement-delete','', 'trash','data-id="'+e(a.id)+'" aria-label="'+t('حذف ','Delete ')+e(a.title)+'"','s-icon-btn')+'</div></article>').join(''):'<div class="s-empty">'+i('news')+'<h3>'+t('المساحة جاهزة لأول خبر.','Ready for the first story.')+'</h3></div>')+'</div><p class="s-footnote">'+i('info')+t('النشرات المحلية تظهر في قسم الجامعة أيضًا. لا يتم إرسال إشعارات أو بريد.','Local announcements also appear in Campus. No notifications or email are sent.')+'</p></section>';
  }
  function providers(){
    const list=A().state.providers;
    const enabled=list.filter(p=>p.enabled).length;
    return '<section class="s-network"><div class="s-management-heading"><div><span class="s-kicker">'+t('شبكة المسارات / ٢٢ مزودًا تجريبيًا','ROUTE NETWORK / 22 SAMPLE PROVIDERS')+'</span><h2>'+t('التعلّم مستمر، حتى لو مسار وقف.','Learning continues when a route pauses.')+'</h2></div>'+action('provider-check',t('فحص توضيحي','Demo health check'),'activity','','s-button s-button-outline')+'</div><div class="s-network-summary"><div><strong>'+enabled+'<small>/ 22</small></strong><span>'+t('مسار مفعّل','enabled routes')+'</span></div><div><strong dir="ltr">99.8<small>%</small></strong><span>'+t('إتاحة توضيحية','sample availability')+'</span></div><p>'+i('server')+t('ترتيب احتياطي تلقائي عند الربط لاحقًا. جميع الحالات والأرقام هنا محلية.','Automatic fallback on future integration. All statuses and metrics shown here are local demo data.')+'</p></div><div class="s-filter-line"><label for="s-provider-search">'+i('search')+'<input id="s-provider-search" type="search" placeholder="'+t('ابحث عن مزود','Find a provider')+'" value="'+e(providerQuery)+'" autocomplete="off"></label><span>'+t('لا مفاتيح API في النموذج','No API keys in this prototype')+'</span></div><div class="s-data-scroll"><table class="s-data-table s-provider-table"><thead><tr><th scope="col">'+t('المسار / المزود','Route / Provider')+'</th><th scope="col">'+t('الصحة التجريبية','Demo health')+'</th><th scope="col">'+t('استهلاك الحصة','Quota usage')+'</th><th scope="col">'+t('زمن توضيحي','Sample latency')+'</th><th scope="col">'+t('حالة المفتاح','Key status')+'</th><th scope="col">'+t('التفعيل','Enabled')+'</th></tr></thead><tbody id="s-provider-rows">'+providerRows()+'</tbody></table></div><div class="s-footnote">'+i('lock')+t('لا يتصل الفحص بأي خدمة. لا تدخل مفاتيح حقيقية؛ تُدار بيانات الاعتماد في الخلفية عند التكامل فقط.','The check makes no service requests. Never enter real keys; credentials belong on the backend during future integration.')+'</div></section>';
  }
  function providerRows(){
    const list=A().state.providers.filter(p=>p.name.toLowerCase().includes(providerQuery.toLowerCase()));
    return list.length?list.map(p=>'<tr><td><div class="s-provider-name"><span class="s-provider-order" dir="ltr">'+String(p.priority).padStart(2,'0')+'</span><div><strong dir="ltr">'+e(p.name)+'</strong><small>'+t(p.priority===1?'المسار الأول':'مسار احتياطي',p.priority===1?'Primary route':'Fallback route')+'</small></div></div></td><td>'+tag(!p.enabled?t('معطّل','Disabled'):p.health==='limited'?t('محدود','Limited'):t('متاح','Available'),!p.enabled?'s-status-muted':p.health==='limited'?'s-status-caution':'')+'</td><td><div class="s-quota"><span dir="ltr">'+p.quota+'%</span><div role="meter" aria-label="'+t('حصة ','Quota for ')+e(p.name)+'" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+p.quota+'"><span style="width:'+p.quota+'%"></span></div></div></td><td><span class="s-latency" dir="ltr">'+(p.enabled?p.latency+' ms':'—')+'</span></td><td><span class="s-key-state">'+i('key')+t('محاكاة فقط','Demo only')+'</span></td><td><button class="s-switch" role="switch" type="button" aria-checked="'+p.enabled+'" aria-label="'+t('تفعيل ','Enable ')+e(p.name)+'" data-s-action="provider-toggle" data-id="'+e(p.id)+'"><span></span></button></td></tr>').join(''):'<tr><td colspan="6" class="s-no-results">'+t('لا يوجد مزود بهذا الاسم.','No matching provider.')+'</td></tr>';
  }
  function showStudent(id){
    const student=A().state.students.find(s=>String(s.id)===String(id));
    const p=student||{name:'',email:'',faculty:'تكنولوجيا المعلومات'};
    A().dialog(student?t('تعديل بطاقة الطالب','Edit student details'):t('بداية طالب جديد','A new student beginning'),
      '<p class="s-dialog-copy">'+t('بيانات وهمية فقط. لا تُنشأ حسابات حقيقية ولا يُرسل بريد.','Use made-up data only. No real account is created and no email is sent.')+'</p><form data-s-form="student" data-id="'+e(id||'')+'" class="s-form" novalidate>'+field(t('الاسم','Name'),'s-student-name','text',p.name,'','required minlength="2" maxlength="80" autocomplete="off"')+field(t('بريد العرض','Demo email'),'s-student-email','email',p.email,'','required dir="ltr" autocomplete="off"')+'<div class="s-field"><label for="s-student-program">'+t('البرنامج الدراسي','Study program')+'</label><select id="s-student-program">'+['تكنولوجيا المعلومات','تكنولوجيا الميكاترونكس','تكنولوجيا الطاقة'].map(f=>'<option '+(p.faculty===f?'selected':'')+'>'+f+'</option>').join('')+'</select></div>'+feedback('s-student-feedback')+'<div class="s-dialog-actions"><button class="s-button s-button-ink" type="submit">'+t('حفظ محلي','Save locally')+'</button>'+action('close-dialog',t('إلغاء','Cancel'),'','','s-button s-button-outline')+'</div></form>');
  }
  function showAnnouncement(id){
    const a=A().state.announcements.find(a=>String(a.id)===String(id))||{title:'',body:'',kind:'event'};
    A().dialog(id?t('تعديل النشرة','Edit announcement'):t('خبر يفتح مساحة','A story worth sharing'),
      '<form data-s-form="announcement" data-id="'+e(id||'')+'" class="s-form" novalidate>'+field(t('عنوان النشرة','Announcement title'),'s-news-title','text',a.title,'','required minlength="4" maxlength="160"')+'<div class="s-field"><label for="s-news-body">'+t('التفاصيل','Details')+'</label><textarea id="s-news-body" required minlength="10" rows="5">'+e(a.body)+'</textarea></div><div class="s-field"><label for="s-news-kind">'+t('نوع النشرة','Announcement category')+'</label><select id="s-news-kind"><option value="event" '+(a.kind==='event'?'selected':'')+'>'+t('فعالية','Event')+'</option><option value="important" '+(a.kind==='important'?'selected':'')+'>'+t('مهم','Important')+'</option></select></div>'+feedback('s-news-feedback')+'<div class="s-dialog-actions"><button class="s-button s-button-ink" type="submit">'+t('نشر محلي','Publish locally')+'</button>'+action('close-dialog',t('إلغاء','Cancel'),'','','s-button s-button-outline')+'</div></form>');
  }
  function setFeedback(id,message,success=false){
    const el=document.getElementById(id);if(!el)return;
    el.textContent=message;el.className='s-feedback '+(success?'is-success':'is-error');
    if(!success)el.focus({preventScroll:true});
  }
  function invalid(id,message){
    const input=document.getElementById(id),error=document.getElementById(id+'-error');
    if(input)input.setAttribute('aria-invalid',!!message);
    if(error)error.textContent=message;
  }
  const handlers={
    'go':el=>A().navigate(el.dataset.to),
    'theme':el=>{A().setTheme(el.dataset.theme);A().render();},
    'language':el=>{A().state.lang=el.dataset.language;A().save();A().render();},
    'password-visibility':el=>{const input=document.getElementById(el.dataset.target);input.type=input.type==='password'?'text':'password';el.setAttribute('aria-label',input.type==='password'?t('إظهار كلمة المرور','Show password'):t('إخفاء كلمة المرور','Hide password'));el.setAttribute('aria-pressed',input.type==='text');},
    'admin-tab':el=>{adminSection=el.dataset.tab;studentQuery='';providerQuery='';A().render();},
    'student-new':()=>showStudent(),
    'student-edit':el=>showStudent(el.dataset.id),
    'student-toggle':el=>{const student=A().state.students.find(s=>String(s.id)===el.dataset.id);if(!student)return;student.active=!student.active;A().save();document.getElementById('s-student-rows').innerHTML=studentRows();A().toast(t('تم تحديث حالة الطالب محليًا.','Student status updated locally.'));},
    'student-reset':el=>{const student=A().state.students.find(s=>String(s.id)===el.dataset.id);if(!student)return;A().dialog(t('إعادة تعيين تجريبية','Demo password reset'),'<div class="s-reset-mark">'+i('key')+'</div><p class="s-dialog-copy">'+t('أنت تستعرض إعادة تعيين كلمة مرور ','You are previewing a password reset for ')+e(student.name)+'. '+t('في التطبيق الحقيقي تتم العملية عبر الخلفية الآمنة. هنا لا تُغيّر أي كلمة مرور ولا يُرسل بريد.','In a real application this uses a secure backend. Here no password changes and no email is sent.')+'</p>'+action('reset-confirm',t('تأكيد المحاكاة','Confirm demo'),'check','','s-button s-button-ink'));},
    'reset-confirm':()=>{A().closeDialog();A().toast(t('اكتملت المحاكاة. لم يُرسل بريد أو تتغيّر كلمة مرور.','Demo complete. No email was sent or password changed.'));},
    'announcement-new':()=>showAnnouncement(),
    'announcement-edit':el=>showAnnouncement(el.dataset.id),
    'announcement-delete':el=>A().dialog(t('حذف النشرة؟','Delete this announcement?'),'<p class="s-dialog-copy">'+t('ستُحذف من النشرة الإدارية وقسم الجامعة في هذا المتصفح فقط.','It will be removed from the administration and Campus views in this browser only.')+'</p><div class="s-dialog-actions">'+action('announcement-confirm-delete',t('حذف محلي','Delete locally'),'trash','data-id="'+e(el.dataset.id)+'"','s-button s-button-danger')+action('close-dialog',t('احتفاظ بالنشرة','Keep announcement'),'','','s-button s-button-outline')+'</div>'),
    'announcement-confirm-delete':el=>{A().state.announcements=A().state.announcements.filter(a=>String(a.id)!==el.dataset.id);A().save();A().closeDialog();A().render();A().toast(t('تم حذف النشرة محليًا.','Announcement removed locally.'));},
    'provider-toggle':el=>{const provider=A().state.providers.find(p=>p.id===el.dataset.id);if(!provider)return;provider.enabled=!provider.enabled;A().save();A().render();A().toast(t('تم تحديث مسار العرض فقط.','Demo route updated only.'));},
    'provider-check':el=>{clearTimeout(providerCheckTimer);el.disabled=true;el.setAttribute('aria-busy','true');el.textContent=t('نعرض الفحص…','Showing demo check…');providerCheckTimer=setTimeout(()=>{if(el.isConnected){el.disabled=false;el.removeAttribute('aria-busy');el.innerHTML=i('activity')+t('فحص توضيحي','Demo health check');}A().toast(t('اكتمل الفحص التوضيحي لـ٢٢ مزودًا، بدون طلبات شبكية.','Demo check complete for 22 providers. No network requests were made.'));},800);},
    'close-dialog':()=>A().closeDialog()
  };
  document.addEventListener('click',event=>{
    const el=event.target.closest('[data-s-action]');if(!el)return;
    event.preventDefault();handlers[el.dataset.sAction]?.(el);
  });
  document.addEventListener('input',event=>{
    if(event.target.id==='s-student-search'){studentQuery=event.target.value;document.getElementById('s-student-rows').innerHTML=studentRows();}
    if(event.target.id==='s-provider-search'){providerQuery=event.target.value;document.getElementById('s-provider-rows').innerHTML=providerRows();}
  });
  document.addEventListener('submit',async event=>{
    const form=event.target;if(!form.matches('[data-s-form]'))return;
    event.preventDefault();const type=form.dataset.sForm;
    if(type==='profile'){
      const name=document.getElementById('s-profile-name').value.trim();
      if(name.length<2||name.length>60){invalid('s-profile-name',t('اكتب اسمًا بين حرفين و٦٠ حرفًا.','Use a name between 2 and 60 characters.'));setFeedback('s-profile-feedback',t('راجع اسم العرض قبل الحفظ.','Check the display name before saving.'));return;}
      A().state.profile.name=name;A().save();A().render();A().toast(t('تفاصيلك اتحفظت.','Your details are saved.'));
    }
    if(type==='login'){
      const email=document.getElementById('s-login-email').value.trim(),password=document.getElementById('s-login-password').value;
      const emailError=email!==A().state.profile.email,passwordError=password!=='TaibaDemo2026!';
      invalid('s-login-email',emailError?t('استخدم بريد العرض الموضّح أعلاه.','Use the demo email shown above.'):'');
      invalid('s-login-password',passwordError?t('استخدم TaibaDemo2026! فقط.','Use TaibaDemo2026! only.'):'');
      if(emailError||passwordError){setFeedback('s-login-feedback',t('بيانات العرض غير مطابقة. لا تدخل بيانات حقيقية.','The sample credentials do not match. Never use real credentials.'));return;}
      const button=form.querySelector('[type=submit]');button.disabled=true;button.setAttribute('aria-busy','true');button.textContent=t('نفتح مساحة الأفكار…','Opening your space…');
      await new Promise(resolve=>setTimeout(resolve,700));
      if(form.isConnected){form.reset();A().navigate('studio');A().toast(t('أهلًا في رواقك. دي تجربة واجهة، بدون مصادقة فعلية.','Welcome to your studio. This is a UI demo without real authentication.'));}
    }
    if(type==='password'){
      const temporary=document.getElementById('s-temporary').value,next=document.getElementById('s-new').value,confirm=document.getElementById('s-confirm').value;
      const errors=[temporary==='TaibaDemo2026!'?'':t('استخدم كلمة العرض المؤقتة TaibaDemo2026!','Use the temporary demo value TaibaDemo2026!'),next.length<12?t('١٢ حرفًا على الأقل.','At least 12 characters required.'):next===temporary?t('اختار كلمة مختلفة عن المؤقتة.','Choose a different password from the temporary value.'):'',!confirm||next!==confirm?t('التأكيد غير مطابق.','The confirmation does not match.'):''];
      ['s-temporary','s-new','s-confirm'].forEach((id,n)=>invalid(id,errors[n]));
      if(errors.some(Boolean)){setFeedback('s-password-feedback',t('راجع الحقول المعلّمة قبل المتابعة.','Review the marked fields before continuing.'));return;}
      form.reset();setFeedback('s-password-feedback',t('نجح التحقق التجريبي. لم تُحفظ أو تُرسل كلمة مرور، وبيانات الدخول التجريبية لم تتغيّر.','Demo validation succeeded. No password was saved or sent, and the sample sign-in credentials have not changed.'),true);
    }
    if(type==='student'){
      const name=document.getElementById('s-student-name').value.trim(),input=document.getElementById('s-student-email'),email=input.value.trim(),faculty=document.getElementById('s-student-program').value;
      invalid('s-student-name',name.length<2?t('حرفان على الأقل.','At least 2 characters.'):'');invalid('s-student-email',!email||!input.validity.valid?t('اكتب بريدًا صالح الصيغة.','Enter a valid email address.'):'');
      if(name.length<2||!email||!input.validity.valid){setFeedback('s-student-feedback',t('راجع الاسم والبريد التجريبي.','Review the sample name and email.'));return;}
      if(A().state.students.some(s=>s.email.toLowerCase()===email.toLowerCase()&&String(s.id)!==form.dataset.id)){setFeedback('s-student-feedback',t('البريد موجود بالفعل في النموذج.','That email already exists in the demo.'));return;}
      const student=A().state.students.find(s=>String(s.id)===form.dataset.id);
      if(student)Object.assign(student,{name,email,faculty});
      else A().state.students.unshift({id:'s-'+Date.now(),name,email,faculty,active:true});
      A().save();A().closeDialog();A().render();A().toast(t('تم حفظ بطاقة الطالب محليًا.','Student details saved locally.'));
    }
    if(type==='announcement'){
      const title=document.getElementById('s-news-title').value.trim(),body=document.getElementById('s-news-body').value.trim(),kind=document.getElementById('s-news-kind').value;
      invalid('s-news-title',title.length<4?t('العنوان ٤ أحرف على الأقل.','Use at least 4 characters.'):'');
      if(title.length<4||body.length<10){setFeedback('s-news-feedback',t('العنوان ٤ أحرف على الأقل، والتفاصيل ١٠ أحرف.','Use at least 4 characters for the title and 10 for the details.'));return;}
      const current=A().state.announcements.find(a=>String(a.id)===form.dataset.id);
      const data={title,body,kind,date:new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())};
      if(current)Object.assign(current,data);else A().state.announcements.unshift({id:'a-'+Date.now(),...data});
      A().save();A().closeDialog();A().render();A().toast(t('النشرة اتنشرت محليًا.','Announcement published locally.'));
    }
  });
  window.TaibaScreens={
    render(route){initialize();return route==='profile'?profile():route==='login'?login():route==='password'?password():admin();},
    resetTab(){adminSection='overview';studentQuery='';providerQuery='';}
  };
})();
