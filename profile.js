const profilePictureInput = document.getElementById('profile-picture');
const backgroundPictureInput = document.getElementById('background-picture');
const usernameInput = document.getElementById('username');
const bioInput = document.getElementById('bio');
const detailsInput = document.getElementById('details');
const saveProfileButton = document.getElementById('save-profile');
const backgroundUpload = document.getElementById('background-upload');
const reelsContainer = document.getElementById('reels-container');
const photoAlbumsContainer = document.getElementById('photo-albums-container');
const userPostsContainer = document.getElementById('user-posts-container');

let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
    profilePicture: 'default-avatar.png',
    backgroundPicture: 'default-background.png',
    username: 'User',
    bio: '',
    details: '',
    reels: [],
    photoAlbums: [],
    posts: []
};

// Load profile from local storage
function loadProfile() {
    profilePictureInput.value = '';
    backgroundPictureInput.value = '';
    usernameInput.value = userProfile.username;
    bioInput.value = userProfile.bio;
    detailsInput.value = userProfile.details;
    document.body.style.backgroundImage = `url(${userProfile.backgroundPicture})`;
    displayReels();
    displayPhotoAlbums();
    displayPosts();
}

// Save profile to local storage
function saveProfile() {
    const reader = new FileReader();
    reader.onload = () => {
        userProfile.profilePicture = profilePictureInput.files[0] ? reader.result : userProfile.profilePicture;
        userProfile.backgroundPicture = backgroundPictureInput.files[0] ? reader.result : userProfile.backgroundPicture;
        userProfile.username = usernameInput.value;
        userProfile.bio = bioInput.value;
        userProfile.details = detailsInput.value;
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        alert('Profile saved!');
        loadProfile();
    };
    if (profilePictureInput.files[0]) {
        reader.readAsDataURL(profilePictureInput.files[0]);
    } else if (backgroundPictureInput.files[0]) {
        reader.readAsDataURL(backgroundPictureInput.files[0]);
    } else {
        reader.onload();
    }
}

saveProfileButton.addEventListener('click', saveProfile);
window.addEventListener('load', loadProfile);

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
