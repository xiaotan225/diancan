<template>
  <div>
<FoodShow :name="name"></FoodShow>
  </div>
</template>
<script>
import FoodShow from '../../components/FoodShow'
export default {
  components:{
    FoodShow
  },
  data(){
    return {
      name:'汤'
    }
  }
}
</script>