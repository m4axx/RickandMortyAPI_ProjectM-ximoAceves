document.addEventListener("DOMContentLoaded", function () {
    const characterList = document.getElementById('character-list');
    const searchInput = document.getElementById('searchInput');
    const filterButton = document.getElementById('filterButton');
    const pagination = document.getElementById('pagination');

    let allCharacters = []; // Almacenar todos los personajes
    let characters = []; // Almacenar personajes filtrados o buscados
    let currentPage = 1; // Página actual
    const charactersPerPage = 10; // Personajes por página

    // Traducción de valores de estado
    const statusTranslations = {
        'Alive': 'Vivo',
        'Dead': 'Muerto',
        'unknown': 'Desconocido'
    };

    // Traducción de valores de género
    const genderTranslations = {
        'Male': 'Masculino',
        'Female': 'Femenino',
        'Genderless': 'Sin género',
        'unknown': 'Desconocido'
    };

    // Traducción de valores de especies
    const speciesTranslations = {
        'Human': 'Humano'
    };

    // Función para mostrar personajes en la página actual
    function displayCharacters(charactersToShow) {
        characterList.innerHTML = '';

        charactersToShow.forEach(character => {
            // Crear elementos HTML para cada personaje
            const characterCard = document.createElement('div');
            characterCard.classList.add('card', 'mb-3');

            const characterImage = document.createElement('img');
            characterImage.classList.add('card-img-top');
            characterImage.src = character.image;
            characterImage.alt = character.name;

            const characterCardBody = document.createElement('div');
            characterCardBody.classList.add('card-body');

            const characterName = document.createElement('h5');
            characterName.classList.add('card-title');
            characterName.textContent = character.name;

            const characterSpecies = document.createElement('p');
            characterSpecies.classList.add('card-text');
            characterSpecies.textContent = `Especie: ${speciesTranslations[character.species] || character.species}`; // Especie en español

            const characterStatus = document.createElement('p');
            characterStatus.classList.add('card-text');
            characterStatus.textContent = `Estado: ${statusTranslations[character.status]}`; // Estado en español

            // Agregar detalles adicionales
            const characterGender = document.createElement('p');
            characterGender.classList.add('card-text');
            characterGender.textContent = `Género: ${genderTranslations[character.gender]}`; // Género en español

            const characterLocation = document.createElement('p');
            characterLocation.classList.add('card-text');
            characterLocation.textContent = `Ubicación: ${character.location.name}`;

            characterCardBody.appendChild(characterName);
            characterCardBody.appendChild(characterSpecies);
            characterCardBody.appendChild(characterStatus);
            characterCardBody.appendChild(characterGender);
            characterCardBody.appendChild(characterLocation);

            characterCard.appendChild(characterImage);
            characterCard.appendChild(characterCardBody);

            characterList.appendChild(characterCard);
        });
    }

    // Función para cargar personajes desde la API
    function loadCharacters() {
        fetch('https://rickandmortyapi.com/api/character')
            .then(response => response.json())
            .then(data => {
                allCharacters = data.results; // Almacenar todos los personajes
                characters = allCharacters; // Inicialmente mostrar todos los personajes
                displayCharacters(characters); // Mostrar todos los personajes en la página actual
                generatePagination(); // Generar la paginación
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Función para filtrar personajes por nombre
    function filterCharacters() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            // Si el campo de búsqueda está vacío, mostrar todos los personajes
            characters = allCharacters; // Restaurar la lista completa de personajes
            displayCharacters(characters);
            generatePagination();
        } else {
            // Filtrar personajes por nombre
            characters = allCharacters.filter(character =>
                character.name.toLowerCase().includes(searchTerm)
            );
            displayCharacters(characters);
            generatePagination();
        }
    }

    // Función para generar la paginación
    function generatePagination() {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(characters.length / charactersPerPage);
        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            const link = document.createElement('a');
            link.classList.add('page-link');
            link.href = '#';
            link.textContent = i;
            li.appendChild(link);
            pagination.appendChild(li);

            // Manejar el evento click en la paginación
            link.addEventListener('click', () => {
                currentPage = i;
                displayCharacters();
            });
        }
    }

    // Cargar personajes al iniciar la página
    loadCharacters();

    // Agregar evento de click al botón de filtro
    filterButton.addEventListener('click', filterCharacters);

    // Escuchar cambios en el campo de búsqueda
    searchInput.addEventListener('input', filterCharacters);
    // Selecciona el contenedor principal
    
    const container = document.querySelector('.container');

    // Agrega la clase 'portal-background' para aplicar el fondo de portales
    container.classList.add('portal-background');

    // Aplica la animación al fondo de portales
    container.style.animation = 'portalAnimation 10s infinite alternate';
});
