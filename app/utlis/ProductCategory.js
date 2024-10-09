const {default : axiosClient} = require("./axiosClient");

const getProductByCategory = (category)=> axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`)
export default {getProductByCategory};