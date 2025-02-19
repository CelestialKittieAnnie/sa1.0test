const postButton = document.getElementById('post-button');
const newPostText = document.getElementById('new-post-text');
const newPostMedia = document.getElementById('new-post-media');
const postsContainer = document.getElementById('posts-container');

let posts = JSON.parse(localStorage.getItem('posts')) || [];
let aiFriends = JSON.parse(localStorage.getItem('aiFriends')) || [];
let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
    avatar: 'default-avatar.png',
    username: 'User'
};

const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];

// Add new post
postButton.addEventListener('click', () => {
    const postText = newPostText.value;
    const mediaFile = newPostMedia.files[0];
    if (postText || mediaFile) {
        const reader = new FileReader();
        reader.onload = () => {
            const post = {
                text: postText,
                media: mediaFile ? reader.result : null,
                mediaType: mediaFile ? mediaFile.type : null,
                timestamp: new Date(),
                author: userProfile.username,
                avatar: userProfile.avatar,
                likes: 0,
                reactions: [],
                comments: []
            };
            posts.push(post);
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts();
            newPostText.value = '';
            newPostMedia.value = '';
        };
        if (mediaFile) {
            reader.readAsDataURL(mediaFile);
        } else {
            reader.onload();
        }
    }
});

// Generate random posts for AI friends
function generateAIPosts() {
    aiFriends.forEach(friend => {
        const postCount = Math.floor(Math.random() * 9) + 2; // 2-10 posts per 24 hours
        for (let i = 0; i < postCount; i++) {
            const post = {
                text: friend.posts[Math.floor(Math.random() * friend.posts.length)],
                media: null,
                mediaType: null,
                timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Spread out over the last 24 hours
                author: friend.name,
                avatar: friend.avatar,
                likes: 0,
                reactions: [],
                comments: []
            };
            posts.push(post);
        }
    });
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Display posts
function displayPosts() {
    postsContainer.innerHTML = '';
    posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
                <strong>${post.author}</strong>
            </div>
            <p>${post.text}</p>
            <small>${new Date(post.timestamp).toLocaleString()}</small>
            <div class="post-interactions">
                <button class="like-button" data-index="${index}">Like (${post.likes})</button>
                <div class="reaction-buttons" data-index="${index}">
                    ${emojis.map(emoji => `<button class="react-button" data-emoji="${emoji}" data-index="${index}">${emoji}</button>`).join('')}
                </div>
                <button class="comment-button" data-index="${index}">Comment</button>
            </div>
            <div class="comments-container hidden" data-index="${index}">
                <textarea class="comment-input" placeholder="Write a comment..."></textarea>
                <button class="submit-comment-button" data-index="${index}">Submit</button>
                <div class="comments-list"></div>
            </div>`;
        if (post.media) {
            if (post.mediaType.startsWith('image/')) {
                postDiv.innerHTML += `<img src="${post.media}" alt="Post media" class="post-media">`;
            } else if (post.mediaType.startsWith('video/')) {
                postDiv.innerHTML += `<video controls class="post-media"><source src="${post.media}" type="${post.mediaType}"></video>`;
            }
        }
        postsContainer.appendChild(postDiv);
    });

    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            posts[index].likes++;
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts();
        });
    });

    document.querySelectorAll('.react-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            const emoji = event.target.getAttribute('data-emoji');
            posts[index].reactions.push(emoji);
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts();
        });
    });

    document.querySelectorAll('.comment-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            const commentsContainer = document.querySelector(`.comments-container[data-index="${index}"]`);
            commentsContainer.classList.toggle('hidden');
        });
    });

    document.querySelectorAll('.submit-comment-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            const commentInput = document.querySelector(`.comment-input[data-index="${index}"]`);
            const commentText = commentInput.value;
            if (commentText) {
                posts[index].comments.push({
                    author: userProfile.username,
                    avatar: userProfile.avatar,
                    text: commentText,
                    timestamp: new Date()
                });
                localStorage.setItem('posts', JSON.stringify(posts));
                displayPosts();
            }
        });
    });
}

// Generate AI posts if not already generated
if (!localStorage.getItem('aiPostsGenerated')) {
    generateAIPosts();
    localStorage.setItem('aiPostsGenerated', 'true');
}

displayPosts();
