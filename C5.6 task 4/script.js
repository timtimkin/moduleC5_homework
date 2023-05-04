const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const btn = document.getElementById('btn');
const result = document.getElementById('result');
const value = document.querySelector('input').value;
btn.addEventListener('click', () => {
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    if (isNaN(width) || isNaN(height)) {
        result.innerHTML = 'Пустой запрос! Введите числа!';
    } else if (width < 100 || width > 300 || height < 100 || height > 300) {
        result.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
    } else {
        fetch(`https://picsum.photos/${width}/${height}`)
            .then(response => {
                const img = document.createElement('img');
                img.src = response.url;
                result.appendChild(img);
            })
            .catch(error => {
                result.innerHTML = 'Произошла ошибка';
            });
    }
});