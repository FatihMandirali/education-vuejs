<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <form @submit.prevent="signIn">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-success text-gradient">
                   {{$t("welcome")}}
                  </h3>
                  <p class="mb-0">{{$t("welcomeInfo")}}</p>
                </div>
                <div class="card-body" >
                    <label>{{$t("email")}}</label>
                  <input
                      class="form-control"
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      v-model="v$.form.email.$model"
                  />
                  <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                    <label>{{$t("password")}}</label>
                    <input
                      class="form-control"
                      id="password"
                      type="password"
                      placeholder="Password"
                      name="password"
                      v-model="v$.form.password.$model"
                    />
                  <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                    <div class="text-center">
                      <soft-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        full-width
                        :disabled="v$.form.$invalid"
                        >{{$t("signIn")}}
                      </soft-button>
                    </div>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                  </p>
                </div>
                </form>

              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved9.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import SoftButton from "@/components/SoftButton.vue";
const body = document.getElementsByTagName("body")[0];
import {mapActions, mapMutations} from "vuex";
import {required, minLength, email} from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";
import {sessionStorageService} from "@/handlers/sessionStorageService";
import {jwtDecode} from "@/handlers/jwtDecode";
import {RoleEnum} from "@/enum/roleEnum";
import router from "@/router";

export default {
  name: "SignIn",
  setup () {
    return { v$: useVuelidate(),toast:useToast() }
  },
  data(){
    return{
      form:{
        email:"",
        password:""
      }
    }
  },
  validations() {
    return {
      form: {
        email: {
          required,email
        },
        password: {
          required,
          min: minLength(6)
        },
      },
    }
  },
  components: {
    Navbar,
    AppFooter,
    SoftButton,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    ...mapActions(["setLoginResponseActions"]),
    signIn(){
      const request={
        email: this.form.email,
        password: this.form.password
      }
      this.setLoginResponseActions(request).then((response) => {
        if(response.statusCode !== "SUCCESS"){
          this.toast.error(this.$t(response), {
            position: "bottom-right",
            timeout: 3000,
          });
          return
        }
        sessionStorageService.returnSetAccessToken(response.data);
        const role = jwtDecode.returnGetJwtDecodeRole(sessionStorageService.returnGetAccessToken());
        if(role === RoleEnum.Admin){
          router.replace("/");
        }else if( role === RoleEnum.Teacher){
          router.replace("/teacher/dashboard");
        }else if( role === RoleEnum.Cover){
          router.replace("/cover/dashboard");
        }else if( role === RoleEnum.Student){
          router.replace("/student/dashboard");
        }else{
          router.replace("/sign-in");
        }
        this.toast.success(this.$t("signInSuccess"), {
          position: "bottom-right",
          timeout: 3000,
        });
      })
    }
  },
};
</script>
