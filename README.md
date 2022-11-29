# <p align = "center"> MyWallet </p>

<p align = "center">
	<img src="https://img.shields.io/badge/author-Thales Alves-4dae71?style=flat-square" />
	<img src="https://img.shields.io/github/languages/count/thalesAlves758/my-wallet-front?color=4dae71&style=flat-square" />
</p>

## :clipboard: Descrição

MyWallet é uma aplicação para controle de sua carteira, com direito a login e cadastro. Quando logado, é possível criar registros de entrada ou saída de dinheiro, com sua respectiva descrição. Com registros cadastrados, é possível visualizá-los na página principal. Também pode editar e excluir registros.

---

## :computer: Tecnologias e Conceitos

- React
- React Hooks
- Context API
- Styled Components
- JWT token
- Axios

---

## 🏁 Rodando a aplicação

Este projeto foi inicializado com o [Create React App](https://github.com/facebook/create-react-app), então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/thalesAlves758/my-wallet-front.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias:

```
npm install
```

Copie e cole o arquivo .env.example, renomeie a cópia para '.env' e preencha a chave REACT_APP_API_BASE_URL com a url base da api ([clique aqui](https://github.com/thalesAlves758/my-wallet-api) para acessar o repositório da api do MyWallet).

Finalizado o processo, é só inicializar o servidor:

```
npm start
```

E prontinho, o projeto estará rodando localmente na sua máquina.
