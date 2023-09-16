<template>
  <div class="fixed-plugin">
    <a
      class="px-3 py-2 fixed-plugin-button text-dark position-fixed"
      @click="toggle"
    >
      <i class="py-2 fa fa-cog"> </i>
    </a>
    <div class="shadow-lg card blur">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="float-start">
          <h5 class="mt-3 mb-0">{{$t("adminTable")}}</h5>
          <p>{{$t("filter")}}</p>
        </div>
        <div class="mt-4 float-end" @click="setIsAdminFilterActions(false)">
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <!-- End Toggle Button -->
      </div>
      <hr class="my-1 horizontal dark" />
      <div>
        <label>{{$t("startDate")}}</label>
        <input
            class="form-control"
            id="startDate"
            type="datetime-local"
            placeholder="Başlangıç Tarihi"
            name="startDate"
            v-model="startDate"
        />
        <br>
        <label>{{$t("endDate")}}</label>
        <input
            class="form-control"
            id="startDate"
            type="datetime-local"
            placeholder="Başlangıç Tarihi"
            name="startDate"
            v-model="endDate"
        />
        <br>
        <div class="form-check form-check-inline">
          <input class="form-check-input" v-model="isActive" type="checkbox" id="inlineCheckbox1" value="option1">
          <label class="form-check-label" for="inlineCheckbox1">{{$t("active")}}</label>
        </div>
        <br>
        <br>
        <div class="text-center">
          <div class="col-md-12">
            <button style="width: 100%" @click="btnFilter" type="button" class="btn btn-success btn-sm" :disabled="getIsLoading">
              <button-loading :is-loading="getIsLoading"></button-loading>
              {{$t("filter")}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ButtonLoading from "@/components/Loading/ButtonLoading.vue";

export default {
  name: "adminFilter",
  data() {
    return {
      startDate:"",
      endDate:"",
      isActive:false
    };
  },
  components:{
    ButtonLoading
  },
  methods: {
    ...mapActions(["setIsAdminFilterActions","setAdminListActions"]),
    btnFilter(){
      const request={
        search:"",
        startDate:this.startDate+":00Z",
        endDate:this.endDate+":00Z",
        isActive:this.isActive,
        page:1
      }
      this.setAdminListActions(request).then(res =>{
        console.log(res)
      });
    },
    sidenavTypeOnResize() {
      let transparent = document.querySelector("#btn-transparent");
      let white = document.querySelector("#btn-white");
      if (window.innerWidth < 1200) {
        transparent.classList.add("disabled");
        white.classList.add("disabled");
      } else {
        transparent.classList.remove("disabled");
        white.classList.remove("disabled");
      }
    },
  },
  computed: {
    ...mapGetters([
      "getIsLoading"
    ])
  },
  beforeMount() {
    window.addEventListener("resize", this.sidenavTypeOnResize);
    window.addEventListener("load", this.sidenavTypeOnResize);
  },
};
</script>
