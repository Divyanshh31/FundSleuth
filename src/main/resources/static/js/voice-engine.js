/* ==========================================================================
   FUNDSLEUTH MULTILINGUAL VOICE ENGINE & TTS PROVIDER ABSTRACTION
   Integrates SpeechSynthesis abstraction layer with voiceschanged loading,
   fallback voice detection, dynamic language cancellation, and zero fake data.
   ========================================================================== */

const VoiceEngine = {
    synth: typeof window !== 'undefined' ? window.speechSynthesis : null,
    currentUtterance: null,
    isPlaying: false,
    currentSpeed: 1.0,
    cachedVoices: [],

    voiceLangMap: {
        en: 'en-IN',
        hi: 'hi-IN',
        bn: 'bn-IN',
        mr: 'mr-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        gu: 'gu-IN',
        ur: 'ur-IN',
        kn: 'kn-IN',
        or: 'or-IN',
        ml: 'ml-IN',
        pa: 'pa-IN'
    },

    init() {
        if (!this.synth) return;
        this.loadVoices();
        if (typeof this.synth.addEventListener === 'function') {
            this.synth.addEventListener('voiceschanged', () => this.loadVoices());
        } else if ('onvoiceschanged' in this.synth) {
            this.synth.onvoiceschanged = () => this.loadVoices();
        }

        // Cancel voice playback when switching language or leaving page
        window.addEventListener('fundsleuth:languageChanged', () => this.stop());
        window.addEventListener('beforeunload', () => this.stop());
    },

    loadVoices() {
        if (!this.synth) return;
        this.cachedVoices = this.synth.getVoices() || [];
    },

    getVoices() {
        if (!this.cachedVoices || this.cachedVoices.length === 0) {
            this.loadVoices();
        }
        return this.cachedVoices || [];
    },

    // Multi-lingual Text Summary Generators
    summaries: {
        en: (overlap, regCount, expRatio) => 
            `Portfolio Safety X-Ray Summary. Your mutual fund portfolio has an overlap score of ${overlap} percent. You hold ${regCount} regular plan funds incurring distributor commission drag. Your average expense ratio is ${expRatio} percent. Switching to direct plans will save long-term wealth.`,
        
        hi: (overlap, regCount, expRatio) => 
            `पोर्टफोलियो सुरक्षा एक्स-रे सारांश। आपके म्यूचुअल फंड पोर्टफोलियो में ${overlap} प्रतिशत दोहराव ओवरलैप है। आपके पास ${regCount} रेगुलर प्लान फंड हैं जिनमें कमीशन लागत लग रही है। आपका औसत व्यय अनुपात ${expRatio} प्रतिशत है। डायरेक्ट प्लान चुनने से आपकी लंबी अवधि की बचत बढ़ेगी।`,

        bn: (overlap, regCount, expRatio) => 
            `পোর্টফোলিও নিরাপত্তা এক্স-রে সারসংক্ষেপ। আপনার মিউচুয়াল ফান্ড পোর্টফোলিওতে ${overlap} শতাংশ ওভারল্যাপ রয়েছে। আপনার কাছে ${regCount}টি রেগুলার প্ল্যান রয়েছে। আপনার গড় ব্যয় অনুপাত ${expRatio} শতাংশ। ডাইরেক্ট প্ল্যানে স্থানান্তরিত হলে আপনার দীর্ঘমেয়াদী অর্থ সাশ্রয় হবে।`,

        mr: (overlap, regCount, expRatio) => 
            `पोर्टफोलिओ सुरक्षा एक्स-रे सारांश. तुमच्या म्युच्युअल फंड पोर्टफोलिओमध्ये ${overlap} टक्के ओव्हरलॅप आहे. तुमच्याकडे ${regCount} रेग्युलर प्लॅन फंड आहेत ज्यावर कमिशन खर्च होत आहे. तुमचा सरासरी खर्च गुणोत्तर ${expRatio} टक्के आहे. डायरेक्ट प्लॅन निवडून तुमची बचत वाढवा.`,

        te: (overlap, regCount, expRatio) => 
            `పోర్ట్‌ఫోలియో భద్రతా ఎక్స్-రే సారాంశం. మీ మ్యూచువల్ ఫండ్ పోర్ట్‌ఫోలియోలో ${overlap} శాతం ఓవర్‌ల్యాప్ ఉంది. మీరు ${regCount} రెగ్యులర్ ప్లాన్ ఫండ్లను కలిగి ఉన్నారు. మీ సగటు ఖర్చు నిష్పత్తి ${expRatio} శాతం. డైరెక్ట్ ప్లాన్లకు మారడం ద్వారా మీ నిధులను కాపాడుకోండి.`,

        ta: (overlap, regCount, expRatio) => 
            `போர்ட்ஃபோலியோ பாதுகாப்பு எக்ஸ்-ரே சுருக்கம். உங்கள் பரஸ்பர நிதி போர்ட்ஃபோலியோவில் ${overlap} சதவீதம் ஓவர்லேப் உள்ளது. உங்களிடம் ${regCount} ரெகுலர் பிளான் ஃபண்டுகள் உள்ளன. சராசரி செலவு விகிதம் ${expRatio} சதவீதம். டைரக்ட் பிளான்களுக்கு மாறுவது உங்கள் பணத்தைச் சேமிக்கும்.`,

        gu: (overlap, regCount, expRatio) => 
            `પોર્ટફોલિયો સુરક્ષા એક્સ-રે સારાંશ. તમારા મ્યુચ્યુઅલ ફંડ પોર્ટફોલિયોમાં ${overlap} ટકા ઓવરલેપ છે. તમારી પાસે ${regCount} રેગ્યુલર પ્લાન છે. તમારો સરેરાશ ખર્ચ ગુણોત્તર ${expRatio} ટકા છે. ડાયરેક્ટ પ્લાન પસંદ કરવાથી તમારી લાંબા ગાળાની બચત વધશે.`,

        ur: (overlap, regCount, expRatio) => 
            `پورٹ فولیو سیفٹی ایکس رے خلاصہ۔ آپ کے میوچل فنڈ پورٹ فولیو میں ${overlap} فیصد اورلیپ ہے۔ آپ کے پاس ${regCount} ریگولر پلانز ہیں جن پر کمیشن کا خرچ آ رہا ہے۔ آپ کا اوسط اخراجات کا تناسب ${expRatio} فیصد ہے۔ ڈائریکٹ پلانز پر سوئچ کرنے سے طویل مدتی بچت ہوگی۔`,

        kn: (overlap, regCount, expRatio) => 
            `ಪೋರ್ಟ್‌ಫೋಲಿಯೋ ಸುರಕ್ಷತಾ ಎಕ್ಸ್-ರೇ ಸಾರಾಂಶ. ನಿಮ್ಮ ಮ್ಯೂಚುವಲ್ ಫಂಡ್ ಪೋರ್ಟ್‌ಫೋಲಿಯೋದಲ್ಲಿ ${overlap} ಪ್ರತಿಶತ ಓವರ್‌ಲ್ಯಾಪ್ ಇದೆ. ನೀವು ${regCount} ರೆಗ್ಯುಲರ್ ಪ್ಲಾನ್ ಫಂಡ್‌ಗಳನ್ನು ಹೊಂದಿದ್ದೀರಿ. ನಿಮ್ಮ ಸರಾಸರಿ ವೆಚ್ಚದ ಅನುಪಾತ ${expRatio} ಪ್ರತಿಶತ. ಡೈರೆಕ್ಟ್ ಪ್ಲಾನ್‌ಗೆ ಬದಲಾಯಿಸುವ ಮೂಲಕ ನಿಮ್ಮ ಹಣವನ್ನು ಉಳಿಸಿ.`,

        or: (overlap, regCount, expRatio) => 
            `ପୋର୍ଟଫୋଲିଓ ସୁରକ୍ଷା ଏକ୍ସ-ରେ ସାରାଂଶ। ଆପଣଙ୍କ ମ୍ୟୁଚୁଆଲ୍ ଫଣ୍ଡ୍ ପୋର୍ଟଫୋଲିଓରେ ${overlap} ପ୍ରତିଶତ ଓଭରଲ୍ୟାପ୍ ଅଛି। ଆପଣଙ୍କ ପାଖରେ ${regCount}ଟି ରେଗୁଲାର୍ ପ୍ଲାନ୍ ଅଛି। ଆପଣଙ୍କ ହାରାହାରି ଖର୍ଚ୍ଚ ଅନୁପାତ ${expRatio} ପ୍ରତିଶତ। ଡାଇରେକ୍ଟ ପ୍ଲାନ୍ ଆପଣଙ୍କ ସଞ୍ଚୟ ବୃଦ୍ଧି କରିବ।`,

        ml: (overlap, regCount, expRatio) => 
            `പോർട്ട്ഫോളിയോ സുരക്ഷാ എക്സ്-റേ സംഗ്രഹം. നിങ്ങളുടെ മ്യൂച്വൽ ഫണ്ട് പോർട്ട്ഫോളിയോയിൽ ${overlap} ശതമാനം ഓവർലാപ്പ് ഉണ്ട്. നിങ്ങളുടെ പക്കൽ ${regCount} റെഗുലർ പ്ലാനുകൾ ഉണ്ട്. ശരാശരി ചെലവ് അനുപാതം ${expRatio} ശതമാനമാണ്. ഡയറക്ട് പ്ലാനുകളിലേക്ക് മാറുന്നത് നിങ്ങളുടെ പണം സംരക്ഷിക്കും.`,

        pa: (overlap, regCount, expRatio) => 
            `ਪੋਰਟਫੋਲੀਓ ਸੁਰੱਖਿਆ ਐਕਸ-ਰੇ ਸਾਰਾਂਸ਼। ਤੁਹਾਡੇ ਮਿਊਚਲ ਫੰਡ ਪੋਰਟਫੋਲੀਓ ਵਿੱਚ ${overlap} ਫੀਸਦੀ ਓਵਰਲੈਪ ਹੈ। ਤੁਹਾਡੇ ਕੋਲ ${regCount} ਰੈਗੂਲਰ ਪਲਾਨ ਹਨ। ਤੁਹਾਡਾ ਔਸਤ ਖਰਚਾ ਅਨੁਪਾਤ ${expRatio} ਫੀਸਦੀ ਹੈ। ਡਾਇਰੈਕਟ ਪਲਾਨ ਚੁਣਨ ਨਾਲ ਤੁਹਾਡੀ ਲੰਬੇ ਸਮੇਂ ਦੀ ਬਚਤ ਵਧੇਗੀ।`
    },

    // Speak Text in Selected Language
    speak(text, langCode = (window.I18nEngine ? window.I18nEngine.currentLang : 'en'), onEndCallback = null) {
        if (!this.synth) {
            if (typeof showToast === 'function') {
                showToast("Speech synthesis is unavailable on this browser.", "warning");
            }
            return;
        }

        this.stop();

        const targetLang = langCode || 'en';
        const voiceLang = this.voiceLangMap[targetLang] || 'en-IN';
        const voices = this.getVoices();

        // Check if browser has a voice for this language
        const matchedVoice = voices.find(v => v.lang.startsWith(targetLang) || v.lang === voiceLang || v.lang.replace('_', '-').startsWith(targetLang));

        if (!matchedVoice && targetLang !== 'en') {
            const langObj = window.I18nEngine ? window.I18nEngine.languages.find(l => l.code === targetLang) : null;
            const langName = langObj ? langObj.name : targetLang;
            const msg = window.I18nEngine ? window.I18nEngine.t('voiceUnavailable', { lang: langName }) : `Voice synthesis is unavailable for ${langName} on your browser.`;
            if (typeof showToast === 'function') {
                showToast(msg, "warning");
            }
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = voiceLang;
        utterance.rate = this.currentSpeed;
        if (matchedVoice) {
            utterance.voice = matchedVoice;
        }

        utterance.onstart = () => {
            this.isPlaying = true;
            this.updateVoiceUIState(true);
        };

        utterance.onend = () => {
            this.isPlaying = false;
            this.updateVoiceUIState(false);
            if (onEndCallback) onEndCallback();
        };

        utterance.onerror = (e) => {
            console.warn("TTS Error / Interrupted:", e);
            this.isPlaying = false;
            this.updateVoiceUIState(false);
        };

        this.currentUtterance = utterance;
        this.synth.speak(utterance);
    },

    pause() {
        if (this.synth && this.synth.speaking && !this.synth.paused) {
            this.synth.pause();
            this.isPlaying = false;
            this.updateVoiceUIState(false);
        }
    },

    resume() {
        if (this.synth && this.synth.paused) {
            this.synth.resume();
            this.isPlaying = true;
            this.updateVoiceUIState(true);
        }
    },

    stop() {
        if (this.synth) {
            this.synth.cancel();
            this.isPlaying = false;
            this.updateVoiceUIState(false);
        }
    },

    setSpeed(speed) {
        this.currentSpeed = parseFloat(speed);
        if (this.isPlaying && this.currentUtterance) {
            const text = this.currentUtterance.text;
            const lang = this.currentUtterance.lang;
            this.stop();
            this.speak(text, lang);
        }
    },

    updateVoiceUIState(active) {
        const badge = document.getElementById('voiceBtnText');
        const playerBadge = document.getElementById('playerStatusBadge');
        if (badge) {
            badge.innerText = active ? 'ON' : 'OFF';
            badge.className = active 
                ? 'badge bg-success text-white rounded-pill font-mono x-small nav-text animate__animated animate__pulse animate__infinite' 
                : 'badge bg-secondary bg-opacity-10 text-secondary rounded-pill font-mono x-small nav-text';
        }
        if (playerBadge) {
            playerBadge.innerText = active ? 'Playing...' : 'Paused';
        }
    },

    explainMetric(metricKey) {
        const lang = window.I18nEngine ? window.I18nEngine.currentLang : 'en';
        const textKey = 'explain' + metricKey.charAt(0).toUpperCase() + metricKey.slice(1);
        const explanationText = window.I18nEngine ? (window.I18nEngine.t(textKey) || window.I18nEngine.t('safetyDisclaimer')) : "Metric explanation.";

        let modalEl = document.getElementById('explainMetricModal');
        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.id = 'explainMetricModal';
            modalEl.className = 'modal fade';
            modalEl.setAttribute('tabindex', '-1');
            modalEl.innerHTML = `
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content rounded-4 border-0 shadow-lg p-3">
                        <div class="modal-header border-0 pb-0">
                            <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="explainModalTitle">
                                <i class="fa-solid fa-lightbulb orange-highlight"></i> Metric Explanation
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body py-3">
                            <p class="fs-6 text-secondary lh-lg mb-3" id="explainModalBody"></p>
                            <div class="d-flex align-items-center justify-content-between pt-2 border-top">
                                <button class="btn btn-taste-primary btn-sm rounded-pill px-3 py-2 d-flex align-items-center gap-2" onclick="VoiceEngine.speakCurrentModalText()">
                                    <i class="fa-solid fa-volume-high orange-highlight"></i> <span>Listen Voice Summary</span>
                                </button>
                                <button class="btn btn-taste-soft btn-sm rounded-pill px-3" onclick="VoiceEngine.stop()">
                                    <i class="fa-solid fa-stop text-danger me-1"></i> Stop
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modalEl);
        }

        const titleEl = document.getElementById('explainModalTitle');
        const bodyEl = document.getElementById('explainModalBody');
        if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-lightbulb orange-highlight me-1"></i> ${metricKey.toUpperCase()} Explanation`;
        if (bodyEl) bodyEl.innerText = explanationText;

        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            const bsModal = new bootstrap.Modal(modalEl);
            bsModal.show();
        }

        this.speak(explanationText, lang);
    },

    speakCurrentModalText() {
        const bodyEl = document.getElementById('explainModalBody');
        if (bodyEl && bodyEl.innerText) {
            this.speak(bodyEl.innerText, window.I18nEngine ? window.I18nEngine.currentLang : 'en');
        }
    }
};

