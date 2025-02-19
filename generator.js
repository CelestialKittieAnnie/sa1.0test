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
                posts: generatePosts(friendBio)
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
                posts: generatePosts(friendBio)
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
    const keywords = extractKeywords(bio);
    const posts = [];

    keywords.forEach(keyword => {
        if (postKeywords[keyword]) {
            posts.push(...postKeywords[keyword]);
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
    // Example keywords and associated posts
    'happy': [
        'Today is a great day!',
        'Feeling so happy and blessed!',
        'Life is beautiful!',
        'Smiling from ear to ear!',
        // Add more posts here
    ],
    'sad': [
        'Feeling down today...',
        'It\'s a tough day.',
        'Struggling to find joy.',
        'Feeling blue.',
        // Add more posts here
    ],
    'adventurous': [
        'Just went on an amazing hike!',
        'Exploring new places is the best!',
        'Adventure awaits!',
        'Living life on the edge!',
        // Add more posts here
    ],
    'creative': [
        'Just finished a new painting!',
        'Creativity is flowing!',
        'Working on a new project!',
        'Art is my passion!',
        // Add more posts here
    ],
    'friendly': [
        'Had a great time with friends!',
        'Love meeting new people!',
        'Friendship is everything!',
        'Enjoying good company!',
        // Add more posts here
    ],
    'intelligent': [
        'Just read an interesting article!',
        'Knowledge is power!',
        'Learning something new every day!',
        'Expanding my horizons!',
        // Add more posts here
    ],
    'funny': [
        'Why did the chicken cross the road?',
        'Laughter is the best medicine!',
        'Here\'s a funny joke for you!',
        'Making people laugh is my favorite!',
        // Add more posts here
    ],
    'kind': [
        'Helping others brings me joy!',
        'Kindness is contagious!',
        'Spread love and kindness!',
        'Being kind is always in style!',
        // Add more posts here
    ],
    'brave': [
        'Facing my fears head-on!',
        'Courage is not the absence of fear!',
        'Bravery is my middle name!',
        'Taking risks and being bold!',
        // Add more posts here
    ],
    'curious': [
        'Always asking questions!',
        'Curiosity leads to discovery!',
        'Exploring the unknown!',
        'Never stop being curious!',
        // Add more posts here
    ],
    // Add more keywords and posts here
};