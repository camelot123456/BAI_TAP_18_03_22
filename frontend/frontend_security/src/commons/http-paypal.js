import axios from "axios";

import { ACCESS_TOKEN_PAYPAL } from "../constants/system-constant";

export const httpPaypal = () => {
    const accessTokenPaypal = localStorage.getItem(ACCESS_TOKEN_PAYPAL)
    if (accessTokenPaypal) {
        return axios.create({headers: {
            'Authorization': accessTokenPaypal,
            'Content-Type': 'application/json'
        }})
    }
    return axios.create({headers: {
        'Content-Type': 'application/json'
    }})
}

