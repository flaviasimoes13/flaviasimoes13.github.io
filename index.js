///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////// Fotos de Cães
///////////////////////////////////////////////////////////////////////////////////////////

async function fetchDogElements() {
    try {
        let numberOfElements = 5;

        for (let i = 1; i <= numberOfElements; i++) {
            let {imageUrl, name} = await fetchRandomElements();
            displayDog(i, imageUrl, name);
        }
    } catch (error) {
        console.error('Erro ao buscar raças de cães:', error);
    }
}

async function fetchRandomElements() {
    try {
        let responseBreed = await fetch(`https://dog.ceo/api/breeds/image/random`);
        let dataBreeds = await responseBreed.json();

        let responseNames = await fetch('https://randomuser.me/api/?nat=us');
        let dataNames = await responseNames.json();
        let firstName = dataNames.results[0].name.first;

        return {
            imageUrl: dataBreeds.message,
            name: firstName
        };
    } catch (error) {
        console.error('Erro ao buscar imagem/nome');
        return null;
    }
}

function displayDog(divIndex, imageUrl, name) {
    let container = document.getElementById(`dogDiv${divIndex}`);

    let imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    let nameElement = document.createElement('h2');
    nameElement.textContent = name;

    imgElement.alt = `Imagem de um cão aleatório`;
    imgElement.classList.add('dog-image');

    let figure = document.createElement('figure');
    figure.appendChild(imgElement);
    container.appendChild(figure);
    container.appendChild(nameElement);
}



document.addEventListener('DOMContentLoaded', fetchDogElements);
