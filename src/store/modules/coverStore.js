import Repository from "@/repositories/repositoryFactory";
const CoverRepository = Repository.get("cover");

const state  = {
    page:1,
    limit:process.env.VUE_APP_PAG_LIMIT,
    totalPage:1,
    counter: 0,
    coverList: [],
    coverAllList: [],
    cover:{},
    isCoverFilter:false,
    isCoverLoading:false
}

const getters = {
    isCoverFilter(state){
        return state.isCoverFilter
    },
    getCoverList(state){
        return state.coverList
    },
    getCoverAllList(state){
        return state.coverAllList
    },
    getCoverDetail(state){
        return state.cover
    },
    getCoverListTotalPage(state){
        return state.totalPage
    },
    getCoverListPage(state){
        return state.page
    },
    getCoverIsLoading(state){
        return state.isCoverLoading
    }
}

const mutations = {
    setCoverListMutations(state,payload){
        state.coverList=payload;
    },
    setCoverAllListMutations(state,payload){
        state.coverAllList=payload;
    },
    setIsCoverFilterMutation(state,payload){
        console.log(state,payload)
        state.isCoverFilter=payload;
    },
    setCoverDetailMutation(state,payload){
        state.cover=payload;
    },
    setCoverListPaginationMutation(state,payload){
        state.page=payload.page;
        state.totalPage=payload.total_page
    },
    setIsCoverLoadingMutation(state,payload){
        state.isCoverLoading=payload
    }

}

const actions = {
    async setCoverListActions({commit},payload){
        try {
            commit("setIsCoverLoadingMutation",true)
            const res = await CoverRepository.getCoverList(payload.search,payload.startDate,payload.endDate,payload.isActive,state.limit,payload.page,payload.isRecord,payload.branch)
            console.log(res);
            commit("setCoverListMutations",res.data.records);
            const pagination={
                page:res.data.page,
                total_page:res.data.total_page
            }
            commit("setCoverListPaginationMutation",pagination);
            commit("setIsCoverLoadingMutation",false)
            return true
        }catch (e) {
            commit("setIsCoverLoadingMutation",false)
            return e
        }
    },
    async setCoverAllListActions({commit}){
        try {
            commit("setIsCoverLoadingMutation",true)
            const res = await CoverRepository.getCoverAllList()
            console.log(res);
            commit("setCoverAllListMutations",res.data);
            const pagination={
                page:res.data.page,
                total_page:res.data.total_page
            }
            commit("setCoverListPaginationMutation",pagination);
            commit("setIsCoverLoadingMutation",false)
            return true
        }catch (e) {
            commit("setIsCoverLoadingMutation",false)
            return e
        }
    },
    async setCoverCreateActions({commit},payload){
        try {
            commit("setIsCoverLoadingMutation",true)
            const res = await CoverRepository.create(payload)
            commit("setIsCoverLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsCoverLoadingMutation",false)
            return e
        }
    },
    async setCoverUpdateActions({commit},payload){
        try {
            console.log(payload)
            commit("setIsCoverLoadingMutation",true)
            const res = await CoverRepository.update(payload)
            console.log(res)
            commit("setIsCoverLoadingMutation",false)
            return res
        }catch (e) {
            console.log(e);
            commit("setIsCoverLoadingMutation",false)
            return e
        }
    },
    async setCoverDetailActions({commit},payload){
        try {
            commit("setIsCoverLoadingMutation",true)
            const res = await CoverRepository.getDetail(payload)
            commit("setCoverDetailMutation",res.data)
            commit("setIsCoverLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsCoverLoadingMutation",false)
            return e
        }
    },
    async setCoverDeleteActions({commit},payload){
        try {
            commit("setIsCoverLoadingMutation",true)
            const res = await CoverRepository.delete(payload)
            commit("setIsCoverLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsCoverLoadingMutation",false)
            return e
        }
    },
    setIsCoverFilterActions({commit},payload) {
        commit("setIsCoverFilterMutation",payload);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
