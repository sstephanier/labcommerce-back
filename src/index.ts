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