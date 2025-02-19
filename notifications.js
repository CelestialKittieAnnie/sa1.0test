document.addEventListener('DOMContentLoaded', () => {
    const notificationsList = document.getElementById('notifications-list');
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification;
        notificationsList.appendChild(li);
    });
});

function addNotification(message) {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.push(message);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    showNotification(message);
}

function showNotification(message) {
    if (Notification.permission === 'granted') {
        new Notification('Social-Ai Notification', {
            body: message,
            icon: 'icon.png'
        });
    }
}

if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}