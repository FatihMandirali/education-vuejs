<template>
  <i class="fa fa-refresh fa-spin" :style={marginRight:marginRight,display:shownComputed}></i>
</template>

<script>
export default {
  name: "ButtonLoading",
  data(){
    return{
      marginRight:"10px",
    }
  },
  computed:{
    shownComputed(){
      return this.isLoading == true ? "inline-block" : "none"
    }
  },
  props:{
    isLoading:{
      type:Boolean
    }
  }
}
</script>

<style scoped>

</style>