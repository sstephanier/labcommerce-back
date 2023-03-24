import { TUser, TProduct, TPurchase } from "./types"
import { CATEGORIA } from "./enum"

const users: TUser[] = []
const products: TProduct[] = []
const purchases: TPurchase[] = []

//Exercicio 1
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

export const createProduct = (id:string, name:string, price:number, category:CATEGORIA): void => {
        const productExist = product.find((prod) => {
            return prod.id === id 
        })
        if (productExist) {
            console.log("Produto já existe");
          } else {
            product.push({
                id,
                name,
                price,
                category
            })  
            console.log("Produto Cadastrado") 
            console.log("Produto: ", product)
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

//Exercício 3
// export function queryProductsByName(name: string) {
//     const queryProduct = product.find((prod) => prod.name === name);
//     if (queryProduct) {
//       console.log(queryProduct);
//     } else {
//       console.log("Produto não encontrado");
//     }
//   }
  
// export function queryProductsByName(q: string) {
//     for (let i = 0; i < product.length; i++) {
//       const prod = product[i];
//       if (prod.name === q) {
//         console.log(prod);
//         return;
//       }
//     }
//     console.log("Produto não encontrado");
//   }

export function queryProductsByName(q: string): void {
    const lowercaseQ = q.toLowerCase();
    for (let i = 0; i < product.length; i++) {
      const prod = product[i];
      const lowercaseName = prod.name.toLowerCase();
      if (lowercaseName === lowercaseQ) {
        console.log(prod);
        return;
      }
    }
    console.log("Produto não encontrado");
  }
export function createPurchase (userId:string, productId:string, quantity:number, totalPrice:number): void {
    const newPurchase = {
        userId, 
        productId, 
        quantity,  
        totalPrice
    }
    purchases.push(newPurchase)
    console.log(newPurchase)
    console.log("Compra realizada com sucesso");
  }

 export function getAllPurchasesFromUserId(userIdToSearch: string): void {
    const purchasesByUserId = purchase
    .filter((p) => p.userId === userIdToSearch)
    .map ((purchase) => purchase.productId)

    if (purchasesByUserId.length !== 0) {
            const useProducts = product.filter((prod) => 
            purchasesByUserId.includes(prod.id))

      console.log(useProducts);
    } else {
      console.log("Produto não encontrado")
    }
  }

// Mais Resumido
//   export function getAllPurchasesFromUserId(userIdToSearch: string): void {
//     const purchasesByUserId = purchase
//       .filter(({ userId }) => userId === userIdToSearch)
//       .map(({ productId }) => productId);
//     const useProducts = product.filter(({ id }) => purchasesByUserId.includes(id));
//     console.log(useProducts.length > 0 ? (useProducts) : "Produto não encontrado");
//   }
  