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
import { CATEGORIA } from "./enum";


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

getAllPurchasesFromUserId("Ste")