const url = 'https://get-quotes-api.p.rapidapi.com/random';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '0632eb16b1msh2fd78a9f5f3f5cdp11b838jsncd1f85296bac',
        'x-rapidapi-host': 'get-quotes-api.p.rapidapi.com'
    }
};

let currentQuote = '';
let currentAuthor = '';

const fetchRandomQuote = async () => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();  // Parse the response as JSON
        console.log(result);  // Log the entire result to the console

        // Access the nested quote object
        const quote = result.quote;
        currentQuote = quote.quote;  // Store the current quote
        currentAuthor = quote.author;  // Store the current author

        document.getElementById('quote').innerHTML = currentQuote;  // Display the quote text
        document.getElementById('author').innerHTML = `- ${currentAuthor}`;  // Display the author
    } catch (error) {
        console.error(`Error fetching the quote: ${error.message}`);
        document.getElementById('quote').innerHTML = `Error fetching the quote: ${error.message}`;
    }
};

// Fetch and display the initial quote
fetchRandomQuote();

// Add event listener to the "New Quote" button
document.getElementById('new-quote-btn').addEventListener('click', fetchRandomQuote);

// Add event listener to the "Tweet" button
document.getElementById('tweet-btn').addEventListener('click', () => {
    const tweetText = `${currentQuote} — ${currentAuthor}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    const width = 550;
    const height = 300;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(tweetUrl, 'tweet', `width=${width},height=${height},top=${top},left=${left}`);
});
