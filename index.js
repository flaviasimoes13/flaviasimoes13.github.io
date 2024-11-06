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
    let containerImg = document.getElementById(`dogDiv${divIndex}`);
    let containerName = document.getElementById(`name${divIndex}`);

    let imgElement = document.createElement('img'); //cria elemento img
    imgElement.src = imageUrl;

    imgElement.alt = `Imagem de um cão aleatório`;
    imgElement.classList.add('dog-image');

    let figure = document.createElement('figure'); //coloca a imagem da api no elemento img
    figure.appendChild(imgElement);
    containerImg.appendChild(figure);

    containerName.textContent = name; //coloca o nome da api no elemento h2
}



document.addEventListener('DOMContentLoaded', fetchDogElements);
