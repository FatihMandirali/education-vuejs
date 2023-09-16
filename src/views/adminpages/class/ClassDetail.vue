<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <div class="col-md-3">
                <h6>{{$t("classDetail")}}</h6>
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

                <label>{{ $t("branch") }}</label>
                <select v-model="v$.form.branchId.$model" style="width: 50%" class="form-control">
                  <option v-for="(item,index) in getBranchAllList" v-bind:key="index" :value="item.model.ID">{{item.name}}</option>
                </select>


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
                    <button-loading :is-loading="getClassIsLoading"></button-loading>
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
import {minValue, required} from "@vuelidate/validators";
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
          branchId:0,
          address:"",
          phoneNumber:"",
          isActive:false,
          createdAt:new Date()
        },
    }
  },
  computed: {
    ...mapGetters([
      'getClassDetail',"getClassIsLoading","getBranchAllList"
    ])
  },
  created() {
    this.setBranchAllListActions().then(res=>{
      if(res.data.statusCode === "ERROR"){
        this.toast.error(this.$t(res.data.message), {
          position: "bottom-right",
          timeout: 3000,
        });
        return
      }
    }).catch(error=>{
      console.log(error)
      this.toast.error(this.$t("error"), {
        position: "bottom-right",
        timeout: 3000,
      });
    });

    this.setClassDetailActions(this.$route.params.id).then(res =>{
      if(res.data.statusCode === "ERROR"){
        this.toast.error(this.$t(res.data.message), {
          position: "bottom-right",
          timeout: 3000,
        });
        return
      }
      let response = {
        id:res.data.data.model.ID,
        name:res.data.data.name,
        isActive:res.data.data.isActive,
        createdAt:this.$filters.dateFormat(res.data.data.model.CreatedAt),
        branchId:res.data.data.branch.model.ID
      }
      this.form=response;

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
        createdAt: {
          required,
        },
        branchId: {
          required,
          minValue:minValue(1)
        },
      },
    }
  },
  methods:{
    ...mapActions(["setClassDetailActions","setClassUpdateActions","setBranchAllListActions"]),
    updateSubmit(){
      this.setClassUpdateActions(this.form).then(res =>{
        if(res.statusCode === "ERROR"){
          this.toast.error(this.$t(res.message), {
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
