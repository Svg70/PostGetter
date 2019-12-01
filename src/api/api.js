import * as axios from "axios";


export const API = {
    getDataList(link) {
        
        return axios.get(`${link}`)
    }
}