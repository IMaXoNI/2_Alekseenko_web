function loadContent(section) {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = '<p>Загрузка...</p>';

    if (section === 'cats') {
        loadCats();
    } else if (section === 'weather') {
        loadWeather();
    } else if (section === 'posts') {
        loadPosts();
    }
}

async function loadPosts() {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = '<p>Загрузка постов...</p>';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        displayPosts(posts.slice(0, 5)); 
    } catch (error) {
        contentDiv.innerHTML = '<p>Ошибка при загрузке постов.</p>';
    }
}

function displayPosts(posts) {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = posts.map(post => `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button onclick="editPost(${post.id})">Редактировать (PUT)</button>
            <button onclick="patchPost(${post.id})">Обновить текст (PATCH)</button>
            <button onclick="deletePost(${post.id})">Удалить</button>
        </div>
    `).join('') + '<button onclick="createPost()">Создать пост</button>';
}

async function createPost() {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = '<p>Создание поста...</p>';
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Новый пост', body: 'Текст поста', userId: 1 })
        });
        await response.json();
        loadPosts();
    } catch (error) {
        contentDiv.innerHTML = '<p>Ошибка при создании поста.</p>';
    }
}

async function editPost(id) {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = '<p>Редактирование поста...</p>';
    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Обновлённый пост', body: 'Новый текст', userId: 1 })
        });
        loadPosts();
    } catch (error) {
        contentDiv.innerHTML = '<p>Ошибка при редактировании поста.</p>';
    }
}

async function patchPost(id) {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = '<p>Обновление текста поста...</p>';
    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ body: 'Частично обновлённый текст' })
        });
        loadPosts();
    } catch (error) {
        contentDiv.innerHTML = '<p>Ошибка при обновлении текста поста.</p>';
    }
}

async function deletePost(id) {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = '<p>Удаление поста...</p>';
    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });
        loadPosts();
    } catch (error) {
        contentDiv.innerHTML = '<p>Ошибка при удалении поста.</p>';
    }
}




async function loadWeather() {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = '<p>Загрузка погоды...</p>';

    const apiKey = 'de86042745d3a8e918403a5e0a2293a9'; 
    const city = 'Moscow';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const weather = await response.json();
        displayWeather(weather);
    } catch (error) {
        contentDiv.innerHTML = '<p>Ошибка при загрузке погоды.</p>';
    }
}

function displayWeather(weather) {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = `
        <div class="weather">
            <h3>Погода в ${weather.name}</h3>
            <p>Температура: ${weather.main.temp}°C</p>
            <p>Описание: ${weather.weather[0].description}</p>
        </div>
    `;
}





async function loadCats() {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = '<p>Загрузка котиков...</p>';

    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5');
        const cats = await response.json();
        displayCats(cats);
    } catch (error) {
        contentDiv.innerHTML = '<p>Ошибка при загрузке котиков.</p>';
    }
}

function displayCats(cats) {
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = cats.map(cat => `
        <div class="cat">
            <img src="${cat.url}" alt="Котик" style="max-width: 100%;">
        </div>
    `)
}