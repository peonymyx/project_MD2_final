import axios from "axios"

export default {
    findAll: async function () {
        return await axios.get(import.meta.env.VITE_SERVER_HOST + "products")
    },
    deleteById: async function (id) {
        return await axios.delete(import.meta.env.VITE_SERVER_HOST + "products/" + id)
    },
    addProduct: async function (data) {
        return await axios.post(import.meta.env.VITE_SERVER_HOST + "products", data)
    },
    editProduct: async function(data, id){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + "products/" + id, {data} )
    },
    editStatus: async function(id,statusEdit){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + "products/" + id, {status: statusEdit})
    },
    findByID: async function (id) {
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `products` + `?id=${id}`)
    }
}