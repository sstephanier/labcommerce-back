# Exercício - Introdução a SQL

- Nesse primeiro exercício foi usando o banco de dados SQLite, o qual foi adicionado produtos e usuários fictícios na tabela apresentada no arquivo `labcommerce.sql`

- Os usuários e produtos adicionados foi embasado na API já construida nas aulas anteriores.

# Exercício Relações SQL

- A coluna "paid" na tabela `purchase` é definida como INTEGER e terá o valor 0 para false e 1 para true. 

- A coluna "delivered_at" é opcional e pode ser deixada como NULL na inserção dos dados.

- a coluna "buyer_id" é definida como FOREIGN KEY referenciando a coluna "id" da tabela "users". Isso garante que a cada compra esteja vinculada a um usuário existente na tabela "users".
