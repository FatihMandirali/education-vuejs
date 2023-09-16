import Client from '@/services/axiosClient';
import {
    studentListUrl, studentCreateUrl, studentDetailUrl, studentUpdateUrl, studentDeleteUrl
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
    create(request) {
        return new Promise((resolve, reject) => {
            console.log(request)
            Client.post(`${studentCreateUrl}`,request).then(res=>{
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
            Client.put(`${studentUpdateUrl}`,request).then(res=>{
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
            Client.get(`${studentDetailUrl}/${id}`).then(res=>{
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
            Client.delete(`${studentDeleteUrl}/${request}`,request).then(res=>{
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