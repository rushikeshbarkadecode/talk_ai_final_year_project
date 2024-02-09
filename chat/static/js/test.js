var replyText = document.getElementById('reply-text');
var chatInput = document.getElementById('chat-input')
var replyBox = document.getElementById('replyBox');

const MODEL_API_URL = 'http://127.0.0.1:8000/ask/';

chatForm = document.getElementById('chat-form');

async function evokeModel(){
    
    const inputText = chatInput.value;
    const response = await fetch(MODEL_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token
        },
        body: JSON.stringify({ 'text': inputText }),
    })
        .then(response => response.json())
        .then(data => {
            let answer_para = document.createElement('p');
            if (data.result === 'success') {
                answer_para.innerText = data.response;
                replyText.appendChild(answer_para);
                replyBox.style.display = 'block';
                console.log(data.response);
            } else {
                answer_para.innerText = data.message;
                replyText.appendChild(answer_para);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

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