/* ==========================================================================
   FUNDSLEUTH INTERNATIONALIZATION ENGINE (12 INDIAN LANGUAGES)
   Provides centralized translation, financial terminology dictionary,
   and locale-aware formatting for Bharat-first accessibility.
   ========================================================================== */

const I18nEngine = {
    currentLang: localStorage.getItem('fundsleuth_lang') || 'en',

    languages: [
        { code: 'en', name: 'English', native: 'English', voiceCode: 'en-IN' },
        { code: 'hi', name: 'Hindi', native: 'हिंदी', voiceCode: 'hi-IN' },
        { code: 'bn', name: 'Bengali', native: 'বাংলা', voiceCode: 'bn-IN' },
        { code: 'mr', name: 'Marathi', native: 'मराठी', voiceCode: 'mr-IN' },
        { code: 'te', name: 'Telugu', native: 'తెలుగు', voiceCode: 'te-IN' },
        { code: 'ta', name: 'Tamil', native: 'தமிழ்', voiceCode: 'ta-IN' },
        { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', voiceCode: 'gu-IN' },
        { code: 'ur', name: 'Urdu', native: 'اردو', voiceCode: 'ur-IN' },
        { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', voiceCode: 'kn-IN' },
        { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', voiceCode: 'or-IN' },
        { code: 'ml', name: 'Malayalam', native: 'മലയാളം', voiceCode: 'ml-IN' },
        { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', voiceCode: 'pa-IN' }
    ],

    translations: {
        en: {
            brandName: 'FundSleuth',
            tagline: 'Know What You Own.',
            subTagline: 'FundSleuth helps Indian investors understand portfolio overlap, hidden costs, concentration, fund risk and market developments — in the language they understand.',
            heroSecondary: 'Research. Understand. Decide.',
            navHome: 'Home',
            navExplore: 'Explore Funds',
            navCompareFunds: 'Compare Funds',
            navComparePlatforms: 'Compare Platforms',
            navTopResearch: 'Top Research',
            navNews: 'News',
            navFinder: 'Fund Finder',
            navSafety: 'Safety Center',
            navDemo: 'Judge Demo',
            darkMode: 'Dark Mode',
            audioOverview: 'Audio Overview',
            launchXray: 'Launch X-Ray',
            listenSummary: 'Listen to Summary',
            simpleMode: 'Simple Mode',
            lowBandwidth: 'Low Bandwidth',
            scamAnalyzer: 'Scam & Scam Tip Analyzer',
            signedIn: 'Signed in',
            guest: 'Guest Investor',
            signIn: 'Sign In',
            signOut: 'Sign Out',
            navTitle: 'NAV (Net Asset Value)',
            aumTitle: 'AUM (Assets Under Management)',
            expenseRatioTitle: 'Expense Ratio (व्यय अनुपात)',
            overlapTitle: 'Portfolio Overlap',
            volatilityTitle: 'Volatility (उतार-चढ़ाव)',
            sharpeTitle: 'Sharpe Ratio',
            safetyDisclaimer: 'FundSleuth is an informational portfolio safety tool. It does not provide stock tips, buy recommendations, or return guarantees.',
            explainExpenseRatio: 'Expense ratio is the annual fee charged by the mutual fund to manage your money. Lower expense ratios mean more wealth remains with you over time.',
            explainOverlap: 'Portfolio overlap occurs when two or more mutual funds in your portfolio hold the exact same stocks, reducing diversification benefits.',
            explainSharpe: 'Sharpe ratio measures how much excess return a fund delivers for the risk it takes. A higher Sharpe ratio indicates better risk-adjusted performance.'
        },
        hi: {
            brandName: 'FundSleuth (फंडस्लीथ)',
            tagline: 'जानें कि आपका पैसा कहां लगा है।',
            subTagline: 'FundSleuth भारतीय निवेशकों को पोर्टफोलियो ओवरलैप, छिपी लागतों, जोखिम और बाजार की घटनाओं को उनकी अपनी भाषा में समझने में मदद करता है।',
            heroSecondary: 'शोध करें। समझें। निर्णय लें।',
            navHome: 'होम',
            navExplore: 'फंड्स खोजें',
            navCompareFunds: 'फंड्स तुलना',
            navComparePlatforms: 'प्लेटफॉर्म तुलना',
            navTopResearch: 'टॉप रिसर्च',
            navNews: 'बाजार समाचार',
            navFinder: 'फंड फाइंडर',
            navSafety: 'सुरक्षा केंद्र',
            navDemo: 'जज डेमो',
            darkMode: 'डार्क मोड',
            audioOverview: 'ऑडियो सारांश',
            launchXray: 'एक्स-रे शुरू करें',
            listenSummary: 'सारांश सुनें',
            simpleMode: 'सरल भाषा',
            lowBandwidth: 'कम डेटा मोड',
            scamAnalyzer: 'ठगी / फ्रॉड जांच',
            signedIn: 'लॉग इन हैं',
            guest: 'अतिथि निवेशक',
            signIn: 'साइन इन',
            signOut: 'साइन आउट',
            navTitle: 'NAV (एनईवी / शुद्ध संपत्ति मूल्य)',
            aumTitle: 'AUM (कुल प्रबंधित संपत्ति)',
            expenseRatioTitle: 'व्यय अनुपात (Expense Ratio)',
            overlapTitle: 'पोर्टफोलियो ओवरलैप (दोहराव)',
            volatilityTitle: 'जोखिम / उतार-चढ़ाव (Volatility)',
            sharpeTitle: 'शार्प रेशियो (Sharpe Ratio)',
            safetyDisclaimer: 'FundSleuth एक सूचनात्मक पोर्टफोलियो सुरक्षा टूल है। यह स्टॉक टिप या गारंटीकृत रिटर्न का दावा नहीं करता है।',
            explainExpenseRatio: 'व्यय अनुपात (Expense Ratio) वह वार्षिक शुल्क है जो म्यूचुअल फंड आपके पैसे का प्रबंधन करने के लिए लेता है। कम व्यय अनुपात का मतलब है कि लंबी अवधि में आपका अधिक पैसा बचेगा।',
            explainOverlap: 'पोर्टफोलियो ओवरलैप तब होता है जब आपके दो या अधिक म्यूचुअल फंड बिल्कुल एक ही कंपनियों के शेयर रखते हैं, जिससे विविधता का लाभ कम हो जाता है।',
            explainSharpe: 'शार्प रेशियो यह मापता है कि किसी फंड ने लिए गए जोखिम की तुलना में कितना अतिरिक्त रिटर्न दिया। उच्च शार्प रेशियो बेहतर जोखिम-समायोजित प्रदर्शन को दर्शाता है।'
        },
        bn: {
            brandName: 'FundSleuth (ফান্ডস্লুথ)',
            tagline: 'জানুন আপনার বিনিয়োগ কোথায় আছে।',
            subTagline: 'FundSleuth ভারতীয় বিনিয়োগকারীদের পোর্টফোলিও ওভারল্যাপ, লুকানো খরচ এবং ঝুঁকি তাদের নিজস্ব ভাষায় বুঝতে সাহায্য করে।',
            heroSecondary: 'গবেষণা করুন। বুঝুন। সিদ্ধান্ত নিন।',
            navHome: 'হোম',
            navExplore: 'ফান্ড খুঁজুন',
            navCompareFunds: 'ফান্ড তুলনা',
            navComparePlatforms: 'প্ল্যাটফর্ম তুলনা',
            navTopResearch: 'সেরা গবেষণা',
            navNews: 'সংবাদ',
            navFinder: 'ফান্ড ফাইন্ডার',
            navSafety: 'সুরক্ষা কেন্দ্র',
            navDemo: 'ডেমো',
            darkMode: 'ডার্ক মোড',
            audioOverview: 'অডিও সারসংক্ষেপ',
            launchXray: 'এক্স-রে চালু করুন',
            listenSummary: 'শুনুন',
            simpleMode: 'সহজ ভাষা',
            lowBandwidth: 'কম ডাটা মোড',
            scamAnalyzer: 'ফ্রড যাচাইকারী',
            signedIn: 'সাইন ইন করা আছে',
            guest: 'অতিথি বিনিয়োগকারী',
            signIn: 'সাইন ইন',
            signOut: 'সাইন আউট',
            navTitle: 'NAV (এনএভি)',
            aumTitle: 'AUM (মোট সম্পদ)',
            expenseRatioTitle: 'ব্যয় অনুপাত (Expense Ratio)',
            overlapTitle: 'পোর্টফোলিও ওভারল্যাপ',
            volatilityTitle: 'ঝুঁকি ও ওঠানামা',
            sharpeTitle: 'শার্প অনুপাত',
            safetyDisclaimer: 'FundSleuth একটি তথ্যমূলক পোর্টফোলিও নিরাপত্তা সরঞ্জাম। এটি কোনো স্টকের টিপস বা রিটার্নের নিশ্চয়তা দেয় না।',
            explainExpenseRatio: 'ব্যয় অনুপাত (Expense Ratio) হল বার্ষিক ফি যা মিউচুয়াল ফান্ড আপনার অর্থ পরিচালনার জন্য নেয়। কম ব্যয় অনুপাত মানে দীর্ঘমেয়াদে আপনার বেশি অর্থ সঞ্চয় হয়।',
            explainOverlap: 'পোর্টফোলিও ওভারল্যাপ ঘটে যখন আপনার দুটি বা ততোধিক ফান্ড একই শেয়ারে বিনিয়োগ করে।',
            explainSharpe: 'শার্প অনুপাত পরিমাপ করে যে একটি ফান্ড নেওয়া ঝুঁকির তুলনায় কত রিটার্ন দিয়েছে।'
        },
        mr: {
            brandName: 'FundSleuth (फंडस्लीथ)',
            tagline: 'तुमची गुंतवणूक कुठे आहे हे जाणून घ्या.',
            subTagline: 'FundSleuth भारतीय गुंतवणूकदारांना पोर्टफोलिओ ओव्हरलॅप, लपलेले खर्च आणि जोखीम त्यांच्या स्वतःच्या भाषेत समजून घेण्यास मदत करते.',
            heroSecondary: 'संशोधन करा. समजा. निर्णय घ्या.',
            navHome: 'होम',
            navExplore: 'फंड शोधा',
            navCompareFunds: 'फंड तुलना',
            navComparePlatforms: 'प्लॅटफॉर्म तुलना',
            navTopResearch: 'टॉप रिसर्च',
            navNews: 'बातम्या',
            navFinder: 'फंड फायंडर',
            navSafety: 'सुरक्षा केंद्र',
            navDemo: 'डेमो',
            darkMode: 'डार्क मोड',
            audioOverview: 'ऑडिओ सारांश',
            launchXray: 'एक्स-रे सुरू करा',
            listenSummary: 'सारांश ऐका',
            simpleMode: 'सोपी भाषा',
            lowBandwidth: 'कमी डेटा मोड',
            scamAnalyzer: 'फसवणूक तपासक',
            signedIn: 'लॉगिन आहात',
            guest: 'पाहुणे गुंतवणूकदार',
            signIn: 'साइन इन',
            signOut: 'साइन आऊट',
            navTitle: 'NAV (शुद्ध मालमत्ता मूल्य)',
            aumTitle: 'AUM (एकूण व्यवस्थापित मालमत्ता)',
            expenseRatioTitle: 'खर्च गुणोत्तर (Expense Ratio)',
            overlapTitle: 'पोर्टफोलिओ ओव्हरलॅप',
            volatilityTitle: 'उतार-चढाव (Volatility)',
            sharpeTitle: 'शार्प गुणोत्तर (Sharpe Ratio)',
            safetyDisclaimer: 'FundSleuth हे माहितीपूर्ण पोर्टफोलिओ सुरक्षा साधन आहे. हे स्टॉक टिप्स किंवा परताव्याची हमी देत नाही.',
            explainExpenseRatio: 'खर्च गुणोत्तर (Expense Ratio) म्हणजे तुमचे पैसे व्यवस्थापित करण्यासाठी म्युच्युअल फंडाने आकारलेले वार्षिक शुल्क.',
            explainOverlap: 'पोर्टफोलिओ ओव्हरलॅप म्हणजे जेव्हा तुमच्या दोन किंवा अधिक फंडांमध्ये समान कंपन्यांचे शेअर्स असतात.',
            explainSharpe: 'शार्प गुणोत्तर हे दर्शवते की फंडाने घेतलेल्या जोखमीच्या तुलनेत किती परतावा दिला.'
        },
        te: {
            brandName: 'FundSleuth (ఫండ్స్లూత్)',
            tagline: 'మీ పెట్టుబడుల గురించి వివరంగా తెలుసుకోండి.',
            subTagline: 'FundSleuth భారతీయ పెట్టుబడిదారులకు పోర్ట్‌ఫోలియో అతివ్యాప్తి (Overlap), దాగి ఉన్న ఖర్చులు మరియు ప్రమాదాలను వారి స్వంత భాషలో అర్థం చేసుకోవడానికి సహాయపడుతుంది.',
            heroSecondary: 'పరిశోధించండి. అర్థం చేసుకోండి. నిర్ణయించండి.',
            navHome: 'హోమ్',
            navExplore: 'ఫండ్లను అన్వేషించండి',
            navCompareFunds: 'ఫండ్ల పోలిక',
            navComparePlatforms: 'ప్లాట్‌ఫారమ్‌ల పోలిక',
            navTopResearch: 'టాప్ రీసెర్చ్',
            navNews: 'వార్తలు',
            navFinder: 'ఫండ్ ఫైండర్',
            navSafety: 'రక్షణ కేంద్రం',
            navDemo: 'డెమో',
            darkMode: 'డార్క్ మోడ్',
            audioOverview: 'ఆడియో సారాంశం',
            launchXray: 'ఎక్స్-రే ప్రారంభించండి',
            listenSummary: 'సారాంశం వినండి',
            simpleMode: 'సులభమైన భాష',
            lowBandwidth: 'తక్కువ డేటా మోడ్',
            scamAnalyzer: 'మోసం తనిఖీ సాధనం',
            signedIn: 'సైన్ ఇన్ అయ్యారు',
            guest: 'అతిథి పెట్టుబడిదారు',
            signIn: 'సైన్ ఇన్',
            signOut: 'సైన్ అవుట్',
            navTitle: 'NAV (నికర ఆస్తి విలువ)',
            aumTitle: 'AUM (మొత్తం నిర్వహణ ఆస్తులు)',
            expenseRatioTitle: 'ఖర్చు నిష్పత్తి (Expense Ratio)',
            overlapTitle: 'పోర్ట్‌ఫోలియో ఓవర్‌ల్యాప్',
            volatilityTitle: 'ప్రమాదం & మార్పులు',
            sharpeTitle: 'షార్ప్ నిష్పత్తి',
            safetyDisclaimer: 'FundSleuth అనేది ఒక సమాచార పోర్ట్‌ఫోలియో భద్రతా సాధనం. ఇది స్టాక్ టిప్స్ లేదా రిటర్న్ గ్యారెంటీలను అందించదు.',
            explainExpenseRatio: 'ఎక్స్‌పెన్స్ రేషియో అనేది మీ నిధులను నిర్వహించడానికి మ్యూచువల్ ఫండ్ వసూలు చేసే వార్షిక రుసుము.',
            explainOverlap: 'మీ వద్ద ఉన్న రెండు లేదా అంతకంటే ఎక్కువ ఫండ్లలో ఒకే రకమైన స్టాక్‌లు ఉన్నప్పుడు ఓవర్‌ల్యాప్ జరుగుతుంది.',
            explainSharpe: 'షార్ప్ నిష్పత్తి అనేది తీసుకున్న ప్రమాదానికి అనుగుణంగా ఫండ్ ఎంత లాభాన్ని ఇచ్చిందో కొలుస్తుంది.'
        },
        ta: {
            brandName: 'FundSleuth (ஃபண்ட்ஸ்லூத்)',
            tagline: 'உங்கள் முதலீட்டைப் பற்றி தெளிவாக அறியவும்.',
            subTagline: 'இந்திய முதலீட்டாளர்கள் தங்கள் போர்ட்ஃபோலியோ ஒன்றுடன் ஒன்று சேருதல், மறைமுகக் கட்டணங்கள் மற்றும் ஆபத்துகளைத் தாய்மொழியில் புரிந்துகொள்ள FundSleuth உதவுகிறது.',
            heroSecondary: 'ஆராயுங்கள். புரிந்துகொள்ளுங்கள். தீர்மானியுங்கள்.',
            navHome: 'முகப்பு',
            navExplore: 'ஃபண்டுகளை ஆராய்க',
            navCompareFunds: 'ஃபண்ட் ஒப்பீடு',
            navComparePlatforms: 'தளங்கள் ஒப்பீடு',
            navTopResearch: 'சிறந்த ஆராய்ச்சி',
            navNews: 'செய்திகள்',
            navFinder: 'ஃபண்ட் ஃபைண்டர்',
            navSafety: 'பாதுகாப்பு மையம்',
            navDemo: 'டெமோ',
            darkMode: 'டார்க் மோட்',
            audioOverview: 'ஆடியோ சுருக்கம்',
            launchXray: 'எக்ஸ்-ரே தொடங்கவும்',
            listenSummary: 'கேளுங்கள்',
            simpleMode: 'எளிய மொழி',
            lowBandwidth: 'குறைந்த டேட்டா মোட்',
            scamAnalyzer: 'மோசடி கண்டறிதல்',
            signedIn: 'உள்நுழைந்துள்ளீர்கள்',
            guest: 'விருந்தினர்',
            signIn: 'உள்நுழைக',
            signOut: 'வெளியேறு',
            navTitle: 'NAV (நிகர சொத்து மதிப்பு)',
            aumTitle: 'AUM (நிர்வகிக்கப்படும் சொத்துக்கள்)',
            expenseRatioTitle: 'செலவு விகிதம் (Expense Ratio)',
            overlapTitle: 'போர்ட்ஃபோலியோ ஓவர்லேப்',
            volatilityTitle: 'சந்தை ஏற்ற இறக்கம்',
            sharpeTitle: 'ஷார்ப் விகிதம்',
            safetyDisclaimer: 'FundSleuth ஒரு தகவல் போர்ட்ஃபோலியோ பாதுகாப்பு கருவியாகும். இது பங்கு குறிப்புகள் அல்லது லாப உத்தரவாதத்தை வழங்காது.',
            explainExpenseRatio: 'செலவு விகிதம் (Expense Ratio) என்பது உங்கள் பணத்தை நிர்வகிக்க பரஸ்பர நிதி வசூலிக்கும் ஆண்டுக் கட்டணமாகும்.',
            explainOverlap: 'உங்கள் இரண்டு அல்லது அதற்கு மேற்பட்ட ஃபண்டுகளில் ஒரே பங்குகள் இருக்கும்போது ஓவர்லேப் ஏற்படுகிறது.',
            explainSharpe: 'ஷார்ப் விகிதம் என்பது எடுத்த ஆபத்திற்கு ஏற்ப ஃபண்ட் எவ்வளவு லாபம் தந்தது என்பதை அளவிடுகிறது.'
        },
        gu: {
            brandName: 'FundSleuth (ફંડસ્લૂથ)',
            tagline: 'જાણો તમારું રોકાણ ક્યાં છે.',
            subTagline: 'FundSleuth ભારતીય રોકાણકારોને પોર્ટફોલિયો ઓવરલેપ, છુપાયેલા ખર્ચ અને જોખમો તેમની પોતાની ભાષામાં સમજવામાં મદદ કરે છે.',
            heroSecondary: 'સંશોધન કરો. સમજો. નિર્ણય લો.',
            navHome: 'હોમ',
            navExplore: 'ફંડ શોધો',
            navCompareFunds: 'ફંડ સરખામણી',
            navComparePlatforms: 'પ્લેટફોર્મ સરખામણી',
            navTopResearch: 'ટોપ રિસર્ચ',
            navNews: 'સમાચાર',
            navFinder: 'ફંડ ફાઇન્ડર',
            navSafety: 'સુરક્ષા કેન્દ્ર',
            navDemo: 'ડેમો',
            darkMode: 'ડાર્ક મોડ',
            audioOverview: 'ઓડિયો સારાંશ',
            launchXray: 'એક્સ-રે શરૂ કરો',
            listenSummary: 'સારાંશ સાંભળો',
            simpleMode: 'સરળ ભાષા',
            lowBandwidth: 'ઓછું ડેટા મોડ',
            scamAnalyzer: 'છેતરપિંડી તપાસક',
            signedIn: 'લોગિન છો',
            guest: 'મહેમાન રોકાણકાર',
            signIn: 'સાઇન ઇન',
            signOut: 'સાઇન આઉટ',
            navTitle: 'NAV (એનએવી)',
            aumTitle: 'AUM (કુલ સંપત્તિ)',
            expenseRatioTitle: 'ખર્ચ ગુણોત્તર (Expense Ratio)',
            overlapTitle: 'પોર્ટફોલિયો ઓવરલેપ',
            volatilityTitle: 'ઉતાર-ચઢાવ (Volatility)',
            sharpeTitle: 'શાર્પ ગુણોત્તર',
            safetyDisclaimer: 'FundSleuth એ માત્ર માહિતીપ્રદ પોર્ટફોલિયો સુરક્ષા સાધન છે. તે કોઈપણ સ્ટોક ટીપ્સ કે રિટર્નની ગેરંટી આપતું નથી.',
            explainExpenseRatio: 'ખર્ચ ગુણોત્તર (Expense Ratio) એ મ્યુચ્યુઅલ ફંડ દ્વારા તમારા પૈસાનું સંચાલન કરવા માટે લેવાતી વાર્ષિક ફી છે.',
            explainOverlap: 'જ્યારે તમારા બે કે તેથી વધુ ફંડ્સ સમાન કંપનીઓના શેર ધરાવે છે ત્યારે પોર્ટફોલિયો ઓવરલેપ થાય છે.',
            explainSharpe: 'શાર્પ ગુણોત્તર દર્શાવે છે કે ફંડે લીધેલા જોખમની સરખામણીમાં કેટલું રિટર્ન આપ્યું છે.'
        },
        ur: {
            brandName: 'FundSleuth (فنڈ سلیوتھ)',
            tagline: 'جانیں کہ آپ کا سرمایہ کہاں لگا ہے۔',
            subTagline: 'FundSleuth ہندوستانی سرمایہ کاروں کو پورٹ فولیو اورلیپ، پوشیدہ اخراجات اور خطرات کو ان کی اپنی زبان میں سمجھنے میں مدد کرتا ہے۔',
            heroSecondary: 'تحقیق کریں۔ سمجھیں۔ فیصلہ کریں۔',
            navHome: 'ہوم',
            navExplore: 'فنڈز تلاش کریں',
            navCompareFunds: 'فنڈز کا موازنہ',
            navComparePlatforms: 'پلیٹ فارمز کا موازنہ',
            navTopResearch: 'ٹاپ ریسرچ',
            navNews: 'خبریں',
            navFinder: 'فنڈ فائنڈر',
            navSafety: 'سیفٹی سینٹر',
            navDemo: 'ڈیمو',
            darkMode: 'ڈارک موڈ',
            audioOverview: 'آڈیو خلاصہ',
            launchXray: 'ایکس رے شروع کریں',
            listenSummary: 'خلاصہ سنیں',
            simpleMode: 'آسان زبان',
            lowBandwidth: 'کم ڈیٹا موڈ',
            scamAnalyzer: 'فراڈ کی جانچ',
            signedIn: 'سائن ان ہیں',
            guest: 'مہمان سرمایہ کار',
            signIn: 'سائن ان',
            signOut: 'سائن آؤٹ',
            navTitle: 'NAV (این اے وی)',
            aumTitle: 'AUM (کل اثاثے)',
            expenseRatioTitle: 'اخراجات کا تناسب (Expense Ratio)',
            overlapTitle: 'پورٹ فولیو اورلیپ',
            volatilityTitle: 'اتار چڑھاؤ (Volatility)',
            sharpeTitle: 'شارپ ریشو',
            safetyDisclaimer: 'FundSleuth پورٹ فولیو کی حفاظت کا ایک معلوماتی ٹول ہے۔ یہ اسٹاک ٹپس یا منافع کی ضمانت نہیں دیتا۔',
            explainExpenseRatio: 'اخراجات کا تناسب وہ سالانہ فیس ہے جو میوچل فنڈ آپ کی رقم کا بندوبست کرنے کے لیے لیتا ہے۔',
            explainOverlap: 'پورٹ فولیو اورلیپ تب ہوتا ہے جب آپ کے دو یا زیادہ فنڈز ایک ہی کمپنیوں کے شیئرز میں سرمایہ کاری کرتے ہیں۔',
            explainSharpe: 'شارپ ریشو بتاتا ہے کہ فنڈ نے لیے گئے خطرے کے مقابلے میں کتنا منافع دیا۔'
        },
        kn: {
            brandName: 'FundSleuth (ಫಂಡ್ಸ್‌ಲೂತ್)',
            tagline: 'ನಿಮ್ಮ ಹೂಡಿಕೆಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ತಿಳಿದುಕೊಳ್ಳಿ.',
            subTagline: 'FundSleuth ಭಾರತೀಯ ಹೂಡಿಕೆದಾರರಿಗೆ ಪೋರ್ಟ್‌ಫೋಲಿಯೋ ಓವರ್‌ಲ್ಯಾಪ್, ಅಡಗಿರುವ ವೆಚ್ಚಗಳು ಮತ್ತು ಅಪಾಯಗಳನ್ನು ಅವರದೇ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
            heroSecondary: 'ಸಂಶೋಧಿಸಿ. ಅರ್ಥೈಸಿಕೊಳ್ಳಿ. ನಿರ್ಧರಿಸಿ.',
            navHome: 'ಹೋಮ್',
            navExplore: 'ಫಂಡ್‌ಗಳನ್ನು ಹುಡುಕಿ',
            navCompareFunds: 'ಫಂಡ್‌ಗಳ ಹೋಲಿಕೆ',
            navComparePlatforms: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳ ಹೋಲಿಕೆ',
            navTopResearch: 'ಟಾಪ್ ರಿಸರ್ಚ್',
            navNews: 'ಸುದ್ದಿ',
            navFinder: 'ಫಂಡ್ ಫೈಂಡರ್',
            navSafety: 'ಸುರಕ್ಷತಾ ಕೇಂದ್ರ',
            navDemo: 'ಡೆಮೊ',
            darkMode: 'ಡಾರ್ಕ್ ಮೋಡ್',
            audioOverview: 'ಆಡಿಯೋ ಸಾರಾಂಶ',
            launchXray: 'ಎಕ್ಸ್-ರೇ ಪ್ರಾರಂಭಿಸಿ',
            listenSummary: 'ಸಾರಾಂಶ ಆಲಿಸಿ',
            simpleMode: 'ಸರಳ ಭಾಷೆ',
            lowBandwidth: 'ಕಡಿಮೆ ಡೇಟಾ ಮೋಡ್',
            scamAnalyzer: 'ವಂಚನೆ ತನಿಖಾ ಸಾಧನ',
            signedIn: 'ಸೈನ್ ಇನ್ ಆಗಿದ್ದೀರಿ',
            guest: 'ಅತಿಥಿ ಹೂಡಿಕೆದಾರ',
            signIn: 'ಸೈನ್ ಇನ್',
            signOut: 'ಸೈನ್ ಔಟ್',
            navTitle: 'NAV (ನಿವ್ವಳ ಆಸ್ತಿ ಮೌಲ್ಯ)',
            aumTitle: 'AUM (ಒಟ್ಟು ನಿರ್ವಹಣಾ ಆಸ್ತಿ)',
            expenseRatioTitle: 'ವೆಚ್ಚದ ಅನುಪಾತ (Expense Ratio)',
            overlapTitle: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೋ ಓವರ್‌ಲ್ಯಾಪ್',
            volatilityTitle: 'ಏರಿಳಿತ (Volatility)',
            sharpeTitle: 'ಶಾರ್ಪ್ ಅನುಪಾತ',
            safetyDisclaimer: 'FundSleuth ಎನ್ನುವುದು ಮಾಹಿತಿಯುಕ್ತ ಭದ್ರತಾ ಸಾಧನವಾಗಿದೆ. ಇದು ಸ್ಟಾಕ್ ಟಿಪ್ಸ್ ಅಥವಾ ಲಾಭದ ಖಾತರಿಯನ್ನು ನೀಡುವುದಿಲ್ಲ.',
            explainExpenseRatio: 'ವೆಚ್ಚದ ಅನುಪಾತ (Expense Ratio) ಎಂಬುದು ನಿಮ್ಮ ಹಣವನ್ನು ನಿರ್ವಹಿಸಲು ಮ್ಯೂಚುವಲ್ ಫಂಡ್ ವಿಧಿಸುವ ವಾರ್ಷಿಕ ಶುಲ್ಕವಾಗಿದೆ.',
            explainOverlap: 'ನಿಮ್ಮಲ್ಲಿರುವ ಎರಡು ಅಥವಾ ಹೆಚ್ಚಿನ ಫಂಡ್‌ಗಳು ಒಂದೇ ರೀತಿಯ ಷೇರುಗಳಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಿದಾಗ ಓವರ್‌ಲ್ಯಾಪ್ ಸಂಭವಿಸುತ್ತದೆ.',
            explainSharpe: 'ಶಾರ್ಪ್ ಅನುಪಾತವು ತೆಗೆದುಕೊಂಡ ಅಪಾಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಫಂಡ್ ಎಷ್ಟು ಲಾಭವನ್ನು ನೀಡಿದೆ ಎಂಬುದನ್ನು ಅಳೆಯುತ್ತದೆ.'
        },
        or: {
            brandName: 'FundSleuth (ଫଣ୍ଡସ୍ଲୁଥ୍)',
            tagline: 'ଜାଣନ୍ତୁ ଆପଣଙ୍କର ନିବେଶ କେଉଁଠାରେ ଅଛି।',
            subTagline: 'FundSleuth ଭାରତୀୟ ନିବେଶକମାନଙ୍କୁ ପୋର୍ଟଫୋଲିଓ ଓଭରଲ୍ୟାପ୍, ଗୁପ୍ତ ଖର୍ଚ୍ଚ ଏବଂ ବିପଦକୁ ସେମାନଙ୍କର ନିଜ ଭାଷାରେ ବୁଝିବାରେ ସାହାଯ୍ୟ କରେ।',
            heroSecondary: 'ଗବେଷଣା କରନ୍ତୁ। ବୁଝନ୍ତୁ। ନିଷ୍ପତ୍ତି ନିଅନ୍ତୁ।',
            navHome: 'ହୋମ୍',
            navExplore: 'ଫଣ୍ଡ ଖୋଜନ୍ତୁ',
            navCompareFunds: 'ଫଣ୍ଡ ତୁଳନା',
            navComparePlatforms: 'ପ୍ଲାଟଫର୍ମ ତୁଳନା',
            navTopResearch: 'ଟପ୍ ରିସର୍ଚ୍ଚ',
            navNews: 'ଖବର',
            navFinder: 'ଫଣ୍ଡ ଫାଇଣ୍ଡର',
            navSafety: 'ସୁରକ୍ଷା କେନ୍ଦ୍ର',
            navDemo: 'ଡେମୋ',
            darkMode: 'ଡାର୍କ ମୋଡ୍',
            audioOverview: 'ଅଡିଓ ସାରାଂଶ',
            launchXray: 'ଏକ୍ସ-ରେ ଆରମ୍ଭ କରନ୍ତୁ',
            listenSummary: 'ଶୁଣନ୍ତୁ',
            simpleMode: 'ସରଳ ଭାଷା',
            lowBandwidth: 'କମ୍ ଡାଟା ମୋଡ୍',
            scamAnalyzer: 'ଠକାମି ଯାଞ୍ଚ',
            signedIn: 'ସାଇନ୍ ଇନ୍ ଅଛନ୍ତି',
            guest: 'ଅତିଥି ନିବେଶକ',
            signIn: 'ସାଇନ୍ ଇନ୍',
            signOut: 'ସାଇନ୍ ଆଉଟ୍',
            navTitle: 'NAV (ଏନଏଭି)',
            aumTitle: 'AUM (ମୋଟ ସମ୍ପତ୍ତି)',
            expenseRatioTitle: 'ଖର୍ଚ୍ଚ ଅନୁପାତ (Expense Ratio)',
            overlapTitle: 'ପୋର୍ଟଫୋଲିଓ ଓଭରଲ୍ୟାପ୍',
            volatilityTitle: 'ଅସ୍ଥିରତା (Volatility)',
            sharpeTitle: 'ଶାର୍ପ ଅନୁପାତ',
            safetyDisclaimer: 'FundSleuth ହେଉଛି ଏକ ସୂଚନାଧର୍ମୀ ନିରାପତ୍ତା ଟୁଲ୍। ଏହା ଷ୍ଟକ୍ ଟିପ୍ସ କିମ୍ବା ଲାଭର ଗ୍ୟାରେଣ୍ଟି ଦିଏ ନାହିଁ।',
            explainExpenseRatio: 'ଖର୍ଚ୍ଚ ଅନୁପାତ ହେଉଛି ବାର୍ଷିକ ଫି ଯାହା ମ୍ୟୁଚୁଆଲ୍ ଫଣ୍ଡ ଆପଣଙ୍କ ଟଙ୍କା ପରିଚାଳନା ପାଇଁ ନେଇଥାଏ।',
            explainOverlap: 'ଆପଣଙ୍କର ଦୁଇଟି କିମ୍ବା ଅଧିକ ଫଣ୍ଡରେ ସମାନ କମ୍ପାନୀର ସେୟାର ଥିଲେ ଓଭରଲ୍ୟାପ୍ ହୁଏ।',
            explainSharpe: 'ଶାର୍ପ ଅନୁପାତ ଦର୍ଶାଏ ଯେ ଫଣ୍ଡ୍ ନେଇଥିବା ବିପଦ ତୁଳନାରେ କେତେ ଲାଭ ଦେଇଛି।'
        },
        ml: {
            brandName: 'FundSleuth (ഫണ്ട്സ്ലൂത്ത്)',
            tagline: 'നിങ്ങളുടെ നിക്ഷേപം എവിടെയാണെന്ന് വ്യക്തമായി അറിയുക.',
            subTagline: 'FundSleuth ഇന്ത്യൻ നിക്ഷേപകർക്ക് പോർട്ട്ഫോളിയോ ഓവർലാപ്പ്, മറഞ്ഞിരിക്കുന്ന ചെലവുകൾ, റിസ്ക് എന്നിവ സ്വന്തം ഭാഷയിൽ മനസ്സിലാക്കാൻ സഹായിക്കുന്നു.',
            heroSecondary: 'ഗവേഷണം ചെയ്യുക. മനസ്സിലാക്കുക. തീരുമാനിക്കുക.',
            navHome: 'ഹോം',
            navExplore: 'ഫണ്ടുകൾ കണ്ടെത്തുക',
            navCompareFunds: 'ഫണ്ട് താരതമ്യം',
            navComparePlatforms: 'പ്ലാറ്റ്ഫോം താരതമ്യം',
            navTopResearch: 'ടോപ്പ് റിസർച്ച്',
            navNews: 'വാർത്തകൾ',
            navFinder: 'ഫണ്ട് ഫൈൻഡർ',
            navSafety: 'സുരക്ഷാ കേന്ദ്രം',
            navDemo: 'ഡെമോ',
            darkMode: 'ഡാർക്ക് മോഡ്',
            audioOverview: 'ഓഡിയോ സംഗ്രഹം',
            launchXray: 'എക്സ്-റേ ആരംഭിക്കുക',
            listenSummary: 'ശ്രദ്ധിക്കുക',
            simpleMode: 'ലളിതമായ ഭാഷ',
            lowBandwidth: 'കുറഞ്ഞ ഡാറ്റ മോഡ്',
            scamAnalyzer: 'തട്ടിപ്പ് പരിശോധന',
            signedIn: 'സൈൻ ഇൻ ചെയ്തു',
            guest: 'അതിഥി നിക്ഷേപകൻ',
            signIn: 'സൈൻ ഇൻ',
            signOut: 'സൈൻ ഔട്ട്',
            navTitle: 'NAV (എൻഎവി)',
            aumTitle: 'AUM (ആകെ ആസ്തി)',
            expenseRatioTitle: 'ചെലവ് അനുപാതം (Expense Ratio)',
            overlapTitle: 'പോർട്ട്ഫോളിയോ ഓവർലാപ്പ്',
            volatilityTitle: 'വിപണി മാറ്റങ്ങൾ (Volatility)',
            sharpeTitle: 'ഷാർപ്പ് അനുപാതം',
            safetyDisclaimer: 'FundSleuth ഒരു വിവരദായക പോർട്ട്ഫോളിയോ സുരക്ഷാ ടൂളാണ്. ഇത് സ്റ്റോക്ക് ടിപ്പുകളോ ലാഭ ഗ്യാരണ്ടിയോ നൽകുന്നില്ല.',
            explainExpenseRatio: 'നിങ്ങളുടെ പണം കൈകാര്യം ചെയ്യുന്നതിന് മ്യൂച്വൽ ഫണ്ട് ഈടാക്കുന്ന വാർഷിക ഫീസാണ് ചെലവ് അനുപാതം.',
            explainOverlap: 'നിങ്ങളുടെ രണ്ടോ അതിലധികമോ ഫണ്ടുകളിൽ ഒരേ ഓഹരികൾ ഉൾപ്പെടുമ്പോഴാണ് ഓവർലാപ്പ് സംഭവിക്കുന്നത്.',
            explainSharpe: 'എടുത്ത റിസ്കിന് അനുസൃതമായി ഫണ്ട് എത്ര ലാഭം നൽകിയെന്ന് ഷാർപ്പ് അനുപാതം അളക്കുന്നു.'
        },
        pa: {
            brandName: 'FundSleuth (ਫੰਡਸਲੂਥ)',
            tagline: 'ਜਾਣੋ ਤੁਹਾਡਾ ਪੈਸਾ ਕਿੱਥੇ ਲੱਗਿਆ ਹੈ।',
            subTagline: 'FundSleuth ਭਾਰਤੀ ਨਿਵੇਸ਼ਕਾਂ ਨੂੰ ਪੋਰਟਫੋਲੀਓ ਓਵਰਲੈਪ, ਲੁਕਵੇਂ ਖਰਚੇ ਅਤੇ ਜੋਖਮ ਨੂੰ ਉਨ੍ਹਾਂ ਦੀ अपनी ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।',
            heroSecondary: 'ਖੋਜ ਕਰੋ। ਸਮਝੋ। ਫੈਸਲਾ ਲਓ।',
            navHome: 'ਹੋਮ',
            navExplore: 'ਫੰਡ ਲੱਭੋ',
            navCompareFunds: 'ਫੰਡ ਤੁਲਨਾ',
            navComparePlatforms: 'ਪਲੇਟਫਾਰਮ ਤੁਲਨਾ',
            navTopResearch: 'ਟੌਪ ਰਿਸਰਚ',
            navNews: 'ਖਬਰਾਂ',
            navFinder: 'ਫੰਡ ਫਾਈਂਡਰ',
            navSafety: 'ਸੁਰੱਖਿਆ ਕੇਂਦਰ',
            navDemo: 'ਡੈਮੋ',
            darkMode: 'ਡਾਰਕ ਮੋਡ',
            audioOverview: 'ਆਡੀਓ ਸਾਰਾਂਸ਼',
            launchXray: 'ਐਕਸ-ਰੇ ਸ਼ੁਰੂ ਕਰੋ',
            listenSummary: 'ਸੁਣੋ',
            simpleMode: 'ਸਰਲ ਭਾਸ਼ਾ',
            lowBandwidth: 'ਘੱਟ ਡਾਟਾ ਮੋਡ',
            scamAnalyzer: 'ਧੋਖਾਧੜੀ ਜਾਂਚ',
            signedIn: 'ਸਾਈਨ ਇਨ ਹੋ',
            guest: 'ਮਹਿਮਾਨ ਨਿਵੇਸ਼ਕ',
            signIn: 'ਸਾਈਨ ਇਨ',
            signOut: 'ਸਾਈਨ ਆਊਟ',
            navTitle: 'NAV (ਐਨਏਵੀ)',
            aumTitle: 'AUM (ਕੁੱਲ ਜਾਇਦਾਦ)',
            expenseRatioTitle: 'ਖਰਚਾ ਅਨੁਪਾਤ (Expense Ratio)',
            overlapTitle: 'ਪੋਰਟਫੋਲੀਓ ਓਵਰਲੈਪ',
            volatilityTitle: 'ਉਤਾਰ-ਚੜ੍ਹਾਅ (Volatility)',
            sharpeTitle: 'ਸ਼ਾਰਪ ਅਨੁਪਾਤ',
            safetyDisclaimer: 'FundSleuth ਇੱਕ ਜਾਣਕਾਰੀ ਭਰਪੂਰ ਸੁਰੱਖਿਆ ਟੂਲ ਹੈ। ਇਹ ਸਟਾਕ ਟਿਪਸ ਜਾਂ ਮੁਨਾਫੇ ਦੀ ਗਾਰੰਟੀ ਨਹੀਂ ਦਿੰਦਾ।',
            explainExpenseRatio: 'ਖਰਚਾ ਅਨੁਪਾਤ ਉਹ ਸਲਾਨਾ ਫੀਸ ਹੈ ਜੋ ਮਿਊਚਲ ਫੰਡ ਤੁਹਾਡੇ ਪੈਸੇ ਦੇ ਪ੍ਰਬੰਧਨ ਲਈ ਲੈਂਦਾ ਹੈ।',
            explainOverlap: 'ਜਦੋਂ ਤੁਹਾਡੇ ਦੋ ਜਾਂ ਵੱਧ ਫੰਡਾਂ ਵਿੱਚ ਇੱਕੋ ਜਿਹੀਆਂ ਕੰਪਨੀਆਂ ਦੇ ਸ਼ੇਅਰ ਹੁੰਦੇ ਹਨ ਤਾਂ ਓਵਰਲੈਪ ਹੁੰਦਾ ਹੈ।',
            explainSharpe: 'ਸ਼ਾਰਪ ਅਨੁਪਾਤ ਇਹ ਦਰਸਾਉਂਦਾ ਹੈ ਕਿ ਫੰਡ ਨੇ ਲਏ ਗਏ ਜੋਖਮ ਦੇ ਮੁਕਾਬਲੇ ਕਿੰਨਾ ਰਿਟਰਨ ਦਿੱਤਾ।'
        }
    },

    // Set Language
    setLanguage(langCode) {
        if (!this.translations[langCode]) {
            langCode = 'en';
        }
        this.currentLang = langCode;
        localStorage.setItem('fundsleuth_lang', langCode);
        document.documentElement.setAttribute('lang', langCode);

        this.applyTranslations();
        
        // Notify voice engine if available
        if (typeof window.syncSidebarThemeState === 'function') {
            window.syncSidebarThemeState();
        }
        if (typeof window.onLanguageChanged === 'function') {
            window.onLanguageChanged(langCode);
        }
    },

    // Get Text Key
    t(key) {
        const langMap = this.translations[this.currentLang] || this.translations['en'];
        return langMap[key] || this.translations['en'][key] || key;
    },

    // Apply translations to DOM elements with data-i18n attributes
    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                const text = this.t(key);
                if (el.tagName === 'INPUT' && el.type === 'placeholder') {
                    el.placeholder = text;
                } else {
                    el.innerText = text;
                }
            }
        });

        // Update active state in language selector elements
        const currentLangObj = this.languages.find(l => l.code === this.currentLang) || this.languages[0];
        const btnText = document.getElementById('selectedLangText');
        if (btnText) {
            btnText.innerText = `🌐 ${currentLangObj.native}`;
        }
    },

    // Render Global Language Selector Dropdown HTML
    renderLanguageDropdownHTML() {
        const current = this.currentLang;
        const currentObj = this.languages.find(l => l.code === current) || this.languages[0];

        return `
            <div class="dropdown d-inline-block" id="globalLangDropdown">
                <button class="btn btn-taste-soft btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="selectedLangBtn">
                    <span id="selectedLangText">🌐 ${currentObj.native}</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 py-2" style="max-height: 320px; overflow-y: auto; min-width: 200px;">
                    <li class="dropdown-header text-muted x-small font-mono uppercase px-3 py-1">Choose Language / भाषा चुनें</li>
                    ${this.languages.map(l => `
                        <li>
                            <button class="dropdown-item px-3 py-2 d-flex align-items-center justify-content-between ${l.code === current ? 'active font-bold' : ''}" onclick="I18nEngine.setLanguage('${l.code}')">
                                <span>${l.native}</span>
                                <span class="x-small text-muted font-mono ms-2">${l.name}</span>
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
};

// Initialize language engine immediately
document.addEventListener('DOMContentLoaded', () => {
    I18nEngine.setLanguage(I18nEngine.currentLang);
});
