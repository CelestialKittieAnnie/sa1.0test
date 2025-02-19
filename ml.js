// Simple ML model for user interaction data analysis

class SimpleML {
    constructor() {
        this.interactionData = [];
        this.jokes = [];
    }

    // Load interaction data from a local file (for demonstration, we're using a static array)
    loadInteractionData() {
        this.interactionData = [
            { username: "Guest", message: "Hello", response: ["Hi! How can I help you today?", "Hello! What can I do for you?", "Hey there! Need any assistance?"] },
            { username: "Guest", message: "What is your name?", response: ["I'm an AI friend!", "You can call me AI Buddy!", "I'm your virtual assistant!"] },
            { username: "Guest", message: "Tell me a joke", response: ["Why don't scientists trust atoms? Because they make up everything!", "What do you get when you cross a snowman and a vampire? Frostbite!", "Why did the scarecrow win an award? Because he was outstanding in his field!"] },
            { username: "Guest", message: "How's the weather?", response: ["I'm not sure, but I hope it's sunny!", "I can't check the weather, but I hope it's nice!", "Weather is unpredictable for me, but fingers crossed for good weather!"] },
            // Add more interaction data for a comprehensive dataset
        ];
        this.jokes = [
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
    }

    // Preprocess interaction data (convert to lowercase, remove punctuation)
    preprocessData(data) {
        return data.map(entry => {
            return {
                username: entry.username.toLowerCase(),
                message: entry.message.toLowerCase().replace(/[^a-z0-9\s]/g, ''),
                response: entry.response.map(resp => resp.toLowerCase().replace(/[^a-z0-9\s]/g, ''))
            };
        });
    }

    // Train a simple ML model (for demonstration, we're using a basic keyword matching approach)
    trainModel(data) {
        data.forEach(entry => {
            const words = entry.message.split(' ');
            words.forEach(word => {
                if (!this.model[word]) {
                    this.model[word] = [];
                }
                this.model[word] = this.model[word].concat(entry.response);
            });
        });
    }

    // Generate a response based on the trained model
    generateResponse(message) {
        const words = message.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ');
        let responses = [];
        words.forEach(word => {
            if (this.model[word]) {
                responses = responses.concat(this.model[word]);
            }
        });
        if (responses.length === 0) {
            return "I'm not sure what you mean. Can you please elaborate?";
        }
        // Return a random response from the matched responses
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize and use the SimpleML class
const ml = new SimpleML();
ml.loadInteractionData();
const preprocessedData = ml.preprocessData(ml.interactionData);
ml.trainModel(preprocessedData);

// Example usage
const userMessage = "Tell me a joke";
const mlResponse = ml.generateResponse(userMessage);
console.log(mlResponse); // Outputs a random joke from the list

// Export SimpleML class for use in other scripts
export { SimpleML };
