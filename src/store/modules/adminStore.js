import Repository from "@/repositories/repositoryFactory";
const AdminRepository = Repository.get("admins");

const state  = {
    page:1,
    limit:process.env.VUE_APP_PAG_LIMIT,
    totalPage:1,
    counter: 0,
    adminList: [],
    admin:{},
    isAdminFilter:false,
    isLoading:false
}

const getters = {
    isAdminFilter(state){
        return state.isAdminFilter
    },
    getAdminList(state){
        return state.adminList
    },
    getAdminDetail(state){
        return state.admin
    },
    getAdminListTotalPage(state){
        return state.totalPage
    },
    getAdminListPage(state){
        return state.page
    },
    getIsLoading(state){
        return state.isLoading
    }
}

const mutations = {
    setAdminListMutations(state,payload){
        state.adminList=payload;
    },
    setIsAdminFilterMutation(state,payload){
        console.log(state,payload)
        state.isAdminFilter=payload;
    },
    setIsAdminDetailMutation(state,payload){
        state.admin=payload;
    },
    setAdminListPaginationMutation(state,payload){
        console.log(payload)
        state.page=payload.page;
        state.totalPage=payload.total_page
    },
    setIsLoadingMutation(state,payload){
        state.isLoading=payload
    }

}

const actions = {
     async setAdminListActions({commit},payload){
            try {
                commit("setIsLoadingMutation",true)
                const res = await AdminRepository.get(payload.search,payload.startDate,payload.endDate,payload.isActive,state.limit,payload.page)
                commit("setAdminListMutations",res.records);
                const pagination={
                    page:res.page,
                    total_page:res.total_page
                }
                commit("setAdminListPaginationMutation",pagination);
                commit("setIsLoadingMutation",false)
                return true
            }catch (e) {
                commit("setIsLoadingMutation",false)
                return e
            }
    },
     async setAdminCreateActions({commit},payload){
            try {
                commit("setIsLoadingMutation",true)
                const res = await AdminRepository.create(payload)
                commit("setIsLoadingMutation",false)
                return res
            }catch (e) {
                commit("setIsLoadingMutation",false)
                return e
            }
    },
     async setAdminUpdateActions({commit},payload){
            try {
                commit("setIsLoadingMutation",true)
                const res = await AdminRepository.update(payload)
                commit("setIsLoadingMutation",false)
                return res
            }catch (e) {
                commit("setIsLoadingMutation",false)
                return e
            }
    },
     async setAdminDetailActions({commit},payload){
            try {
                commit("setIsLoadingMutation",true)
                const res = await AdminRepository.getById(payload)
                commit("setIsAdminDetailMutation",res)
                commit("setIsLoadingMutation",false)
                return res
            }catch (e) {
                commit("setIsLoadingMutation",false)
                return e
            }
    },
     async setAdminDeleteActions({commit},payload){
            try {
                commit("setIsLoadingMutation",true)
                const res = await AdminRepository.delete(payload)
                commit("setIsLoadingMutation",false)
                return res
            }catch (e) {
                commit("setIsLoadingMutation",false)
                return e
            }
    },
    setIsAdminFilterActions({commit},payload) {
        commit("setIsAdminFilterMutation",payload);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
