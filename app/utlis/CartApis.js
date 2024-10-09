const {default : axiosClient} = require("./axiosClient");

const addToCart = (playload) => axiosClient.post(`/carts`,playload);

const getusercart = (email) => axiosClient.get(`carts?populate[products][populate]=img&filters[email][$eq]=${email}`);

const deleteItem = (i) => axiosClient.delete(`/carts/${i}`);

export default {
    addToCart,
    getusercart,
    deleteItem,
};