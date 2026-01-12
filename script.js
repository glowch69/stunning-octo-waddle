// SEKMELER
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === target) content.classList.add('active');
        });
    });
});

// SOHBET
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const voiceBtn = document.getElementById('voice-btn');

const aiResponses = [
    "Merhaba! Ben Vitas AI.",
    "Fotoğraf işlemek için 'Fotoğraf' sekmesine geçin.",
    "Video oluşturmak isterseniz prompt yazın.",
    "Bu bir demo, gerçek API bağlanacak."
];

function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isUser ? 'user' : 'ai'}`;
    msgDiv.innerHTML = `<strong>${isUser ? 'Siz:' : 'Vitas AI:'}</strong> ${text}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text) {
        addMessage(text, true);
        userInput.value = '';
        setTimeout(() => {
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(randomResponse);
        }, 1000);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});

// SES TANIMA (demo)
voiceBtn.addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'tr-TR';
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            sendBtn.click();
        };
        recognition.start();
        addMessage("Sizi dinliyorum...", false);
    } else {
        alert("Tarayıcınız ses tanımayı desteklemiyor.");
    }
});

// FOTOĞRAF
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const filterBtn = document.getElementById('filter-btn');
const describeBtn = document.getElementById('describe-btn');
const imageResult = document.getElementById('image-result');

imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

filterBtn.addEventListener('click', () => {
    if (imagePreview.src) {
        imagePreview.style.filter = 'sepia(1) contrast(1.2)';
        imageResult.innerHTML = `<p><i class="fas fa-check"></i> Filtre uygulandı.</p>`;
    }
});

describeBtn.addEventListener('click', () => {
    if (imagePreview.src) {
        imageResult.innerHTML = `<p><i class="fas fa-robot"></i> [SIMÜLE] AI fotoğrafı analiz ediyor...</p>`;
    }
});

// VİDEO
const videoPrompt = document.getElementById('video-prompt');
const generateVideoBtn = document.getElementById('generate-video-btn');
const videoResult = document.getElementById('video-result');

generateVideoBtn.addEventListener('click', () => {
    const prompt = videoPrompt.value.trim();
    if (!prompt) {
        alert("Lütfen video konusunu yazın.");
        return;
    }
    videoResult.innerHTML = `<h4>Video Oluşturuluyor...</h4><p><strong>Konu:</strong> ${prompt}</p><div class="loading"><i class="fas fa-spinner fa-spin"></i> AI çalışıyor...</div>`;
    setTimeout(() => {
        videoResult.innerHTML = `<h4><i class="fas fa-check-circle"></i> Video Hazır!</h4><p><strong>Konu:</strong> ${prompt}</p><div class="video-placeholder"><i class="fas fa-film fa-3x"></i><br><p>Video oynatıcı burada olacak.</p></div><button><i class="fas fa-download"></i> Videoyu İndir</button>`;
    }, 3000);
});

// SESLİ ASİSTAN
const startVoiceBtn = document.getElementById('start-voice-btn');
const voiceStatus = document.getElementById('voice-status');
const voiceOutput = document.getElementById('voice-output');

startVoiceBtn.addEventListener('click', () => {
    voiceStatus.textContent = "Dinleniyor...";
    setTimeout(() => {
        voiceStatus.textContent = "Anlaşıldı: 'Bugün hava nasıl?'";
        voiceOutput.innerHTML = `<p><i class="fas fa-volume-up"></i> <strong>Yanıt:</strong> Hava güneşli, 25°C.</p>`;
    }, 2000);
});

console.log("Vitas AI yüklendi.");
