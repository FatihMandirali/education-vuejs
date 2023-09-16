import Client from '@/services/axiosClient';
import {
    classAllListUrl,
    classCreateUrl, classDeleteUrl, classDetailUrl,
    classListUrl, classUpdateUrl
} from "@/services/serviceUrlConfig";

export default {
    getClassList(search,startDate,endDate,isActive,limit,page) {
        return new Promise((resolve, reject) => {
            Client.get(`${classListUrl}?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&isActive=${isActive}`).then(res=>{
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
    getClassAllList() {
        return new Promise((resolve, reject) => {
            Client.get(`${classAllListUrl}`).then(res=>{
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
            console.log(request)
            Client.post(`${classCreateUrl}`,request).then(res=>{
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
            console.log(request)
            Client.put(`${classUpdateUrl}`,request).then(res=>{
                console.log(res);
                if(res.data.statusCode === "ERROR"){
                    reject(res.data)
                }
                resolve(res);
            }).catch((err) => {
                console.log(err)
                reject("error")
            });
        })
    },
    getDetail(id) {
        return new Promise((resolve, reject) => {
            Client.get(`${classDetailUrl}/${id}`).then(res=>{
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
    delete(request) {
        return new Promise((resolve, reject) => {
            Client.delete(`${classDeleteUrl}/${request}`,request).then(res=>{
                console.log(res);
                if(res.data.statusCode === "ERROR"){
                    reject(res)
                }
                resolve(res);
            }).catch((err) => {
                console.log(err)
                reject(err)
            });
        })
    },
};