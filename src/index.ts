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
app.get("/user",(req: Request, res: Response) =>{
    res.status(200).send(user)
})

//Pegar os produtos
app.get("/product", (req: Request, res: Response) =>{
    res.status(200).send(product)

})

//pesquisar pelo nome
app.get("/product/search", (req: Request, res: Response) =>{
    const q = req.query.q as string
    const result = product.filter((prod) => {
        return prod.name.toLocaleLowerCase().includes(q.toString().toLocaleLowerCase())
    })
    res.status(200).send(result)
})

// Criar usuário
app.post("/user", (req: Request, res: Response) =>{
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser: TUser = {
        id,
        email,
        password
    }
    user.push(newUser)
    res.status(201).send("Usuário cadastrado com sucesso!")
})

app.post("/product", (req: Request, res: Response) =>{ 
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as CATEGORIA

    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }
    product.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
})

app.post("/purchase", (req: Request, res: Response) =>{ 
    const userId = req.body.userId as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;
   
    const productPrice =  product.find((prod) => {
      return prod.id === productId;
    });
  
    if (!productPrice) {
      res.status(400).send("Produto não encontrado");
      return;
    }
  
    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice : productPrice.price * quantity
    };
    purchase.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
  });

// aprofundamento-api-express
app.get("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const result = product.find((prod) =>  prod.id === id);
    if(result) {
        res.status(200). send(result);
    }else {
        res.send("Produto não encontrado!")
    }
})

app.get("/user/:id/purchase", (req: Request, res: Response) => {
    const userId = req.params.id
    const result = purchase.find((user) => user.userId === userId)
    if (result) {
        res.status(200).send(result)
    } else {
        res.status(400).send("Usuário não encontrado")
    }
})

//método DELETE
app.delete("/user/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const result = user.findIndex((use) => use.id === id);
    if (result >= 0) {
      const deletedUser = user.splice(result, 1)[0];
      res.status(200).send({ message: "User apagado com sucesso", user: deletedUser });
    } else {
      res.status(404).send({ message: "Usuário não encontrado" });
    }
  });

  app.delete("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const index = product.findIndex((prod) => prod.id === id);
    if (index >= 0) {
      const deletedProduct = product.splice(index, 1)[0];
      res.status(200).send("Produto apagado com sucesso");
    } else {
      res.status(404).send("Produto não encontrado");
    }
  });
// método PUT para Edit
//Edit User by id
app.put("/user/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newPassword = req.body.password as string

    const userEdit = user.find((use)=> use.id === id)

    if (!userEdit){
        return res
        .status(400)
        .send("Não foi possível achar o usuário para atualização")
    }
    if(userEdit.password === newPassword){
        return res
        .status(400)
        .send("Senha semelhante a anterior, tente outra senha")
    }

})
//Edit Product by id
app.put("/product/:id", (req: Request, res: Response) => {
    const productId = req.params.id;
    const { name, price, category } = req.body;
  
    const productIndex = product.findIndex((prod) => prod.id === productId);
  
    if (productIndex < 0) {
      return res.status(404).send("Produto não encontrado");
    }
  
    const updatedProduct = {
      ...product[productIndex],
      name: name || product[productIndex].name,
      price: price || product[productIndex].price,
      category: category || product[productIndex].category,
    };
  
    product[productIndex] = updatedProduct;
  
    return res.status(200).send("Produto atualizado com sucesso");
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