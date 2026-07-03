// ============================================================
// 🔥 MK NEWS HUB — COMPLETE SCRIPT (Branded + Images Fixed)
// ============================================================

// ===== RSS FEEDS (Google News - Hindi) =====
const RSS2JSON_URL = "https://api.rss2json.com/v1/api.json";

const rssFeeds = {
    "होम": "https://news.google.com/rss?hl=hi-IN&gl=IN&ceid=IN:hi",
    "राजनीति": "https://news.google.com/rss/search?q=politics+india&hl=hi-IN&gl=IN&ceid=IN:hi",
    "टेक्नोलॉजी": "https://news.google.com/rss/search?q=technology&hl=hi-IN&gl=IN&ceid=IN:hi",
    "खेल": "https://news.google.com/rss/search?q=sports&hl=hi-IN&gl=IN&ceid=IN:hi",
    "मनोरंजन": "https://news.google.com/rss/search?q=entertainment&hl=hi-IN&gl=IN&ceid=IN:hi",
    "दुनिया": "https://news.google.com/rss?hl=hi-IN&gl=IN&ceid=IN:hi&topic=W",
    "बिजनेस": "https://news.google.com/rss?hl=hi-IN&gl=IN&ceid=IN:hi&topic=B"
};

let currentCategory = "होम";

// ===== 🖼️ फ्री इमेज सर्च API (Unsplash) =====
// बिना API Key के — खुद ही इमेज ढूंढेगा
async function getImageForNews(title) {
    try {
        // शब्दों को साफ करें
        const query = title
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .split(' ')
            .slice(0, 5)
            .join(' ');

        // Unsplash Open Source API (बिना Key)
        const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&w=600&h=400&client_id=YOUR_UNSPLASH_KEY`;
        
        // ⚠️ Unsplash के लिए free key चाहिए — नीचे देखें
        // अभी के लिए हम dummy + Google Image fallback use करेंगे
        return null; // फिलहाल fallback इमेज use करेंगे
    } catch {
        return null;
    }
}

// ===== 📰 फॉलबैक इमेज जनरेटर (कैटेगरी के हिसाब से) =====
function getFallbackImage(category) {
    const images = {
        "होम": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=400&fit=crop",
        "राजनीति": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop",
        "टेक्नोलॉजी": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
        "खेल": "https://images.unsplash.com/photo-1461896836934-bd4bc94b7b9c?w=600&h=400&fit=crop",
        "मनोरंजन": "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=600&h=400&fit=crop",
        "दुनिया": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
        "बिजनेस": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop"
    };
    return images[category] || images["होम"];
}

// ===== 🔥 न्यूज़ फेच करें =====
async function fetchNews(category = "होम") {
    currentCategory = category;
    const grid = document.getElementById('news-grid');
    grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px;">
            <div style="display:inline-block;width:40px;height:40px;border:4px solid #e63946;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
            <p style="margin-top:16px;font-weight:600;">${category} की न्यूज़ लोड हो रही...</p>
        </div>
    `;

    try {
        const rssUrl = rssFeeds[category] || rssFeeds["होम"];
        const url = `${RSS2JSON_URL}?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok" || !data.items || data.items.length === 0) {
            grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:60px;">😕 कोई न्यूज़ नहीं मिली</p>`;
            return;
        }

        document.getElementById('category-title').textContent = category;
        document.getElementById('newsCount').textContent = `${data.items.length} खबरें`;
        renderNews(data.items, category);
        renderFeatured(data.items.slice(0, 4), category);

    } catch (error) {
        grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:60px;color:red;">❌ ${error.message}</p>`;
    }
}

