const {default : axiosClient} = require("./axiosClient")

const getlatestProduct = ()=> axiosClient.get('/products?populate=*')
export default {getlatestProduct};
