// ===== RSS FEEDS =====
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

// ===== FETCH NEWS =====
async function fetchNews(category = "होम") {
    currentCategory = category;
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '<p style="text-align:center; padding:60px;">⏳ <br><span style="font-size:18px;font-weight:600;">न्यूज़ लोड हो रही है...</span></p>';

    try {
        const rssUrl = rssFeeds[category] || rssFeeds["होम"];
        const url = `${RSS2JSON_URL}?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok" || !data.items || data.items.length === 0) {
            grid.innerHTML = '<p style="text-align:center;padding:60px;">😕 <br><span style="font-size:18px;">कोई न्यूज़ नहीं मिली</span></p>';
            return;
        }

        document.getElementById('category-title').textContent = category;
        document.getElementById('newsCount').textContent = `${data.items.length} खबरें`;
        renderNews(data.items);
        renderFeatured(data.items.slice(0, 3));

    } catch (error) {
        grid.innerHTML = `<p style="text-align:center;padding:60px;color:red;">❌ <br><span style="font-size:18px;">न्यूज़ लोड नहीं हुई: ${error.message}</span></p>`;
    }
}

// ===== RENDER NEWS =====
function renderNews(items) {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '';

    items.forEach((item) => {
        let imageUrl = 'https://via.placeholder.com/600x400/1a2a4a/ffffff?text=MK+News';
        if (item.thumbnail) imageUrl = item.thumbnail;
        else if (item.enclosure?.link) imageUrl = item.enclosure.link;

        const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleString('hi-IN', { hour12: true }) : 'अभी';

        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${imageUrl}" alt="न्यूज़" loading="lazy" onerror="this.src='https://via.placeholder.com/600x400/1a2a4a/ffffff?text=News+Image'"/>
            <div class="content">
                <span class="category">${item.author || 'गूगल न्यूज़'}</span>
                <h3>${item.title || 'शीर्षक नहीं'}</h3>
                <p>${item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 130) + '...' : 'विवरण नहीं'}</p>
                <a href="${item.link}" target="_blank" class="read-more">पढ़ें →</a>
                <span class="time">⏱ ${pubDate}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== RENDER FEATURED =====
function renderFeatured(items) {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (items.length === 0) return;

    // पहली खबर बड़ी
    const main = items[0];
    const mainImg = main.thumbnail || 'https://via.placeholder.com/800x500/1a2a4a/ffffff?text=Breaking+News';
    grid.innerHTML = `
        <div class="featured-card">
            <img src="${mainImg}" alt="${main.title}" style="width:100%;min-height:300px;object-fit:cover;" onerror="this.src='https://via.placeholder.com/800x500/1a2a4a/ffffff?text=News+Image'"/>
            <div class="featured-content">
                <span class="category-tag">🔥 ट्रेंडिंग</span>
                <h3>${main.title || 'ब्रेकिंग न्यूज़'}</h3>
                <p style="opacity:0.8;">${main.description ? main.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : ''}</p>
                <a href="${main.link}" target="_blank" style="color:#ffd700;font-weight:700;text-decoration:none;">पढ़ें →</a>
            </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:16px;">
            ${items.slice(1, 4).map(item => `
                <div class="featured-card" style="display:flex;gap:12px;align-items:center;padding:12px 16px;background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);cursor:pointer;">
                    <img src="${item.thumbnail || 'https://via.placeholder.com/120x80/1a2a4a/ffffff?text=News'}" alt="news" style="width:100px;height:70px;object-fit:cover;border-radius:8px;" onerror="this.src='https://via.placeholder.com/120x80/1a2a4a/ffffff?text=News'"/>
                    <div>
                        <span style="font-size:11px;color:var(--accent);font-weight:700;">${item.author || 'न्यूज़'}</span>
                        <h4 style="font-size:14px;margin:2px 0 4px;">${item.title ? item.title.substring(0, 60) + '...' : ''}</h4>
                        <a href="${item.link}" target="_blank" style="font-size:12px;color:var(--accent);text-decoration:none;">पढ़ें →</a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ===== BREAKING NEWS =====
async function updateBreaking() {
    try {
        const url = `${RSS2JSON_URL}?rss_url=${encodeURIComponent(rssFeeds["होम"])}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === "ok" && data.items?.length > 0) {
            const el = document.getElementById('breaking-text');
            const headlines = data.items.map(i => i.title).slice(0, 5);
            let idx = 0;
            setInterval(() => {
                el.textContent = headlines[idx % headlines.length] || 'लाइव अपडेट';
                idx++;
            }, 6000);
        }
    } catch (e) { console.log('Breaking error'); }
}

// ===== LIVE CLOCK =====
function updateClock() {
    const now = new Date();
    document.getElementById('live-time').textContent = now.toLocaleString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}
setInterval(updateClock, 1000);
updateClock();

// ===== DARK MODE =====
const darkBtn = document.getElementById('darkModeToggle');
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

// ===== NAVIGATION =====
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.main-nav a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const cat = this.dataset.category;
        if (cat) fetchNews(cat);
    });
});

// ===== NEWSLETTER FORM =====
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    alert(`✅ धन्यवाद! ${email} पर न्यूज़लेटर भेजा जाएगा।`);
    this.querySelector('input').value = '';
});

// ===== MOBILE MENU =====
document.getElementById('menuToggle')?.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
});

// ===== INIT =====
window.onload = function () {
    fetchNews("होम");
    updateBreaking();
};
