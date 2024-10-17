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

// 图片上传功能，支持多次上传并追加图片
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
        };
        reader.readAsDataURL(file);
    });
});

// 纪念日添加
const anniversaryInput = document.getElementById('anniversary-input');
const addAnniversaryButton = document.getElementById('add-anniversary');
const anniversaryList = document.getElementById('anniversary-list');

addAnniversaryButton.addEventListener('click', () => {
    const text = anniversaryInput.value;
    if (text) {
        const li = document.createElement('li');
        li.textContent = text;
        anniversaryList.appendChild(li);
        anniversaryInput.value = '';
    }
});

// 留言板功能保持不变
const messageInput = document.getElementById('message-input');
const messageBoard = document.getElementById('messages');
const submitMessageButton = document.getElementById('submit-message');

submitMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        const div = document.createElement('div');
        div.textContent = message;
        messageBoard.appendChild(div);
        messageInput.value = '';
    }
});
