# Golden Movie Studio
### Site para treino dos alunos da Jornada EBAC de QA 

Referência: https://golden-movie-studio.vercel.app/

## Clonando e executando em sua máquina

### Pré-requisito:

-Node.js - Você encontra em: https://nodejs.org/en/
-Visual Studio Code ( ou editor de sua prefrência) - você encontra em: https://code.visualstudio.com/download
-Git: você encontra em: https://git-scm.com/downloads

Via terminal, rode os seguintes comandos:
```  
git clone https://github.com/EBAC-QE/golden-movie-studio.git
```
```
cd golden-movie-studio
```

#### Para instalar as dependencias:
```
npm install 
```

#### Para subir o servidor e o banco:
```
npm start
```

No console vai aparecer os endereços do site e do banco. 
O site você acessar em: http://127.0.0.1:8080/ ou http://localhost:8080/

O banco funciona em memória em http://0.0.0.0:3000. 
Após parar o servidor ( fechar o console ) os dados são perdidos. 

#### Para rodar executar o Cypress via Dashboard:
```
npx cypress open 
```

### Bibliotecas de apoio:
-Cypress: Framework de automação: https://cypress.io/

### Bom Jornada ;) 
Fábio & José Ernesto
Qualidade de software

Apoio: Leonardo Souza




