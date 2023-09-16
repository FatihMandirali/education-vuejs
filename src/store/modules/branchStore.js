import Repository from "@/repositories/repositoryFactory";
const BranchRepository = Repository.get("branchs");

const state  = {
    page:1,
    limit:process.env.VUE_APP_PAG_LIMIT,
    totalPage:1,
    counter: 0,
    branchList: [],
    branchAllList: [],
    branch:{},
    isAdminFilter:false,
    isBranchLoading:false
}

const getters = {
    isBranchFilter(state){
        return state.isAdminFilter
    },
    getBranchList(state){
        return state.branchList
    },
    getBranchAllList(state){
        return state.branchAllList
    },
    getBranchDetail(state){
        return state.branch
    },
    getBranchListTotalPage(state){
        return state.totalPage
    },
    getBranchListPage(state){
        return state.page
    },
    getBranchIsLoading(state){
        return state.isBranchLoading
    }
}

const mutations = {
    setBranchListMutations(state,payload){
        state.branchList=payload;
    },
    setBranchAllListMutations(state,payload){
        state.branchAllList=payload;
    },
    setIsBranchFilterMutation(state,payload){
        console.log(state,payload)
        state.isAdminFilter=payload;
    },
    setBranchDetailMutation(state,payload){
        state.branch=payload;
    },
    setBranchListPaginationMutation(state,payload){
        console.log(payload)
        state.page=payload.page;
        state.totalPage=payload.total_page
    },
    setIsLoadingMutation(state,payload){
        state.isBranchLoading=payload
    }

}

const actions = {
    async setBranchListActions({commit},payload){
        try {
            commit("setIsLoadingMutation",true)
            const res = await BranchRepository.getBranchList(payload.search,payload.startDate,payload.endDate,payload.isActive,state.limit,payload.page)
            console.log(res);
            commit("setBranchListMutations",res.data.records);
            const pagination={
                page:res.data.page,
                total_page:res.data.total_page
            }
            commit("setBranchListPaginationMutation",pagination);
            commit("setIsLoadingMutation",false)
            return true
        }catch (e) {
            commit("setIsLoadingMutation",false)
            return e
        }
    },
    async setBranchAllListActions({commit}){
      try {
          commit("setIsLoadingMutation",true)
          const res = await BranchRepository.getAllBranchList()
          commit("setBranchAllListMutations",res.data);
          commit("setIsLoadingMutation",false)
          return res
      }catch (e){
        console.log(`error ${e}`)
        return e
      }
    },
    async setBranchCreateActions({commit},payload){
        try {
            commit("setIsLoadingMutation",true)
            const res = await BranchRepository.create(payload)
            commit("setIsLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsLoadingMutation",false)
            return e
        }
    },
    async setBranchUpdateActions({commit},payload){
        try {
            commit("setIsLoadingMutation",true)
            const res = await BranchRepository.update(payload)
            commit("setIsLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsLoadingMutation",false)
            return e
        }
    },
    async setBranchDetailActions({commit},payload){
        try {
            commit("setIsLoadingMutation",true)
            const res = await BranchRepository.getDetail(payload)
            console.log(res)
            commit("setBranchDetailMutation",res.data)
            commit("setIsLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsLoadingMutation",false)
            return e
        }
    },
    async setBranchDeleteActions({commit},payload){
        try {
            commit("setIsLoadingMutation",true)
            const res = await BranchRepository.delete(payload)
            commit("setIsLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsLoadingMutation",false)
            return e
        }
    },
    setIsBranchFilterActions({commit},payload) {
        commit("setIsBranchFilterMutation",payload);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
