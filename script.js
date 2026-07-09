// ============================================================
// 🔥 MK NEWS HUB — COMPLETE SCRIPT (Loading Fix + AI Chatbot)
// ============================================================

console.log("🚀 MK News Hub Loading...");

// ============================================================
// 🔧 EMERGENCY FIX — Loader को 3 सेकंड में फोर्स-हाइड करें
// ============================================================
setTimeout(function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }
}, 3000);

// ============================================================
// 🆕 LOADING ANIMATION (DOMContentLoaded)
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// ============================================================
// RSS FEEDS
// ============================================================
const RSS2JSON_URL = "https://api.rss2json.com/v1/api.json";

const rssFeeds = {
    "होम": "https://news.google.com/rss?hl=hi-IN&gl=IN&ceid=IN:hi",
    "राजनीति": "https://news.google.com/rss/search?q=politics+india&hl=hi-IN&gl=IN&ceid=IN:hi",
    "टेक्नोलॉजी": "https://news.google.com/rss/search?q=technology&hl=hi-IN&gl=IN&ceid=IN:hi",
    "खेल": "https://news.google.com/rss/search?q=sports&hl=hi-IN&gl=IN&ceid=IN:hi",
    "मनोरंजन": "https://news.google.com/rss/search?q=entertainment&hl=hi-IN&gl=IN&ceid=IN:hi",
    "दुनिया": "https://news.google.com/rss?hl=hi-IN&gl=IN&ceid=IN:hi&topic=W",
    "बिजनेस": "https://news.google.com/rss?hl=hi-IN&gl=IN&ceid=IN:hi&topic=B",
    "home": "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en",
    "politics": "https://news.google.com/rss/search?q=politics&hl=en-US&gl=US&ceid=US:en",
    "technology": "https://news.google.com/rss/search?q=technology&hl=en-US&gl=US&ceid=US:en",
    "sports": "https://news.google.com/rss/search?q=sports&hl=en-US&gl=US&ceid=US:en",
    "entertainment": "https://news.google.com/rss/search?q=entertainment&hl=en-US&gl=US&ceid=US:en",
    "world": "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en&topic=W",
    "business": "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en&topic=B"
};

let currentLang = 'hindi';
let currentCategory = 'होम';
let allNewsItems = [];

// ============================================================
// LANGUAGE BUTTONS
// ============================================================
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.style.background = 'var(--card-bg)';
            b.style.color = 'var(--text)';
            b.style.borderColor = '#e5e7eb';
        });
        this.style.background = 'var(--accent)';
        this.style.color = 'white';
        this.style.borderColor = 'var(--accent)';
        
        currentLang = this.dataset.lang;
        
        if (currentLang === 'hindi') {
            currentCategory = 'होम';
            document.getElementById('category-title').textContent = 'ताज़ा ख़बरें';
        } else {
            currentCategory = 'home';
            document.getElementById('category-title').textContent = 'Latest News';
        }
        fetchNews(currentCategory);
    });
});

// ============================================================
// FALLBACK IMAGES
// ============================================================
function getFallbackImage(category) {
    const images = {
        "होम": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=400&fit=crop",
        "राजनीति": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop",
        "टेक्नोलॉजी": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
        "खेल": "https://images.unsplash.com/photo-1461896836934-bd4bc94b7b9c?w=600&h=400&fit=crop",
        "मनोरंजन": "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=600&h=400&fit=crop",
        "दुनिया": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
        "बिजनेस": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
        "home": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=400&fit=crop",
        "politics": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop",
        "technology": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
        "sports": "https://images.unsplash.com/photo-1461896836934-bd4bc94b7b9c?w=600&h=400&fit=crop",
        "entertainment": "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=600&h=400&fit=crop",
        "world": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
        "business": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop"
    };
    return images[category] || images["होम"];
}

