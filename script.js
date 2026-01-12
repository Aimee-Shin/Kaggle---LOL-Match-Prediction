// Chart Configuration
Chart.defaults.color = '#a09b8c';
Chart.defaults.borderColor = 'rgba(255,255,255,0.1)';

// Constants for colors used in charts
const goldColor = '#c8aa6e';
const accentColor = '#0ac8b9';
const lossColor = '#ff4e50';

// Language Switching Logic
function switchLang(lang) {
    const wrapperEn = document.getElementById('wrapper-en');
    const wrapperKo = document.getElementById('wrapper-ko');
    const html = document.documentElement;

    if (lang === 'en') {
        wrapperEn.classList.remove('hidden');
        wrapperKo.classList.add('hidden');
        html.lang = 'en';
    } else {
        wrapperEn.classList.add('hidden');
        wrapperKo.classList.remove('hidden');
        html.lang = 'ko';
    }

    // Scroll to top when switching
    window.scrollTo(0, 0);
}

// Chart Initializer Function
function initCharts(prefix = '') {
    const id = (name) => prefix + name;

    // 1. First Blood Win Rate
    if (document.getElementById(id('fbChart'))) {
        new Chart(document.getElementById(id('fbChart')), {
            type: 'bar',
            data: {
                labels: prefix ? ['퍼스트 블러드 미획득', '퍼스트 블러드 획득'] : ['No First Blood', 'First Blood'],
                datasets: [{
                    label: prefix ? '승률 (%)' : 'Win Rate (%)',
                    data: [39.7, 59.9],
                    backgroundColor: [lossColor, accentColor],
                    borderColor: [lossColor, accentColor],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }

    // 2. Dragon Win Rate
    if (document.getElementById(id('dragonChart'))) {
        new Chart(document.getElementById(id('dragonChart')), {
            type: 'bar',
            data: {
                labels: prefix ? ['0 드래곤', '1 드래곤'] : ['0 Dragons', '1 Dragon'],
                datasets: [{
                    label: prefix ? '승률 (%)' : 'Win Rate (%)',
                    data: [41.9, 64.1],
                    backgroundColor: [lossColor, accentColor]
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }

    // 3. Herald Win Rate
    if (document.getElementById(id('heraldChart'))) {
        new Chart(document.getElementById(id('heraldChart')), {
            type: 'bar',
            data: {
                labels: prefix ? ['0 전령', '1 전령'] : ['0 Heralds', '1 Herald'],
                datasets: [{
                    label: prefix ? '승률 (%)' : 'Win Rate (%)',
                    data: [47.7, 59.5],
                    backgroundColor: [lossColor, accentColor]
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }

    // 4. Logistic Regression Feature Importance
    if (document.getElementById(id('featLRChart'))) {
        new Chart(document.getElementById(id('featLRChart')), {
            type: 'bar',
            data: {
                labels: prefix ? ['골드 차이', 'Exp 차이', '드래곤', '킬 차이', 'KDA'] : ['Gold Diff', 'Exp Diff', 'Dragons', 'Kill Diff', 'KDA'],
                datasets: [{
                    label: prefix ? '계수 영향력' : 'Coefficient Impact',
                    data: [0.96, 0.51, 0.26, -0.09, 0.08],
                    backgroundColor: context => {
                        const value = context.dataset.data[context.dataIndex];
                        return value < 0 ? lossColor : goldColor;
                    }
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: { legend: { display: false } }
            }
        });
    }

    // 5. Random Forest Feature Importance
    if (document.getElementById(id('featRFChart'))) {
        new Chart(document.getElementById(id('featRFChart')), {
            type: 'bar',
            data: {
                labels: prefix ? ['골드 차이', 'Exp 차이', '킬 차이', 'KDA', '드래곤'] : ['Gold Diff', 'Exp Diff', 'Kill Diff', 'KDA', 'Dragons'],
                datasets: [{
                    label: prefix ? '중요도' : 'Importance',
                    data: [0.366, 0.242, 0.160, 0.121, 0.031],
                    backgroundColor: goldColor
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: { legend: { display: false } }
            }
        });
    }

    // 6. LightGBM Feature Importance
    if (document.getElementById(id('featLGBMChart'))) {
        new Chart(document.getElementById(id('featLGBMChart')), {
            type: 'bar',
            data: {
                labels: prefix ? ['골드 차이', 'Exp 차이', '드래곤', 'KDA', '와드 설치'] : ['Gold Diff', 'Exp Diff', 'Dragons', 'KDA', 'Wards Placed'],
                datasets: [{
                    label: prefix ? '중요도 (Gain)' : 'Importance (Gain)',
                    data: [89226, 20632, 4304, 2362, 744],
                    backgroundColor: accentColor
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: { legend: { display: false } }
            }
        });
    }

    // 7. Elite Monsters vs Win Rate
    if (document.getElementById(id('eliteMonstersChart'))) {
        new Chart(document.getElementById(id('eliteMonstersChart')), {
            type: 'bar',
            data: {
                labels: prefix ? ['0개', '1개', '2개'] : ['0 Monsters', '1 Monster', '2 Monsters'],
                datasets: [{
                    label: prefix ? '승률 (%)' : 'Win Rate (%)',
                    data: [39.9, 58.6, 73.5],
                    backgroundColor: [lossColor, accentColor, '#2ecc71']
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }

    // 8. KDA vs Win Rate Chart
    if (document.getElementById(id('kdaChart'))) {
        new Chart(document.getElementById(id('kdaChart')), {
            type: 'bar',
            data: {
                labels: ['0-1', '1-1.7', '1.7-2.5', '2.5-4', '4+'],
                datasets: [{
                    label: prefix ? '승률 (%)' : 'Win Rate (%)',
                    data: [18.05, 35.17, 50.96, 65.43, 82.69],
                    backgroundColor: context => {
                        const value = context.dataset.data[context.dataIndex];
                        return value < 50 ? lossColor : accentColor;
                    }
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }

    // 9. LR Feature Importance (Comparison Section)
    if (document.getElementById(id('featLRCompChart'))) {
        new Chart(document.getElementById(id('featLRCompChart')), {
            type: 'bar',
            data: {
                labels: prefix ? ['골드 차이', 'Exp 차이', '드래곤', '킬 차이', 'KDA'] : ['Gold Diff', 'Exp Diff', 'Dragons', 'Kill Diff', 'KDA'],
                datasets: [{
                    label: prefix ? '계수 영향력' : 'Coefficient Impact',
                    data: [0.96, 0.51, 0.26, -0.09, 0.08],
                    backgroundColor: context => {
                        const value = context.dataset.data[context.dataIndex];
                        return value < 0 ? lossColor : goldColor;
                    }
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: { legend: { display: false } }
            }
        });
    }
}

// Initialize Logic
document.addEventListener('DOMContentLoaded', function () {
    // Initialize English Charts (default IDs)
    initCharts('');

    // Initialize Korean Charts (prefixed IDs)
    initCharts('ko-');

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update active link styling
                const allLinks = document.querySelectorAll('.nav-links a');
                allLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Sidebar active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
