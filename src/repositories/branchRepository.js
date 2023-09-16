import Client from '@/services/axiosClient';
import {
    branchAllListUrl, branchCreateUrl,
    branchDeleteUrl,
    branchDetailUrl,
    branchListUrl,
    branchUpdateUrl
} from "@/services/serviceUrlConfig";

export default {
    getBranchList(search,startDate,endDate,isActive,limit,page) {
        return new Promise((resolve, reject) => {
            Client.get(`${branchListUrl}?page=${page}&limit=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&isActive=${isActive}`).then(res=>{
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
    getAllBranchList() {
        return new Promise( (resolve, reject) => {
            Client.get(`${branchAllListUrl}`).then(res=>{
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
    getDetail(id) {
        return new Promise((resolve, reject) => {
            Client.get(`${branchDetailUrl}/${id}`).then(res=>{
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
    update(request) {
        console.log(request)
        return new Promise((resolve, reject) => {
            Client.put(`${branchUpdateUrl}`,request).then(res=>{
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
        console.log(request)
        return new Promise((resolve, reject) => {
            Client.post(`${branchCreateUrl}`,request).then(res=>{
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
    delete(id) {
        console.log(id)
        return new Promise((resolve, reject) => {
            Client.delete(`${branchDeleteUrl}/${id}`,).then(res=>{
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
};