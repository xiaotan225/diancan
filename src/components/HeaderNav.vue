<template>
  <div class="menvnav">
    <ul class="list">
      <slot></slot>
    </ul>
  </div>
</template>
<script>
export default {
  name:'headernav'
};
</script>
<style scoped>
.menvnav .list {
  display: flex;
  background: rgba(225, 225, 225, 0.5);
  height: 60px;
  line-height: 60px;
}

</style>