// ============================================================
// FETCH NEWS (Fixed)
// ============================================================
async function fetchNews(category) {
    console.log('📰 Fetching news for:', category);
    const grid = document.getElementById('news-grid');
    
    grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px;">
            <div style="display:inline-block;width:40px;height:40px;border:4px solid #e63946;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
            <p style="margin-top:16px;font-weight:600;">${currentLang === 'hindi' ? 'लोड हो रहा...' : 'Loading...'}</p>
        </div>
    `;

    try {
        const feedUrl = rssFeeds[category] || rssFeeds[currentLang === 'hindi' ? 'होम' : 'home'];
        const url = `${RSS2JSON_URL}?rss_url=${encodeURIComponent(feedUrl)}`;
        
        console.log('📡 Fetching from:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Data received:', data.items?.length || 0, 'items');

        if (data.status !== "ok" || !data.items || data.items.length === 0) {
            grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:60px;">${currentLang === 'hindi' ? '😕 कोई न्यूज़ नहीं मिली' : '😕 No news found'}</p>`;
            return;
        }

        allNewsItems = data.items;
        const countText = currentLang === 'hindi' ? 'खबरें' : 'News';
        document.getElementById('newsCount').textContent = `${data.items.length} ${countText}`;
        renderNews(data.items, category);
        renderFeatured(data.items.slice(0, 4), category);

    } catch (error) {
        console.error('❌ Fetch error:', error);
        grid.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;padding:60px;color:red;">
                ${currentLang === 'hindi' ? '❌ न्यूज़ लोड नहीं हो पाई' : '❌ Failed to load news'}<br/>
                <span style="font-size:14px;opacity:0.7;">${error.message}</span>
            </p>
        `;
    } finally {
        const loader = document.getElementById('loader');
        if (loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    }
}

// ============================================================
// RENDER NEWS
// ============================================================
function renderNews(items, category) {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '';

    items.forEach((item, index) => {
        let imageUrl = item.thumbnail || item.enclosure?.link || getFallbackImage(category);
        
        if (!imageUrl || imageUrl.includes('placeholder')) {
            const colors = ['#e63946', '#2a9d8f', '#e9c46a', '#f4a261', '#264653'];
            imageUrl = `https://via.placeholder.com/600x400/${colors[index % colors.length].replace('#','')}/ffffff?text=📰+${category}`;
        }

        const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleString(currentLang === 'hindi' ? 'hi-IN' : 'en-US', { hour12: true }) : (currentLang === 'hindi' ? 'अभी' : 'Just now');
        const shareUrl = encodeURIComponent(item.link);
        const shareText = encodeURIComponent(item.title || 'MK News Hub');

        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${imageUrl}" alt="${item.title || 'News'}" loading="lazy" 
                 onerror="this.src='${getFallbackImage(category)}'" />
            <div class="content">
                <span class="category">${item.author || (currentLang === 'hindi' ? 'MK News' : 'MK News')}</span>
                <h3>${item.title || (currentLang === 'hindi' ? 'शीर्षक नहीं' : 'No title')}</h3>
                <p>${item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 130) + '...' : (currentLang === 'hindi' ? 'विवरण नहीं' : 'No description')}</p>
                <a href="${item.link}" target="_blank" class="read-more">${currentLang === 'hindi' ? 'पढ़ें →' : 'Read →'}</a>
                <div style="margin:10px 0;display:flex;gap:8px;flex-wrap:wrap;">
                    <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}" target="_blank" 
                       style="background:#1DA1F2;color:white;padding:4px 12px;border-radius:20px;font-size:12px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                        <i class="fab fa-twitter"></i> ${currentLang === 'hindi' ? 'ट्वीट' : 'Tweet'}
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" 
                       style="background:#1877F2;color:white;padding:4px 12px;border-radius:20px;font-size:12px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                        <i class="fab fa-facebook"></i> ${currentLang === 'hindi' ? 'शेयर' : 'Share'}
                    </a>
                    <a href="https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}" target="_blank" 
                       style="background:#25D366;color:white;padding:4px 12px;border-radius:20px;font-size:12px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                        <i class="fab fa-whatsapp"></i> ${currentLang === 'hindi' ? 'भेजें' : 'Send'}
                    </a>
                </div>
                <span class="time">⏱ ${pubDate}</span>
            </div>
        `;
        grid.appendChild(card);
    });

    updateNewsCount();
}

// ============================================================
// FEATURED NEWS
// ============================================================
function renderFeatured(items, category) {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (items.length === 0) return;

    const mainImg = items[0].thumbnail || items[0].enclosure?.link || getFallbackImage(category);
    
    grid.innerHTML = `
        <div class="featured-card">
            <img src="${mainImg}" alt="${items[0].title}" 
                 style="width:100%;min-height:300px;object-fit:cover;" 
                 onerror="this.src='${getFallbackImage(category)}'" />
            <div class="featured-content">
                <span class="category-tag">${currentLang === 'hindi' ? '🔥 ट्रेंडिंग' : '🔥 Trending'}</span>
                <h3>${items[0].title || (currentLang === 'hindi' ? 'ब्रेकिंग न्यूज़' : 'Breaking News')}</h3>
                <p style="opacity:0.8;">${items[0].description ? items[0].description.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : ''}</p>
                <a href="${items[0].link}" target="_blank" style="color:#ffd700;font-weight:700;text-decoration:none;">${currentLang === 'hindi' ? 'पढ़ें →' : 'Read →'}</a>
            </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:16px;">
            ${items.slice(1, 4).map(item => {
                const img = item.thumbnail || item.enclosure?.link || getFallbackImage(category);
                const shareUrl = encodeURIComponent(item.link);
                return `
                    <div class="featured-card" style="display:flex;gap:12px;align-items:center;padding:12px 16px;background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);cursor:pointer;">
                        <img src="${img}" alt="news" style="width:100px;height:70px;object-fit:cover;border-radius:8px;" 
                             onerror="this.src='${getFallbackImage(category)}'" />
                        <div>
                            <span style="font-size:11px;color:var(--accent);font-weight:700;">${item.author || 'MK News'}</span>
                            <h4 style="font-size:14px;margin:2px 0 4px;">${item.title ? item.title.substring(0, 60) + '...' : ''}</h4>
                            <div style="display:flex;gap:6px;flex-wrap:wrap;">
                                <a href="${item.link}" target="_blank" style="font-size:12px;color:var(--accent);text-decoration:none;">${currentLang === 'hindi' ? 'पढ़ें →' : 'Read →'}</a>
                                <a href="https://twitter.com/intent/tweet?url=${shareUrl}" target="_blank" style="font-size:12px;color:#1DA1F2;text-decoration:none;"><i class="fab fa-twitter"></i></a>
                                <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" style="font-size:12px;color:#1877F2;text-decoration:none;"><i class="fab fa-facebook"></i></a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// ============================================================
// BREAKING NEWS
// ============================================================
async function updateBreaking() {
    try {
        const feedUrl = currentLang === 'hindi' ? rssFeeds["होम"] : rssFeeds["home"];
        const url = `${RSS2JSON_URL}?rss_url=${encodeURIComponent(feedUrl)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === "ok" && data.items?.length > 0) {
            const el = document.getElementById('breaking-text');
            const headlines = data.items.map(i => i.title).slice(0, 6);
            let idx = 0;
            setInterval(() => {
                el.textContent = headlines[idx % headlines.length] || (currentLang === 'hindi' ? 'लाइव अपडेट' : 'Live Update');
                idx++;
            }, 6000);
        }
    } catch (e) { console.log('Breaking error'); }
}

// ============================================================
// SEARCH NEWS
// ============================================================
function searchNews() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert(currentLang === 'hindi' ? 'कृपया कुछ खोजें!' : 'Please enter a search term!');
        return;
    }
    const lang = currentLang === 'hindi' ? 'hi-IN' : 'en-US';
    const searchUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${lang}&gl=${currentLang === 'hindi' ? 'IN' : 'US'}&ceid=${currentLang === 'hindi' ? 'IN:hi' : 'US:en'}`;
    const url = `${RSS2JSON_URL}?rss_url=${encodeURIComponent(searchUrl)}`;
    
    const grid = document.getElementById('news-grid');
    grid.innerHTML = `<p style="text-align:center;padding:40px;">${currentLang === 'hindi' ? '⏳ खोज हो रही है...' : '⏳ Searching...'}</p>`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok" && data.items?.length > 0) {
                document.getElementById('category-title').textContent = `"${query}" ${currentLang === 'hindi' ? 'के परिणाम' : 'results'}`;
                document.getElementById('newsCount').textContent = `${data.items.length} ${currentLang === 'hindi' ? 'खबरें' : 'News'}`;
                renderNews(data.items, currentLang === 'hindi' ? 'होम' : 'home');
                renderFeatured(data.items.slice(0, 4), currentLang === 'hindi' ? 'होम' : 'home');
            } else {
                grid.innerHTML = `<p style="text-align:center;padding:40px;">${currentLang === 'hindi' ? '😕 "'+query+'" से कोई न्यूज़ नहीं मिली' : '😕 No news found for "'+query+'"'}</p>`;
            }
        })
        .catch(() => {
            grid.innerHTML = `<p style="text-align:center;color:red;">${currentLang === 'hindi' ? '❌ एरर आ गई' : '❌ Error occurred'}</p>`;
        });
}

// ============================================================
// LIVE CLOCK
// ============================================================
function updateClock() {
    const now = new Date();
    const el = document.getElementById('live-time');
    if (el) {
        el.textContent = now.toLocaleString(currentLang === 'hindi' ? 'hi-IN' : 'en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        });
    }
}
setInterval(updateClock, 1000);
updateClock();

// ============================================================
// BACK TO TOP
// ============================================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// STICKY HEADER
// ============================================================
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// ============================================================
// NEWS COUNT ANIMATION
// ============================================================
function updateNewsCount() {
    const countEl = document.getElementById('newsCount');
    if (countEl) {
        countEl.classList.add('pulse');
        setTimeout(() => {
            countEl.classList.remove('pulse');
        }, 500);
    }
}

// ============================================================
// DARK MODE
// ============================================================
const darkBtn = document.getElementById('darkModeToggle');
if (darkBtn) {
    darkBtn.addEventListener('click', function() {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        if (current === 'dark') {
            html.removeAttribute('data-theme');
            darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            html.setAttribute('data-theme', 'dark');
            darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// ============================================================
// NEWSLETTER
// ============================================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        alert(`✅ ${currentLang === 'hindi' ? 'धन्यवाद!' : 'Thank you!'} ${input.value} ${currentLang === 'hindi' ? 'पर हमारा न्यूज़लेटर भेजा जाएगा।' : 'has been subscribed!'}`);
        input.value = '';
    });
}

// ============================================================
// MOBILE MENU
// ============================================================
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        const nav = document.getElementById('mainNav');
        if (nav) {
            nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
        }
    });
}

// ============================================================
// SEARCH ENTER KEY
// ============================================================
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchNews();
    });
}

// ============================================================
// 🤖 AI CHATBOT — SMART VERSION
// ============================================================

const aiResponses = {
    'greeting': {
        keywords: ['hi', 'hello', 'hey', 'namaste', 'नमस्ते', 'hii', 'hey there', 'good morning', 'good evening', 'good night', 'सुप्रभात', 'शुभ संध्या', 'हाय'],
        response: '🙏 Namaste! How can I help you with today\'s news? You can ask about Politics, Technology, Sports, Business, Weather, or any topic!'
    },
    'politics': {
        keywords: ['politics', 'राजनीति', 'political', 'modi', 'rahul', 'bjp', 'congress', 'election', 'चुनाव', 'पीएम', 'प्रधानमंत्री', 'pm', 'narendra modi', 'rahul gandhi', 'yogi', 'akhilesh', 'मोदी', 'राहुल', 'योगी', 'अखिलेश', 'amit shah', 'अमित शाह', 'kejriwal', 'केजरीवाल', 'mamata', 'ममता', 'trump', 'बाइडेन', 'putin', 'ज़ेलेंस्की', 'war', 'युद्ध', 'russia', 'ukraine', 'israel', 'iran', 'china', 'america', 'india china'],
        response: '📰 Today\'s top political news includes updates on elections, government policies, and international relations. Which specific political topic are you interested in?'
    },
    'technology': {
        keywords: ['tech', 'technology', 'टेक', 'टेक्नोलॉजी', 'ai', 'artificial intelligence', 'आर्टिफिशियल इंटेलिजेंस', 'machine learning', '5g', 'smartphone', 'mobile', 'iphone', 'android', 'gadget', 'गैजेट', 'software', 'सॉफ्टवेयर', 'cyber', 'साइबर', 'hacking', 'हैकिंग', 'internet', 'इंटरनेट', 'space', 'अंतरिक्ष', 'isro', 'nasa', 'robot', 'रोबोट', 'metaverse', 'blockchain', 'crypto', 'क्रिप्टो', 'bitcoin', 'elon musk', 'मस्क', 'jobs', 'apple', 'google', 'microsoft', 'amazon', 'tesla'],
        response: '💻 Technology is evolving rapidly! AI, 5G, and space tech are making headlines. What tech topic interests you the most?'
    },
    'sports': {
        keywords: ['sports', 'खेल', 'sport', 'cricket', 'क्रिकेट', 'football', 'फुटबॉल', 'tennis', 'टेनिस', 'badminton', 'बैडमिंटन', 'hockey', 'हॉकी', 'kabaddi', 'olympics', 'ओलंपिक', 'world cup', 'विश्व कप', 'ipl', 'virat', 'कोहली', 'dhoni', 'धोनी', 'rohit sharma', 'रोहित शर्मा', 'sachin', 'match', 'मैच', 'score', 'स्कोर'],
        response: '🏏 Sports news is always exciting! Cricket, football, and upcoming tournaments are in the spotlight. Which sport or team do you follow?'
    },
    'business': {
        keywords: ['business', 'बिजनेस', 'economy', 'अर्थव्यवस्था', 'market', 'मार्केट', 'stock', 'स्टॉक', 'sensex', 'nifty', 'share', 'शेयर', 'investment', 'निवेश', 'inflation', 'मुद्रास्फीति', 'gdp', 'tax', 'टैक्स', 'gst', 'finance', 'वित्त', 'bank', 'बैंक', 'loan', 'कर्ज', 'corporate', 'कॉर्पोरेट', 'startup', 'स्टार्टअप', 'petrol price', 'पेट्रोल', 'diesel price', 'डीजल', 'rupee', 'रुपया', 'dollar', 'डॉलर', 'gold price', 'सोना', 'real estate', 'insurance'],
        response: '📈 Markets are showing interesting movements today. Sensex and Nifty are in focus. Want to know about specific stocks or sectors?'
    },
    'weather': {
        keywords: ['weather', 'मौसम', 'rain', 'बारिश', 'monsoon', 'मानसून', 'sunny', 'धूप', 'cloudy', 'बादल', 'storm', 'तूफान', 'temperature', 'तापमान', 'heat', 'गर्मी', 'cold', 'ठंड', 'humidity', 'नमी', 'hurricane', 'cyclone', 'चक्रवात', 'flood', 'बाढ़', 'drought', 'सूखा', 'delhi weather', 'mumbai rain', 'weather update', 'मौसम अपडेट', 'आज का मौसम'],
        response: '🌧️ The monsoon is active across India. Want to know the weather in your city or region? Let me know!'
    },
    'health': {
        keywords: ['health', 'स्वास्थ्य', 'fitness', 'फिटनेस', 'diet', 'आहार', 'nutrition', 'पोषण', 'disease', 'बीमारी', 'doctor', 'डॉक्टर', 'hospital', 'अस्पताल', 'covid', 'corona', 'कोरोना', 'vaccine', 'वैक्सीन', 'mental health', 'मानसिक स्वास्थ्य', 'yoga', 'योग', 'medicine', 'दवा', 'cancer', 'हार्ट', 'heart', 'diabetes', 'ब्लड प्रेशर', 'sugar', 'blood pressure', 'fitness tips', 'workout'],
        response: '🏥 Health awareness is crucial! Stay updated on health news, fitness tips, and wellness trends. What health topic do you care about?'
    },
    'entertainment': {
        keywords: ['entertainment', 'मनोरंजन', 'film', 'फिल्म', 'movie', 'मूवी', 'bollywood', 'बॉलीवुड', 'hollywood', 'हॉलीवुड', 'actor', 'अभिनेता', 'actress', 'अभिनेत्री', 'singer', 'गायक', 'song', 'गाना', 'music', 'संगीत', 'tv show', 'टीवी शो', 'reality show', 'रीयलिटी शो', 'celeb', 'सेलिब्रिटी', 'web series', 'वेब सीरीज', 'ott', 'netflix', 'amazon prime', 'hotstar', 'disney', 'bollywood news', 'celebrity gossip'],
        response: '🎬 Bollywood, Hollywood, and web series are creating buzz! Want to know about new releases, celebrity news, or movie reviews?'
    },
    'education': {
        keywords: ['education', 'शिक्षा', 'school', 'स्कूल', 'college', 'कॉलेज', 'university', 'विश्वविद्यालय', 'exam', 'परीक्षा', 'result', 'परिणाम', 'admission', 'प्रवेश', 'scholarship', 'छात्रवृत्ति', 'student', 'छात्र', 'teacher', 'शिक्षक', 'learning', 'सीखना', 'degree', 'डिग्री', 'course', 'कोर्स', 'online learning', 'ऑनलाइन शिक्षा', 'career', 'करियर', 'job', 'नौकरी'],
        response: '📚 Education news covers exams, results, admissions, and career opportunities. Are you looking for something specific in education?'
    },
    'science': {
        keywords: ['science', 'विज्ञान', 'research', 'अनुसंधान', 'space', 'अंतरिक्ष', 'moon', 'चाँद', 'mars', 'मंगल', 'sun', 'सूरज', 'planet', 'ग्रह', 'nasa', 'isro', 'rover', 'satellite', 'उपग्रह', 'robot', 'robotics', 'physics', 'भौतिकी', 'chemistry', 'रसायन', 'biology', 'जीवविज्ञान', 'environment', 'पर्यावरण', 'climate change', 'जलवायु परिवर्तन', 'dna', 'genetics', 'nuclear', 'परमाणु'],
        response: '🔬 Science is advancing rapidly! Space exploration, new discoveries, and environmental research are making news. What scientific topic excites you?'
    },
    'crime': {
        keywords: ['crime', 'अपराध', 'murder', 'हत्या', 'theft', 'चोरी', 'robbery', 'लूट', 'police', 'पुलिस', 'court', 'अदालत', 'judge', 'न्यायाधीश', 'lawyer', 'वकील', 'case', 'मामला', 'accused', 'आरोपी', 'investigation', 'जांच', 'fraud', 'घोटाला', 'scam', 'साइबर क्राइम', 'cyber crime', 'digital fraud', 'डिजिटल फ्रॉड', 'arrest', 'गिरफ्तारी', 'sentence', 'सजा', 'gangster', 'डकैती', 'kill', 'shooting', 'attack', 'हमला', 'न्याय', 'justice'],
        response: '🚨 Crime news is being reported from across the country. Cyber fraud, scams, and investigations are in the spotlight. Which type of crime news are you looking for?'
    },
    'international': {
        keywords: ['international', 'अंतरराष्ट्रीय', 'world', 'दुनिया', 'global', 'वैश्विक', 'foreign', 'विदेश', 'united nations', 'un', 'संयुक्त राष्ट्र', 'china', 'चीन', 'usa', 'अमेरिका', 'uk', 'britain', 'रूस', 'russia', 'europe', 'यूरोप', 'africa', 'अफ्रीका', 'asia', 'एशिया', 'middle east', 'मध्य पूर्व', 'ukraine', 'यूक्रेन', 'israel', 'इज़राइल', 'iran', 'ईरान', 'pakistan', 'पाकिस्तान', 'bangladesh', 'बांग्लादेश', 'nepal', 'नेपाल', 'sri lanka', 'श्रीलंका', 'terrorism', 'आतंकवाद', 'peace', 'शांति', 'climate', 'summit', 'शिखर सम्मेलन', 'विश्व समाचार', 'global politics'],
        response: '🌍 The world is closely watching developments in the Middle East, US, China, and Europe. Where are you most interested in?'
    },
    'covid': {
        keywords: ['covid', 'corona', 'कोविड', 'corona virus', 'covid news', 'covid cases', 'covid vaccine', 'covid 19', 'covid update', 'corona update', 'कोरोना अपडेट', 'vaccine news', 'covid guidelines', 'covid precaution', 'covid relief', 'covid india', 'covid new variant'],
        response: '🦠 COVID-19 updates are still relevant. Cases, new variants, and vaccination drives are being monitored. Want to know about the latest health guidelines?'
    },
    'jobs': {
        keywords: ['job', 'jobs', 'नौकरी', 'career', 'करियर', 'employment', 'रोजगार', 'vacancy', 'रिक्ति', 'recruitment', 'भर्ती', 'upsc', 'ssc', 'bank', 'railway', 'government job', 'private job', 'work from home', 'घर से काम', 'job alert', 'हायरिंग', 'hiring', 'interview', 'साक्षात्कार', 'salary', 'वेतन', 'resume', 'बायोडाटा', 'apply', 'आवेदन', 'walk-in', 'job news', 'placement'],
        response: '💼 Job markets are buzzing! Government vacancies, private sector hiring, and work-from-home opportunities are in the news. Which sector are you looking for?'
    },
    'fallback': {
        keywords: [],
        response: '🤔 That\'s an interesting question! I\'m here to help with news. You can ask me about: Politics, Technology, Sports, Business, Weather, Health, Entertainment, or any current topic!'
    }
};

function getSmartResponse(message) {
    const msg = message.toLowerCase();
    for (const [key, data] of Object.entries(aiResponses)) {
        if (key === 'fallback') continue;
        for (const keyword of data.keywords) {
            if (msg.includes(keyword)) {
                return data.response;
            }
        }
    }
    return aiResponses.fallback.response + '\n\n💡 Try asking: "Tell me about politics", "Latest tech news", "Cricket scores", "Weather in Delhi", "Business updates", "Health tips", "Science news", "Job vacancies", "Crime news", or "International affairs"';
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    const chatBox = document.getElementById('chatMessages');
    chatBox.innerHTML += `
        <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
            <div style="background:var(--accent);color:white;padding:12px 16px;border-radius:12px 12px 4px 12px;max-width:85%;box-shadow:0 2px 8px rgba(230,57,70,0.2);">
                ${message}
            </div>
        </div>
    `;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
    
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

document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendChatMessage();
});

// ===== QUICK SUGGESTIONS =====
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

// ============================================================
// 🚀 PAGE LOAD (SAFE)
// ============================================================
window.onload = function () {
    console.log('📄 Page loaded successfully');
    try {
        fetchNews(currentCategory || 'होम');
        updateBreaking();
    } catch (e) {
        console.error('❌ Page load error:', e);
    }
};
