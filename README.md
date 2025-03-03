# 📖 Projeto Cadastro de Livros 🔥

Este projeto é uma aplicação Laravel no intuito de realizar o registros de dados detalhados sobre livros, proporcionando ao usuário registrar detalhes sobre os livros desejados.

O sistema permite relizar registros de usuários para login, permite a edicao e exclusão de dados do usuário e também dos livros registrados, definir e listar os detalhes de todos os livros salvos e pesquisar livros específicos através do filtro presente na página.

## Tecnologias e Ferramentas 💡

- **PHP:** 8.1.3
- **Laravel:** 10.48.28
- **Composer:** 2.8.5
- **React:** 19.0.0
- **Typescript:** 5.7.3
- **Docker:** Para conteinerização e instalação de todas as dependências do projeto
- **Insomnia:** Para testar as rotas da API
- **Swagger:** Para a documentação da API
- **Sanctum:** Para gerar token de autenticação
- **PHPMailer:** Para envio de emails via SMTP
- **PHPUnit:** Para teste unitários das funções do backend
- **MailHog:** Para testes de envio de email
- **NgRok:** Para criação de túnels externos para acesso ao localhost
- **Mysql:** Para criação do banco de dados
- **Nginx:** Para gerenciamento de acesso aos containeres do docker, criação de proxy reverso e também Load-Balanced
- **Redis:** Para armazenamento de dados em cache

## Requisitos

- Sistema operacional de preferência uma " Distribuição do Linux".
- GitHub Instalado.
- Docker Instalado.

## Configuração do Projeto 🛠️

1. **Clonar o Repositório:**

   Em um diretório, clone o repositório e entre na pasta do projeto.
   `git clone https://github.com/Ricardov7070/register_books.git`

2. **Executando os Containeres**

   Após clonar o projeto, é nescessário renomear ou copiar o arquivo `.env.example` para `.env` no caminho (".\register_books\backend") e ajustar as variáveis de ambiente conforme necessário, incluindo as configurações para acesso ao banco de dados, para funcionando do serviço de email e para funcionamento correto do "Redis".
   Caso esteja em um ambiente linux, basta somente rodar o comando abaixo dentro da pasta do projeto:
       
    `cp .env.example .env`

   O projeto se encontra configurado e ambientado para rodar os containeres utilizando a ferramenta do Docker. O sistema está configurado em 5 containeres de aplicação para assim a ferramenta conseguir realizar o balanceamento de carga de acesso entre eles. Para inicializar, em um ambiente onde se encontra instalado o docker, você precisará entrar na pasta do projeto (".\register_books\backend") e executar o comando abaixo para subir os containeres já configurados:
      
    `docker compose up -d`

3. **Reiniciando os Containeres:**

   Caso haja a nescessidade, você pode reiniciar todos os containeres rodando os comando abaixo:

   `docker stop $(docker ps -q)` --> para parar.
   `docker start $(docker ps -q)` --> para iniciar.

4. **Colocando os containeres na rede:**

   Para adiciona-los na mesma rede no intuito de conectar um container no outro, basta somente rodar os comandos abaixo no terminal:

   `docker network connect laravel_app nginx-container`
   `docker network connect laravel_app laravel-1`
   `docker network connect laravel_app laravel-2`
   `docker network connect laravel_app laravel-3`
   `docker network connect laravel_app laravel-4`
   `docker network connect laravel_app laravel-5`
    `docker network connect laravel_app react-container`
   `docker network connect laravel_app redis-container`
   `docker network connect laravel_app mysql-container`
   `docker network connect laravel_app mailhog-container`
   `docker network connect laravel_app ngrok-container`

   Caso a rede "laravel_app" ainda não exista. Você pode criá-la rodando o comando abaixo antes de adicionar todos os containeres nesta rede:

   `docker network create laravel_app`
   
