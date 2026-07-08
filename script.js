// ============================================================
// 🤖 AI CHATBOT — SMART VERSION (100+ Responses)
// ============================================================

// ===== SMART RESPONSE DATABASE =====
const aiResponses = {
    // GREETINGS
    'greeting': {
        keywords: ['hi', 'hello', 'hey', 'namaste', 'नमस्ते', 'hello', 'hii', 'hey there', 'good morning', 'good evening', 'good night', 'सुप्रभात', 'शुभ संध्या', 'हाय'],
        response: '🙏 Namaste! How can I help you with today\'s news? You can ask about Politics, Technology, Sports, Business, Weather, or any topic!'
    },
    
    // POLITICS
    'politics': {
        keywords: ['politics', 'राजनीति', 'political', 'modi', 'rahul', 'bjp', 'congress', 'election', 'चुनाव', 'पीएम', 'प्रधानमंत्री', 'pm', 'narendra modi', 'rahul gandhi', 'yogi', 'akhilesh', 'मोदी', 'राहुल', 'योगी', 'अखिलेश', 'amit shah', 'अमित शाह', 'kejriwal', 'केजरीवाल', 'mamata', 'ममता', 'trump', 'बाइडेन', 'putin', 'ज़ेलेंस्की', 'war', 'युद्ध', 'russia', 'ukraine', 'israel', 'iran', 'china', 'america', 'india china'],
        response: '📰 Today\'s top political news includes updates on elections, government policies, and international relations. Which specific political topic are you interested in?'
    },

    // TECHNOLOGY
    'technology': {
        keywords: ['tech', 'technology', 'टेक', 'टेक्नोलॉजी', 'ai', 'artificial intelligence', 'आर्टिफिशियल इंटेलिजेंस', 'machine learning', '5g', 'smartphone', 'mobile', 'iphone', 'android', 'gadget', 'गैजेट', 'software', 'सॉफ्टवेयर', 'cyber', 'साइबर', 'hacking', 'हैकिंग', 'internet', 'इंटरनेट', 'space', 'अंतरिक्ष', 'isro', 'nasa', 'robot', 'रोबोट', 'metaverse', 'blockchain', 'crypto', 'क्रिप्टो', 'bitcoin', 'bitcoin', 'ट्विटर', 'facebook', 'instagram', 'whatsapp', 'elon musk', 'मस्क', 'jobs', 'apple', 'google', 'microsoft', 'amazon', 'tesla'],
        response: '💻 Technology is evolving rapidly! AI, 5G, and space tech are making headlines. What tech topic interests you the most?'
    },

    // SPORTS
    'sports': {
        keywords: ['sports', 'खेल', 'sport', 'cricket', 'क्रिकेट', 'football', 'फुटबॉल', 'tennis', 'टेनिस', 'badminton', 'बैडमिंटन', 'hockey', 'हॉकी', 'kabaddi', 'kabaddi', 'olympics', 'ओलंपिक', 'world cup', 'विश्व कप', 'ipl', 'virat', 'कोहली', 'dhoni', 'धोनी', 'rohit sharma', 'रोहित शर्मा', 'sachin', 'गांगुली', 'du plessis', 'kane williamson', 'ms dhoni', 'player', 'match', 'मैच', 'score', 'स्कोर'],
        response: '🏏 Sports news is always exciting! Cricket, football, and upcoming tournaments are in the spotlight. Which sport or team do you follow?'
    },

    // BUSINESS
    'business': {
        keywords: ['business', 'बिजनेस', 'economy', 'अर्थव्यवस्था', 'market', 'मार्केट', 'stock', 'स्टॉक', 'sensex', 'nifty', 'nifty', 'share', 'शेयर', 'investment', 'निवेश', 'inflation', 'मुद्रास्फीति', 'gdp', 'tax', 'टैक्स', 'gst', 'policy', 'नीति', 'finance', 'वित्त', 'bank', 'बैंक', 'loan', 'कर्ज', 'corporate', 'कॉर्पोरेट', 'startup', 'स्टार्टअप', 'business news', 'बिजनेस न्यूज़', 'petrol price', 'पेट्रोल', 'diesel price', 'डीजल', 'rupee', 'रुपया', 'dollar', 'डॉलर', 'gold price', 'सोना', 'real estate', 'property', 'insurance'],
        response: '📈 Markets are showing interesting movements today. Sensex and Nifty are in focus. Want to know about specific stocks or sectors?'
    },

    // WEATHER
    'weather': {
        keywords: ['weather', 'मौसम', 'rain', 'बारिश', 'monsoon', 'मानसून', 'sunny', 'धूप', 'cloudy', 'बादल', 'storm', 'तूफान', 'temperature', 'तापमान', 'heat', 'गर्मी', 'cold', 'ठंड', 'humidity', 'नमी', 'hurricane', 'cyclone', 'चक्रवात', 'flood', 'बाढ़', 'drought', 'सूखा', 'delhi weather', 'mumbai rain', 'weather update', 'मौसम अपडेट', 'आज का मौसम'],
        response: '🌧️ The monsoon is active across India. Want to know the weather in your city or region? Let me know!'
    },

    // HEALTH
    'health': {
        keywords: ['health', 'स्वास्थ्य', 'fitness', 'फिटनेस', 'diet', 'आहार', 'nutrition', 'पोषण', 'disease', 'बीमारी', 'doctor', 'डॉक्टर', 'hospital', 'अस्पताल', 'covid', 'corona', 'कोरोना', 'vaccine', 'वैक्सीन', 'mental health', 'मानसिक स्वास्थ्य', 'yoga', 'योग', 'medicine', 'दवा', 'cancer', 'हार्ट', 'heart', 'diabetes', 'ब्लड प्रेशर', 'sugar', 'बीपी', 'blood pressure', 'fitness tips', 'workout'],
        response: '🏥 Health awareness is crucial! Stay updated on health news, fitness tips, and wellness trends. What health topic do you care about?'
    },

    // ENTERTAINMENT
    'entertainment': {
        keywords: ['entertainment', 'मनोरंजन', 'film', 'फिल्म', 'movie', 'मूवी', 'bollywood', 'बॉलीवुड', 'hollywood', 'हॉलीवुड', 'actor', 'अभिनेता', 'actress', 'अभिनेत्री', 'singer', 'गायक', 'song', 'गाना', 'music', 'संगीत', 'tv show', 'टीवी शो', 'reality show', 'रीयलिटी शो', 'celeb', 'सेलिब्रिटी', 'star', 'स्टार', 'web series', 'वेब सीरीज', 'ott', 'netflix', 'amazon prime', 'hotstar', 'disney', 'फिल्म रिव्यू', 'रिलीज', 'ताजा फिल्में', 'bollywood news', 'celebrity gossip'],
        response: '🎬 Bollywood, Hollywood, and web series are creating buzz! Want to know about new releases, celebrity news, or movie reviews?'
    },

    // EDUCATION
    'education': {
        keywords: ['education', 'शिक्षा', 'school', 'स्कूल', 'college', 'कॉलेज', 'university', 'विश्वविद्यालय', 'exam', 'परीक्षा', 'result', 'परिणाम', 'admission', 'प्रवेश', 'scholarship', 'छात्रवृत्ति', 'student', 'छात्र', 'teacher', 'शिक्षक', 'learning', 'सीखना', 'degree', 'डिग्री', 'course', 'कोर्स', 'online learning', 'ऑनलाइन शिक्षा', 'career', 'करियर', 'job', 'नौकरी'],
        response: '📚 Education news covers exams, results, admissions, and career opportunities. Are you looking for something specific in education?'
    },

    // SCIENCE
    'science': {
        keywords: ['science', 'विज्ञान', 'research', 'अनुसंधान', 'space', 'अंतरिक्ष', 'moon', 'चाँद', 'mars', 'मंगल', 'sun', 'सूरज', 'planet', 'ग्रह', 'nasa', 'isro', 'rover', 'satellite', 'उपग्रह', 'robot', 'robotics', 'robot', 'physics', 'भौतिकी', 'chemistry', 'रसायन', 'biology', 'जीवविज्ञान', 'environment', 'पर्यावरण', 'climate change', 'जलवायु परिवर्तन', 'जीन', 'dna', 'genetics', 'nuclear', 'परमाणु'],
        response: '🔬 Science is advancing rapidly! Space exploration, new discoveries, and environmental research are making news. What scientific topic excites you?'
    },

    // CRIME
    'crime': {
        keywords: ['crime', 'अपराध', 'murder', 'हत्या', 'theft', 'चोरी', 'robbery', 'लूट', 'police', 'पुलिस', 'court', 'अदालत', 'judge', 'न्यायाधीश', 'lawyer', 'वकील', 'case', 'मामला', 'accused', 'आरोपी', 'investigation', 'जांच', 'fraud', 'घोटाला', 'scam', 'साइबर क्राइम', 'cyber crime', 'digital fraud', 'डिजिटल फ्रॉड', 'arrest', 'गिरफ्तारी', 'sentence', 'सजा', 'gangster', 'डकैती', 'highway', 'kill', 'shooting', 'attack', 'हमला', 'न्याय', 'justice'],
        response: '🚨 Crime news is being reported from across the country. Cyber fraud, scams, and investigations are in the spotlight. Which type of crime news are you looking for?'
    },

    // INTERNATIONAL
    'international': {
        keywords: ['international', 'अंतरराष्ट्रीय', 'world', 'दुनिया', 'global', 'वैश्विक', 'foreign', 'विदेश', 'united nations', 'un', 'संयुक्त राष्ट्र', 'china', 'चीन', 'usa', 'अमेरिका', 'uk', 'britain', 'रूस', 'russia', 'europe', 'यूरोप', 'africa', 'अफ्रीका', 'asia', 'एशिया', 'middle east', 'मध्य पूर्व', 'ukraine', 'यूक्रेन', 'israel', 'इज़राइल', 'iran', 'ईरान', 'pakistan', 'पाकिस्तान', 'bangladesh', 'बांग्लादेश', 'nepal', 'नेपाल', 'sri lanka', 'श्रीलंका', 'terrorism', 'आतंकवाद', 'peace', 'शांति', 'climate', 'environment', 'summit', 'शिखर सम्मेलन', 'विश्व समाचार', 'global politics'],
        response: '🌍 The world is closely watching developments in the Middle East, US, China, and Europe. Where are you most interested in?'
    },

    // TECHNOLOGY - DEEP DIVE
    'ai_deep': {
        keywords: ['ai news', 'artificial intelligence news', 'ai updates', 'ai latest', 'machine learning news', 'deep learning', 'neural network', 'chatgpt', 'chat gpt', 'openai', 'gemini', 'bard', 'copilot', 'ai tools', 'ai jobs', 'future of ai', 'ai in india', 'artificial intelligence in india', 'ai technology', 'ai future'],
        response: '🤖 AI is transforming the world! From ChatGPT to Gemini, AI tools are revolutionizing how we work and live. Would you like to know about AI in business, education, or healthcare?'
    },

    // BUSINESS - DEEP DIVE
    'business_deep': {
        keywords: ['share market today', 'sensex today', 'nifty today', 'stock market news', 'today market', 'market update', 'business news today', 'share price', 'stock price', 'investment tips', 'mutual fund', 'ipo', 'stock recommendation', 'market analysis'],
        response: '📊 Market experts are analyzing the trends today. Key sectors like IT, banking, and FMCG are in focus. Are you looking for specific stock or sector updates?'
    },

    // CRICKET - DEEP DIVE
    'cricket_deep': {
        keywords: ['ipl live', 'ipl 2026', 'india cricket', 'india match', 'cricket match today', 'today cricket match', 'ind vs', 'india vs', 'cricket score', 'live cricket score', 'world cup cricket', 'test match', 'odi match', 't20 match', 'virat kohli news', 'rohit sharma news', 'dhoni news', 'bcci news', 'team india'],
        response: '🏏 Cricket fever is on! India\'s performance, IPL updates, and international matches are making headlines. Which team or player are you following?'
    },

    // WEATHER - DEEP DIVE
    'weather_deep': {
        keywords: ['delhi weather', 'mumbai weather', 'bangalore weather', 'chennai weather', 'kolkata weather', 'today weather', 'weather forecast', 'rain update', 'heatwave', 'cold wave', 'weather alert', 'monsoon update', 'rain prediction', 'weather news today'],
        response: '🌤️ Weather is crucial across India! Monsoon patterns, heatwaves, and cyclones are being tracked. Which city\'s weather would you like to know about?'
    },

    // COVID
    'covid': {
        keywords: ['covid', 'corona', 'कोविड', 'corona virus', 'covid news', 'covid cases', 'covid vaccine', 'covid 19', 'covid update', 'corona update', 'कोरोना अपडेट', 'vaccine news', 'covid guidelines', 'covid precaution', 'covid relief', 'covid india', 'covid new variant'],
        response: '🦠 COVID-19 updates are still relevant. Cases, new variants, and vaccination drives are being monitored. Want to know about the latest health guidelines?'
    },

    // JOBS
    'jobs': {
        keywords: ['job', 'jobs', 'नौकरी', 'career', 'करियर', 'employment', 'रोजगार', 'vacancy', 'रिक्ति', 'recruitment', 'भर्ती', 'upsc', 'ssc', 'bank', 'railway', 'government job', 'private job', 'work from home', 'घर से काम', 'job alert', 'हायरिंग', 'hiring', 'interview', 'साक्षात्कार', 'salary', 'वेतन', 'resume', 'बायोडाटा', 'apply', 'आवेदन', 'walk-in', 'job news', 'placement'],
        response: '💼 Job markets are buzzing! Government vacancies, private sector hiring, and work-from-home opportunities are in the news. Which sector are you looking for?'
    },

    // FALLBACK (जब कुछ न समझे)
    'fallback': {
        keywords: [],
        response: '🤔 That\'s an interesting question! I\'m here to help with news. You can ask me about: Politics, Technology, Sports, Business, Weather, Health, Entertainment, or any current topic!'
    }
};

