const practices = {
  embrace:[
    ['☼','Prayer & remembrance','Set aside time for prayer, contemplation and respectful remembrance of Lord Ayyappa.'],
    ['✧','A simple, sattvic life','Eat simple vegetarian food in line with your community’s observance and personal needs.'],
    ['♡','Kindness in speech','Practice truthfulness, patience, compassion and self-control in daily interactions.'],
    ['✺','Humility & equality','Treat fellow devotees and everyone around you with dignity and respect.'],
    ['⌁','Cleanliness & care','Maintain personal hygiene, a clean prayer space and a mindful routine.'],
    ['◇','Guru Swamy guidance','Learn the customs and ritual steps from an experienced, trusted guide.']
  ],
  avoid:[
    ['◌','Alcohol & intoxicants','The traditional Vratham calls for abstinence from alcohol, tobacco and intoxicants.'],
    ['◌','Non-vegetarian foods','Vegetarian eating is customary during the observance. Ask your Guru Swamy about specifics.'],
    ['◌','Harmful conduct','Avoid anger, abusive speech, dishonesty, cruelty and unnecessary conflict.'],
    ['◌','Sensual indulgence','The traditional vow includes celibacy and restraint from worldly pleasures.'],
    ['◌','Excess & distraction','Practice moderation in entertainment and consumption; remember the intention behind the vow.'],
    ['◌','Treating rules as a contest','Deeksha is not a competition or a reason to judge another devotee’s circumstances.']
  ],
  guidance:[
    ['✦','Mala Dharana','Where, when and with whom should you formally begin the observance?'],
    ['✦','Clothing & grooming','Clarify black or blue attire, footwear, shaving, haircuts and other community-specific practices.'],
    ['✦','Food & daily routine','Ask about meal customs, prayer times and how to approach work and family obligations.'],
    ['✦','First-time pilgrimage','Understand Kanni Swamy expectations, group arrangements and religious etiquette.'],
    ['✦','Irumudi contents','The ritual bundle should be prepared under appropriate guidance, not from a generic online recipe.'],
    ['✦','Ending the observance','Confirm the appropriate process for pilgrimage completion and removing the Mala.']
  ]
};
const practiceGrid=document.getElementById('practice-grid');
function showTab(key){practiceGrid.innerHTML=practices[key].map(p=>`<article class="practice-card"><div class="practice-symbol">${p[0]}</div><h4>${p[1]}</h4><p>${p[2]}</p></article>`).join('');document.querySelectorAll('.tab').forEach(b=>{const active=b.dataset.tab===key;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))})}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.tab)));showTab('embrace');
const reflections=[
 ['Beginning','Begin with intention','Reflect on why you are choosing this journey. Start with humility rather than perfection.'],
 ['Mindfulness','An attentive beginning','Notice the difference between doing something by habit and doing it with awareness.'],
 ['Gratitude','Remember what supports you','Express gratitude to the people who make your everyday life possible.'],
 ['Kind speech','Choose words carefully','Before speaking, ask whether your words are true, necessary and kind.'],
 ['Simplicity','Make room for quiet','Notice what you can simplify to make more room for attention and prayer.'],
 ['Compassion','See others with tenderness','Offer help without expecting recognition.'],
 ['Steadiness','Return to the intention','A difficult day can still be approached with patience and sincerity.'],
 ['Humility','Learn from others','Listen openly, especially to those with experience and different perspectives.'],
 ['Self-control','Respond, do not react','Observe moments when a pause can prevent unnecessary conflict.'],
 ['Service','Make devotion practical','Consider one small act of service in your home or community.'],
 ['Contentment','Practice enough','Observe the desire for more; notice what is already sufficient.'],
 ['Remembrance','Let prayer anchor the day','Build a moment of remembrance into an ordinary part of your routine.'],
 ['Patience','Slow down with care','See if you can approach a frustrating task with composure.'],
 ['Respect','Honor your guides','Show gratitude to people who teach you and correct you constructively.'],
 ['Awareness','Notice your habits','Observe which habits support your purpose and which distract from it.'],
 ['Discipline','Give attention its place','Keep the practices you have chosen with realistic steadiness.'],
 ['Gentleness','Practice restraint without harshness','Let discipline improve your conduct, not turn into judgment of others.'],
 ['Dharma','Reflect on right action','What does acting with integrity look like in your life today?'],
 ['Community','Walk alongside others','Share encouragement and respect the pace of fellow devotees.'],
 ['Truth','Be honest with yourself','Notice where honesty requires both courage and kindness.'],
 ['Midpoint','Look inward','Consider what has changed in your awareness since day one.'],
 ['Thankfulness','Recognize quiet progress','Appreciate small transformations without turning them into a scorecard.'],
 ['Balance','Care for your responsibilities','Integrate devotion with care for family, work and health.'],
 ['Compassion','Choose understanding','Make room for another person’s circumstances before judging.'],
 ['Courage','Practice what matters','Allow your values to guide one difficult but constructive choice.'],
 ['Reverence','Make ordinary acts sacred','Bring mindful attention to a routine task today.'],
 ['Quiet','Listen more deeply','Take a little time away from noise and distraction.'],
 ['Faith','Remember your purpose','What does trust mean without abandoning good judgment?'],
 ['Generosity','Give without spectacle','Offer time, attention or help in a quiet way.'],
 ['Tolerance','Respect difference','Recognize that customs and personal circumstances may vary.'],
 ['Clarity','Return to the essentials','Revisit the practices most meaningful to your vow.'],
 ['Peace','Release needless conflict','Consider how you might repair a small misunderstanding.'],
 ['Dedication','Stay sincere','A steady heart matters more than a dramatic outward display.'],
 ['Gratitude','Thank your Guru Swamy','Reflect on the guidance and support you have received.'],
 ['Preparation','Learn before the journey','Review pilgrimage procedures and questions with your guide.'],
 ['Togetherness','Honor your companions','Help others feel welcomed and respected.'],
 ['Reflection','What have you learned?','Identify one habit you hope will continue after these 41 days.'],
 ['Surrender','Let go of pride','Remember the deeper intention behind ritual and prayer.'],
 ['Compassion','Make space for others','Let your devotion show through patient and considerate behavior.'],
 ['Continuity','Carry the practice forward','Consider how the insights of Vratham can inform daily life.'],
 ['Offering','Complete with gratitude','Honor the journey with humility, prayer and guidance for the formal conclusion.']
];
const storageKey='saranam-completed-days-v1';let completed=[];try{let saved=JSON.parse(localStorage.getItem(storageKey)||'[]');completed=Array.isArray(saved)?saved.filter(n=>Number.isInteger(n)&&n>=1&&n<=41):[]}catch(e){}let selected=1;const dayGrid=document.getElementById('day-grid');
function saveProgress(){try{localStorage.setItem(storageKey,JSON.stringify(completed))}catch(e){}}
function renderDays(){dayGrid.innerHTML=reflections.map((r,i)=>{const d=i+1;return `<button class="day ${selected===d?'selected':''} ${completed.includes(d)?'done':''}" data-day="${d}" aria-label="Day ${d}: ${r[1]}${completed.includes(d)?', complete':''}" aria-pressed="${selected===d}">${String(d).padStart(2,'0')}</button>`}).join('');dayGrid.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{selected=Number(b.dataset.day);renderDays()}));const r=reflections[selected-1];document.getElementById('reflection-day').textContent=`DAY ${String(selected).padStart(2,'0')} · ${r[0].toUpperCase()}`;document.getElementById('reflection-title').textContent=r[1];document.getElementById('reflection-body').textContent=r[2];document.getElementById('completed-count').textContent=completed.length;document.getElementById('mark-day').innerHTML=completed.includes(selected)?'Mark as not completed <span>↺</span>':'Mark day complete <span>✓</span>'}
document.getElementById('mark-day').addEventListener('click',()=>{completed=completed.includes(selected)?completed.filter(d=>d!==selected):[...completed,selected].sort((a,b)=>a-b);saveProgress();renderDays()});document.getElementById('reset-progress').addEventListener('click',()=>{if(confirm('Reset all 41-day reflection progress on this device?')){completed=[];saveProgress();renderDays()}});renderDays();
const chants=[
 {en:'Swamiye Saranam Ayyappa',te:'స్వామియే శరణం అయ్యప్ప',meaning:'Lord Ayyappa, I seek refuge in you.'},
 {en:'Hariharasuthane Saranam Ayyappa',te:'హరిహరసుతనే శరణం అయ్యప్ప',meaning:'Refuge in Ayyappa, son of Hari and Hara.'},
 {en:'Manikandane Saranam Ayyappa',te:'మణికంఠనే శరణం అయ్యప్ప',meaning:'Refuge in Ayyappa, revered as Manikandan.'},
 {en:'Dharma Sasthave Saranam Ayyappa',te:'ధర్మశాస్తావే శరణం అయ్యప్ప',meaning:'Refuge in Dharma Sastha, guide of righteous living.'},
 {en:'Pandala Rajakumarane Saranam Ayyappa',te:'పందళ రాజకుమారనే శరణం అయ్యప్ప',meaning:'Refuge in the divine prince of Pandalam.'},
 {en:'Sabari Gireesane Saranam Ayyappa',te:'శబరిగిరీశనే శరణం అయ్యప్ప',meaning:'Refuge in the Lord of Sabarimala.'}
];
let useTelugu=false;try{useTelugu=localStorage.getItem('saranam-language')==='te'}catch{}
const chantItems=document.getElementById('chant-items');
const voiceNote=document.getElementById('chant-voice-note');
const ghoshaPlay=document.getElementById('ghosha-play'),ghoshaStop=document.getElementById('ghosha-stop');
const ghoshaCounter=document.getElementById('ghosha-counter'),ghoshaProgress=document.getElementById('ghosha-progress'),ghoshaFill=document.getElementById('ghosha-progress-fill');
const ghoshaSpeed=document.getElementById('ghosha-speed');
let ghoshaCurrent=-1,ghoshaRunning=false,ghoshaPaused=false,ghoshaSession=0;
const speechAvailable='speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
function voiceFor(){return speechAvailable?window.speechSynthesis.getVoices().find(v=>(useTelugu?/^te(?:[-_]|$)/i:/^en(?:[-_]|$)/i).test(v.lang)):null}
function syncVoice(){const ok=!!voiceFor();ghoshaPlay.disabled=!ok;chantItems.querySelectorAll('button[data-chant]').forEach(b=>b.disabled=!ok);if(!ghoshaRunning)voiceNote.textContent=ok?'Device voice available. Pronunciation may vary.':useTelugu?'ఈ పరికరంలో తెలుగు వాయిస్ అందుబాటులో లేదు. / No Telugu voice available. Read the invocations below.':'No compatible device voice available. Read the invocations below.';}
function renderChants(){
 chantItems.innerHTML=chants.map((c,i)=>`<div class="chant-item ${i===ghoshaCurrent?'ghosha-active':''}" id="ghosha-line-${i}" data-line="${i}"><span class="number">${String(i+1).padStart(2,'0')}</span><span class="chant-main">${useTelugu?c.te:c.en}</span><span class="chant-meaning">${useTelugu?c.en+' · ':''}${c.meaning}</span><button class="chant-listen" type="button" data-chant="${i}" aria-label="Play invocation ${i+1}">▶ Listen</button></div>`).join('');
 document.getElementById('language-toggle').setAttribute('aria-pressed',String(useTelugu));
}
function updateGhoshaUI(){
 chantItems.querySelectorAll('.chant-item').forEach((el,i)=>{
   const active=i===ghoshaCurrent&&ghoshaRunning;
   el.classList.toggle('ghosha-active',active);
   el.setAttribute('aria-current',active?'true':'false');
   const b=el.querySelector('.chant-listen');
   if(b)b.textContent=active?'♫ Playing':'▶ Listen';
 });
 const position=ghoshaCurrent>=0?ghoshaCurrent+1:0;
 ghoshaCounter.textContent=String(Math.max(1,position)).padStart(2,'0')+' / '+String(chants.length).padStart(2,'0');
 const completed=ghoshaRunning?Math.max(0,ghoshaCurrent):ghoshaCurrent<0?0:ghoshaCurrent+1;
 ghoshaProgress.setAttribute('aria-valuenow',String(completed));
 ghoshaFill.style.width=(completed/chants.length*100)+'%';
 ghoshaPlay.querySelector('span').textContent=ghoshaRunning?(ghoshaPaused?'Resume chanting':'Pause chanting'):'Play all invocations';
 ghoshaPlay.setAttribute('aria-label',ghoshaRunning?(ghoshaPaused?'Resume chanting':'Pause chanting'):'Play all Sarana Ghosha invocations');
 ghoshaPlay.firstChild.textContent=ghoshaRunning?(ghoshaPaused?'▶ ':'Ⅱ '):'▶ ';
}
function stopGhosha(message){
 ghoshaSession++;ghoshaRunning=false;ghoshaPaused=false;ghoshaCurrent=-1;
 if(speechAvailable)window.speechSynthesis.cancel();
 updateGhoshaUI();
 if(message)voiceNote.textContent=message;
}
function speakGhoshaLine(index,session,playAll){
 if(session!==ghoshaSession||!ghoshaRunning)return;
 if(index>=chants.length){
   ghoshaRunning=false;ghoshaPaused=false;ghoshaCurrent=chants.length-1;
   updateGhoshaUI();ghoshaFill.style.width='100%';ghoshaProgress.setAttribute('aria-valuenow',String(chants.length));
   voiceNote.textContent='All six invocations complete. Swamiye Saranam Ayyappa.';
   return;
 }
 ghoshaCurrent=index;updateGhoshaUI();
 const el=document.getElementById('ghosha-line-'+index);
 if(el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)el.scrollIntoView({behavior:'smooth',block:'center'});
 const item=chants[index],utterance=new SpeechSynthesisUtterance(useTelugu?item.te:item.en);
 utterance.lang=useTelugu?'te-IN':'en-IN';utterance.rate=Number(ghoshaSpeed.value);utterance.volume=1;
 const selected=voiceFor();if(!selected){stopGhosha();syncVoice();return}utterance.voice=selected;
 voiceNote.textContent='Now speaking invocation '+(index+1)+' of '+chants.length+'. Follow the highlighted text. Device pronunciation may vary.';
 utterance.onend=()=>{if(session===ghoshaSession&&ghoshaRunning){if(playAll)speakGhoshaLine(index+1,session,true);else{ghoshaRunning=false;updateGhoshaUI();ghoshaProgress.setAttribute('aria-valuenow',String(index+1));ghoshaFill.style.width=((index+1)/chants.length*100)+'%';}}};
 utterance.onerror=(ev)=>{
   if(session!==ghoshaSession||ev.error==='canceled'||ev.error==='interrupted')return;
   ghoshaRunning=false;ghoshaPaused=false;updateGhoshaUI();
   voiceNote.textContent='Voice playback failed or the required language voice is unavailable on this device.';
 };
 window.speechSynthesis.speak(utterance);
}
function beginGhosha(index,playAll){
 if(!speechAvailable){voiceNote.textContent='Speech synthesis is unavailable in this browser.';return}
 stopGhosha();
 ghoshaRunning=true;ghoshaPaused=false;const session=ghoshaSession;
 speakGhoshaLine(index,session,playAll);
}
ghoshaPlay.addEventListener('click',()=>{
 if(!ghoshaRunning){beginGhosha(0,true);return}
 if(ghoshaPaused){window.speechSynthesis.resume();ghoshaPaused=false}
 else{window.speechSynthesis.pause();ghoshaPaused=true}
 updateGhoshaUI();
});
ghoshaStop.addEventListener('click',()=>stopGhosha('Playback stopped.'));
ghoshaSpeed.addEventListener('change',()=>{if(ghoshaRunning){const line=ghoshaCurrent;beginGhosha(line,true)}});
chantItems.addEventListener('click',event=>{
 const button=event.target.closest('button[data-chant]');if(!button)return;
 const index=Number(button.dataset.chant);if(index>=0&&index<chants.length)beginGhosha(index,false);
});
document.getElementById('language-toggle').addEventListener('click',()=>{
 stopGhosha('Language changed. Press Play to hear the selected language.');
 useTelugu=!useTelugu;try{localStorage.setItem('saranam-language',useTelugu?'te':'en')}catch{}renderChants();updateGhoshaUI();syncVoice();
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&ghoshaRunning&&!ghoshaPaused){window.speechSynthesis.pause();ghoshaPaused=true;updateGhoshaUI()}});
window.addEventListener('pagehide',()=>{if(ghoshaRunning)stopGhosha()});
renderChants();updateGhoshaUI();syncVoice();
if(speechAvailable){window.speechSynthesis.addEventListener('voiceschanged',syncVoice);document.addEventListener('visibilitychange',()=>{if(document.hidden&&ghoshaRunning)stopGhosha('Playback stopped.')});const section=chantItems.closest('section');if(section&&'IntersectionObserver' in window)new IntersectionObserver(([entry])=>{if(!entry.isIntersecting&&ghoshaRunning)stopGhosha('Playback stopped.')}).observe(section);}

