import Repository from "@/repositories/repositoryFactory";
const AuthenticationRepository = Repository.get("authentications");

const state  = {
    loginResponse: {},

}

const getters = {
    getLoginResponseGetter(state){
        return state.loginResponse
    },
}

const mutations = {
    setLoginResponseMutations(state,payload){
        state.loginResponse=payload;
    },

}

const actions = {
     async setLoginResponseActions({commit},payload){
            try {
                const res = await AuthenticationRepository.post(payload)
                commit("setLoginResponseMutations",res);
                return res
            }catch (e) {
                return e
            }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
