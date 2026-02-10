// ==========================================
// НАСТРОЙКИ (18 ФОТО)
// ==========================================
const slides = [
    // 1. Первая
    { img: 'assets/img2.jpg', title: 'Начало', text: 'Как все начиналось...' },
    
    // 2-16. Совместные (заполняй тексты)
    { img: 'assets/img1.jpg', title: '', text: 'Это мы' },
    { img: 'assets/img3.jpg', title: '', text: 'Это опять мы, ого' },
    { img: 'assets/img18.jpg', title: '', text: 'Пора поведать мне о том...' },
    { img: 'assets/img5.jpg', title: '', text: 'Как сильно ты мне важна' },
    { img: 'assets/img16.jpg', title: '', text: 'А также время проведенное с тобой' },
    { img: 'assets/img7.jpg', title: '', text: 'Совместные прогулки' },
    { img: 'assets/img8.jpg', title: '', text: 'Совместные тусовки' },
    { img: 'assets/img9.jpg', title: '', text: 'Совместная грусть' },
    { img: 'assets/img10.jpg', title: '', text: 'Совместные вечера' },
    { img: 'assets/img11.jpg', title: '', text: 'Совместные игрульки' },
    { img: 'assets/img12.jpg', title: '', text: 'Это всё мы делали вместе' },
    { img: 'assets/img13.jpg', title: '', text: 'И мне очень нравится' },
    { img: 'assets/img14.jpg', title: '', text: 'Желаю тебе счастья, поменьше нервов, а также...' },
    { img: 'assets/img15.jpg', title: '', text: '❤️ЛЮБВИ❤️' },
    { img: 'assets/img17.jpg', title: 'Почти всё', text: 'Но есть еще кое-что...' },

    // 17. Её фото (Предпоследнее)
    { 
        img: 'assets/img19.jpg', 
        title: 'Ты прекрасна', 
        text: 'Обожаю, когда ты улыбаешься', 
        isSpecial: true 
    },
    
    // 18. Её фото (Финал)
    { 
        img: 'assets/img6.jpg', 
        title: 'Я тебя люблю', 
        text: 'С 14 февраля, любимая! ❤️', 
        isSpecial: true 
    }
];

// ==========================================
// ЛОГИКА
// ==========================================
const app = document.getElementById('app');
const startScreen = document.getElementById('start-screen');
const audio = document.getElementById('bg-music');

// Генерация
slides.forEach((slide, index) => {
    const div = document.createElement('div');
    div.className = `slide ${slide.isSpecial ? 'special' : ''}`;
    div.setAttribute('data-index', index);
    
    div.innerHTML = `
        <div class="slide-bg" style="background-image: url('${slide.img}')"></div>
        <div class="slide-content">
            <img src="${slide.img}" class="slide-img">
            <div class="caption">
                ${slide.title ? `<h2>${slide.title}</h2>` : ''}
                <p>${slide.text}</p>
            </div>
        </div>
    `;
    app.appendChild(div);
});

// Старт
document.getElementById('start-btn').addEventListener('click', () => {
    startScreen.style.opacity = 0;
    setTimeout(() => {
        startScreen.style.display = 'none';
        app.classList.add('visible');
        document.getElementById('music-control').classList.remove('hidden');
        audio.volume = 0.6;
        audio.play().catch(e => console.log('Autoplay blocked'));
    }, 800);
});

// Наблюдатель
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Салют из сердец на последнем слайде
            if(entry.target.getAttribute('data-index') == slides.length - 1) {
                createHeartRain();
            }
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.slide').forEach(s => observer.observe(s));

// Музыка
document.getElementById('music-control').addEventListener('click', function() {
    this.style.opacity = audio.paused ? 1 : 0.5;
    audio.paused ? audio.play() : audio.pause();
});

// Финальный дождь
function createHeartRain() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0'; container.style.left = '0';
    container.style.width = '100%'; container.style.height = '100%';
    container.style.pointerEvents = 'none'; container.style.zIndex = '999';
    document.body.appendChild(container);

    const colors = ['#ff758c', '#ff4757', '#ffffff'];

    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-50px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.animation = `fall ${(Math.random() * 2 + 2)}s linear forwards`;
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 150);
    }
}

// Добавляем стиль анимации падения в JS, чтобы не захламлять CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fall {
    to { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}`;
document.head.appendChild(styleSheet);