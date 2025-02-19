const createFriendButton = document.getElementById('create-friend');
const friendAvatarUpload = document.getElementById('friend-avatar-upload');
const friendNameInput = document.getElementById('friend-name');
const friendAgeInput = document.getElementById('friend-age');
const friendGenderInput = document.getElementById('friend-gender');
const friendBioInput = document.getElementById('friend-bio');

let aiFriends = JSON.parse(localStorage.getItem('aiFriends')) || [];

createFriendButton.addEventListener('click', () => {
    const friendName = friendNameInput.value;
    const friendAge = friendAgeInput.value;
    const friendGender = friendGenderInput.value;
    const friendBio = friendBioInput.value;
    const avatarFile = friendAvatarUpload.files[0];

    if (friendName && friendBio) {
        const reader = new FileReader();
        reader.onload = () => {
            const friendProfile = {
                name: friendName,
                age: friendAge,
                gender: friendGender,
                bio: friendBio,
                avatar: reader.result,
                personality: generatePersonality(friendBio),
                posts: generatePosts(friendBio),
                memory: []
            };
            aiFriends.push(friendProfile);
            localStorage.setItem('aiFriends', JSON.stringify(aiFriends));
            alert('AI Friend created!');
        };
        if (avatarFile) {
            reader.readAsDataURL(avatarFile);
        } else {
            const friendProfile = {
                name: friendName,
                age: friendAge,
                gender: friendGender,
                bio: friendBio,
                avatar: 'default-avatar.png',
                personality: generatePersonality(friendBio),
                posts: generatePosts(friendBio),
                memory: []
            };
            aiFriends.push(friendProfile);
            localStorage.setItem('aiFriends', JSON.stringify(aiFriends));
            alert('AI Friend created!');
        }
    } else {
        alert('Please fill in all required fields.');
    }
});

function generatePersonality(bio) {
    const keywords = extractKeywords(bio);
    const personalityTraits = new Set();

    keywords.forEach(keyword => {
        if (personalityKeywords[keyword]) {
            personalityKeywords[keyword].forEach(trait => personalityTraits.add(trait));
        }
    });

    return Array.from(personalityTraits);
}

function generatePosts(bio) {
    const personalityTraits = generatePersonality(bio);
    const posts = [];

    personalityTraits.forEach(trait => {
        if (postKeywords[trait]) {
            posts.push(...postKeywords[trait]);
        }
    });

    return posts;
}

function extractKeywords(text) {
    return text.toLowerCase().split(/\W+/).filter(word => word.length > 3);
}

const personalityKeywords = {
    // Example keywords and associated personality traits
    'happy': ['cheerful', 'optimistic'],
    'sad': ['melancholic', 'pessimistic'],
    'adventurous': ['bold', 'daring'],
    'creative': ['artistic', 'innovative'],
    'friendly': ['sociable', 'outgoing'],
    'intelligent': ['smart', 'knowledgeable'],
    'funny': ['humorous', 'witty'],
    'kind': ['compassionate', 'generous'],
    'brave': ['courageous', 'fearless'],
    'curious': ['inquisitive', 'explorative'],
    // Add more keywords and traits here
};

