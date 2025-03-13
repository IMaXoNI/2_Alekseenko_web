document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const toggleButton = document.getElementById('dark-mode-toggle');
    const reviewForm = document.getElementById('review-form');
    const userReviewsSection = document.querySelector('.user-reviews');
    const cancelImageButton = document.getElementById('cancel-image');
    const imageInput = document.getElementById('image');

    // Темная тема
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }
    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // Отзывы по умолчанию
    const defaultReviews = [
        {
            name: "Анна",
            text: "Этот камень просто изменил мою жизнь! Теперь я чувствую себя особенной.",
            image: null
        },
        {
            name: "Максим",
            text: "Камень действительно умный, помогает мне думать яснее!",
            image: null
        },
        {
            name: "Елена",
            text: "Подарила подруге, она в восторге! Спасибо за такой крутой продукт.",
            image: null
        }
    ];

    // Функция для отображения отзыва
    function displayReview(review) {
        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `<p>"${review.text}" — ${review.name}</p>`;
        if (review.image) {
            const img = document.createElement('img');
            img.src = review.image;
            newReview.appendChild(img);
        }
        userReviewsSection.appendChild(newReview);
    }

    // Загрузка отзывов из cookies + дефолтные
    function loadReviews() {
        userReviewsSection.innerHTML = '<h2>Отзывы пользователей:</h2>';
        const savedReviews = getCookie('userReviews');
        if (savedReviews) {
            try {
                const reviews = JSON.parse(savedReviews);
                reviews.forEach(review => displayReview(review));
            } catch (e) {
                defaultReviews.forEach(review => displayReview(review));
                setCookie('userReviews', JSON.stringify(defaultReviews), 30);
            }
        } else {
            defaultReviews.forEach(review => displayReview(review));
            setCookie('userReviews', JSON.stringify(defaultReviews), 30);
        }
    }
    loadReviews();

    function toggleCancelButton() {
        cancelImageButton.style.display = imageInput.files && imageInput.files.length > 0 ? 'block' : 'none';
    }

    toggleCancelButton();

    imageInput.addEventListener('change', function() {
        toggleCancelButton();
    });

    cancelImageButton.addEventListener('click', function() {
        imageInput.value = '';
        toggleCancelButton();
    });

    // Обработка отправки формы
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const text = document.getElementById('text').value.trim();

        if (name && text && name.length <= 50 && text.length <= 500) {
            const review = { name, text, image: null };

            if (imageInput.files && imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    review.image = e.target.result;
                    saveAndDisplayReview(review);
                };
                reader.readAsDataURL(imageInput.files[0]);
            } else {
                saveAndDisplayReview(review);
            }
        } else {
            alert('Имя (до 50 символов) и текст (до 500 символов) должны быть заполнены!');
        }
    });

    function saveAndDisplayReview(review) {
        let reviews = JSON.parse(getCookie('userReviews') || '[]');
        reviews.push(review);

        const cookieString = JSON.stringify(reviews);
        if (cookieString.length > 4000) {
            alert('Достигнут лимит отзывов (cookie)! Отзывы сброшены.');
        }

        setCookie('userReviews', cookieString, 30);
        displayReview(review);
        reviewForm.reset();
        toggleCancelButton();
    }
});