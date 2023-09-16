<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <div class="col-md-3">
                <h6>{{ $t("classCreate") }}</h6>
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

                <label>{{ $t("branch") }}</label>
                <select v-model="v$.form.branch.$model" style="width: 50%" class="form-control">
                  <option value="0">{{$t("choose")}}</option>
                  <option v-for="(item,index) in getBranchAllList" v-bind:key="index" :value="item.model.ID">{{item.name}}</option>
                </select>
                <div class="input-errors" v-for="(error, index) of v$.form.branch.$errors" :key="index">
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
import {mapActions, mapGetters} from "vuex";
import ButtonLoading from "@/components/Loading/ButtonLoading.vue";

export default {
  name: "AdminCreate",
  setup() {
    return {v$: useVuelidate(), toast: useToast()}
  },
  computed: {
    ...mapGetters([
      "getIsLoading","getBranchList","getBranchAllList"
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

    })
  },
  components: {ButtonLoading},
  data() {
    return {
      form: {
        name: "",
        branch: 0,
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
        branch: {
          required,
          minValue:minValue(1)
        },
      },
    }
  },
  methods: {
    ...mapActions(["setClassCreateActions","setBranchAllListActions"]),
    createSubmit() {
      const request = {
        name: this.form.name,
        branchId: this.form.branch,
        isActive: this.form.isActive
      }
      console.log(request)
      this.setClassCreateActions(request).then(res => {
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
        this.$router.push({path: '/class/list'})
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