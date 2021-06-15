import axios from "axios";

const getPrice = () => {
    return axios({
        url: 'https://api.qa.vitawallet.io/api/prices',
        method: 'get',
    })
};

export default {
    getPrice,
}
