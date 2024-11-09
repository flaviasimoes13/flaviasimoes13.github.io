async function fetchDogElements() {
    try {
        let numberOfElements = 9;

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
            
            // Adicionar o evento de clique no h2
            h2Element.addEventListener('click', () => {
                localStorage.setItem('selectedDog', JSON.stringify({ imageUrl, name }));
                window.location.href = 'adoptMe.html';
            });
        } else {
            console.error(`Elemento <h2> não encontrado dentro de name${divIndex}`);
        }

        containerImg.addEventListener('click', () => {
            localStorage.setItem('selectedDog', JSON.stringify({ imageUrl, name }));
            window.location.href = 'adoptMe.html';
        });
    } else {
        console.error(`Elementos com ID 'dogDiv${divIndex}' ou 'name${divIndex}' não foram encontrados.`);
    }
}


document.addEventListener('DOMContentLoaded', fetchDogElements);
