const sendChatButton = document.getElementById('send-chat');

let userProfile = {
    avatar: 'default-avatar.png',
    username: 'User',
    achievements: []
};

let posts = [];
let chatHistory = [];
let aiFriends = [
    { name: 'AI Friend 1', messages: [] },
    { name: 'AI Friend 2', messages: [] }
];

// Load profile from local storage
if (localStorage.getItem('userProfile')) {
    userProfile = JSON.parse(localStorage.getItem('userProfile'));
    userAvatar.src = userProfile.avatar;
    usernameInput.value = userProfile.username;
    displayAchievements();
}

// Save profile to local storage
saveProfileButton.addEventListener('click', () => {
    userProfile.username = usernameInput.value || 'User';
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    alert('Profile saved!');
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

// Display achievements
function displayAchievements() {
    achievementsList.innerHTML = '';
    userProfile.achievements.forEach((achievement) => {
        const li = document.createElement('li');
        li.textContent = achievement;
        achievementsList.appendChild(li);
    });
}

// Add new post
postButton.addEventListener('click', () => {
    const postText = newPostText.value;
    if (postText) {
        posts.push({ text: postText, timestamp: new Date(), author: userProfile.username });
        displayPosts();
        newPostText.value = '';
    }
});

// Display posts
function displayPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `<strong>${post.author}</strong>: <p>${post.text}</p><small>${post.timestamp.toLocaleString()}</small>`;
        postsContainer.appendChild(postDiv);
    });
}

// Send chat message
sendChatButton.addEventListener('click', () => {
    const message = chatInput.value;
    if (message) {
        chatHistory.push({ sender: userProfile.username, message: message, timestamp: new Date() });
        chatInput.value = '';
        displayChat();
        // Simulate AI response
        setTimeout(() => {
            const aiResponse = generateAIResponse(message);
            chatHistory.push({ sender: 'AI Friend', message: aiResponse, timestamp: new Date() });
            displayChat();
            addNotification(`AI Friend sent you a message: ${aiResponse}`);
        }, 1000);
    }
});

// Display chat messages
function displayChat() {
    chatContainer.innerHTML = '';
    chatHistory.forEach((chat) => {
        const chatDiv = document.createElement('div');
        chatDiv.classList.add('chat-message');
        chatDiv.innerHTML = `<strong>${chat.sender}:</strong> ${chat.message} <small>${chat.timestamp.toLocaleString()}</small>`;
        chatContainer.appendChild(chatDiv);
    });
}

// Generate AI response
function generateAIResponse(message) {
    const keywords = extractKeywords(message);
    if (keywords.includes('joke')) {
        return getRandomJoke();
    }
    return `You mentioned ${keywords.join(', ')}. That's interesting! Tell me more.`;
}

// Extract keywords from message
function extractKeywords(message) {
    // Simple keyword extraction for demonstration purposes
    const words = message.split(' ');
    return words.filter(word => word.length > 3);
}

// Get a random joke from the list
function getRandomJoke() {
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "Why don't skeletons fight each other? They don't have the guts.",
        "What do you call fake spaghetti? An impasta!",
        "Why did the math book look sad? Because it had too many problems.",
        "Why was the math book unhappy? It had too many problems.",
        "Why don't programmers like nature? It has too many bugs.",
        "How do you organize a space party? You planet.",
        "What do you call cheese that isn't yours? Nacho cheese."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

// Add notification
function addNotification(message) {
    if (Notification.permission === 'granted') {
        new Notification('Social-Ai Notification', {
            body: message,
            icon: 'icon.png'
        });
    }
}

// Request notification permission
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

displayPosts();
displayChat();
