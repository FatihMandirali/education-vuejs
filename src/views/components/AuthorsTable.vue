<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-md-6">
          <h6>{{$t("adminTable")}}</h6>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-6">
              <input type="text" v-model="search" class="form-control form-control-sm" :placeholder='$t("searchTable")'/>
            </div>
            <div class="col-md-3">
              <button style="width: 100%" @click="searchClick" type="button" class="btn btn-success btn-sm">{{$t("searchTable")}}</button>
            </div>
            <div class="col-md-3">
              <button style="width: 100%" @click="setIsAdminFilterActions(true)" type="button" class="btn btn-info btn-sm">
                {{$t("filter")}}
              </button>
            </div>
            </div>

        </div>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                {{$t("nameSurname")}}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                {{$t("phoneNumber")}}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                {{$t("email")}}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                {{$t("recordDate")}}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                {{$t("status")}}
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.getAdminList" v-bind:key="index">
              <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{item.name}} {{item.surname}}</span
                >
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{item.phoneNumber}}</span>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{item.email}}</span>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{$filters.dateFormat(item.createDate)}}</span>
              </td>
              <td>
                <soft-badge v-if="item.isActive" color="success" variant="gradient" size="sm"
                  >AKTİF</soft-badge>
                <soft-badge v-else color="danger" variant="gradient" size="sm"
                  >PASİF</soft-badge
                >
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <admin-filter
        :class="[
          this.isAdminFilter == true ? 'show' : 'd-none'
      ]"
    />
  </div>
</template>

<script>
import SoftBadge from "@/components/SoftBadge.vue";
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";
import AdminFilter from "@/views/adminpages/admin/components/AdminFilter.vue";
import {mapActions,mapGetters} from "vuex";

export default {
  name: "authors-table",
  setup () {
    return { v$: useVuelidate(),toast:useToast() }
  },
  data() {
    return {
      search:""
    };
  },
  computed: {
    ...mapGetters([
      'isAdminFilter','getAdminList'
    ])
  },
  created() {
    const request={
      search:this.search,
      startDate:"",
      endDate:"",
      isActive:true
    }
    this.setAdminListActions(request).then((response) => {
      if(response != true){
        this.toast.error(this.$t(response), {
          position: "bottom-right",
          timeout: 3000,
        });
        return
      }

    })
  },
  methods:{
    ...mapActions(["setIsAdminFilterActions","setAdminListActions"]),
    searchClick(){
      const request={
        search:this.search,
        startDate:"",
        endDate:"",
        isActive:true
      }
      this.setAdminListActions(request)
          .catch((error) => {
            alert(error)
            this.toast.error(error, {
              position: "bottom-right",
              timeout: 3000,
            });
            return
      })
    },
  },
  components: {
    SoftBadge,AdminFilter
  },
};
</script>
