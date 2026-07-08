// ============================================================
// 🔥 MK NEWS HUB — COMPLETE SCRIPT
// ============================================================

// ===== LOADING ANIMATION =====
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

// ===== RSS FEEDS =====
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

// ===== LANGUAGE BUTTONS =====
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

// ===== FALLBACK IMAGES =====
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

// ===== FETCH NEWS =====
async function fetchNews(category) {
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

        const response = await fetch(url);
        const data = await response.json();

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
        grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:60px;color:red;">❌ ${error.message}</p>`;
    }
}

// ===== RENDER NEWS =====
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

// ===== FEATURED NEWS =====
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

// ===== BREAKING NEWS =====
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

// ===== SEARCH NEWS =====
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

// ===== LIVE CLOCK =====
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

// ===== BACK TO TOP =====
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

// ===== STICKY HEADER =====
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

// ===== NEWS COUNT ANIMATION =====
function updateNewsCount() {
    const countEl = document.getElementById('newsCount');
    if (countEl) {
        countEl.classList.add('pulse');
        setTimeout(() => {
            countEl.classList.remove('pulse');
        }, 500);
    }
}

// ===== DARK MODE =====
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

// ===== NEWSLETTER =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        alert(`✅ ${currentLang === 'hindi' ? 'धन्यवाद!' : 'Thank you!'} ${input.value} ${currentLang === 'hindi' ? 'पर हमारा न्यूज़लेटर भेजा जाएगा।' : 'has been subscribed!'}`);
        input.value = '';
    });
}

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        const nav = document.getElementById('mainNav');
        if (nav) {
            nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
        }
    });
}

// ===== SEARCH ENTER KEY =====
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchNews();
    });
}

// ============================================================
// 🤖 AI CHATBOT (Free - No API Key Required)
// ============================================================

function getAIResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('namaste')) {
        return '🙏 Namaste! How can I help you with today\'s news?';
    }
    if (msg.includes('politics') || msg.includes('राजनीति')) {
        return '📰 India is buzzing with political news today! Who would you like to know about?';
    }
    if (msg.includes('tech') || msg.includes('technology') || msg.includes('टेक')) {
        return '💻 Technology news is heating up! AI, 5G, and startups are making headlines.';
    }
    if (msg.includes('sports') || msg.includes('खेल') || msg.includes('cricket')) {
        return '🏏 Cricket fever is on! India\'s performance is the talk of the town.';
    }
    if (msg.includes('weather') || msg.includes('मौसम') || msg.includes('rain')) {
        return '🌧️ Monsoon is active across India. Check the weather updates for your city!';
    }
    if (msg.includes('business') || msg.includes('बिजनेस') || msg.includes('market')) {
        return '📈 Markets are showing mixed trends today. Sensex and Nifty are in focus.';
    }
    if (msg.includes('who') || msg.includes('what') || msg.includes('when') || msg.includes('where')) {
        return '🔍 That\'s a great question! I can help you find news about any topic. Try searching for a specific keyword.';
    }
    if (msg.includes('thanks') || msg.includes('thank you') || msg.includes('धन्यवाद')) {
        return '😊 You\'re welcome! Stay tuned for more updates.';
    }
    if (msg.includes('help') || msg.includes('मदद')) {
        return '💡 You can ask me about: Politics, Technology, Sports, Business, Weather, or any news topic!';
    }
    
    return '📰 Interesting question! I\'m here to help with news. Ask me about: Politics, Technology, Sports, Business, Weather, or any topic!';
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    const chatBox = document.getElementById('chatMessages');
    
    chatBox.innerHTML += `
        <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
            <div style="background:var(--accent);color:white;padding:12px 16px;border-radius:12px 12px 4px 12px;max-width:85%;">
                ${message}
            </div>
        </div>
    `;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
    
    setTimeout(() => {
        const response = getAIResponse(message);
        chatBox.innerHTML += `
            <div style="display:flex;gap:10px;margin-bottom:10px;">
                <div style="background:var(--card-bg);padding:12px 16px;border-radius:12px 12px 12px 4px;max-width:85%;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
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

// ===== PAGE LOAD =====
window.onload = function () {
    fetchNews('होम');
    updateBreaking();
};
