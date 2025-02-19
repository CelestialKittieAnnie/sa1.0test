const profilePicture = document.getElementById('profile-picture');
const backgroundPicture = document.getElementById('background-picture');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const details = document.getElementById('details');
const reelsContainer = document.getElementById('reels-container');
const photoAlbumsContainer = document.getElementById('photo-albums-container');
const postsContainer = document.getElementById('posts-container');

let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
    profilePicture: 'default-avatar.png',
    backgroundPicture: 'default-background.png',
    username: 'User',
    bio: '',
    details: ''
};

function loadProfile() {
    profilePicture.src = userProfile.profilePicture;
    backgroundPicture.src = userProfile.backgroundPicture;
    username.textContent = userProfile.username;
    bio.textContent = userProfile.bio;
    details.textContent = userProfile.details;
}

function loadReels() {
    // Load reels from localStorage or other source
}

function loadPhotoAlbums() {
    // Load photo albums from localStorage or other source
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
                <strong>${post.author}</strong>
            </div>
            <p>${post.text}</p>
            <small>${new Date(post.timestamp).toLocaleString()}</small>
        `;
        if (post.media) {
            if (post.mediaType.startsWith('image/')) {
                postDiv.innerHTML += `<img src="${post.media}" alt="Post media" class="post-media">`;
            } else if (post.mediaType.startsWith('video/')) {
                postDiv.innerHTML += `<video controls class="post-media"><source src="${post.media}" type="${post.mediaType}"></video>`;
            }
        }
        postsContainer.appendChild(postDiv);
    });
}

window.addEventListener('load', () => {
    loadProfile();
    loadReels();
    loadPhotoAlbums();
    loadPosts();
});