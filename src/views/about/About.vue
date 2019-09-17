<template>
  <div class="about">
    <div class="menvnav">
      <HeaderNav>
        <li>
          <router-link to="/about/intro" active-class="linkactive">个人简介</router-link>
        </li>
        <li>
          <router-link to="/about/contact" active-class="linkactive">联系我</router-link>
        </li>
      </HeaderNav>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../../components/HeaderNav";
export default {
  components: {
    HeaderNav
  }
};
</script>

<style  scoped>
.menvnav .list {
  display: flex;
  justify-content: space-around;
  background-color: rgb(55, 235, 241);
  height: 60px;
  line-height: 60px;
}
.menvnav .list li {
  width: 100%;
  text-align: center;
}
.menvnav .list li:hover {
  background: rgba(225, 225, 225, 0.6);
}
.menvnav .list li a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.linkactive {
  color: #fff;
  background: rgb(0, 0, 0, 0.5);
}
</style>