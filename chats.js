const chatList = document.getElementById('chat-list');
const chatSection = document.getElementById('chat-section');
const chatFriendName = document.getElementById('chat-friend-name');
const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const chatMediaInput = document.getElementById('chat-media');
const newPostMediaInput = document.getElementById('new-post-media');
const backToChatsButton = document.getElementById('back-to-chats');

let aiFriends = JSON.parse(localStorage.getItem('aiFriends')) || [];
let currentChatFriend = null;

function displayChatList() {
    chatList.innerHTML = '';
    aiFriends.forEach((friend, index) => {
        const chatItem = document.createElement('li');
        chatItem.innerHTML = `
            <a href="#" class="chat-friend" data-index="${index}">
                <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
                <span>${friend.name}</span>
            </a>
        `;
        chatList.appendChild(chatItem);
    });

    document.querySelectorAll('.chat-friend').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const index = event.target.closest('.chat-friend').getAttribute('data-index');
            openChatWindow(index);
        });
    });
}

function openChatWindow(index) {
    currentChatFriend = aiFriends[index];
    chatFriendName.textContent = currentChatFriend.name;
    chatContainer.innerHTML = '';
    currentChatFriend.memory.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.innerHTML = `<strong>${message.author}:</strong> ${message.text}`;
        chatContainer.appendChild(messageDiv);
    });
    chatSection.classList.remove('hidden');
}

function generateAIResponse(userMessage) {
    const keywords = extractKeywords(userMessage);
    const personalityTraits = currentChatFriend.personality;
    let response = '';

    keywords.forEach(keyword => {
        personalityTraits.forEach(trait => {
            if (responseKeywords[keyword] && responseKeywords[keyword][trait]) {
                response += responseKeywords[keyword][trait][Math.floor(Math.random() * responseKeywords[keyword][trait].length)] + ' ';
            }
        });
    });

    if (!response) {
        response = 'I am not sure how to respond to that.';
    }

    return response;
}

function extractKeywords(text) {
    return text.toLowerCase().split(/\W+/).filter(word => word.length > 3);
}

chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageText = chatInput.value;
    if (messageText && currentChatFriend) {
        const userMessage = {
            author: 'You',
            text: messageText,
            timestamp: new Date()
        };
        currentChatFriend.memory.push(userMessage);
        localStorage.setItem('aiFriends', JSON.stringify(aiFriends));
        chatInput.value = '';
        openChatWindow(aiFriends.indexOf(currentChatFriend));

        // Generate AI response
        const aiResponseText = generateAIResponse(messageText);
        const aiResponse = {
            author: currentChatFriend.name,
            text: aiResponseText,
            timestamp: new Date()
        };
        currentChatFriend.memory.push(aiResponse);
        localStorage.setItem('aiFriends', JSON.stringify(aiFriends));
        openChatWindow(aiFriends.indexOf(currentChatFriend));
    }
}

backToChatsButton.addEventListener('click', () => {
    chatSection.classList.add('hidden');
});

displayChatList();
