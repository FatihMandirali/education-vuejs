import Repository from "@/repositories/repositoryFactory";
const StudentRepository = Repository.get("student");

const state  = {
    page:1,
    limit:process.env.VUE_APP_PAG_LIMIT,
    totalPage:1,
    counter: 0,
    studentList: [],
    student:{},
    isStudentFilter:false,
    isStudentLoading:false
}

const getters = {
    isStudentFilter(state){
        return state.isStudentFilter
    },
    getStudentList(state){
        return state.studentList
    },
    getStudentDetail(state){
        return state.student
    },
    getStudentListTotalPage(state){
        return state.totalPage
    },
    getStudentListPage(state){
        return state.page
    },
    getStudentIsLoading(state){
        return state.isStudentLoading
    }
}

const mutations = {
    setStudentListMutations(state,payload){
        state.studentList=payload;
    },
    setIsStudentFilterMutation(state,payload){
        console.log(state,payload)
        state.isStudentFilter=payload;
    },
    setStudentDetailMutation(state,payload){
        state.student=payload;
    },
    setStudentListPaginationMutation(state,payload){
        state.page=payload.page;
        state.totalPage=payload.total_page
    },
    setIsStudentLoadingMutation(state,payload){
        state.isStudentLoading=payload
    }

}

const actions = {
    async setStudentListActions({commit},payload){
        try {
            commit("setIsStudentLoadingMutation",true)
            const res = await StudentRepository.getStudentList(payload.search,payload.startDate,payload.endDate,payload.isActive,state.limit,payload.page,payload.isRecord,payload.branch)
            console.log(res);
            commit("setStudentListMutations",res.data.records);
            const pagination={
                page:res.data.page,
                total_page:res.data.total_page
            }
            commit("setStudentListPaginationMutation",pagination);
            commit("setIsStudentLoadingMutation",false)
            return true
        }catch (e) {
            commit("setIsStudentLoadingMutation",false)
            return e
        }
    },
    async setStudentCreateActions({commit},payload){
        try {
            commit("setIsStudentLoadingMutation",true)
            const res = await StudentRepository.create(payload)
            commit("setIsStudentLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsStudentLoadingMutation",false)
            return e
        }
    },
    async setStudentUpdateActions({commit},payload){
        try {
            console.log(payload)
            commit("setIsStudentLoadingMutation",true)
            const res = await StudentRepository.update(payload)
            console.log(res)
            commit("setIsStudentLoadingMutation",false)
            return res
        }catch (e) {
            console.log(e);
            commit("setIsStudentLoadingMutation",false)
            return e
        }
    },
    async setStudentDetailActions({commit},payload){
        try {
            console.log(payload)
            commit("setIsStudentLoadingMutation",true)
            const res = await StudentRepository.getDetail(payload)
            console.log(res)
            commit("setStudentDetailMutation",res.data)
            commit("setIsStudentLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsStudentLoadingMutation",false)
            return e
        }
    },
    async setStudentDeleteActions({commit},payload){
        try {
            commit("setIsStudentLoadingMutation",true)
            const res = await StudentRepository.delete(payload)
            commit("setIsStudentLoadingMutation",false)
            return res
        }catch (e) {
            commit("setIsStudentLoadingMutation",false)
            return e
        }
    },
    setIsStudentFilterActions({commit},payload) {
        commit("setIsStudentFilterMutation",payload);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
