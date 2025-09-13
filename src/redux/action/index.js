// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

// For Remove All of a Product from Cart
export const removeAllOfProduct = (product) => {
    return {
        type: "REMALLITEM",
        payload: product
    }
}