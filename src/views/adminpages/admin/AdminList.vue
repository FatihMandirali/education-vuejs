<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <div class="col-md-3">
                <h6>{{ $t("adminTable") }}</h6>
              </div>
              <div class="col-md-9">
                <div class="row">
                  <div class="col-md-6">
                    <input type="text" v-model="search" class="form-control form-control-sm"
                           :placeholder='$t("searchTable")'/>
                  </div>
                  <div class="col-md-2">
                    <button style="width: 100%;" @click="searchClick" type="button" class="btn btn-success btn-sm">
                      <font-awesome-icon size="1x" :icon="faSearch()"/>
                    </button>
                  </div>
                  <div class="col-md-2">
                    <button style="width: 100%" @click="setIsAdminFilterActions(true)" type="button"
                            class="btn btn-info btn-sm">
                      <font-awesome-icon size="1x" :icon="faFilter()"/>
                    </button>
                  </div>
                  <div class="col-md-2">
                    <button style="width: 100%" @click="btnNewAdmin" type="button" class="btn btn-warning btn-sm">
                      <font-awesome-icon size="1x" :icon="faPlus()"/>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div v-if="!getIsLoading" class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    {{ $t("nameSurname") }}
                  </th>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    {{ $t("phoneNumber") }}
                  </th>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    {{ $t("email") }}
                  </th>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    {{ $t("recordDate") }}
                  </th>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    {{ $t("status") }}
                  </th>
                  <th class="text-secondary opacity-7"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in this.getAdminList" v-bind:key="index">
                  <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{ item.name }} {{ item.surname }}</span
                >
                  </td>
                  <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{ item.phoneNumber }}</span>
                  </td>
                  <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{ item.email }}</span>
                  </td>
                  <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{ $filters.dateFormat(item.createDate) }}</span>
                  </td>
                  <td>
                    <soft-badge v-if="item.isActive" color="success" variant="gradient" size="sm"
                    >AKTİF
                    </soft-badge>
                    <soft-badge v-else color="danger" variant="gradient" size="sm"
                    >PASİF
                    </soft-badge
                    >
                  </td>
                  <td class="align-middle">
                    <font-awesome-icon @click="btnDetail(item.id)" :icon="faInfoCircle()"/>
                    <font-awesome-icon style="color: darkred; margin-left: 10px" @click="btnDelete(item.id)"
                                       :icon="faRemove()"/>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <page-loading v-else></page-loading>
          </div>
          <admin-filter
              :class="[
          this.isAdminFilter == true ? 'show' : 'd-none'
      ]"
          />
        </div>
      </div>
    </div>
    <base-pagination
        :btn-last-page-color="btnLastPageColor"
        :btn-next-is-disabled="btnNextIsDisabled"
        :btn-next-page="btnNextPage"
        :btn-previous-is-disabled="btnPreviousIsDisabled"
        :btn-previous-page="btnPreviousPage"
        :get-admin-list-page="getAdminListPage"
        :page-text-color="pageTextColor"


    ></base-pagination>
  </div>
</template>

<script>
import SoftBadge from "@/components/SoftBadge.vue";
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";
import AdminFilter from "@/views/adminpages/admin/components/AdminFilter.vue";
import {mapActions, mapGetters} from "vuex";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faFilter, faInfoCircle, faPlus, faRemove, faSearch} from "@fortawesome/free-solid-svg-icons";
import 'sweetalert2/dist/sweetalert2.min.css';
import BasePagination from "@/components/Pagination/BasePagination.vue";
import PageLoading from "@/components/Loading/PageLoading.vue";

export default {
  name: "authors-table",
  setup() {
    return {v$: useVuelidate(), toast: useToast()}
  },
  data() {
    return {
      search: "",
      pageColor: "#82d615",
      pageTextColor: "white"
    };
  },
  computed: {
    ...mapGetters([
      'isAdminFilter', 'getAdminList', 'getAdminListTotalPage', 'getAdminListPage', "getIsLoading"
    ]),
    btnNextIsDisabled() {
      return this.getAdminListTotalPage <= this.getAdminListPage
    },
    btnPreviousIsDisabled() {
      return this.getAdminListPage <= 1
    },
    btnLastPageColor() {
      return this.getAdminListTotalPage <= this.getAdminListPage ? "#fbcf32" : "#82d615"
    }
  },
  created() {
    const request = {
      search: this.search,
      startDate: "",
      endDate: "",
      isActive: true,
      page: 1
    }
    this.setAdminListActions(request).then((response) => {
      if (response != true) {
        this.toast.error(this.$t(response), {
          position: "bottom-right",
          timeout: 3000,
        });
        return
      }

    })
  },
  methods: {
    ...mapActions(["setIsAdminFilterActions", "setAdminListActions", "setAdminDeleteActions"]),
    faRemove() {
      return faRemove
    },
    faInfoCircle() {
      return faInfoCircle
    },
    faPlus() {
      return faPlus
    },
    faFilter() {
      return faFilter
    },
    faSearch() {
      return faSearch
    },
    searchClick() {
      const request = {
        search: this.search,
        startDate: "",
        endDate: "",
        isActive: true,
        page: 1
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
    btnNextPage(isLastPage) {
      const request = {
        search: this.search,
        startDate: "",
        endDate: "",
        isActive: true,
        page: isLastPage ? this.getAdminListTotalPage : this.getAdminListPage + 1
      }
      this.setAdminListActions(request).then((response) => {
        if (response != true) {
          this.toast.error(this.$t(response), {
            position: "bottom-right",
            timeout: 3000,
          });
          return
        }

      })
    },
    btnPreviousPage(isFirstPage) {
      const request = {
        search: this.search,
        startDate: "",
        endDate: "",
        isActive: true,
        page: isFirstPage ? 1 : this.getAdminListPage - 1
      }
      this.setAdminListActions(request).then((response) => {
        if (response != true) {
          this.toast.error(this.$t(response), {
            position: "bottom-right",
            timeout: 3000,
          });
          return
        }
      })
    },
    btnNewAdmin() {
      this.$router.push({path: '/admin/create'})
    },
    btnDetail(id) {
      this.$router.push({path: `/admin/detail/${id}`})
    },
    btnDelete(id) {
      console.log(id)
      this.$swal.fire({
        title: this.$t("deletePopupTitle"),
        text: this.$t("deletePopupText"),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.$t("deletePopupSuccessBtn"),
        cancelButtonText: this.$t("deletePopupCancelBtn"),
      }).then((result) => {
        if (result.isConfirmed) {
          this.setAdminDeleteActions(id).then(() => {
            this.toast.success(this.$t("success"), {
              position: "bottom-right",
              timeout: 3000,
            });
            location.reload()
          }).catch(err => {
            console.log(err)
            this.toast.error(this.$t("error"), {
              position: "bottom-right",
              timeout: 3000,
            });
          })


        }
      })

    },
  },
  components: {
    PageLoading,
    BasePagination,
    SoftBadge, AdminFilter, FontAwesomeIcon
  },
};
</script>
