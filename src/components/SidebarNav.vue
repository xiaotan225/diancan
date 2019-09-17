<template>
  <div>
    <div class="container">
      <!-- 侧边导航开始 -->
      <div class="SidebarNav">
        <div class="LoginText" v-if="!IsLoginSuc.IsLogin">
          <router-link to="/login" exact>登录</router-link>
          <router-link to="/register">注册</router-link>
        </div>
        <div class="UserBox" v-if="IsLoginSuc.IsLogin">
          <span>{{IsLoginSuc.UserName}}</span>
          <a href="javascript:;" @click="remove">退出</a>
        </div>
        <div class="nav">
          <ul>
            <li>
              <router-link to="/" exact>主页</router-link>
            </li>
            <li @click="menu">
              <router-link to="/menu">菜单</router-link>
            </li>
            <li>
              <router-link to="/order">订单</router-link>
            </li>
            <li>
              <router-link to="/admin">管理</router-link>
            </li>
            <li class="finally" @click="about">
              <router-link to="/about">关于</router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 侧边导航结束 -->
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    menu() {
      this.$router.push("/menu/hot");
    },
    about() {
      this.$router.push("/about/intro");
    },
    remove() {
      localStorage.removeItem("IsLogin");
      localStorage.removeItem("UserName");
      this.$store.commit("SetIsLoginSuc", { IsLogin: false });
      this.$router.push('/login')
    }
  },
  computed: {
    IsLoginSuc() {
      return this.$store.getters.GetIsLoginSuc;
    }
  },
  created() {
    let IsLogin = localStorage.getItem("IsLogin");
    let UserName = localStorage.getItem("UserName");

    let IsLoginSuc = {
      IsLogin,
      UserName
    };
    if (IsLoginSuc) {
      this.$store.commit("SetIsLoginSuc", IsLoginSuc);
    } else {
      this.$store.commit("SetIsLoginSuc", { IsLogin: false });
    }
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: #000;
  display: inline-block;
  font-size: 18px;
}

ul {
  list-style: none;
}

table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 1;
  border-spacing: 0;
}

table td {
  word-break: break-all;
  word-wrap: break-word;
  border-right: 1px solid #939598;
  border-bottom: 1px solid #939598;
  font: 500 14px Arial;
}

/*背景模糊*/
html,
body {
  width: 100%;
  height: 100%;
}

body {
  background: url("../assets/bg.jpg") no-repeat;
  
  background-size: 100%, 100%;
    /* background:url('../assets/bg1.jpg'); */
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
}

/* 侧边导航开始 */
.SidebarNav {
  padding-top: 50px;
  height: 100%;
  width: 130px;
  text-align: center;
}

.SidebarNav .nav {
  height: 90%;
}

.SidebarNav .nav ul {
  height: 90%;
  display: none;
}

.SidebarNav .nav ul {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}

.SidebarNav .nav ul li a {
  height: 30%;
  width: 100%;
  line-height: 100px;
  border-bottom: 1px solid #000;
}

.SidebarNav .nav ul li.finally {
  border-bottom: none;
}

/* 侧边导航结束 */

.active {
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
}
.SidebarNav .nav li:hover {
  background: rgba(0, 0, 0, 0.2);
}
.LoginText {
  display: flex;
  width: 100%;
  align-items: stretch;
  justify-content: space-around;
}

.LoginText a {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.UserBox span {
  margin: 0 5px;
  font-size: 18px;
}
.UserBox a {
  font-size: 15px;
}
</style>
