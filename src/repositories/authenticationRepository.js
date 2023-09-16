import Client from '@/services/axiosClient';
import {loginUrl} from "@/services/serviceUrlConfig";

export default {
    post(payload) {
        return new Promise((resolve, reject) => {
            Client.post(`${loginUrl}`,payload).then(res=>{
                if(res.data.statusCode === "ERROR"){
                    reject(res.data.message)
                }
                resolve(res.data);
            }).catch((err) => {
                console.log(err)
                reject("error")
            });
        })
    },
    /*getPost(id) {
        return Client.get(`${resource}/${id}`);
    },
    create(payload) {
        return Client.post(`${resource}`, payload);
    },
    update(payload, id) {
        return Client.put(`${resource}/${id}`, payload);
    },
    delete(id) {
        return Client.delete(`${resource}/${id}`)
    },*/

    // MANY OTHER ENDPOINT RELATED STUFFS
};