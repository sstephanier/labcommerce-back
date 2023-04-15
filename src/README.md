# Observações sobre as funções utilizadas

- O trecho de código `user.some(use => use.id === id)` verifica se existe pelo menos um usuário no array user com o ID fornecido na chamada da função createUser. Se existir um usuário com esse ID, a função userExists retorna true, indicando que o usuário já existe. Se não existir nenhum usuário com esse ID, a função userExists retorna false, indicando que o usuário não existe ainda.

- A função utiliza o método "map" de JavaScript para percorrer cada objeto de usuário na lista "user" e criar uma nova lista contendo apenas o endereço de e-mail de cada usuário. O resultado é armazenado na variável "userEmail", que não é retornada pela função.

- Link dos exercícios Typescript-II:
https://github.com/labenuexercicios/typescript-II-exercicios.git

- Em "queryProductsByName(q:string)" Foi usado um loop for para iterar sobre cada produto no array product. Se o nome do produto corresponder à consulta `q`, imprimimos o produto na tela usando console.log(prod) e retornamos imediatamente usando return. Se nenhum produto corresponder à consulta, saímos do loop e imprimimos "Produto não encontrado" usando console.log("Produto não encontrado").

- A instrução `return` é usada para sair da função assim que um produto correspondente é encontrado, para evitar iterar sobre o resto do array desnecessariamente.

# Explicando a última parte do exercício 3

- Na função 

```jsx
    export function getAllPurchasesFromUserId(userIdToSearch: string): void {}
```

- É definindo uma função chamada getAllPurchasesFromUserId que recebe um argumento userIdToSearch do tipo string e retorna void (ou seja, não retorna nada).

```jsx
const purchasesByUserId = purchase
    .filter((p) => p.userId === userIdToSearch)
    .map ((purchase) => purchase.productId)
```
- Usando os métodos `filter()` e `map()` do array purchase para obter um array com os IDs dos produtos comprados pelo usuário com o userId fornecido. O método filter() filtra o array purchase para retornar somente as compras feitas pelo usuário especificado, enquanto o método map() transforma cada compra em seu productId. O resultado é armazenado na constante purchasesByUserId.

```jsx
if (purchasesByUserId.length !== 0) {

```
- Esta linha verifica se o array purchasesByUserId não está vazio. Se houver compras para o usuário especificado, o código dentro do bloco if será executado.

```jsx
const useProducts = product.filter((prod) => 
            purchasesByUserId.includes(prod.id))
```
- Esta linha usa o método filter() do array product para retornar somente os produtos comprados pelo usuário especificado. Ele faz isso verificando se o id de cada produto está presente no array purchasesByUserId, que contém os IDs dos produtos comprados pelo usuário. O resultado é armazenado na constante useProducts.

```jsx
console.log(useProducts);
console.log(`Compras para o usuário ${userIdToSearch}: ${useProducts}`);
```

- Essas linhas imprimem a lista de produtos comprados pelo usuário especificado usando console.log(). A primeira linha imprime o array useProducts, enquanto a segunda linha usa interpolação de string para criar uma mensagem mais descritiva que inclui o userId e a lista de produtos.

```jsx
} else {
      console.log("Produto não encontrado")
    }
```

- Se o array `purchasesByUserId` estiver vazio, isso significa que não há compras para o usuário especificado e a mensagem "Produto não encontrado" será impressa no console.

# Usando o Delete Para Product

- Foi usado o array `product` contendo alguns produtos com informações fictícias.
- Em seguida, foi criado uma rota DELETE usando o caminho /product/:id. 
- Quando essa rota é chamada, foi recuperado o ID do produto a ser excluído a partir da solicitação usando `req.params.id`. 
- Em seguida, foi usado o método `findIndex` para encontrar o índice do produto no array product. 
- Se um produto com o ID correspondente for encontrado, excluímos o produto usando o método splice e enviamos uma resposta com o status 200 e a mensagem "Produto apagado com sucesso". 
- Caso contrário, enviamos uma resposta com o status 404 e a mensagem "Produto não encontrado".

# Usando o método PUT no Postman para editar os Produtos

- Note que o código utiliza o findIndex() para encontrar o índice do produto no array, e em seguida faz uma verificação para checar se o produto foi encontrado. Caso não seja encontrado, é retornado um erro 404.

- Caso o produto seja encontrado, um novo objeto é criado com as propriedades atualizadas, utilizando o operador spread (...) e os valores informados no body da requisição (caso não sejam informados, são mantidos os valores antigos). Em seguida, o objeto atualizado é atribuído à posição correspondente do array.

- Por fim, é retornado um status 200 com a mensagem de sucesso.

# Como Editei o produto no Postman

Para testar a rota de edição de produto, segui os seguintes passos no Postman:

- Selecionei o método HTTP "PUT"
- Inseri a URL da rota, por exemplo: "http://localhost:3003/product/p1" (substitua o ID do produto pelo que você quer editar)
- Na seção "Body", selecionei a opção "raw" e o tipo de dado JSON
- Depois inseri os parâmetros que queria atualizar, por exemplo:

```jsx
{
    "name": "nova calca",
    "price": 100,
    "category": "Roupas"
}
```
# Link da API Publicada

- https://documenter.getpostman.com/view/25826649/2s93XyShJM

- Feito para o Projeto Labenu por Maria Stephanie Rodrigues Pereira