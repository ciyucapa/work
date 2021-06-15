import axios from "axios";

const login = (email, password) => {
    return axios({
        url: 'https://api.qa.vitawallet.io/api/auth/sign_in',
        method: 'post',
        data: {
            email,
            password,
        }
    })
};

export default {
    login,
}
