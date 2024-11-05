async function fetchDogBreeds() {
    try {
        // Lista de raças
        const fixedBreeds = ['pitbull', 'beagle', 'bulldog/english', 'poodle', 'husky'];

        //mostra uma imagem por ordem da lista
        for (const breed of fixedBreeds) {
            const imageUrl = await fetchDogImage(breed);
            displayDogImage(breed, imageUrl);
        }
    } catch (error) {
        console.error('Erro nas raças de cães:', error);
    }
}

async function fetchDogImage(breed) {
    try {
        //procura imagem random para cada raca especificada
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await response.json();
        return data.message; //link img
    } catch (error) {
        console.error(`Erro na imagem para a raça ${breed}:`, error);
    }
}

function displayDogImage(breed, imageUrl) {
    //HTML a imagem
    const container = document.getElementById('dogImages');
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = `Imagem de um cão da raça ${breed.replace('/', ' ')}`;
    imgElement.classList.add('dog-image');

    const figure = document.createElement('figure');
    figure.appendChild(imgElement);
    container.appendChild(figure);
}

document.addEventListener('DOMContentLoaded', fetchDogBreeds);