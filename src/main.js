/**
=========================================================
* Vue Soft UI Dashboard - v3.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-soft-ui-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";
import { createI18n } from "vue-i18n";
import en from './locale/en.json'
import tr from './locale/tr.json'
import {sessionStorageService} from "@/handlers/sessionStorageService";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "../src/assets/css/main.css"
import VueSweetalert2 from 'vue-sweetalert2';
const appInstance = createApp(App);
const lang = sessionStorageService.returnGetLanguage() || "tr";
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: lang,
    fallbackLocale: "tr",
    availableLocales: ["en", "tr"],
    messages: {en:en,tr:tr},
});


appInstance.config.globalProperties.$filters={
    dateFormat(value){
        const date = new Date(value)
        return date.toLocaleString('en-GB', {
            hour12: false,
        })
    }
}

appInstance.use(Toast);
appInstance.use(VueSweetalert2);
appInstance.use(i18n);
appInstance.use(store);
appInstance.use(router);
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