// ===== 📰 न्यूज़ कार्ड्स =====
function renderNews(items, category) {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '';

    items.forEach((item, index) => {
        // इमेज — पहले RSS से, नहीं तो कैटेगरी बेस्ड
        let imageUrl = item.thumbnail || item.enclosure?.link || getFallbackImage(category);
        
        // अगर इमेज नहीं है तो कलरफुल placeholder
        if (!imageUrl || imageUrl.includes('placeholder')) {
            const colors = ['#e63946', '#2a9d8f', '#e9c46a', '#f4a261', '#264653'];
            imageUrl = `https://via.placeholder.com/600x400/${colors[index % colors.length].replace('#','')}/ffffff?text=📰+${category}`;
        }

        const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleString('hi-IN', { hour12: true }) : 'अभी';

        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${imageUrl}" alt="${item.title || 'न्यूज़'}" loading="lazy" 
                 onerror="this.src='${getFallbackImage(category)}'" />
            <div class="content">
                <span class="category">${item.author || 'MK News'}</span>
                <h3>${item.title || 'शीर्षक नहीं'}</h3>
                <p>${item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 130) + '...' : 'विवरण नहीं'}</p>
                <a href="${item.link}" target="_blank" class="read-more">पढ़ें →</a>
                <span class="time">⏱ ${pubDate}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== 🔥 फीचर्ड सेक्शन =====
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
                <span class="category-tag">🔥 ट्रेंडिंग</span>
                <h3>${items[0].title || 'ब्रेकिंग न्यूज़'}</h3>
                <p style="opacity:0.8;">${items[0].description ? items[0].description.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : ''}</p>
                <a href="${items[0].link}" target="_blank" style="color:#ffd700;font-weight:700;text-decoration:none;">पढ़ें →</a>
            </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:16px;">
            ${items.slice(1, 4).map(item => {
                const img = item.thumbnail || item.enclosure?.link || getFallbackImage(category);
                return `
                    <div class="featured-card" style="display:flex;gap:12px;align-items:center;padding:12px 16px;background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);cursor:pointer;">
                        <img src="${img}" alt="news" style="width:100px;height:70px;object-fit:cover;border-radius:8px;" 
                             onerror="this.src='${getFallbackImage(category)}'" />
                        <div>
                            <span style="font-size:11px;color:var(--accent);font-weight:700;">${item.author || 'MK News'}</span>
                            <h4 style="font-size:14px;margin:2px 0 4px;">${item.title ? item.title.substring(0, 60) + '...' : ''}</h4>
                            <a href="${item.link}" target="_blank" style="font-size:12px;color:var(--accent);text-decoration:none;">पढ़ें →</a>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// ===== 🔴 ब्रेकिंग न्यूज़ =====
async function updateBreaking() {
    try {
        const url = `${RSS2JSON_URL}?rss_url=${encodeURIComponent(rssFeeds["होम"])}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === "ok" && data.items?.length > 0) {
            const el = document.getElementById('breaking-text');
            const headlines = data.items.map(i => i.title).slice(0, 6);
            let idx = 0;
            setInterval(() => {
                el.textContent = headlines[idx % headlines.length] || 'लाइव अपडेट';
                idx++;
            }, 6000);
        }
    } catch (e) { console.log('Breaking error'); }
}

// ===== ⏰ लाइव घड़ी =====
function updateClock() {
    const now = new Date();
    document.getElementById('live-time').textContent = now.toLocaleString('hi-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    });
}
setInterval(updateClock, 1000);
updateClock();

// ===== 🌙 डार्क मोड =====
const darkBtn = document.getElementById('darkModeToggle');
if (darkBtn) {
    darkBtn.addEventListener('click', () => {
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

// ===== 🧭 नेविगेशन =====
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.main-nav a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const cat = this.dataset.category;
        if (cat) fetchNews(cat);
    });
});

// ===== 📬 न्यूज़लेटर =====
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    alert(`✅ धन्यवाद! ${email} पर हमारा न्यूज़लेटर भेजा जाएगा।`);
    this.querySelector('input').value = '';
});

// ===== 📱 मोबाइल मेन्यू =====
document.getElementById('menuToggle')?.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav.style.display === 'none' || nav.style.display === '') {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
});

// ===== 🚀 पेज लोड =====
window.onload = function () {
    fetchNews("होम");
    updateBreaking();
};

// स्पिन एनिमेशन
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
