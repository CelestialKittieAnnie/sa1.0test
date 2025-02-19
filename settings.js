const changeThemeButton = document.getElementById('change-theme-button');
const themePopup = document.getElementById('theme-popup');
const themeList = document.getElementById('theme-list');

const themes = [
    { name: 'Christmas', colors: ['#FF0000', '#00FF00', '#FFFFFF', '#FFD700'] },
    { name: 'Halloween', colors: ['#FF7518', '#000000', '#FFD700', '#8B4513'] },
    { name: 'Easter', colors: ['#FFB6C1', '#FFFACD', '#E6E6FA', '#98FB98'] },
    { name: 'Valentine\'s Day', colors: ['#FF69B4', '#FF1493', '#FFC0CB', '#FFD700'] },
    { name: 'Pastel 1', colors: ['#FFB6C1', '#FFDAB9', '#E6E6FA', '#FFFACD'] },
    { name: 'Pastel 2', colors: ['#FFB6C1', '#98FB98', '#AFEEEE', '#FFDAB9'] },
    { name: 'Dark 1', colors: ['#2F4F4F', '#696969', '#708090', '#778899'] },
    { name: 'Dark 2', colors: ['#000000', '#2C2C2C', '#4F4F4F', '#696969'] },
    { name: 'Spring', colors: ['#FFB6C1', '#98FB98', '#FFD700', '#E6E6FA'] },
    { name: 'Summer', colors: ['#FFD700', '#FF4500', '#FF6347', '#FF8C00'] },
    { name: 'Autumn', colors: ['#FF7518', '#8B4513', '#FFD700', '#FF6347'] },
    { name: 'Winter', colors: ['#00FFFF', '#4682B4', '#B0E0E6', '#FFFFFF'] }
];

changeThemeButton.addEventListener('click', () => {
    themePopup.classList.toggle('hidden');
    if (!themePopup.classList.contains('hidden')) {
        themeList.innerHTML = '';
        themes.forEach((theme, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<button class="theme-option" data-index="${index}" style="background: linear-gradient(45deg, ${theme.colors.join(', ')})">${theme.name}</button>`;
            themeList.appendChild(li);
        });
    }
});

themeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('theme-option')) {
        const themeIndex = event.target.getAttribute('data-index');
        applyTheme(themes[themeIndex].colors);
        themePopup.classList.add('hidden');
    }
});

function applyTheme(colors) {
    document.documentElement.style.setProperty('--primary-color', colors[0]);
    document.documentElement.style.setProperty('--secondary-color', colors[1]);
    document.documentElement.style.setProperty('--tertiary-color', colors[2]);
    document.documentElement.style.setProperty('--quaternary-color', colors[3]);
    localStorage.setItem('theme', JSON.stringify(colors));
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = JSON.parse(localStorage.getItem('theme'));
    if (savedTheme) {
        applyTheme(savedTheme);
    }
});