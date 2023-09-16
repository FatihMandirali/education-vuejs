import Client from '@/services/axiosClient';
import {
    adminCreateUrl,
    adminDeleteUrl,
    adminDetailUrl,
    adminListUrl,
    adminUpdateUrl
} from "@/services/serviceUrlConfig";

export default {
    get(search,startDate,endDate,isActive,limit,page) {
        return new Promise((resolve, reject) => {
            Client.get(`${adminListUrl}?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&isActive=${isActive}`).then(res=>{
                if(res.data.statusCode === "ERROR"){
                    reject(res.data.message)
                }
                console.log(res.data.data)
                resolve(res.data.data);
            }).catch((err) => {
                console.log(err)
                reject("error")
            });
        })
    },
    getById(id) {
        return new Promise((resolve, reject) => {
            Client.get(`${adminDetailUrl}${id}`).then(res=>{
                console.log(res)
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
    create(request) {
        return new Promise((resolve, reject) => {
            Client.post(`${adminCreateUrl}`,request).then(res=>{
                console.log(res);
                if(res.data.statusCode === "ERROR"){
                    reject(res)
                }
                resolve(res);
            }).catch((err) => {
                console.log(err)
                reject("error")
            });
        })
    },
    update(request) {
        return new Promise((resolve, reject) => {
            Client.put(`${adminUpdateUrl}`,request).then(res=>{
                console.log(res);
                if(res.data.statusCode === "ERROR"){
                    reject(res)
                }
                resolve(res);
            }).catch((err) => {
                console.log(err)
                reject("error")
            });
        })
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            Client.delete(`${adminDeleteUrl}/${id}`).then(res=>{
                console.log(res);
                if(res.data.statusCode === "ERROR"){
                    reject(res)
                }
                resolve(res);
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