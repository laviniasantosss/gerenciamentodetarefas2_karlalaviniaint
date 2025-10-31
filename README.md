# Sistema de Gerenciamento de Tarefas
Karla Lavinia das Dores Santos 3°ano D.

Este projeto consiste em um **Sistema de Gerenciamento de Tarefas**, desenvolvido com uma **API em Node.js (Express)** e uma **interface web em React**.  
O sistema foi criado com o objetivo de permitir o cadastro, listagem, atualização e exclusão de tarefas de maneira prática e segura, com integração entre o front-end e o back-end e com foco em boas práticas de segurança, tratamento de erros e usabilidade.


## Estrutura do Projeto

O sistema é dividido em duas partes principais:

1. **Back-end (API)** — responsável por gerenciar as regras de negócio, conexão com o banco de dados SQL e autenticação dos usuários.  
2. **Front-end (Interface Web)** — responsável por exibir as informações, consumir a API e permitir a interação do usuário com o sistema.

A comunicação entre as duas camadas ocorre via **requisições HTTP** utilizando **Axios**.


## Tecnologias Utilizadas

### Back-end
- Node.js com Express
- Sequelize(ORM para integração com banco SQL)
- Banco de Dados SQL
- CORS (para controle de acesso entre domínios)
- bcrypt 
- JWT (JSON Web Token) (para autenticação de usuários)
- Express Middleware (para tratamento de erros)

### Front-end
- React.js
- useState e useEffect (para gerenciamento de estado dos componentes)
- Axios (para requisições HTTP)
- React Router DOM(para navegação entre páginas)
- CSS para estilização

---

## Funcionamento Geral

O **usuário** pode cadastrar tarefas diferentes editar e verificar o status de cada uma.

- Criar novas tarefas  
- Visualizar todas as tarefas cadastradas  
- Editar título, descrição e status (pendente/concluída)  
- Excluir tarefas  


O front-end se comunica com a API utilizando **Axios**. Cada requisição é autenticada via **JWT**, garantindo que apenas o usuário logado possa manipular suas próprias tarefas.



## Requisitos de Segurança e Tratamento de Erros

Durante o desenvolvimento, foi dada atenção especial aos aspectos de **segurança** e **tratamento de erros**, de forma a garantir a estabilidade e confiabilidade do sistema.

### Autenticação e Autorização
- Implementação de **autenticação baseada em token JWT**, onde o usuário recebe um token ao fazer login.
- As rotas protegidas são acessíveis apenas com token válido.
- As senhas dos usuários são **criptografadas com bcrypt** antes de serem salvas no banco de dados.
- Middleware verifica se o token é válido antes de permitir o acesso a determinadas rotas.

### Segurança Geral
- Uso do **CORS** configurado para permitir apenas o domínio do front-end, prevenindo acessos indevidos.
- Tratamento de cabeçalhos HTTP e uso de práticas seguras para armazenamento de dados sensíveis.

### Tratamento de Erros no Back-end
- Implementado middleware global de erros no Express, que captura exceções lançadas nas rotas e retorna mensagens padronizadas em formato JSON.
- Estrutura de resposta de erro:
  json
  {
    "success": false,
    "message": "Ocorreu um erro ao processar a solicitação",
    "details": "Descrição opcional do erro"
  }
