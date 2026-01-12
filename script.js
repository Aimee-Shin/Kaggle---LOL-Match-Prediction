// Register scrolling and chart logic
document.addEventListener('DOMContentLoaded', function () {

    // Smooth Scrolling for Sidebar Links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Update active class
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update Active Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
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

    // --- Charts Configuration ---
    Chart.defaults.color = '#a09b8c';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.1)';
    const goldColor = '#c8aa6e';
    const accentColor = '#0ac8b9';
    const lossColor = '#ff4e50';

    // 1. First Blood Win Rate
    const ctxFB = document.getElementById('fbChart').getContext('2d');
    new Chart(ctxFB, {
        type: 'bar',
        data: {
            labels: ['No First Blood', 'First Blood'],
            datasets: [{
                label: 'Win Rate (%)',
                data: [39.7, 59.9],
                backgroundColor: [lossColor, accentColor],
                borderColor: [lossColor, accentColor],
                borderWidth: 1
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });

    // 2. Dragon Control
    const ctxDragon = document.getElementById('dragonChart').getContext('2d');
    new Chart(ctxDragon, {
        type: 'bar',
        data: {
            labels: ['0 Dragons', '1 Dragon'],
            datasets: [{
                label: 'Win Rate (%)',
                data: [41.9, 64.1],
                backgroundColor: [lossColor, accentColor]
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });

    // 3. Herald Control
    const ctxHerald = document.getElementById('heraldChart').getContext('2d');
    new Chart(ctxHerald, {
        type: 'bar',
        data: {
            labels: ['0 Heralds', '1 Herald'],
            datasets: [{
                label: 'Win Rate (%)',
                data: [47.7, 59.5],
                backgroundColor: [lossColor, accentColor]
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });

    // 4. Feature Importance (Logistic Regression)
    const ctxFeatLR = document.getElementById('featLRChart').getContext('2d');
    new Chart(ctxFeatLR, {
        type: 'bar',
        data: {
            labels: ['Gold Diff', 'Exp Diff', 'Dragons', 'Kill Diff', 'KDA'],
            datasets: [{
                label: 'Coefficient Impact',
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

    // 5. Feature Importance (Random Forest)
    const ctxFeatRF = document.getElementById('featRFChart').getContext('2d');
    new Chart(ctxFeatRF, {
        type: 'bar',
        data: {
            labels: ['Gold Diff', 'Exp Diff', 'Kill Diff', 'KDA', 'Dragons'],
            datasets: [{
                label: 'Importance',
                data: [0.366, 0.242, 0.160, 0.121, 0.031],
                backgroundColor: goldColor
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: { legend: { display: false } }
        }
    });

    // 6. Feature Importance (LightGBM)
    const ctxFeatLGBM = document.getElementById('featLGBMChart').getContext('2d');
    new Chart(ctxFeatLGBM, {
        type: 'bar',
        data: {
            labels: ['Gold Diff', 'Exp Diff', 'Dragons', 'KDA', 'Wards Placed'],
            datasets: [{
                label: 'Importance (Gain)',
                data: [89226, 20632, 4304, 2362, 744],
                backgroundColor: accentColor
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: { legend: { display: false } }
        }
    });
    // 7. Elite Monsters Win Rate
    if (document.getElementById('eliteMonstersChart')) {
        const ctxElite = document.getElementById('eliteMonstersChart').getContext('2d');
        new Chart(ctxElite, {
            type: 'bar',
            data: {
                labels: ['0', '1', '2'],
                datasets: [{
                    label: 'Win Rate (%)',
                    data: [39.9, 58.6, 73.5],
                    backgroundColor: [lossColor, accentColor, '#2ecc71']
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }

    // 8. KDA Win Rate
    if (document.getElementById('kdaChart')) {
        const ctxKda = document.getElementById('kdaChart').getContext('2d');
        new Chart(ctxKda, {
            type: 'bar',
            data: {
                labels: ['0-1', '1-1.7', '1.7-2.5', '2.5-4', '4+'],
                datasets: [{
                    label: 'Win Rate (%)',
                    data: [18.05, 35.17, 50.96, 65.43, 82.69],
                    backgroundColor: context => {
                        const value = context.dataset.data[context.dataIndex];
                        return value < 50 ? lossColor : accentColor;
                    }
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }
    // 9. Feature Importance (Logistic Regression - Comparison)
    if (document.getElementById('featLRCompChart')) {
        const ctxFeatLRComp = document.getElementById('featLRCompChart').getContext('2d');
        new Chart(ctxFeatLRComp, {
            type: 'bar',
            data: {
                labels: ['Gold Diff', 'Exp Diff', 'Dragons', 'Kill Diff', 'KDA'],
                datasets: [{
                    label: 'Coefficient Impact',
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
});
