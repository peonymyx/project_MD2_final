import CryptoJS from "crypto-js";

export default {
    createToken: function(userObj, privateKey = import.meta.env.VITE_PRIVATE_KEY) {
        return CryptoJS.AES.encrypt(JSON.stringify(userObj), privateKey).toString();
    },
    verifyToken: function(token, key, privateKey = import.meta.env.VITE_PRIVATE_KEY) {
        try {
            if (privateKey != key) {
                return false
            }
            // giải mã
            const decryptedData = CryptoJS.AES.decrypt(token, privateKey)
                .toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedData)
        } catch {
            //console.log("key lỗi")
            return false
        }
    }
} 