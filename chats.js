const chatListSection = document.getElementById('chat-list-section');
const chatSection = document.getElementById('chat-section');
const chatList = document.getElementById('chat-list');
const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const chatMedia = document.getElementById('chat-media');
const sendChatButton = document.getElementById('send-chat');
const backToChatsButton = document.getElementById('back-to-chats');
const chatFriendName = document.getElementById('chat-friend-name');

let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || {};
let currentFriend = null;
let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
    avatar: 'default-avatar.png',
    username: 'User',
    bio: '',
    background: 'default-background.png',
    reels: [],
    photoAlbums: [],
    posts: []
};

document.addEventListener('DOMContentLoaded', () => {
    let aiFriends = JSON.parse(localStorage.getItem('aiFriends')) || [];

    aiFriends.forEach(friend => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${friend.profile.avatar}" alt="${friend.name}" class="friend-avatar"> <button class="chat-friend-button" data-name="${friend.name}">${friend.name}</button>`;
        chatList.appendChild(li);
    });

    document.querySelectorAll('.chat-friend-button').forEach(button => {
        button.addEventListener('click', (event) => {
            currentFriend = event.target.getAttribute('data-name');
            chatFriendName.textContent = currentFriend;
            chatListSection.classList.add('hidden');
            chatSection.classList.remove('hidden');
            displayChat();
        });
    });
});

sendChatButton.addEventListener('click', () => {
    const message = chatInput.value;
    const mediaFile = chatMedia.files[0];
    if (message || mediaFile) {
        if (!chatHistory[currentFriend]) {
            chatHistory[currentFriend] = [];
        }
        const reader = new FileReader();
        reader.onload = () => {
            const chatMessage = {
                sender: userProfile.username,
                message: message,
                media: mediaFile ? reader.result : null,
                mediaType: mediaFile ? mediaFile.type : null,
                timestamp: new Date()
            };
            chatHistory[currentFriend].push(chatMessage);
            chatInput.value = '';
            chatMedia.value = '';
            displayChat();
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
            // Simulate AI response
            setTimeout(() => {
                const aiResponse = generateAIResponse(message);
                chatHistory[currentFriend].push({ sender: currentFriend, message: aiResponse, timestamp: new Date() });
                displayChat();
                localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
                addNotification(`${currentFriend} sent you a message: ${aiResponse}`);
            }, 1000);
        };
        if (mediaFile) {
            reader.readAsDataURL(mediaFile);
        } else {
            reader.onload();
        }
    }
});

backToChatsButton.addEventListener('click', () => {
    chatListSection.classList.remove('hidden');
    chatSection.classList.add('hidden');
    currentFriend = null;
});

function displayChat() {
    chatContainer.innerHTML = '';
    if (chatHistory[currentFriend]) {
        chatHistory[currentFriend].forEach(chat => {
            const chatDiv = document.createElement('div');
            chatDiv.classList.add('chat-message');
            chatDiv.innerHTML = `<strong>${chat.sender}:</strong> ${chat.message} <small>${new Date(chat.timestamp).toLocaleString()}</small>`;
            if (chat.media) {
                if (chat.mediaType.startsWith('image/')) {
                    chatDiv.innerHTML += `<img src="${chat.media}" alt="Chat media" class="chat-media">`;
                } else if (chat.mediaType.startsWith('video/')) {
                    chatDiv.innerHTML += `<video controls class="chat-media"><source src="${chat.media}" type="${chat.mediaType}"></video>`;
                }
            }
            chatContainer.appendChild(chatDiv);
        });
    }
}

function generateAIResponse(message) {
    const keywords = extractKeywords(message);
    if (keywords.includes('joke')) {
        return getRandomJoke();
    }
    return `You mentioned ${keywords.join(', ')}. That's interesting! Tell me more.`;
}

function extractKeywords(message) {
    const words = message.split(' ');
    return words.filter(word => word.length > 3);
}

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

function addNotification(message) {
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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}
