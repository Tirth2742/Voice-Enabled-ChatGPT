const API_KEY = "YOUR OPENAI API_KEY";

const microphone = document.querySelector('.input');
const content = document.querySelector('.content');


// text to speach
function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

// wishme
function wishMe() {
    var day = new Date();
    var hr = day.getHours();
    if(hr >= 0 && hr < 12) {
        speak("Good Morning");
    }
    else if(hr == 12) {
        speak("Good noon");
    }
    else if(hr > 12 && hr <= 17) {
        speak("Good Afternoon");
    }
    else {
        speak("Good Evening");
    }
}

// event when login
window.addEventListener('load', ()=>{
    speak("Going online");
    wishMe();
})


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// speech to text
recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    console.log(transcript);

    fetchData(transcript)
}

// event listener
microphone.addEventListener('click', ()=>{
    console.log('click')
    recognition.start();
})

// output speach
function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    console.log(speech.text);
    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}

// openai API call
async function fetchData(prompt) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "user" , content: prompt},
            ]
        })
    });

    const data = await response.json();
    const text = data.choices[0].message.content


    speakThis(text.toLowerCase())
}

