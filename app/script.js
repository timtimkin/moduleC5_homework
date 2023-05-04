const pageInput = document.getElementById('page-input');
const limitInput = document.getElementById('limit-input');
const loadBtn = document.getElementById('load-btn');
const imageContainer = document.getElementById('image-container');
// Проверяем, есть ли сохраненные данные в localStorage
let page = localStorage.getItem('page');
let limit = localStorage.getItem('limit');
// Если есть, то выводим картинки с последнего успешно выполненного запроса
if (page && limit) {
    pageInput.value = page;
    limitInput.value = limit;
    loadImages();
}
// Обработчик клика на кнопку загрузки
loadBtn.addEventListener('click', function() {
    // Получаем значения из input
    page = parseInt(pageInput.value);
    limit = parseInt(limitInput.value);
    // Проверяем, являются ли значения числами и попадают ли в диапазон от 1 до 10
    if (isNaN(page) || page < 1 || page > 10) {
        imageContainer.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
    } else if (isNaN(limit) || limit < 1 || limit > 10) {
        imageContainer.innerHTML = 'Лимит вне диапазона от 1 до 10';
    } else {
        // Записываем значения в localStorage
        localStorage.setItem('page', page);
        localStorage.setItem('limit', limit);
        // Загружаем картинки
        loadImages();
    }
});
// Функция для загрузки картинок
function loadImages() {
    // Формируем URL запроса
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    // Очищаем контейнер с картинками
    imageContainer.innerHTML = '';
    // Отправляем запрос
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Создаем элементы img для каждой картинки и добавляем их в контейнер
            data.forEach(item => {
                const img = document.createElement('img');
                img.src = item.download_url;
                imageContainer.appendChild(img);
            });
        })
        .catch(error => {
            imageContainer.innerHTML = 'Ошибка загрузки картинок';
            console.error(error);
        });
}