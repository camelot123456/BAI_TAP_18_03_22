import axios from 'axios'
import {ACCESS_TOKEN} from '../constants/system-constant'

export const httpCommon = () => {
    var token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
        return axios.create({
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
    return axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })
}