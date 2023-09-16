<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="row">
              <div class="col-md-3">
                <h6>{{ $t("classTable") }}</h6>
              </div>
              <div class="col-md-9">
                <div class="row">
                  <div class="col-md-2">
                  </div>
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
                    <button style="width: 100%" @click="btnNewClass" type="button" class="btn btn-warning btn-sm">
                      <font-awesome-icon size="1x" :icon="faPlus()"/>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div v-if="!getClassIsLoading" class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    {{ $t("name") }}
                  </th>
                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    {{ $t("branch") }}
                  </th>

                  <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    {{ $t("recordDate") }}
                  </th>
                  <th class="text-secondary opacity-7"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in getClassList" v-bind:key="index">
                  <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{ item.name }}</span
                >
                  </td>
                  <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{ item.branch.name }}</span>
                  </td>
                  <td>
                <span class="text-secondary text-xs font-weight-bold"
                >{{ $filters.dateFormat(item.model.CreatedAt) }}</span>
                  </td>
                  <td>
                    <soft-badge v-if="item.isActive" color="success" variant="gradient" size="sm"
                    >{{ $t("active") }}
                    </soft-badge>
                    <soft-badge v-else color="danger" variant="gradient" size="sm"
                    >{{ $t("passive") }}
                    </soft-badge
                    >
                  </td>
                  <td class="align-middle">
                    <font-awesome-icon @click="btnDetail(item.model.ID)" :icon="faInfoCircle()"/>
                    <font-awesome-icon style="color: darkred; margin-left: 10px" @click="btnDelete(item.model.ID)"
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
        :get-admin-list-page="getClassListPage"
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
  name: "class-table",
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
      'getClassList', "getClassIsLoading","getClassListPage","getClassListTotalPage",
    ]),
    btnNextIsDisabled() {
      return this.getClassListTotalPage <= this.getClassListPage
    },
    btnPreviousIsDisabled() {
      return this.getClassListPage <= 1
    },
    btnLastPageColor() {
      return this.getClassListTotalPage <= this.getClassListPage ? "#fbcf32" : "#82d615"
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
    this.setClassListActions(request).then((response) => {
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
    ...mapActions(["setIsAdminFilterActions", "setClassListActions", "setClassDeleteActions"]),
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
      this.setClassListActions(request)
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
        page: isLastPage ? this.getClassListTotalPage : this.getClassListPage + 1
      }
      this.setClassListActions(request).then((response) => {
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
        page: isFirstPage ? 1 : this.getBranchListPage - 1
      }
      this.setClassListActions(request).then((response) => {
        if (response != true) {
          this.toast.error(this.$t(response), {
            position: "bottom-right",
            timeout: 3000,
          });
          return
        }
      })
    },
    btnNewClass() {
      this.$router.push({path: '/class/create'})
    },
    btnDetail(id) {
      this.$router.push({path: `/class/detail/${id}`})
    },
    btnDelete(id) {
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
          this.setClassDeleteActions(id).then((res) => {
            console.log(res)
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
