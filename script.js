// 🌐 RSS to JSON फ्री कन्वर्टर API
const RSS2JSON_URL = "https://api.rss2json.com/v1/api.json";

// 🔥 अलग-अलग RSS फीड्स (हिंदी + इंग्लिश मिक्स)
const rssFeeds = {
    "होम": "https://news.google.com/rss?hl=hi-IN&gl=IN&ceid=IN:hi",
    "राजनीति": "https://news.google.com/rss/search?q=politics+india&hl=hi-IN&gl=IN&ceid=IN:hi",
    "टेक्नोलॉजी": "https://news.google.com/rss/search?q=technology&hl=hi-IN&gl=IN&ceid=IN:hi",
    "खेल": "https://news.google.com/rss/search?q=sports&hl=hi-IN&gl=IN&ceid=IN:hi",
    "मनोरंजन": "https://news.google.com/rss/search?q=entertainment&hl=hi-IN&gl=IN&ceid=IN:hi"
};

// 📰 न्यूज़ फेच करें
async function fetchNews(category = "होम") {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '<p style="text-align:center; padding:40px;">⏳ न्यूज़ लोड हो रही है...</p>';

    try {
        const rssUrl = rssFeeds[category] || rssFeeds["होम"];
        const url = `${RSS2JSON_URL}?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok" || !data.items || data.items.length === 0) {
            grid.innerHTML = '<p style="text-align:center;">😕 कोई न्यूज़ नहीं मिली</p>';
            return;
        }

        renderNews(data.items);

    } catch (error) {
        grid.innerHTML = `<p style="text-align:center; color:red;">❌ न्यूज़ लोड नहीं हुई: ${error.message}</p>`;
    }
}

// 📰 न्यूज़ कार्ड्स रेंडर करें
function renderNews(items) {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '';

    items.forEach((item) => {
        // थंबनेल निकालें (अगर है तो)
        let imageUrl = 'https://via.placeholder.com/400x250/0b1a33/ffffff?text=MK+News+Hub';
        if (item.thumbnail) {
            imageUrl = item.thumbnail;
        } else if (item.enclosure && item.enclosure.link) {
            imageUrl = item.enclosure.link;
        }

        // पब्लिश टाइम
        const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleString('hi-IN') : 'अभी';

        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${imageUrl}" alt="${item.title || 'न्यूज़'}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x250/0b1a33/ffffff?text=News+Image'"/>
            <div class="content">
                <span class="category">${item.author || 'गूगल न्यूज़'}</span>
                <h3>${item.title || 'कोई शीर्षक नहीं'}</h3>
                <p>${item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...' : 'विवरण उपलब्ध नहीं'}</p>
                <a href="${item.link}" target="_blank" style="display:inline-block; margin-top:8px; color:#0b1a33; font-weight:bold; text-decoration:none; border:1px solid #0b1a33; padding:4px 14px; border-radius:20px; font-size:13px;">पढ़ें →</a>
                <span class="time">⏱ ${pubDate}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 🔴 Breaking News (सबसे नई हेडलाइन)
async function updateBreaking() {
    try {
        const url = `${RSS2JSON_URL}?rss_url=${encodeURIComponent(rssFeeds["होम"])}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok" && data.items && data.items.length > 0) {
            const el = document.getElementById('breaking-text');
            const headlines = data.items.map(item => item.title).slice(0, 5);
            let index = 0;
            setInterval(() => {
                el.textContent = headlines[index % headlines.length] || 'लाइव अपडेट';
                index++;
            }, 6000);
        }
    } catch (e) {
        console.log("Breaking News अपडेट नहीं हो पाया");
    }
}

// 🏷️ नेविगेशन कैटेगरी क्लिक हैंडलर
document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const text = this.textContent.trim();
        if (rssFeeds[text]) {
            fetchNews(text);
        } else {
            fetchNews("होम");
        }
    });
});

// 🚀 पेज लोड होने पर
window.onload = function () {
    fetchNews("होम");
    updateBreaking();
};
