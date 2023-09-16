<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <div class="col-md-3">
                <h6>{{$t("branchDetail")}}</h6>
              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <form @submit.prevent="updateSubmit">
              <div class="card-body" >
                <label>{{$t("name")}}</label>
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

                <label>{{$t("phoneNumber")}}</label>
                <input
                    class="form-control"
                    style="width: 50%"
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Telefon Numarası"
                    v-model="v$.form.phoneNumber.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.phoneNumber.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>

                <label>{{$t("address")}}</label>
                <input
                    class="form-control"
                    style="width: 50%"
                    id="email"
                    type="text"
                    placeholder="Adres"
                    name="address"
                    v-model="v$.form.address.$model"
                />
                <div class="input-errors" v-for="(error, index) of v$.form.address.$errors" :key="index">
                  <div class="error-msg">{{ error.$message }}</div>
                </div>

                <label>{{$t("recordDate")}}</label>
                <input
                    class="form-control"
                    style="width: 50%"
                    id="createdAt"
                    type="text"
                    placeholder="Kayıt Tarihi"
                    name="createdAt"
                    v-model="v$.form.createdAt.$model"
                    disabled
                />

                <div class="form-check mt-2">
                  <input class="form-check-input" type="checkbox" v-model="form.isActive" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    {{$t("status")}}
                  </label>
                </div>

                <div>
                  <button
                      type="submit"
                      class="btn btn-success mt-4"
                      variant="gradient"
                      color="success"
                      full-width
                      :disabled="v$.form.$invalid || getIsLoading"
                  >
                    <button-loading :is-loading="getIsLoading"></button-loading>
                    {{$t("update")}}
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
import {required} from "@vuelidate/validators";
import {mapActions, mapGetters} from "vuex";
import ButtonLoading from "@/components/Loading/ButtonLoading.vue";

export default {
  name: "BranchUpdate",
  components: {ButtonLoading},
  setup () {
    return { v$: useVuelidate(),toast:useToast() }
  },
  data(){
    return{
        form:{
          id:0,
          name:"",
          address:"",
          phoneNumber:"",
          isActive:false,
          createdAt:new Date()
        }
    }
  },
  computed: {
    ...mapGetters([
      'getBranchDetail',"getBranchIsLoading"
    ])
  },
  created() {
    this.setBranchDetailActions(this.$route.params.id).then(res =>{
      console.log(res)
      if(res.data.statusCode === "ERROR"){
        this.toast.error(this.$t(res.data.message), {
          position: "bottom-right",
          timeout: 3000,
        });
        return
      }
      let response = {
        id:res.data.model.ID,
        name:res.data.name,
        address:res.data.address,
        phoneNumber:res.data.phoneNumber,
        isActive:res.data.isActive,
        createdAt:this.$filters.dateFormat(res.data.model.CreatedAt),
      }
      this.form=response;
      console.log(this.form)

    }).catch(error=>{
      console.log(error)
      this.toast.error(this.$t("error"), {
        position: "bottom-right",
        timeout: 3000,
      });
    })
  },
  validations() {
    return {
      form: {
        name: {
          required
        },
        address: {
          required
        },
        phoneNumber: {
          required,
        },
        createdAt: {
          required,
        },
      },
    }
  },
  methods:{
    ...mapActions(["setBranchDetailActions","setBranchUpdateActions"]),
    updateSubmit(){

      this.setBranchUpdateActions(this.form).then(res =>{
        console.log(res)
        if(res.statusCode === "ERROR"){
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
      }).catch(error=>{
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
