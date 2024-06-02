// 실시간 시계
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// 로그인 기능
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Logged in!');
}

// 투두리스트 기능
function addTodo() {
    const todo = document.getElementById('new-todo').value;
    if (!todo) return;
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.textContent = todo;
    todoList.appendChild(li);
    saveTodos();
    document.getElementById('new-todo').value = '';
}
function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        todos.push(li.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo;
        document.getElementById('todo-list').appendChild(li);
    });
}
loadTodos();

// 랜덤 배경 이미지
const images = [
    'url("image1.jpg")',
    'url("image2.jpg")',
    'url("image3.jpg")'
];
document.body.style.backgroundImage = images[Math.floor(Math.random() * images.length)];

// 날씨와 위치 (geolocation)
function getWeather(latitude, longitude) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0].description;
            const temp = data.main.temp;
            document.getElementById('weather').textContent = `Weather: ${weather}, Temp: ${temp}°C`;
        });
}
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    document.getElementById('weather').textContent = 'Geolocation is not supported by this browser.';
}

