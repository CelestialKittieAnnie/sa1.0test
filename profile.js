const userAvatar = document.getElementById('user-avatar');
const avatarUpload = document.getElementById('avatar-upload');
const usernameInput = document.getElementById('username-input');
const bioInput = document.getElementById('bio-input');
const saveProfileButton = document.getElementById('save-profile');
const backgroundUpload = document.getElementById('background-upload');
const reelsContainer = document.getElementById('reels-container');
const photoAlbumsContainer = document.getElementById('photo-albums-container');
const userPostsContainer = document.getElementById('user-posts-container');

let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
    avatar: 'default-avatar.png',
    username: 'User',
    bio: '',
    background: 'default-background.png',
    reels: [],
    photoAlbums: [],
    posts: []
};

// Load profile from local storage
function loadProfile() {
    userAvatar.src = userProfile.avatar;
    usernameInput.value = userProfile.username;
    bioInput.value = userProfile.bio;
    document.body.style.backgroundImage = `url(${userProfile.background})`;
    displayReels();
    displayPhotoAlbums();
    displayPosts();
}

// Save profile to local storage
saveProfileButton.addEventListener('click', () => {
    userProfile.username = usernameInput.value || 'User';
    userProfile.bio = bioInput.value;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    alert('Profile saved!');
    loadProfile();
});

// Upload avatar
avatarUpload.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = () => {
        userProfile.avatar = reader.result;
        userAvatar.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

// Upload background picture
backgroundUpload.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = () => {
        userProfile.background = reader.result;
        document.body.style.backgroundImage = `url(${reader.result})`;
    };
    reader.readAsDataURL(event.target.files[0]);
});

// Display reels
function displayReels() {
    reelsContainer.innerHTML = '';
    userProfile.reels.forEach((reel, index) => {
        const video = document.createElement('video');
        video.controls = true;
        video.src = reel;
        reelsContainer.appendChild(video);
    });
}

// Display photo albums
function displayPhotoAlbums() {
    photoAlbumsContainer.innerHTML = '';
    userProfile.photoAlbums.forEach((album, index) => {
        const img = document.createElement('img');
        img.src = album;
        img.classList.add('photo-album');
        photoAlbumsContainer.appendChild(img);
    });
}

// Display posts
function displayPosts() {
    userPostsContainer.innerHTML = '';
    userProfile.posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `<p>${post.text}</p><small>${new Date(post.timestamp).toLocaleString()}</small>`;
        if (post.media) {
            if (post.mediaType.startsWith('image/')) {
                postDiv.innerHTML += `<img src="${post.media}" alt="Post media" class="post-media">`;
            } else if (post.mediaType.startsWith('video/')) {
                postDiv.innerHTML += `<video controls class="post-media"><source src="${post.media}" type="${post.mediaType}"></video>`;
            }
        }
        userPostsContainer.appendChild(postDiv);
    });
}

loadProfile();
