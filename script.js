const SUB_URL = "https://raw.githubusercontent.com/ffffffis/Codavrix-forum-first-sub-/refs/heads/main/Sub";
let currentApp = '';

// Данные приложений
const apps = {
    happ: {
        name: 'Happ',
        download: 'https://play.google.com/store/apps/details?id=com.happproxy',
        import: `happ://add/${SUB_URL}`
    },
    incy: {
        name: 'Incy',
        download: 'https://play.google.com/store/apps/details?id=llc.itdev.incy',
        import: `incy://add/${SUB_URL}`
    }
};

function goToStep(step, app = null) {
    if (app) currentApp = app;
    
    // Скрываем все шаги
    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active');
    });

    // Показываем нужный
    const target = document.getElementById(`step-${step}`);
    if (target) target.classList.add('active');

    // Если это шаг 2 или 3, заполняем данные
    if (step === 2 && currentApp) {
        const data = apps[currentApp];
        document.getElementById('step-2-title').textContent = `Скачайте ${data.name}`;
        document.getElementById('download-link').href = data.download;
    }

    if (step === 3 && currentApp) {
        const data = apps[currentApp];
        document.getElementById('step-3-app-name').textContent = data.name;
        document.getElementById('import-link').href = data.import;
    }
}

// Функция копирования ссылки
function copyLink() {
    const input = document.getElementById('sub-url');
    input.select();
    input.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(input.value).then(() => {
        const btn = document.getElementById('copy-btn');
        const originalText = btn.textContent;
        
        btn.textContent = 'Готово!';
        btn.style.color = 'var(--green)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = '#fff';
        }, 2000);
    });
}

// Инициализация (скрываем fallback логотипа, если картинка загрузилась)
document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.logo');
    const fallback = document.querySelector('.logo-fallback');
    
    if (img) {
        img.onload = () => {
            if (fallback) fallback.style.display = 'none';
        };
        // Если картинка уже закешировалась
        if (img.complete && img.naturalHeight !== 0) {
            if (fallback) fallback.style.display = 'none';
        }
    }
});
