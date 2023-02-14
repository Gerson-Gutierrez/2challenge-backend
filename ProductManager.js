const fs = require("fs");

class ProductManager {
    constructor(){
        this.path = "./products.js"
        this.products = []
    }

    static id = 0

    /* METODOS */
    

    addProduct = async (title,description,price,thumbnail,code,stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let firstresponse = await fs.promises.readFile(this.path , "utf-8")

        return JSON.parse(firstresponse)
         
    }

    getProducts = async () => {
        let secondresponse = await this.readProducts()
        return console.log(secondresponse)
        

    }

    getProductsById = async (id) => {
        let thirdresponse = await this.readProducts()

        let filter = thirdresponse.find(product => product.id === id)

        console.log(filter)

    }

    deleteProductsById = async (id) =>{
        let thirdresponse = await this.readProducts()
        let productFilter = thirdresponse.filter(products => products.id != id)

        await fs.promises.writeFile(this.path, JSON.stringify(productFilter))


    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id)

        let oldProduct = await this.readProducts()

        let modifiedProducts = [
            { ...producto, id }, ...oldProduct
        ]
        await fs.promises.writeFile(this.path, JSON.stringify(modifiedProducts))
    }


}

const productos = new ProductManager

productos.addProduct("Bat Man", "FIGURE FEATURESBased on the character design for the Three Jokers comic1/10 scale. Height 18 cm.Multiple points of articulationMade in PVCclosed in boxMcFarlane Toys", 1600, "https://http2.mlstatic.com/D_NQ_NP_967155-MLA50274149289_062022-O.webp", "d3f5", 15)
productos.addProduct("Depredador", "Juguetes articuladosAl tener marcadas las articulaciones podrás manejar y acomodar tus figuras como más te guste. Con ellas, vas a poder crear historias en la que los personajes puedan movilizarse y cobrar vida.", 2700, "https://http2.mlstatic.com/D_NQ_NP_2X_811567-MLA48536254142_122021-F.webp", "f6g5", 7)
productos.addProduct("Goku", "Juguetes articuladosAl tener marcadas las articulaciones podrás manejar y acomodar tus figuras como más te guste. Con ellas, vas a poder crear historias en la que los personajes puedan movilizarse y cobrar vida.", 2957, "https://http2.mlstatic.com/D_649170-MLA49842989662_052022-O.webp", "s6d5", 3)


// productos.getProducts()

//productos.getProductsById()

//productos.deleteProductsById() 


productos.updateProducts({
    title: "Mandalorian",
    description: "Juguetes articuladosAl tener marcadas las articulaciones podrás manejar y acomodar tus figuras como más te guste. Con ellas, vas a poder crear historias en la que los personajes puedan movilizarse y cobrar vida.",
    price: 8000,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_966696-MLA52223269943_102022-F.webp",
    code: "6as5",
    stock:18 ,
    id: 4

})