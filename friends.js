const friendsList = document.getElementById('friends-list');
const chatWindow = document.getElementById('chat-window');
const chatFriendName = document.getElementById('chat-friend-name');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendMessageButton = document.getElementById('send-message');
const closeChatButton = document.getElementById('close-chat');

let aiFriends = JSON.parse(localStorage.getItem('aiFriends')) || [];
let currentChatFriend = null;

function displayFriends() {
    friendsList.innerHTML = '';
    aiFriends.forEach((friend, index) => {
        const friendItem = document.createElement('li');
        friendItem.innerHTML = `
            <a href="ai_friend_profile.html?friendIndex=${index}">
                <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
            </a>
            <a href="#" class="friend-name" data-index="${index}">${friend.name}</a>
        `;
        friendsList.appendChild(friendItem);
    });

    document.querySelectorAll('.friend-name').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const index = event.target.getAttribute('data-index');
            openChatWindow(index);
        });
    });
}

function openChatWindow(index) {
    currentChatFriend = aiFriends[index];
    chatFriendName.textContent = currentChatFriend.name;
    chatMessages.innerHTML = '';
    currentChatFriend.memory.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.innerHTML = `<strong>${message.author}:</strong> ${message.text}`;
        chatMessages.appendChild(messageDiv);
    });
    chatWindow.classList.remove('hidden');
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

    if (!response.trim()) {
        response = 'I am not sure how to respond to that.';
    }

    return response.trim();
}

function extractKeywords(text) {
    return text.toLowerCase().split(/\W+/).filter(word => word.length > 3);
}

sendMessageButton.addEventListener('click', () => {
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
});

closeChatButton.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
});

displayFriends();