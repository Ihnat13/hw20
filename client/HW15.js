const userInput = document.getElementById('name-input-modal');
const statsModal = document.getElementById('welcome-modal');
const modalInput = document.querySelector(`.modal-content`);
const modalShowStats = document.getElementById(`modal-content2`);
showUserInputValue();

function showUserInputValue() {
    userInput.style.display = 'block';
    document.body.classList.add('modal-open');
}

modalInput.addEventListener(`click`, ({ target }) => {
    if(target.tagName === `BUTTON`){
        saveUserInput();
    }
});

function saveUserInput() {
    const inputElement = document.getElementById('name-input');
    const enteredValue = inputElement.value;

    fetch('/saveInput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: enteredValue })
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Ошибка при отправке данных на сервер');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        showUniqueWords(data);
    });
    // .catch(error => {
    //     console.error('Ошибка:', error);
    // });
}

function showUniqueWords(data) { 
    statsModal.style.display = 'block';
    userInput.style.display = 'none';
    document.body.classList.remove('modal-open');
    console.log(data)

    data.forEach(({ key, value }) => {
        const createEl = document.createElement('p');
        createEl.innerHTML = `Слово: ${key}, Количество: ${value.length}`;
        modalShowStats.append(createEl);
    });
}