6. **Rodar as Migrações:**

   Execute as migrações para criar as tabelas no banco de dados.
    `php artisan migrate`

   Não esqueça de realizar as configurações do banco de dados desejado no arquivo .env antes de executar o comando!

7. **Rodar os testes unitários no backend:**

    Caso deseje rodar os testes das funções da API invidualmente, você pode rodar o comando abaixo dentro de um dos containeres de aplicação do laravel:
    `docker exec -it laravel-1 sh` => Comando exemplo para acessar o terminal do container;
    `php artisan test` => Comando para rodar os testes unitários;

9. **Testar as Rotas da API:**

   É possível acessar o backend atraves de "http://localhost:80/api/" nas rotas abaixo.
   Utilize o Insomnia para testar as rotas da API individualmente. As rotas principais incluem:

   ** Gerenciamento de Usuário:
   - **POST** `/api/auth/signin/` - Realiza a autenticação do usuário.
   - **POST** `/api/auth/signup/` - Realiza o registro do usuário.
   - **POST** `/api/auth/forgotPassword/` - Realiza o envio de uma senha aleatória via email para o usuário que esqueceu sua chave de acesso.
   - **POST** `/api/logoutUser/` - Realiza o logout do usuário autenticado.
   - **PUT** `/api/updateUser/` - Realiza a atualização de dados cadastrais do usuário registrado.
   - **DELETE** `/api/deleteRecord/` - Realiza a exclusão do usuário selecionado do banco de dados.

   ** Gerenciamento de Livros:
   - **GET** `api/viewBook/` - Realiza a visualização dos livros cadastrados.
   - **POST** `api/registerBooks/` - Realiza o registros de livros no banco de dados.
   - **PUT** `api/updateBook/{id_book}` - Realiza a atualização de dados de um livro salvo no banco de dados.
   - **DELETE** `/api/deleteBook/{id_book}` - Realiza a exclusão dos livros selecionados.

10. **Parâmetros:**

As rotas abaixo recebem os seguintes parâmetros:

- **POST** `/api/auth/signin/`
   'email' => Email do Usuário;
   'password' => Senha do usuário;

- **POST** `/api/auth/signup/`
   'name' => Nome do Usuário;
   'email' => Email do Usuário;
   'password' => Senha do usuário;

- **POST** `/api/auth/forgotPassword/`
   'email' => Email do Usuário;
   'name' => Nome do usuário;

- **PUT** `/api/updateUser/`
   'name' => Nome do Usuário;
   'email' => Email do Usuário;
   'password' => Senha do usuário;

- **POST** `/api/registerBooks/`
    'title' => Título;
    'author' => Autor;
    'publisher' => Editora;
    'language' => Idioma;
    'publication_year' => Ano de publicação;
    'edition' => Número de Edição;
    'gender' => Gênero;
    'quantity_pages' => Quantidade de Páginas;
    'format' => Formato;

- **PUT** `/api/updateBook/{id_book}/`
    '{id_book}' => Id do Livro;
    'title' => Título;
    'author' => Autor;
    'publisher' => Editora;
    'language' => Idioma;
    'publication_year' => Ano de publicação;
    'edition' => Número de Edição;
    'gender' => Gênero;
    'quantity_pages' => Quantidade de Páginas;
    'format' => Formato;

- **DELETE** `/api/deleteBook/{id_book}/`
   '{id_book}' => Id do Livro;

11. **Rotas do FrontEnd:**

   É possível acessar o frontend atraves de "http://localhost:5173/" nas rotas:

   `/login` => Realizar Autenticação;
   `/register` => Realizar o registro do usuário;
   `/forgot-password` => Realizar o envio da nova senha aleatória para acesso do usuário ao sistema;
   `/home` => Tela principal;

## Swagger ✉️

  Caso deseje visualizar a documentação das rotas da API, você pode acessar através de "http://localhost:80/api/documentation":

## Contribuição 🤲

Contribuições são bem-vindas! Se você encontrar problemas ou tiver sugestões, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença 😸

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
