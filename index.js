async function fetchDogElements() {
    let numberOfElements = 9;

    document.getElementById('spinner').style.display = 'flex';

    let promises = [];
    let loadedImages = new Set(); 

    for (let i = 1; i <= numberOfElements; i++) {
        promises.push(fetchRandomElements(i, loadedImages));
    }

    let dogDataArray = await Promise.all(promises);

    dogDataArray.forEach((dogData, index) => {
        if (dogData) {
            let { imageUrl, name } = dogData;
            displayDog(index + 1, imageUrl, name); 
        } else {
            console.error(`Falha ao buscar dados para o cão de índice ${index + 1}`);
        }
    });

    document.getElementById('spinner').style.display = 'none';
}

async function fetchRandomElements(index, loadedImages) {
    let responseBreed;
    let dataBreeds;

    do {
        responseBreed = await fetch(`https://dog.ceo/api/breeds/image/random`);
        if (responseBreed.ok) {
            dataBreeds = await responseBreed.json();
        } else {
            console.error(`Falha ao buscar imagem de cão para o índice ${index}`);
            return null;
        }
    } while (loadedImages.has(dataBreeds.message)); 

    loadedImages.add(dataBreeds.message);

    let responseNames = await fetch('https://randomuser.me/api/?nat=us');

    if (responseNames.ok) {
        let dataNames = await responseNames.json();
        let firstName = dataNames.results[0].name.first;

        return {
            imageUrl: dataBreeds.message,
            name: firstName
        };
    } else {
        console.error(`Falha ao buscar nomes para o cão ${index}`);
        return null;
    }
}

function displayDog(divIndex, imageUrl, name) {
    let containerImg = document.getElementById(`dogDiv${divIndex}`);
    let containerNameDiv = document.getElementById(`name${divIndex}`);

    if (containerImg && containerNameDiv) {
        let imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `Imagem de um cão aleatório`;
        imgElement.classList.add('dog-image');

        let figure = document.createElement('figure');
        figure.appendChild(imgElement);
        containerImg.appendChild(figure);

        let h2Element = containerNameDiv.querySelector('h2');
        if (h2Element) {
            h2Element.textContent = name;

            h2Element.addEventListener('click', () => {
                sessionStorage.setItem('selectedDog', JSON.stringify({ imageUrl, name }));
                window.location.href = 'adoptMe.html';
            });
        } else {
            console.error(`Elemento <h2> não encontrado dentro de name${divIndex}`);
        }

        containerImg.addEventListener('click', () => {
            sessionStorage.setItem('selectedDog', JSON.stringify({ imageUrl, name }));
            window.location.href = 'adoptMe.html';
        });
    } else {
        console.error(`Elementos com ID 'dogDiv${divIndex}' ou 'name${divIndex}' não foram encontrados.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`dogDiv${i}`).innerHTML = '';
        document.getElementById(`name${i}`).innerHTML = '<h2></h2>';
    }

    fetchDogElements();
});
