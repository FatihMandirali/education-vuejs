<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <div class="col-md-3">
                <h6>{{ $t("adminCreate") }}</h6>
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
                    style="width: 50%"
                    id="surname"
                    type="text"
                    placeholder="Soyad"
                    name="surname"
                    v-model="v$.form.surname.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.surname.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>

                <label>{{ $t("phoneNumber") }}</label>
                <input
                    class="form-control"
                    style="width: 50%"
                    id="phoneNumber"
                    type="tel"
                    placeholder="5333333333"
                    name="phoneNumber"
                    v-model="v$.form.phoneNumber.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.phoneNumber.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>

                <label>{{ $t("email") }}</label>
                <input
                    class="form-control"
                    style="width: 50%"
                    id="email"
                    type="text"
                    placeholder="Email"
                    name="email"
                    v-model="v$.form.email.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>

                <label>{{ $t("password") }}</label>
                <input
                    class="form-control"
                    style="width: 50%"
                    id="password"
                    type="password"
                    placeholder="Şifre"
                    name="password"
                    v-model="v$.form.password.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
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
import {email, minLength, required} from "@vuelidate/validators";
import {mapActions, mapGetters} from "vuex";
import ButtonLoading from "@/components/Loading/ButtonLoading.vue";

export default {
  name: "AdminCreate",
  setup() {
    return {v$: useVuelidate(), toast: useToast()}
  },
  computed: {
    ...mapGetters([
      "getIsLoading"
    ])
  },
  components: {ButtonLoading},
  data() {
    return {
      form: {
        name: "",
        surname: "",
        password: "",
        email: "",
        phoneNumber: "",
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
        password: {
          required,
          min: minLength(6)
        },
        email: {
          required,
          email
        },
        phoneNumber: {
          required,
        },
      },
    }
  },
  methods: {
    ...mapActions(["setAdminCreateActions"]),
    createSubmit() {
      const request = {
        name: this.form.name,
        surname: this.form.surname,
        email: this.form.email,
        phoneNumber: this.form.phoneNumber,
        password: this.form.password,
        isActive: this.form.isActive
      }
      this.setAdminCreateActions(request).then(res => {
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
        this.$router.push({path: '/admin/list'})
      }).catch(error => {
        console.log(error)
        this.toast.error(this.$t("error"), {
          position: "bottom-right",
          timeout: 3000,
        });
      })
    }
  }
}
</script>

<style scoped>

</style>