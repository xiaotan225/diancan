<template>
  <div class="App">
    <div>
      <SidebarNav></SidebarNav>
    </div>
    <div class="contbox">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SidebarNav from "./components/SidebarNav";
export default {
  components: {
    SidebarNav
  }
};
</script>
<style >
.contbox {
  width: 100%;
}
.App {
  display: flex;
}
</style>