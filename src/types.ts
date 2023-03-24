import { CATEGORIA } from "./enum"

export type TUser = {
    id: string
    email: string
    password: string
}

export type TProduct = {
    id: string
    name: string
    price: number | undefined
    category: CATEGORIA
}

export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number | undefined
}

// enum CATEGORIA {
//     ACESSORIOS = "Acessórios",
//     ROUPAS = "Roupas",
//     CALCADOS = "Calçados"
// }