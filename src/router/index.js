import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/adminpages/dashboard/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import Profile from "@/views/Profile.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import AdminList from "@/views/adminpages/admin/AdminList.vue";
import AdminCreate from "@/views/adminpages/admin/AdminCreate.vue";
import AdminDetail from "@/views/adminpages/admin/AdminDetail.vue";
import CoverList from "@/views/adminpages/cover/CoverList.vue";
import BranchList from "@/views/adminpages/branch/BranchList.vue";
import {RoleEnum} from "@/enum/roleEnum";
import {jwtDecode} from "@/handlers/jwtDecode";
import {sessionStorageService} from "@/handlers/sessionStorageService";
import BranchDetail from "@/views/adminpages/branch/BranchDetail.vue";
import BranchCreate from "@/views/adminpages/branch/BranchCreate.vue";
import ClassList from "@/views/adminpages/class/ClassList.vue";
import ClassCreate from "@/views/adminpages/class/ClassCreate.vue";
import ClassDetail from "@/views/adminpages/class/ClassDetail.vue";
import StudentList from "@/views/adminpages/student/StudentList.vue";
import StudentCreate from "@/views/adminpages/student/StudentCreate.vue";
import StudentDetail from "@/views/adminpages/student/StudentDetail.vue";

const routes = [
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/admin/list",
    name: "adminTable",
    component: AdminList,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/admin/create",
    name: "adminCreate",
    component: AdminCreate,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/admin/detail/:id",
    name: "adminDetail",
    component: AdminDetail,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/cover/list",
    name: "coverTable",
    component: CoverList,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/branch/list",
    name: "branchTable",
    component: BranchList,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/branch/detail/:id",
    name: "branchDetail",
    component: BranchDetail,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/branch/create",
    name: "branchCreate",
    component: BranchCreate,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/class/list",
    name: "classTable",
    component: ClassList,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/student/list",
    name: "studentTable",
    component: StudentList,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/student/create",
    name: "studentCreate",
    component: StudentCreate,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/student/detail/:id",
    name: "studentDetail",
    component: StudentDetail,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/class/create",
    name: "classCreate",
    component: ClassCreate,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/class/detail/:id",
    name: "classDetail",
    component: ClassDetail,
    meta: { authorize: RoleEnum.Admin }
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  mode:"history"
});
router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const currentRole = jwtDecode.returnGetJwtDecodeRole(sessionStorageService.returnGetAccessToken());
  if (authorize) {
    if (!currentRole || authorize != currentRole) {
      //return next({ path: '/login', query: { returnUrl: to.path } });
      sessionStorageService.returnClearToken();
      return next("/sign-in");
    }
  }

  if(currentRole && to.path =="/sign-in"){
    router.back();
  }else{
    next();
  }

})

export default router;
