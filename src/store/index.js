import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import * as mutations from "./mutatios";
import * as actions from "./actions";
import admin from "./modules/adminStore";
import authentication from "./modules/authenticationStore";
import branch from "./modules/branchStore";
import classStore from "./modules/classStore";
import student from "./modules/studentStore";
import cover from "./modules/coverStore";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    color: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    bootstrap,
  },
  mutations: mutations,
  actions: actions,
  getters: {},
  modules:{
    admin,
    authentication,
    branch,
    classStore,
    student,
    cover
  }

});
