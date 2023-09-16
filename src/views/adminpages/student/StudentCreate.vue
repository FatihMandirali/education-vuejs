<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <div class="col-md-3">
                <h6>{{ $t("studentCreate") }}</h6>
              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <form @submit.prevent="createSubmit">
              <div class="card-body">
                <label>{{ $t("name") }}</label>
                <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Ad"
                    style="width: 50%"
                    name="name"
                    v-model="v$.form.name.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.name.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <label>{{ $t("surname") }}</label>
                <input
                    class="form-control"
                    id="surname"
                    type="text"
                    placeholder="Soyad"
                    style="width: 50%"
                    name="surname"
                    v-model="v$.form.surname.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.surname.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <label>{{ $t("phoneNumber") }}</label>
                <input
                    class="form-control"
                    id="phoneNumber"
                    type="text"
                    placeholder="5355555555"
                    style="width: 50%"
                    name="phoneNumber"
                    v-model="v$.form.phoneNumber.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.phoneNumber.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <label>{{ $t("email") }}</label>
                <input
                    class="form-control"
                    id="email"
                    type="text"
                    placeholder="Email"
                    style="width: 50%"
                    name="email"
                    v-model="v$.form.email.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <label>{{ $t("password") }}</label>
                <input
                    class="form-control"
                    id="password"
                    type="password"
                    placeholder="Şifre"
                    style="width: 50%"
                    name="password"
                    v-model="v$.form.password.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>

                <label>{{ $t("branch") }}</label>
                <select v-model="v$.form.branch.$model" @change="onChange($event)" style="width: 50%" class="form-control">
                  <option value="0">{{$t("choose")}}</option>
                  <option v-for="(item,index) in getBranchAllList" v-bind:key="index" :value="item.model.ID">{{item.name}}</option>
                </select>
                <div class="input-errors" v-for="(error, index) of v$.form.branch.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>

                <label>{{ $t("class") }}</label>
                <select v-model="v$.form.class.$model" style="width: 50%" class="form-control">
                  <option value="0">{{$t("choose")}}</option>
                  <option v-for="(item,index) in classAllFilterList" v-bind:key="index" :value="item.model.ID">{{item.name}}</option>
                </select>
                <div class="input-errors" v-for="(error, index) of v$.form.class.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>

                <label>{{ $t("cover") }}</label>
                <select v-model="v$.form.cover.$model" style="width: 50%" class="form-control">
                  <option value="0">{{$t("choose")}}</option>
                  <option v-for="(item,index) in getCoverAllList" v-bind:key="index" :value="item.model.ID">{{item.name}} {{item.surnamr}}</option>
                </select>
                <div class="input-errors" v-for="(error, index) of v$.form.cover.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>

                <div class="form-check mt-2">
                  <input class="form-check-input" type="checkbox" v-model="form.isActive" value=""
                         id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    {{ $t("status") }}
                  </label>
                </div>


                <div>
                  <button
                      class="btn btn-success mt-4"
                      variant="gradient"
                      color="success"
                      full-width
                      :disabled="v$.form.$invalid || getIsLoading"
                  >
                    <button-loading :is-loading="getIsLoading"></button-loading>
                    {{ $t("create") }}
                  </button>
                </div>
              </div>
              <div class="px-1 pt-0 text-center card-footer px-lg-2">
                <p class="mx-auto mb-4 text-sm">
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";
import {minValue, required} from "@vuelidate/validators";
import {mapActions, mapGetters, mapMutations} from "vuex";
import { toRaw } from "vue";
import ButtonLoading from "@/components/Loading/ButtonLoading.vue";

export default {
  name: "AdminCreate",
  setup() {
    return {v$: useVuelidate(), toast: useToast()}
  },
  computed: {
    ...mapGetters([
      "getIsLoading","getBranchList","getBranchAllList","classAllFilterList","getClassAllList","getCoverAllList"
    ])
  },
  created() {
    this.setBranchAllListActions().then((response) => {
      if (response.data.statusCode === 'ERROR') {
        this.toast.error(this.$t(response.data.message), {
          position: "bottom-right",
          timeout: 3000,
        });
        return
      }

    });
    this.setClassAllListActions().then((response) => {
      if (response.statusCode === 'ERROR') {
        this.toast.error(this.$t(response.data.message), {
          position: "bottom-right",
          timeout: 3000,
        });
        return
      }

    });
    this.setCoverAllListActions().then((response) => {
      if (response.statusCode === 'ERROR') {
        this.toast.error(this.$t(response.data.message), {
          position: "bottom-right",
          timeout: 3000,
        });
        return
      }

    });
  },
  components: {ButtonLoading},
  data() {
    return {
      form: {
        name: "",
        surname:"",
        phoneNumber:"",
        password:"",
        email:"",
        branch: 0,
        class: 0,
        cover: 0,
        isActive: false
      }
    }
  },
  validations() {
    return {
      form: {
        name: {
          required
        },
        surname: {
          required
        },
        phoneNumber: {
          required
        },
        email: {
          required
        },
        password: {
          required
        },
        branch: {
          required,
          minValue:minValue(1)
        },
        class: {
          required,
          minValue:minValue(1)
        },
        cover: {
          required,
          minValue:minValue(1)
        },
      },
    }
  },
  methods: {
    ...mapActions(["setStudentCreateActions","setBranchAllListActions","setClassAllListActions","setCoverAllListActions"]),
    ...mapMutations(["setClassAllListFilterMutations"]),
    createSubmit() {
      console.log(toRaw(this.form))
      this.setStudentCreateActions(toRaw(this.form)).then(res => {
        if (res.data.statusCode === "ERROR") {
          this.toast.error(this.$t(res.data.message), {
            position: "bottom-right",
            timeout: 3000,
          });
          return
        }
        this.toast.success(this.$t("success"), {
          position: "bottom-right",
          timeout: 3000,
        });
        this.$router.push({path: '/student/list'})
      }).catch(error => {
        console.log(error)
        this.toast.error(this.$t("error"), {
          position: "bottom-right",
          timeout: 3000,
        });
      })
    },
    onChange(event){
      const request={
        id:parseInt(event.target.value),
        allClassList:toRaw(this.getClassAllList)
      }
      this.setClassAllListFilterMutations(request)
    }
  }
}
</script>

<style scoped>

</style>