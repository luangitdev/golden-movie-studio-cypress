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

// Função para exibir os resultados da busca
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
            <img src="${movie.Poster}" alt="Poster" onerror="this.onerror=null;this.src='fallback-image-url';">
        </div>
    `).join('');

    resultsSection.innerHTML = resultsMarkup;
}

// Função para buscar e exibir recomendações do dia ao carregar a página
document.addEventListener('DOMContentLoaded', fetchRecommendations);

function fetchRecommendations() {
    const recommendations = ['The Matrix', 'Inception', 'Interstellar', 'The Godfather', 'Jurassic Park']; // Exemplo de filmes para recomendações
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
