const container = document.getElementById('container');

const characterList = [1011334, 1017100, 1009144, 1010699, 1009146, 1016823, 1009148, 1009149, 1010903, 1011266, 1010354, 1010846, 1011297, 1011031, 1009150, 1011198, 1011175, 1011136, 1011176, 1010870];

async function getMarvelCharacter() {
    const marvelCharacterResponse = await fetch(`https://gateway.marvel.com/v1/public/characters/${getRandomNumber(characterList)}?apikey=a5837db97d72016c81a7a776f4240db9&ts=1&hash=56e8c7c3ce1e8b6fbf21380cb44d5e0d`);
    const marvelCharacterData = await marvelCharacterResponse.json();
    console.log(marvelCharacterData);
    renderDataToDOM(marvelCharacterData);
}

function getRandomNumber(list) {
    return list[Math.floor((Math.random() * list.length))];
}

function renderDataToDOM(data) {
    data = data.data.results[0];
    console.log(data.description);
    const postElement = document.createElement('div');
    postElement.classList.add('marvel-character-item');
    postElement.innerHTML = `
    <h2 class="character"><span>${data.name}</span></h2>
    <p class="type"><strong>description:</strong> ${data.description ?? ''}</p>
  `;
    container.appendChild(postElement);
};

getMarvelCharacter()
    .then(data => console.log(data))
    .catch(error => console.log(error.message));
getMarvelCharacter();
getMarvelCharacter();

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    console.log({
        scrollTop,
        scrollHeight,
        clientHeight
    });

    if (clientHeight + scrollTop >= scrollHeight - 10) {
        setTimeout(getMarvelCharacter, 700);
    }
})