const nav=document.getElementById('nav'),scrollBar=document.getElementById('scroll-progress');function onScroll(){nav.classList.toggle('scrolled',window.scrollY>40);scrollBar.style.width=`${Math.min(100,(window.scrollY/(document.documentElement.scrollHeight-innerHeight))*100)}%`}window.addEventListener('scroll',onScroll,{passive:true});onScroll();
const menuToggle=document.getElementById('menu-toggle'),links=document.getElementById('nav-links');menuToggle.addEventListener('click',()=>{let open=links.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'✕':'☰'});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));
const heroVideo=document.getElementById('hero-video'),closingVideo=document.getElementById('closing-video'),motionButton=document.getElementById('motion-toggle');let motionOn=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;function applyMotion(){[heroVideo,closingVideo].forEach(v=>{if(motionOn){if(v===heroVideo||v.dataset.visible==='true')v.play().catch(()=>{})}else v.pause()});motionButton.textContent=motionOn?'Ⅱ':'▶';motionButton.setAttribute('aria-label',motionOn?'Pause background video':'Play background video')}motionButton.addEventListener('click',()=>{motionOn=!motionOn;applyMotion()});const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{closingVideo.dataset.visible=String(entry.isIntersecting);if(motionOn&&entry.isIntersecting)closingVideo.play().catch(()=>{});else closingVideo.pause()})},{threshold:.1});observer.observe(closingVideo);applyMotion();

