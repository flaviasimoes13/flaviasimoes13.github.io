document.addEventListener('DOMContentLoaded', () => {
    const selectedDog = JSON.parse(localStorage.getItem('selectedDog'));

    if (selectedDog) {
        let dogImage = document.getElementsByClassName('dog-container')[0];
        let dogName = document.getElementsByClassName('text-content')[0];

        dogImage.innerHTML = '';
        dogName.innerHTML = '';

        let imgElement = document.createElement('img');
        imgElement.src = selectedDog.imageUrl;
        imgElement.alt = `Imagem de ${selectedDog.name}`;
        imgElement.classList.add('dog-image');

        dogImage.appendChild(imgElement);

        let h2Element = document.createElement('h2');
        h2Element.textContent = selectedDog.name;

        dogName.appendChild(h2Element);
    } else {
        console.error('Nenhum cão selecionado');
    }
});