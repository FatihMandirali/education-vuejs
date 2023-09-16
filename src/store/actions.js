export const toggleSidebarColor=({ commit }, payload)=> {
    commit("sidebarType", payload);
};
export const setCardBackground=({ commit }, payload)=> {
    commit("cardBackground", payload);
};