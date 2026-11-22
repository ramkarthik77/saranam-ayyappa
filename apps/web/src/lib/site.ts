export const languages=["en","te"] as const;
export type Locale=typeof languages[number];
export const sections=["pooja","prayers","deeksha","learn","pilgrimage","listen","search"] as const;
export type Section=typeof sections[number];
export const pillars=sections.slice(0,5);
export const translations={
 en:{
  app:"SARANAM",tagline:"THE AYYAPPA JOURNEY",home:"Home",search:"Search",start:"Begin your devotion",
  pretitle:"A sacred space for every day",hero:"Devotion, beautifully within reach.",
  intro:"A thoughtful companion for prayer, learning, and the Ayyappa journey.",
  noAccount:"Free to everyone. No account required.",
  actionHeader:"What would you like to do today?",recent:"Your journey, on this device",recentDetail:"Favorites, reading history and Deeksha activity will remain private to your device when enabled.",
  startPooja:"Start Pooja",read:"Read Prayers",listen:"Listen",deeksha:"My Deeksha",
  pooja:"Pooja",prayers:"Prayers",learn:"Learn",pilgrimage:"Pilgrimage",
  poojaIntro:"Source-reviewed morning, evening, Deeksha and Bhiksha guidance, presented at your own pace.",
  prayersIntro:"Verified editions with clear sources and tradition labels. No invented or copied lyrics.",
  deekshaIntro:"A private 41-day companion with self-attested progress and meaningful reflection.",
  learnIntro:"Explore Lord Ayyappa through sourced guides and cinematic storytelling.",
  pilgrimageIntro:"Prepare for Sabarimala with evergreen guidance and links to official sources.",
  listenIntro:"A home for authentic, permission-cleared human devotional recordings.",
  searchIntro:"Find prayers, guides and journeys in English or Telugu.",
  review:"Editorial review in progress",draft:"This v1 experience is under construction. Sacred texts and recordings will appear only after rights and independent review.",
  morning:"Morning Pooja",evening:"Evening Pooja",bhiksha:"Bhiksha",journey:"Deeksha daily routine",sarana:"108 Sarana Ghosha",
  rights:"Rights-cleared text required",audioEmpty:"No licensed recordings have been approved for publication.",
  filter:"Search topics and sections",searchAction:"Search",searchHelp:"Try pooja, deeksha, bhiksha, prayers, or Sabarimala. Full prayer search arrives with approved text.",
  provenance:"Only reviewed, publication-safe materials appear in this site.",official:"Official information should be checked with the relevant temple authorities.",
  motion:"Reduce motion",footer:"Independent devotional project · Not an official temple website",
  language:"Language",soon:"Content awaiting verification",none:"No matches. Try another term.",
  explore:"Explore the five pillars",quick:"Daily shortcuts",go:"Explore",notReady:"Not yet approved for release",
 },
 te:{
  app:"SARANAM",tagline:"అయ్యప్ప స్వామి యాత్ర",home:"హోమ్",search:"వెతకండి",start:"మీ భక్తి ప్రయాణం",
  pretitle:"ప్రతి రోజూ భక్తికి ఒక స్థలం",hero:"భక్తికి సులభమైన మార్గం.",
  intro:"పూజ, ప్రార్థనలు, అయ్యప్ప స్వామి గురించి తెలుసుకోవడానికి ఒక వేదిక.",
  noAccount:"అందరికీ ఉచితం. ఖాతా అవసరం లేదు.",
  actionHeader:"ఈ రోజు మీరు ఏమి చేయాలనుకుంటున్నారు?",recent:"ఈ పరికరంలో మీ ప్రయాణం",recentDetail:"ఇష్టమైనవి, చదివిన వివరాలు, దీక్ష సమాచారం మీ పరికరంలోనే ఉంటాయి.",
  startPooja:"పూజ ప్రారంభించండి",read:"ప్రార్థనలు చదవండి",listen:"వినండి",deeksha:"నా దీక్ష",
  pooja:"పూజ",prayers:"ప్రార్థనలు",learn:"తెలుసుకోండి",pilgrimage:"యాత్ర",
  poojaIntro:"ఉదయం, సాయంత్రం, దీక్ష మరియు భిక్షకు సంబంధించిన సమీక్షించిన మార్గదర్శకాలు.",
  prayersIntro:"ఆధారాలు మరియు సంప్రదాయ వివరాలతో ధృవీకరించిన ప్రార్థనా పాఠాలు.",
  deekshaIntro:"మీ వ్యక్తిగత 41 రోజుల దీక్ష ప్రయాణం కోసం సహాయక వేదిక.",
  learnIntro:"ఆధారాలతో కూడిన కథలు, మార్గదర్శకాల ద్వారా అయ్యప్ప స్వామిని తెలుసుకోండి.",
  pilgrimageIntro:"శబరిమల యాత్ర సిద్ధత, సంప్రదాయాలు, అధికారిక సమాచారానికి లింకులు.",
  listenIntro:"అనుమతులు పొందిన భక్తి ఆడియోల కోసం ప్రత్యేక స్థలం.",
  searchIntro:"తెలుగు లేదా ఆంగ్లంలో ప్రార్థనలు, మార్గదర్శకాలను వెతకండి.",
  review:"సమీక్ష కొనసాగుతోంది",draft:"ఈ విభాగం నిర్మాణంలో ఉంది. ధృవీకరణ, అనుమతుల తర్వాతే పాఠాలు మరియు ఆడియో అందుబాటులో ఉంటాయి.",
  morning:"ఉదయం పూజ",evening:"సాయంత్రం పూజ",bhiksha:"భిక్ష",journey:"దీక్ష దినచర్య",sarana:"108 శరణ ఘోష",
  rights:"పాఠానికి అనుమతి అవసరం",audioEmpty:"ప్రచురణ కోసం అనుమతి పొందిన ఆడియోలు ఇంకా అందుబాటులో లేవు.",
  filter:"విభాగాలను వెతకండి",searchAction:"వెతకండి",searchHelp:"పూజ, దీక్ష, భిక్ష, ప్రార్థనలు లేదా శబరిమల అని ప్రయత్నించండి.",
  provenance:"సమీక్షించి అనుమతి పొందిన సమాచారమే ప్రచురించబడుతుంది.",official:"తాజా సమాచారం కోసం ఆలయ అధికారిక వనరులను పరిశీలించండి.",
  motion:"కదలిక తగ్గించండి",footer:"స్వతంత్ర భక్తి వేదిక · అధికారిక ఆలయ వెబ్‌సైట్ కాదు",
  language:"భాష",soon:"ధృవీకరణ కోసం వేచి ఉంది",none:"ఫలితాలు లేవు. మరో పదం ప్రయత్నించండి.",
  explore:"ఐదు ప్రధాన విభాగాలు",quick:"రోజువారీ సేవలు",go:"చూడండి",notReady:"ప్రచురణకు ఇంకా ఆమోదం లేదు",
 }
} as const;
export const sectionSubtitle={
 en:{pooja:"Guided prayer • Trusted sequence",prayers:"Verified editions • Sacred words",deeksha:"41 days • Your personal practice",learn:"Sacred knowledge • Stories",pilgrimage:"Preparation • Tradition",listen:"Human recordings • With permission",search:"Find what matters"},
 te:{pooja:"మార్గదర్శక పూజ • సంప్రదాయం",prayers:"ధృవీకరించిన పాఠాలు",deeksha:"41 రోజులు • మీ దీక్ష",learn:"కథలు • జ్ఞానం",pilgrimage:"సిద్ధత • సంప్రదాయం",listen:"అనుమతులతో కూడిన ఆడియో",search:"మీకు కావలసినది వెతకండి"}
} as const;
export const sectionTitle=(lang:Locale,section:Section):string=>translations[lang][section];
export const sectionIntro=(lang:Locale,section:Section):string=>translations[lang][(section+"Intro") as keyof typeof translations.en] || "";
export const path=(lang:Locale,section:Section)=>"/"+lang+"/"+section+"/";
