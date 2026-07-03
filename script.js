// ============================================================
// 🔥 MK NEWS HUB — COMPLETE SCRIPT (Image Fix Final)
// ============================================================

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

// ===== 🖼️ कैटेगरी बेस्ड कलरफुल इमेजेज़ (हमेशा काम करेंगी) =====
function getCategoryImage(category, index = 0) {
    const images = {
        "होम": [
            "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&h=400&fit=crop&crop=center"
        ],
        "राजनीति": [
            "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=400&fit=crop&crop=center"
        ],
        "टेक्नोलॉजी": [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&crop=center"
        ],
        "खेल": [
            "https://images.unsplash.com/photo-1461896836934-bd4bc94b7b9c?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop&crop=center"
        ],
        "मनोरंजन": [
            "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=400&fit=crop&crop=center"
        ],
        "दुनिया": [
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=600&h=400&fit=crop&crop=center"
        ],
        "बिजनेस": [
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&crop=center"
        ]
    };
    
    const catImages = images[category] || images["होम"];
    return catImages[index % catImages.length];
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
        // 🖼️ हर न्यूज़ के लिए अलग इमेज
        const imageUrl = getCategoryImage(category, index);
        
        // अगर item में thumbnail है तो वो use करें
        let finalImage = item.thumbnail || item.enclosure?.link || imageUrl;

        const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleString('hi-IN', { hour12: true }) : 'अभी';
        const shareUrl = encodeURIComponent(item.link);
        const shareText = encodeURIComponent(item.title || 'MK News Hub');

        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${finalImage}" alt="${item.title || 'न्यूज़'}" loading="lazy" 
                 onerror="this.src='${imageUrl}'" />
            <div class="content">
                <span class="category">${item.author || 'MK News'}</span>
                <h3>${item.title || 'शीर्षक नहीं'}</h3>
                <p>${item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 130) + '...' : 'विवरण नहीं'}</p>
                <a href="${item.link}" target="_blank" class="read-more">पढ़ें →</a>
                <div style="margin:10px 0;display:flex;gap:8px;flex-wrap:wrap;">
                    <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}" target="_blank" 
                       style="background:#1DA1F2;color:white;padding:4px 12px;border-radius:20px;font-size:12px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                        <i class="fab fa-twitter"></i> Tweet
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" 
                       style="background:#1877F2;color:white;padding:4px 12px;border-radius:20px;font-size:12px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                        <i class="fab fa-facebook"></i> Share
                    </a>
                    <a href="https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}" target="_blank" 
                       style="background:#25D366;color:white;padding:4px 12px;border-radius:20px;font-size:12px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                        <i class="fab fa-whatsapp"></i> Send
                    </a>
                </div>
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

    const mainImg = items[0].thumbnail || items[0].enclosure?.link || getCategoryImage(category, 0);
    
    grid.innerHTML = `
        <div class="featured-card">
            <img src="${mainImg}" alt="${items[0].title}" 
                 style="width:100%;min-height:300px;object-fit:cover;" 
                 onerror="this.src='${getCategoryImage(category, 0)}'" />
            <div class="featured-content">
                <span class="category-tag">🔥 ट्रेंडिंग</span>
                <h3>${items[0].title || 'ब्रेकिंग न्यूज़'}</h3>
                <p style="opacity:0.8;">${items[0].description ? items[0].description.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : ''}</p>
                <a href="${items[0].link}" target="_blank" style="color:#ffd700;font-weight:700;text-decoration:none;">पढ़ें →</a>
            </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:16px;">
            ${items.slice(1, 4).map((item, i) => {
                const img = item.thumbnail || item.enclosure?.link || getCategoryImage(category, i + 1);
                const shareUrl = encodeURIComponent(item.link);
                return `
                    <div class="featured-card" style="display:flex;gap:12px;align-items:center;padding:12px 16px;background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);cursor:pointer;">
                        <img src="${img}" alt="news" style="width:100px;height:70px;object-fit:cover;border-radius:8px;" 
                             onerror="this.src='${getCategoryImage(category, i + 1)}'" />
                        <div>
                            <span style="font-size:11px;color:var(--accent);font-weight:700;">${item.author || 'MK News'}</span>
                            <h4 style="font-size:14px;margin:2px 0 4px;">${item.title ? item.title.substring(0, 60) + '...' : ''}</h4>
                            <div style="display:flex;gap:6px;flex-wrap:wrap;">
                                <a href="${item.link}" target="_blank" style="font-size:12px;color:var(--accent);text-decoration:none;">पढ़ें →</a>
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

// ===== 🔍 सर्च न्यूज़ =====
function searchNews() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert('कृपया कुछ खोजें!');
        return;
    }
    const searchUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=hi-IN&gl=IN&ceid=IN:hi`;
    const url = `${RSS2JSON_URL}?rss_url=${encodeURIComponent(searchUrl)}`;
    
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '<p style="text-align:center;padding:40px;">⏳ खोज हो रही है...</p>';
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok" && data.items?.length > 0) {
                document.getElementById('category-title').textContent = `"${query}" के परिणाम`;
                document.getElementById('newsCount').textContent = `${data.items.length} खबरें`;
                renderNews(data.items, "होम");
                renderFeatured(data.items.slice(0, 4), "होम");
                document.querySelectorAll('.main-nav a[data-category]').forEach(l => l.classList.remove('active'));
            } else {
                grid.innerHTML = `<p style="text-align:center;padding:40px;">😕 "${query}" से कोई न्यूज़ नहीं मिली</p>`;
            }
        })
        .catch(() => {
            grid.innerHTML = '<p style="text-align:center;color:red;">❌ एरर आ गई</p>';
        });
}

// ===== ⏰ लाइव घड़ी =====
function updateClock() {
    const now = new Date();
    const el = document.getElementById('live-time');
    if (el) {
        el.textContent = now.toLocaleString('hi-IN', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        });
    }
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
document.querySelectorAll('.main-nav a[data-category]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.main-nav a[data-category]').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const cat = this.dataset.category;
        if (cat) {
            fetchNews(cat);
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = '';
        }
    });
});

// ===== 📬 न्यूज़लेटर =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        alert(`✅ धन्यवाद! ${input.value} पर हमारा न्यूज़लेटर भेजा जाएगा।`);
        input.value = '';
    });
}

// ===== 📱 मोबाइल मेन्यू =====
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const nav = document.getElementById('mainNav');
        if (nav) {
            nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
        }
    });
}

// ===== 🔄 Enter Key से सर्च =====
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchNews();
    });
}

// ===== 🚀 पेज लोड =====
window.onload = function () {
    fetchNews("होम");
    updateBreaking();
};

// ===== 🎨 एनिमेशन स्टाइल =====
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
`;
document.head.appendChild(style);
