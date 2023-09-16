import Repository from "@/repositories/repositoryFactory";
const ClassRepository = Repository.get("class");

const state  = {
    page:1,
    limit:process.env.VUE_APP_PAG_LIMIT,
    totalPage:1,
    counter: 0,
    classList: [],
    classAllList: [],
    classAllFilterList: [],
    class:{},
    isClassFilter:false,
    isClassLoading:false
}

const getters = {
    isClassFilter(state){
        return state.isClassFilter
    },
    getClassList(state){
        return state.classList
    },
    getClassAllList(state){
        return state.classAllList
    },
    classAllFilterList(state){
        return state.classAllFilterList
    },
    getClassDetail(state){
        return state.class
    },
    getClassListTotalPage(state){
        return state.totalPage
    },
    getClassListPage(state){
        return state.page
    },
    getClassIsLoading(state){
        return state.isClassLoading
    }
}

const mutations = {
    setClassListMutations(state,payload){
        state.classList=payload;
    },
    setIsClassFilterMutation(state,payload){
        console.log(state,payload)
        state.isClassFilter=payload;
    },
    setClassDetailMutation(state,payload){
        state.class=payload;
    },
    setClassListPaginationMutation(state,payload){
        state.page=payload.page;
        state.totalPage=payload.total_page
    },
    setIsClassLoadingMutation(state,payload){
        state.isClassLoading=payload
    },
    setClassAllListMutations(state,payload){
        state.classAllList=payload
    },
    setClassAllListFilterMutations(state,payload){
        console.log(payload)
        state.classAllFilterList= payload.allClassList.filter(x=>x.branchId===payload.id)
    }

}

const actions = {
    async setClassListActions({commit},payload){
        try {
            commit("setIsClassLoadingMutation",true)
            const res = await ClassRepository.getClassList(payload.search,payload.startDate,payload.endDate,payload.isActive,state.limit,payload.page)
            commit("setClassListMutations",res.data.records);
            const pagination={
                page:res.data.page,
                total_page:res.data.total_page
            }
            commit("setClassListPaginationMutation",pagination);
            commit("setIsClassLoadingMutation",false)
            return true
        }catch (e) {
            commit("setIsClassLoadingMutation",false)
            return e
        }
    },
    async setClassAllListActions({commit}){
        try {
            commit("setIsClassLoadingMutation",true)
            const res = await ClassRepository.getClassAllList()
            console.log(res);
            commit("setClassAllListMutations",res.data);
            commit("setIsClassLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsClassLoadingMutation",false)
            return e
        }
    },
    async setClassCreateActions({commit},payload){
        try {
            commit("setIsClassLoadingMutation",true)
            const res = await ClassRepository.create(payload)
            commit("setIsClassLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsClassLoadingMutation",false)
            return e
        }
    },
    async setClassUpdateActions({commit},payload){
        try {
            console.log(payload)
            commit("setIsClassLoadingMutation",true)
            const res = await ClassRepository.update(payload)
            console.log(res)
            commit("setIsClassLoadingMutation",false)
            return res
        }catch (e) {
            console.log(e);
            commit("setIsClassLoadingMutation",false)
            return e
        }
    },
    async setClassDetailActions({commit},payload){
        try {
            commit("setIsClassLoadingMutation",true)
            const res = await ClassRepository.getDetail(payload)
            commit("setClassDetailMutation",res.data)
            commit("setIsClassLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsClassLoadingMutation",false)
            return e
        }
    },
    async setClassDeleteActions({commit},payload){
        try {
            commit("setIsClassLoadingMutation",true)
            const res = await ClassRepository.delete(payload)
            commit("setIsClassLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsClassLoadingMutation",false)
            return e
        }
    },
    setIsClassFilterActions({commit},payload) {
        commit("setIsClassFilterMutation",payload);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