/* Audio Sanctuary: original browser-synthesized bells, no media downloads or autoplay. */
const ambientButton=document.getElementById('ambient-toggle');
const ambientStatus=document.getElementById('audio-status');
const ambientVolume=document.getElementById('ambient-volume');
let ambientContext=null,ambientMaster=null,ambientTimer=null,ambientEnabled=false;
function soundBell(){
  if(!ambientContext||!ambientMaster||ambientContext.state!=='running')return;
  const start=ambientContext.currentTime;
  // Original bell-like partials, rather than a reproduction of a recorded composition.
  for(const [multiplier,level,decay] of [[1,.22,4.2],[2.01,.075,3],[2.98,.032,2.3],[4.07,.013,1.8]]){
    const osc=ambientContext.createOscillator(),env=ambientContext.createGain();
    osc.type='sine';osc.frequency.setValueAtTime(288*multiplier,start);
    env.gain.setValueAtTime(.0001,start);env.gain.exponentialRampToValueAtTime(level,start+.018);
    env.gain.exponentialRampToValueAtTime(.0001,start+decay);
    osc.connect(env);env.connect(ambientMaster);osc.start(start);osc.stop(start+decay+.05);
  }
}
async function startAmbience(){
  const AudioContextClass=window.AudioContext||window.webkitAudioContext;
  if(!AudioContextClass){ambientStatus.textContent='This browser does not support synthesized audio.';return}
  try{
    if(!ambientContext||ambientContext.state==='closed'){
      ambientContext=new AudioContextClass();
      ambientMaster=ambientContext.createGain();ambientMaster.connect(ambientContext.destination);
    }
    await ambientContext.resume();
    ambientMaster.gain.value=(Number(ambientVolume.value)/100)*.65;
    ambientEnabled=true;soundBell();ambientTimer=window.setInterval(soundBell,10500);
    ambientButton.setAttribute('aria-pressed','true');ambientButton.innerHTML='<span aria-hidden="true">Ⅱ</span> Pause peaceful ambience';
    ambientStatus.textContent='Playing gentle synthesized temple-inspired bells. You can pause at any time.';
  }catch(e){ambientEnabled=false;ambientStatus.textContent='Audio could not start. Please check your browser sound settings.'}
}
function stopAmbience(){
  ambientEnabled=false;
  if(ambientTimer!==null){clearInterval(ambientTimer);ambientTimer=null}
  if(ambientMaster&&ambientContext){ambientMaster.gain.setTargetAtTime(0,ambientContext.currentTime,.06)}
  ambientButton.setAttribute('aria-pressed','false');
  ambientButton.innerHTML='<span aria-hidden="true">♫</span> Play peaceful ambience';
  ambientStatus.textContent='Sound is off.';
}
ambientButton.addEventListener('click',()=>ambientEnabled?stopAmbience():startAmbience());
ambientVolume.addEventListener('input',()=>{if(ambientMaster&&ambientEnabled)ambientMaster.gain.setTargetAtTime((Number(ambientVolume.value)/100)*.65,ambientContext.currentTime,.025)});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&ambientEnabled)stopAmbience()});
window.addEventListener('pagehide',()=>{if(ambientEnabled)stopAmbience()});
