// 计时功能
const startDate = new Date('2024-09-20T18:03:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateTimer() {
    const now = new Date();
    const elapsed = now - startDate;

    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsed / 1000) % 60);

    daysEl.textContent = `${days}天`;
    hoursEl.textContent = `${hours}小时`;
    minutesEl.textContent = `${minutes}分钟`;
    secondsEl.textContent = `${seconds}秒`;
}
setInterval(updateTimer, 1000);

// 加载保存的数据
window.onload = () => {
    loadImages();
    loadAnniversaries();
    loadMessages();
};

// 图片上传并保存到 localStorage
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');

imageUpload.addEventListener('change', (event) => {
    const files = event.target.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('uploaded-image');
            imagePreview.appendChild(img);
            saveImage(e.target.result);  // 保存图片到 localStorage
        };
        reader.readAsDataURL(file);
    });
});

function saveImage(imageData) {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.push(imageData);
    localStorage.setItem('images', JSON.stringify(images));
}

function loadImages() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('uploaded-image');
        imagePreview.appendChild(img);
    });
}

// 纪念日添加并保存到 localStorage
const anniversaryInput = document.getElementById('anniversary-input');
const addAnniversaryButton = document.getElementById('add-anniversary');
const anniversaryList = document.getElementById('anniversary-list');

addAnniversaryButton.addEventListener('click', () => {
    const text = anniversaryInput.value;
    if (text) {
        const li = document.createElement('li');
        li.textContent = text;
        anniversaryList.appendChild(li);
        saveAnniversary(text);  // 保存纪念日到 localStorage
        anniversaryInput.value = '';
    }
});

function saveAnniversary(text) {
    const anniversaries = JSON.parse(localStorage.getItem('anniversaries')) || [];
    anniversaries.push(text);
    localStorage.setItem('anniversaries', JSON.stringify(anniversaries));
}

function loadAnniversaries() {
    const anniversaries = JSON.parse(localStorage.getItem('anniversaries')) || [];
    anniversaries.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        anniversaryList.appendChild(li);
    });
}

// 留言板功能并保存到 localStorage
const messageInput = document.getElementById('message-input');
const messageBoard = document.getElementById('messages');
const submitMessageButton = document.getElementById('submit-message');

submitMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        const div = document.createElement('div');
        div.textContent = message;
        messageBoard.appendChild(div);
        saveMessage(message);  // 保存留言到 localStorage
        messageInput.value = '';
    }
});

function saveMessage(text) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(text);
    localStorage.setItem('messages', JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(text => {
        const div = document.createElement('div');
        div.textContent = text;
        messageBoard.appendChild(div);
    });
}
