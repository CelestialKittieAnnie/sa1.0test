document.addEventListener('DOMContentLoaded', () => {
    const friendName = document.getElementById('friend-name');
    const friendAvatar = document.getElementById('friend-avatar');
    const friendBio = document.getElementById('friend-bio');
    const friendBackground = document.getElementById('friend-background');
    const reelsContainer = document.getElementById('reels-container');
    const photoAlbumsContainer = document.getElementById('photo-albums-container');
    const friendPostsContainer = document.getElementById('friend-posts-container');

    const urlParams = new URLSearchParams(window.location.search);
    const friendNameParam = urlParams.get('name');

    let aiFriends = JSON.parse(localStorage.getItem('aiFriends')) || [];
    let friendProfile = aiFriends.find(friend => friend.name === friendNameParam);

    if (friendProfile) {
        loadFriendProfile();
    }

    function loadFriendProfile() {
        friendName.textContent = friendProfile.name;
        friendAvatar.src = friendProfile.profile.avatar;
        friendBio.textContent = friendProfile.profile.bio;
        friendBackground.src = friendProfile.profile.background || 'default-background.png';
        displayReels();
        displayPhotoAlbums();
        displayPosts();
    }

    // Display reels
    function displayReels() {
        reelsContainer.innerHTML = '';
        friendProfile.reels.forEach((reel, index) => {
            const video = document.createElement('video');
            video.controls = true;
            video.src = reel;
            reelsContainer.appendChild(video);
        });
    }

    // Display photo albums
    function displayPhotoAlbums() {
        photoAlbumsContainer.innerHTML = '';
        friendProfile.photoAlbums.forEach((album, index) => {
            const img = document.createElement('img');
            img.src = album;
            img.classList.add('photo-album');
            photoAlbumsContainer.appendChild(img);
        });
    }

    // Display posts
    function displayPosts() {
        friendPostsContainer.innerHTML = '';
        friendProfile.posts.forEach((post, index) => {
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
            friendPostsContainer.appendChild(postDiv);
        });
    }
});