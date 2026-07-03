
// 📰 न्यूज़ डेटा (आप चाहें तो API से भी ला सकते हैं)
const newsData = [
    {
        category: "राजनीति",
        title: "आगामी चुनावों को लेकर बड़ा राजनीतिक दांव",
        desc: "सभी प्रमुख दलों ने अपने उम्मीदवारों की पहली लिस्ट जारी की।",
        time: "2 घंटे पहले",
        img: "https://picsum.photos/seed/politics/400/250"
    },
    {
        category: "टेक्नोलॉजी",
        title: "भारत में लॉन्च हुआ 5G का नया धमाकेदार प्लान",
        desc: "दिग्गज टेलीकॉम कंपनी ने अनलिमिटेड 5G प्लान किया पेश।",
        time: "5 घंटे पहले",
        img: "https://picsum.photos/seed/tech/400/250"
    },
    {
        category: "खेल",
        title: "ICC ट्रॉफी जीतने के बाद टीम इंडिया का जश्न",
        desc: "फाइनल मैच में रोमांचक जीत, पूरे देश में उत्सव का माहौल।",
        time: "8 घंटे पहले",
        img: "https://picsum.photos/seed/sports/400/250"
    },
    {
        category: "मनोरंजन",
        title: "बॉलीवुड की मेगा फिल्म ने किया 100 करोड़ का आंकड़ा पार",
        desc: "पहले ही वीकेंड में फिल्म ने बॉक्स ऑफिस पर तोड़ा रिकॉर्ड।",
        time: "12 घंटे पहले",
        img: "https://picsum.photos/seed/entertain/400/250"
    }
];

// न्यूज़ कार्ड्स जनरेट करें
function loadNews() {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '';

    newsData.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}" loading="lazy" />
            <div class="content">
                <span class="category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <span class="time">⏱ ${item.time}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Breaking News अपडेट
function updateBreaking() {
    const texts = [
        "दिल्ली में भारी बारिश की चेतावनी, ऑरेंज अलर्ट जारी",
        "सेंसेक्स 500 अंक टूटा, निवेशकों को 1.2 लाख करोड़ का नुकसान",
        "भारत-ऑस्ट्रेलिया टेस्ट सीरीज का शेड्यूल हुआ जारी",
        "सरकार ने पेट्रोल-डीजल की कीमतों में कटौती की"
    ];
    const el = document.getElementById('breaking-text');
    let i = 0;
    setInterval(() => {
        el.textContent = texts[i % texts.length];
        i++;
    }, 5000);
}

// पेज लोड होने पर
window.onload = function () {
    loadNews();
    updateBreaking();
};
