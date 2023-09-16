import Client from '@/services/axiosClient';
import {
    classCreateUrl, classDeleteUrl, classDetailUrl,
    studentListUrl, classUpdateUrl, coverAllList
} from "@/services/serviceUrlConfig";

export default {
    getStudentList(search,startDate,endDate,isActive,limit,page,isRecord,branch) {
        return new Promise((resolve, reject) => {
            Client.get(`${studentListUrl}?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&isActive=${isActive}&isRecord=${isRecord}&branch=${branch}`).then(res=>{
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
    getCoverAllList() {
        return new Promise((resolve, reject) => {
            Client.get(`${coverAllList}`).then(res=>{
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