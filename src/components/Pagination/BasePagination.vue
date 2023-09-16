<template>
  <div>
    <div class="row">
      <div class="col-md-9">
      </div>
      <div class="col-md-3">
        <nav style="float: right" aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button :disabled="btnPreviousIsDisabled" class="page-link" @click="btnPreviousPage(true)">
                <span aria-hidden="true">ı&laquo;</span>
              </button>
            </li>
            <li class="page-item">
              <button :disabled="btnPreviousIsDisabled" class="page-link" @click="btnPreviousPage(false)">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li class="page-item">
              <button class="page-link" :style={backgroundColor:btnLastPageColor,color:pageTextColor}>
                {{ getAdminListPage }}
              </button>
            </li>
            <li class="page-item">
              <button :disabled="btnNextIsDisabled" class="page-link" @click="btnNextPage(false)">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
            <li class="page-item">
              <button :disabled="btnNextIsDisabled" class="page-link" @click="btnNextPage(true)">
                <span aria-hidden="true">&raquo;ı</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "BasePagination",
  data(){
    return{
    }
  },
  props: {
    btnPreviousIsDisabled: {
      type: Boolean,
    },
    getAdminListPage: {
      type: Object,
    },
    btnNextIsDisabled: {
      type: Boolean,
    },
    btnNextPage: {
      type: Function,
    },
    btnPreviousPage: {
      type: Function,
    },
    btnLastPageColor: {
      type: String,
    },
    pageTextColor: {
      type: String,
    },
  }
}
</script>

<style scoped>

</style>