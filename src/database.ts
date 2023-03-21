import { TUser, TProduct, TPurchase } from "./types"


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


export const product: TProduct[] = [
{
    id: "1",
    name: "calça",
    price: 80, 
    category: "roupas"

},

{
    id: "2",
    name: "sandália",
    price: 50, 
    category: "calçado"

},

]

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