// Global Handler for Toggle Audio Voice Summary Button
function toggleVoiceSummary() {
    if (VoiceEngine.isPlaying) {
        VoiceEngine.stop();
        return;
    }

    const data = window.currentAnalysisData;
    if (!data) {
        const msg = window.I18nEngine 
            ? (window.I18nEngine.t('noAnalysisForVoice') || "Please upload your CAS statement or run an analysis first to listen to your portfolio voice summary.") 
            : "Please upload your CAS statement or run an analysis first to listen to your portfolio voice summary.";
        if (typeof showToast === 'function') {
            showToast(msg, "warning");
        } else {
            alert(msg);
        }
        return;
    }

    const overlap = (data.overlapAnalytics || {}).overlapPercentage || 0;
    const regCount = (data.expenseAnalytics || {}).regularPlansCount || 0;
    const expRatio = (data.expenseAnalytics || {}).averageExpenseRatio || 0;

    const lang = window.I18nEngine ? window.I18nEngine.currentLang : 'en';
    const summaryFn = VoiceEngine.summaries[lang] || VoiceEngine.summaries['en'];
    const summaryText = summaryFn(overlap, regCount, expRatio);

    VoiceEngine.speak(summaryText, lang);
}

document.addEventListener('DOMContentLoaded', () => {
    VoiceEngine.init();
});
