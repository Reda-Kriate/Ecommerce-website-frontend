const {default : axiosClient} = require("./axiosClient");

const getoneproduct = (id)=> axiosClient.get(`/products/${id}?populate=*`)
export default {getoneproduct};