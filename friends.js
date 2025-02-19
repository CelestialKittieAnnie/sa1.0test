document.addEventListener('DOMContentLoaded', () => {
    const friendsList = document.getElementById('friends-list');

    let aiFriends = JSON.parse(localStorage.getItem('aiFriends')) || [];

    aiFriends.forEach(friend => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${friend.profile.avatar}" alt="${friend.name}" class="friend-avatar"> <a href="ai_friend_profile.html?name=${friend.name}">${friend.name}</a>`;
        friendsList.appendChild(li);
    });
});