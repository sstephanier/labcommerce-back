import { TUser, TProduct, TPurchase } from "./types"
import { CATEGORIA } from "./enum"

const users: TUser[] = []
const products: TProduct[] = []
const purchases: TPurchase[] = []

export const user: TUser[] = [
    {
        id: "Ste",
        email: "ste@labenu",
        password: "123mudar"
    },
    {
        id: "Maria",
        email: "maria@labenu",
        password: "mudar321"
    },
    ]
//user
function userExists(id: string): boolean {
    // Verifica se já existe um usuário com o ID fornecido no array
    return user.some(use => use.id === id);
  }

export function createUser (id:string, email:string,  password:string):void {
         if (userExists(id)) {
            console.log("O usuário já existe");
            return;
          } else {    
            console.log("Usuário Cadastrado") 
            console.log("usuário: ", users)
    }
}

export function getAllUsers (): void {
   const userEmail = user.map((use) => {
    return use.email
   })
   console.log("emails: ", userEmail)  
}


//product

// CreateProduct (cria um novo produto na lista de products)
// input: quatro parâmetros (id, name, price e category)
// output: frase de sucesso ("Produto criado com sucesso")
// exemplo de chamada: createProduct("p004", "Monitor HD", 800, PRODUCT_CATEGORY.ELECTRONICS)

export const product: TProduct[] = [
    {
        id: "1",
        name: "calça",
        price: 80, 
        category: CATEGORIA.ROUPAS
    
    },
    {
        id: "2",
        name: "sandália",
        price: 50, 
        category: CATEGORIA.CALCADOS
    
    },
    ]

function productExist (id: string): boolean {
    return product.some(prod => prod.id === id);
} 

export function createProduct (id:string, name:string, price:number, category:CATEGORIA): void {
    if (productExist(id)) {
        console.log("Produto já existe");
        return;
      } else {    
        console.log("Produto Cadastrado") 
        console.log("Produto: ", products)
}
}

export const getAllProducts = (): void => {
    const allProducts = product.map((prod) => {
        return prod.name
    })
    console.log ("Todos os produtos: ", allProducts)
}

export const getProductById = (id: string): void => {
    const acheProduto = product.find((prod) =>{
        return prod.id === id
    })
    if(acheProduto) {
        console.log("Produto encontrado: ", acheProduto)
    } else {
        console.log("Produto não existe")
    }

}




// enum CATEGORIA {
//     ACESSORIOS = "Acessórios",
//     ROUPAS = "Roupas",
//     CALCADOS = "Calçados"
// }


export const purchase: TPurchase[] = [
{
    userId: user[0].id,
    productId: product[0].id,
    quantity: 1,
    totalPrice: product[0].price * 1
},
{
    userId: user[1].id,
    productId: product[1].id,
    quantity: 3,
    totalPrice: product[1].price * 3
}
]