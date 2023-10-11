import axios from "axios"

export default {
    getAll: async function () {
        return await axios.get(import.meta.env.VITE_SERVER_HOST + "users")
    },
    register: async function (data) {
        return await axios.post(import.meta.env.VITE_SERVER_HOST + "users", data)
    },
    findByEmail: async function (email) {
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `users` + `?email=${email}`)
    },
    editStatus: async function(id,statusEdit){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + "users/" + id, {status: statusEdit})
    },
    editAdmin: async function(id,statusEdit){
        return await axios.patch(import.meta.env.VITE_SERVER_HOST + "users/" + id, {isAdmin: statusEdit})
    }
}