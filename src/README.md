# Observações sobre as funções utilizadas

- O trecho de código user.some(use => use.id === id) verifica se existe pelo menos um usuário no array user com o ID fornecido na chamada da função createUser. Se existir um usuário com esse ID, a função userExists retorna true, indicando que o usuário já existe. Se não existir nenhum usuário com esse ID, a função userExists retorna false, indicando que o usuário não existe ainda.

- A função utiliza o método "map" de JavaScript para percorrer cada objeto de usuário na lista "user" e criar uma nova lista contendo apenas o endereço de e-mail de cada usuário. O resultado é armazenado na variável "userEmail", que não é retornada pela função.