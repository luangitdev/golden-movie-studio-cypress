document.addEventListener('DOMContentLoaded', fetchRecommendations);

function fetchRecommendations() {
    const recommendations = ['The Matrix', 'Inception', 'Interstellar', 'The Godfather', 'Jurassic Park'];
    const apiKey = 'f7f22d30'; // Substitua 'SUA_API_KEY' pela sua chave da API OMDB
    const recommendationsElement = document.getElementById('recommendations');

    recommendations.forEach(title => {
        const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `
                    <img src="${data.Poster}" alt="${data.Title}">
                    <p>${data.Title}</p>
                `;
                recommendationsElement.appendChild(movieElement);
            })
            .catch(error => console.error('Erro ao buscar recomendações:', error));
    });
}

document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value;
    if (!searchTerm) {
        alert('Por favor, digite o nome de um filme');
        return;
    }

    const apiKey = 'f7f22d30'; // Substitua 'SUA_API_KEY' pela sua chave da API OMDB
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Erro ao buscar filmes:', error);
        });
});

function displaySearchResults(data) {
    const resultsSection = document.getElementById('results-section');

    if (data.Response === 'False') {
        resultsSection.innerHTML = '<p>Filme não encontrado.</p>';
        return;
    }

    const movies = data.Search;
    const resultsMarkup = movies.map(movie => `
        <div>
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <img src="${movie.Poster}" alt="Poster">
        </div>
    `).join('');

    resultsSection.innerHTML = resultsMarkup;
}

document.getElementById('clear-button').addEventListener('click', () => {
    document.getElementById('results-section').innerHTML = '';
    document.getElementById('search-input').value = '';
});

document.getElementById('signup-button').addEventListener('click', () => {
    const email = document.getElementById('signup-email').value;
    if (!email) {
        alert('Por favor, insira um email');
        return;
    }

    alert('Cadastro realizado com sucesso! Você receberá nossas recomendações em breve.');
    document.getElementById('signup-email').value = '';
});
