import { purchase, 
         user, 
         product, 
         createUser, 
         getAllUsers, 
         createProduct, 
         getProductById,
         getAllProducts, 
         queryProductsByName,
         createPurchase,
         getAllPurchasesFromUserId} from "./database"
import { TUser, TProduct, TPurchase } from "./types"
import { CATEGORIA } from "./enum";
import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// Pegar todos os usuários
// app.get("/user",(req: Request, res: Response) =>{
//     res.status(200).send(user)
// })
// usando try/catch
app.get("/user", async (req: Request, res: Response) => {
    try {
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send("Não foi possível buscar os usuários" );
    }
  });
  

//Pegar os produtos
// app.get("/product", (req: Request, res: Response) =>{
//     res.status(200).send(product)

// })
app.get("/product", (req: Request, res: Response) =>{
    try {
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


//pesquisar pelo nome
// app.get("/product/search", (req: Request, res: Response) =>{
//     const q = req.query.q as string
//     const result = product.filter((prod) => {
//         return prod.name.toLocaleLowerCase().includes(q.toString().toLocaleLowerCase())
//     })
//     res.status(200).send(result)
// })
app.get("/product/search", (req: Request, res: Response) => {
    try {
      const q = req.query.q as string;
  
      if (!q || q.trim().length === 0) {
        return res
          .status(400)
          .send("O parâmetro de busca deve possuir pelo menos um caractere.");
      }
  
      const result = product.filter((prod) => {
        return prod.name
          .toLocaleLowerCase()
          .includes(q.toString().toLocaleLowerCase());
      });
  
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Ocorreu um erro ao buscar produtos.");
    }
  });
  
// Criar usuário
// app.post("/user", (req: Request, res: Response) =>{
//     const id = req.body.id as string
//     const email = req.body.email as string
//     const password = req.body.password as string

//     const newUser: TUser = {
//         id,
//         email,
//         password
//     }
//     user.push(newUser)
//     res.status(201).send("Usuário cadastrado com sucesso!")
// })
app.post("/user", (req: Request, res: Response) =>{
    try {
      const id = req.body.id as string
      const email = req.body.email as string
      const password = req.body.password as string
  
      // Verifica se o body é válido
      if (!id || !email || !password) {
        res.status(400).send("Campos 'id', 'email' e 'password' são obrigatórios.")
        return
      }
  
      // Verifica se já existe um usuário com o mesmo id
      if (user.some((u) => u.id === id)) {
        res.status(400).send(`Já existe um usuário com o id '${id}'.`)
        return
      }
  
      // Verifica se já existe um usuário com o mesmo e-mail
      if (user.some((u) => u.email === email)) {
        res.status(400).send(`Já existe um usuário com o e-mail '${email}'.`)
        return
      }
  
      const newUser: TUser = {
        id,
        email,
        password
      }
      user.push(newUser)
      res.status(201).send("Usuário cadastrado com sucesso!")
    } catch (error) {
      res.status(500).send("Ocorreu um erro ao cadastrar o usuário.")
    }
  })
  
// app.post("/product", (req: Request, res: Response) =>{ 
//     const id = req.body.id as string
//     const name = req.body.name as string
//     const price = req.body.price as number
//     const category = req.body.category as CATEGORIA

//     const newProduct: TProduct = {
//         id,
//         name,
//         price,
//         category
//     }
//     product.push(newProduct)
//     res.status(201).send("Produto cadastrado com sucesso")
// })
app.post("/product", (req: Request, res: Response) => {
    try {
      const { id, name, price, category } = req.body;
  
      // Verifica se todos os campos foram enviados no body
      if (!id || !name || !price || !category) {
        throw new Error("Os campos 'id', 'name', 'price' e 'category' são obrigatórios");
      }
  
      // Verifica se já existe um produto com o mesmo id
      const existingProduct = product.find((prod) => prod.id === id);
      if (existingProduct) {
        throw new Error("Já existe um produto com essa id");
      }
  
      const newProduct: TProduct = { id, name, price, category };
  
      product.push(newProduct);
      res.status(201).send("Produto cadastrado com sucesso");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
// app.post("/purchase", (req: Request, res: Response) =>{ 
//     const userId = req.body.userId as string;
//     const productId = req.body.productId as string;
//     const quantity = req.body.quantity as number;
   
//     const productPrice =  product.find((prod) => {
//       return prod.id === productId;
//     });
  
//     if (!productPrice) {
//       res.status(400).send("Produto não encontrado");
//       return;
//     }
  
//     const newPurchase: TPurchase = {
//       userId,
//       productId,
//       quantity,
//       totalPrice : productPrice.price * quantity
//     };
//     purchase.push(newPurchase);
//     res.status(201).send("Compra realizada com sucesso");
//   });

app.post("/purchase", (req: Request, res: Response) => {
    try {
      const userId = req.body.userId as string;
      const productId = req.body.productId as string;
      const quantity = req.body.quantity as number;
  
      // Verifica se o usuário existe
      const userExists = user.find((user) => {
        return user.id === userId;
      });
  
      if (!userExists) {
        throw new Error("Usuário não encontrado");
      }
  
      // Verifica se o produto existe
      const productPrice = product.find((prod) => {
        return prod.id === productId;
      });
  
      if (!productPrice) {
        throw new Error("Produto não encontrado");
      }
      
      const totalPurchasePrice = productPrice.price * quantity;

      if (totalPurchasePrice > productPrice.price) {
        res.status(400).send("Valor total da compra é maior que o preço do produto");
        return;
      }

      // Calcula o preço total da compra
      const totalPrice = quantity * productPrice.price;
  

      const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
      };
  
      purchase.push(newPurchase);
      res.status(201).send("Compra realizada com sucesso");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

// aprofundamento-api-express

// app.get("/product/:id", (req: Request, res: Response) => {
//     const id = req.params.id
//     const result = product.find((prod) =>  prod.id === id);
//     if(result) {
//         res.status(200). send(result);
//     }else {
//         res.send("Produto não encontrado!")
//     }
// })
app.get("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const result = product.find((prod) => prod.id === id);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Produto não encontrado!");
      }
    } catch (error) {
      res.status(500).send("Erro ao buscar produto");
    }
  });
  
// app.get("/user/:id/purchase", (req: Request, res: Response) => {
//     const userId = req.params.id
//     const result = purchase.find((user) => user.userId === userId)
//     if (result) {
//         res.status(200).send(result)
//     } else {
//         res.status(400).send("Usuário não encontrado")
//     }
// })
app.get("/user/:id/purchase", (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      
      // Verifica se o usuário existe
      const userExists = user.find((user) => {
        return user.id === userId;
      });
    
      if (!userExists) {
        throw new Error("Usuário não encontrado");
      }
    
      // Busca as compras relacionadas ao usuário
      const result = purchase.filter((purchase) => {
        return purchase.userId === userId;
      });
    
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(400).send("Usuário não possui compras registradas");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
//método DELETE
// app.delete("/user/:id", (req: Request, res: Response) => {
//     const id = req.params.id;
//     const result = user.findIndex((use) => use.id === id);
//     if (result >= 0) {
//       const deletedUser = user.splice(result, 1)[0];
//       res.status(200).send({ message: "User apagado com sucesso", user: deletedUser });
//     } else {
//       res.status(404).send({ message: "Usuário não encontrado" });
//     }
//   });
app.delete("/user/:id", (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userIndex = user.findIndex((user) => user.id === id);
  
      if (userIndex === -1) {
        throw new Error("Usuário não encontrado");
      }
  
      const deletedUser = user.splice(userIndex, 1)[0];
  
      res.status(200).send({ message: "Usuário apagado com sucesso", user: deletedUser });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  });
  

//   app.delete("/product/:id", (req: Request, res: Response) => {
//     const id = req.params.id;
//     const index = product.findIndex((prod) => prod.id === id);
//     if (index >= 0) {
//       const deletedProduct = product.splice(index, 1)[0];
//       res.status(200).send("Produto apagado com sucesso");
//     } else {
//       res.status(404).send("Produto não encontrado");
//     }
//   })
app.delete("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const index = product.findIndex((prod) => prod.id === id);
        if (index >= 0) {
            const deletedProduct = product.splice(index, 1)[0];
            res.status(200).send("Produto apagado com sucesso");
        } else {
            throw new Error("Produto não encontrado");
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});


// método PUT para Edit

//Edit User by id
// app.put("/user/:id", (req: Request, res: Response) => {
//     const id = req.params.id
//     const newPassword = req.body.password as string

//     const userEdit = user.find((use)=> use.id === id)

//     if (!userEdit){
//         return res
//         .status(400)
//         .send("Não foi possível achar o usuário para atualização")
//     }
//     if(userEdit.password === newPassword){
//         return res
//         .status(400)
//         .send("Senha semelhante a anterior, tente outra senha")
//     }

// })
app.put("/user/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newPassword = req.body.password as string

    const userEdit = user.find((use)=> use.id === id)

    try {
        // Valida se o usuário existe
        if (!userEdit){
            throw new Error("Usuário não encontrado")
        }

        // Valida se a senha é diferente da anterior
        if(userEdit.password === newPassword){
            throw new Error("Senha semelhante a anterior, tente outra senha")
        }

        // Atualiza a senha do usuário
        userEdit.password = newPassword

        res.status(200).send("Senha atualizada com sucesso")
    } catch (error) {
        res.status(400).send(error.message)
    }
})


//Edit Product by id
// app.put("/product/:id", (req: Request, res: Response) => {
//     const productId = req.params.id;
//     const { name, price, category } = req.body;
  
//     const productIndex = product.findIndex((prod) => prod.id === productId);
  
//     if (productIndex < 0) {
//       return res.status(404).send("Produto não encontrado");
//     }
  
//     const updatedProduct = {
//       ...product[productIndex],
//       name: name || product[productIndex].name,
//       price: price || product[productIndex].price,
//       category: category || product[productIndex].category,
//     };
  
//     product[productIndex] = updatedProduct;
  
//     return res.status(200).send("Produto atualizado com sucesso");
//   });
app.put("/product/:id", (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const { name, price, category } = req.body;
  
      const productIndex = product.findIndex((prod) => prod.id === productId);
  
      if (productIndex < 0) {
        throw new Error("Produto não encontrado");
      }
  
      if (!name && !price && !category) {
        throw new Error("Nenhum campo foi enviado para atualização");
      }
  
      const updatedProduct = {
        ...product[productIndex],
        name: name || product[productIndex].name,
        price: price || product[productIndex].price,
        category: category || product[productIndex].category,
      };
  
      product[productIndex] = updatedProduct;
  
      res.status(200).send("Produto atualizado com sucesso");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
    

// console.log(user);
// console.log(product);
// console.log(purchase);
// createUser("Ste", "ste@labenu", "123mudar" )
// getAllUsers()
// createProduct("1", "calça", 80, CATEGORIA.ROUPAS)
// getAllProducts ()
// getProductById("1")
// queryProductsByName("CALÇA")
// createPurchase( user[2].id,product[1].id,5,product[1].price * 1)
// getAllPurchasesFromUserId("Ste")