// ===== SMART RESPONSE FUNCTION =====
function getSmartResponse(message) {
    const msg = message.toLowerCase();
    
    // पहले सभी keywords check करें
    for (const [key, data] of Object.entries(aiResponses)) {
        if (key === 'fallback') continue;
        for (const keyword of data.keywords) {
            if (msg.includes(keyword)) {
                return data.response;
            }
        }
    }
    
    // अगर कुछ मिला नहीं तो fallback
    return aiResponses.fallback.response + '\n\n💡 Try asking: "Tell me about politics", "Latest tech news", "Cricket scores", "Weather in Delhi", "Business updates", "Health tips", "Science news", "Job vacancies", "Crime news", or "International affairs"';
}

// ===== SEND CHAT MESSAGE (UPDATED) =====
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    const chatBox = document.getElementById('chatMessages');
    
    // User message
    chatBox.innerHTML += `
        <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
            <div style="background:var(--accent);color:white;padding:12px 16px;border-radius:12px 12px 4px 12px;max-width:85%;box-shadow:0 2px 8px rgba(230,57,70,0.2);">
                ${message}
            </div>
        </div>
    `;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // AI Response
    setTimeout(() => {
        const response = getSmartResponse(message);
        chatBox.innerHTML += `
            <div style="display:flex;gap:10px;margin-bottom:10px;">
                <div style="background:var(--card-bg);padding:12px 16px;border-radius:12px 12px 12px 4px;max-width:85%;box-shadow:0 2px 8px rgba(0,0,0,0.05);border:1px solid rgba(0,0,0,0.03);">
                    ${response}
                </div>
            </div>
        `;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

// ===== ENTER KEY SUPPORT =====
document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendChatMessage();
});

// ===== QUICK SUGGESTIONS (BONUS) =====
// Add this after chat messages container
function addQuickSuggestions() {
    const chatBox = document.getElementById('chatMessages');
    const suggestions = ['Politics', 'Technology', 'Sports', 'Business', 'Weather', 'Health', 'Entertainment', 'Science', 'Crime', 'Jobs', 'International'];
    const html = suggestions.map(s => 
        `<button onclick="document.getElementById('chatInput').value='${s}';sendChatMessage();" 
                 style="background:var(--card-bg);border:1px solid var(--accent);color:var(--text);padding:4px 12px;border-radius:20px;font-size:11px;cursor:pointer;margin:3px;transition:0.2s;">
            ${s}
        </button>`
    ).join('');
    
    chatBox.innerHTML += `
        <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:4px;">
            ${html}
        </div>
    `;
}
addQuickSuggestions();