const postKeywords = {
    // Example personality traits and associated posts
    'cheerful': [
        'Today is a great day!',
        'Feeling so happy and blessed!',
        'Life is beautiful!',
        'Smiling from ear to ear!',
        // Add more posts here
    ],
    'melancholic': [
        'Feeling down today...',
        'It\'s a tough day.',
        'Struggling to find joy.',
        'Feeling blue.',
        // Add more posts here
    ],
    'bold': [
        'Just went on an amazing hike!',
        'Exploring new places is the best!',
        'Adventure awaits!',
        'Living life on the edge!',
        // Add more posts here
    ],
    'artistic': [
        'Just finished a new painting!',
        'Creativity is flowing!',
        'Working on a new project!',
        'Art is my passion!',
        // Add more posts here
    ],
    'sociable': [
        'Had a great time with friends!',
        'Love meeting new people!',
        'Friendship is everything!',
        'Enjoying good company!',
        // Add more posts here
    ],
    'smart': [
        'Just read an interesting article!',
        'Knowledge is power!',
        'Learning something new every day!',
        'Expanding my horizons!',
        // Add more posts here
    ],
    'humorous': [
        'Why did the chicken cross the road?',
        'Laughter is the best medicine!',
        'Here\'s a funny joke for you!',
        'Making people laugh is my favorite!',
        // Add more posts here
    ],
    'compassionate': [
        'Helping others brings me joy!',
        'Kindness is contagious!',
        'Spread love and kindness!',
        'Being kind is always in style!',
        // Add more posts here
    ],
    'courageous': [
        'Facing my fears head-on!',
        'Courage is not the absence of fear!',
        'Bravery is my middle name!',
        'Taking risks and being bold!',
        // Add more posts here
    ],
    'inquisitive': [
        'Always asking questions!',
        'Curiosity leads to discovery!',
        'Exploring the unknown!',
        'Never stop being curious!',
        // Add more posts here
    ],
    // Add more traits and posts here
};

const responseKeywords = {
    // Example keywords and associated responses
    'hey': {
        'cheerful': [
            'Hey there! How are you?',
            'Hello! How\'s it going?',
            'Hi! What\'s up?',
            'Hey! Nice to see you!',
        ],
        'sociable': [
            'Hey! How\'s it going?',
            'Hello! What\'s new?',
            'Hi! How have you been?',
            'Hey! Great to see you!',
        ],
        'default': [
            'Hey!',
            'Hello!',
            'Hi!',
            'Hey there!',
        ]
    },
    'how are you': {
        'cheerful': [
            'I\'m doing great, thanks for asking!',
            'I\'m good! How about you?',
            'I\'m fantastic! What about you?',
            'I\'m doing well, how are you?',
        ],
        'melancholic': [
            'I\'m feeling a bit down today.',
            'Not the best day, but I\'ll manage.',
            'I\'ve had better days.',
            'Feeling a bit blue, but thanks for asking.',
        ],
        'default': [
            'I\'m fine, thank you.',
            'I\'m okay, how about you?',
            'I\'m doing well, thanks.',
            'I\'m good, how are you?',
        ]
    },
    'doing good': {
        'cheerful': [
            'That\'s awesome to hear!',
            'I\'m glad you\'re doing well!',
            'Great to hear that!',
            'That\'s wonderful!',
        ],
        'default': [
            'Good to hear!',
            'That\'s nice.',
            'Glad to hear that.',
            'That\'s good.',
        ]
    },
    'doing bad': {
        'compassionate': [
            'I\'m sorry to hear that. Is there anything I can do to help?',
            'That\'s unfortunate. I\'m here if you need to talk.',
            'I\'m sorry you\'re feeling this way. I\'m here for you.',
            'That\'s tough. I\'m here if you need anything.',
        ],
        'default': [
            'I\'m sorry to hear that.',
            'That\'s unfortunate.',
            'I hope things get better.',
            'I\'m here if you need to talk.',
        ]
    },
    'what do you like to do': {
        'adventurous': [
            'I love exploring new places and going on adventures!',
            'I enjoy hiking and discovering new trails.',
            'Adventure is my middle name! I love trying new things.',
            'I like to travel and experience new cultures.',
        ],
        'artistic': [
            'I love painting and creating art.',
            'I enjoy writing stories and poems.',
            'Creativity is my passion! I love making things.',
            'I like to craft and make DIY projects.',
        ],
        'sociable': [
            'I love hanging out with friends and meeting new people.',
            'I enjoy socializing and making new connections.',
            'Friendship is important to me. I love spending time with friends.',
            'I like to host gatherings and parties.',
        ],
        'default': [
            'I enjoy reading and watching movies.',
            'I like to listen to music and relax.',
            'I enjoy cooking and trying new recipes.',
            'I like to play video games and unwind.',
        ]
    },
    // Add more keywords and responses here
};