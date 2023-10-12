var replyText = document.getElementById('reply-text');

const MODEL_API_URL = 'http://127.0.0.1:8000/ask/';

document.getElementById("chat-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const inputData = document.getElementById("chat-input").value;
    let reply = document.createElement('p');
    try{
        await fetch(MODEL_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
        },
        body: {"data": inputData}
    })
    .then(response => response.json())
    .then(data => {
        const resultElement = document.getElementById('reply-text');
        if (data.result === 'success') {
            resultElement.textContent = "Processed Data: " + data.processed_data;
        } else {
            resultElement.textContent = "Error: " + data.message;
        }
    })
    } catch(err){
        reply.innerHTML = "Error: " + err.message;
        replyText.appendChild(reply);
    }
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


/*
async function fetchData(element) {
    const response = await fetch("http://127.0.0.1:5000/ask");
    const data = await response.json();
    let reply = document.createElement('p');
    text.innerHTML = data['answer'];
    replyText.appendChild(reply);
    console.log(data['answer']);
};
*/

/*
document.getElementById("chatForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const text = document.getElementById("chatInput").value;
    let reply = document.createElement('p');
    try{
        const response = await fetch(MODEL_API_URL);
        const data = await response.json();
        console.log(data['answer']);
    } catch(err){
        reply.innerHTML = "Error: " + err.message;
        replyText.appendChild(reply);
    }
});

*/