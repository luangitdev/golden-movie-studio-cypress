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

document.getElementById('signup-button').addEventListener('click', (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value; // Opcional
    const password = document.getElementById('signup-password').value;
    const responseDiv = document.getElementById('signup-response');

    // Preparação dos dados para a requisição
    const data = {
        nome: firstName,
        sobrenome: lastName,
        email: email,
        telefone: phone,
        senha: password
    };

    // Requisição para o endpoint de cadastro no servidor local
    fetch('http://127.0.0.1:8080/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Trata a resposta do servidor
        if (data && data.message) {
            responseDiv.textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Erro ao cadastrar:', error);
        responseDiv.textContent = 'Falha: ocorreu um erro, tente novamente';
    });
});


/* document.getElementById('signup-button').addEventListener('click', () => {
    const email = document.getElementById('signup-email').value;
    if (!email) {
        alert('Por favor, insira um email');
        return;
    }

    alert('Cadastro realizado com sucesso! Você receberá nossas recomendações em breve.');
    document.getElementById('signup-email').value = '';
}); */

/* document.getElementById('signup-button').addEventListener('click', (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value; // Opcional
    const password = document.getElementById('signup-password').value;
    const responseDiv = document.getElementById('signup-response');

    // Seleciona todos os campos de input marcados como obrigatórios
    const inputs = document.querySelectorAll('#signup-section input[required]');

    let isValid = true;

    // Verifica cada campo obrigatório
    inputs.forEach(input => {
        if (!input.value.trim()) {
            // Adiciona uma borda vermelha se o campo estiver vazio
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            // Remove a borda vermelha se o campo for preenchido
            input.style.borderColor = '';
        }
    });

    if (!isValid) {
        // Informa ao usuário que todos os campos obrigatórios devem ser preenchidos
        responseDiv.textContent = 'Por favor, preencha todos os campos obrigatórios marcados com um asterisco (*).';
        return;
    }

    // Preparação dos dados para a requisição
    const data = {
        firstName,
        lastName,
        email,
        phone,
        password
    };

    // Requisição para o endpoint de cadastro
    fetch('http://lojaebac.ebaconline.art.br/public/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Trata a resposta do servidor
        if (data && data.success) {
            responseDiv.textContent = 'Sucesso: Usuário cadastrado com sucesso';
        } else {
            responseDiv.textContent = 'Falha: corrija os campos';
        }
    })
    .catch(error => {
        console.error('Erro ao cadastrar:', error);
        responseDiv.textContent = 'Falha: ocorreu um erro, tente novamente';
    });
}); */
