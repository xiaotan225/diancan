<template>
  <div class="LoginBox">
    <Loading :msg="msg" class="syl" v-if="Login"></Loading>
    <Alert :alert="alert" v-if="IsShowAlert || isShow"></Alert>
    <div class="box1">
      <div class="box2">
        <!-- <label>用户名：</label> -->
        <span class="icon iconfont">&#xe621;</span><input type="text" placeholder="用户名" v-model="user.username" />
        <br />
        <!-- <label>密码：</label> -->
        <span class="icon iconfont">&#xe634;</span><input type="password" placeholder="密码" v-model="user.password" @keydown.enter="login"/>
        <br />

        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "../components/Alert";
import Loading from "../components/Loading";
export default {
  name: "login",
  components: {
    Alert,
    Loading
  },
  data() {
    return {
      alert: "注册成功",
      msg: "登录中...",
      user: {
        username: "",
        password: ""
      },
      isShow: false,
      alertlogin: "",
      isLogin: false,
      Login: false
    };
  },
  methods: {
    login() {
      if (this.user.username == "" || this.user.password == "") {
        this.alert = "请输入用户名或密码";
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
          this.alertlogin = "";
        }, 2000);
        return;
      } else {
        this.Login = true;
        this.$axios
          .get("/user.json")
          .then(result => {
            this.Login = false;
            let keys = Object.keys(result.data);
            for (let key of keys) {
              let user = result.data[key];
              if (
                user.username === this.user.username &&
                user.password === this.user.password
              ) {
                localStorage.setItem("IsLogin", true);
                localStorage.setItem("UserName", this.user.username);
                this.$store.commit("SetIsLoginSuc", {
                  IsLogin: true,
                  UserName: this.user.username
                });
                this.isLogin = true;
                this.$router.push("/menu/hot");
                break;
              }
            }
            if (!this.isLogin) {
              this.alert = "用户名或密码错误";
              this.isShow = true;
              setTimeout(() => {
                this.isShow = false;
                this.alertlogin = "";
              }, 2000);
              this.isLogin = false;
            }
          })
          .catch(err => {});
      }
    }
  },
  created() {
    setTimeout(() => {
      this.$store.commit("SetIsRegisterSuc", false);
    }, 2000);
  },
  computed: {
    IsShowAlert() {
      return this.$store.getters.GetIsRegisterSuc;
    }
  }
};
</script>

<style scoped>
/* 登录开始 */
/* 登录开始 */
.icon {
  padding: 0 10px;
  color: #fff;
}
.syl {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.LoginBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.LoginBox .box1 {
  text-align: center;
  height: 60%;
  width: 55%;
  /* background: rgba(225, 225, 225, 0.7); */
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  /* box-shadow: 1px 3px 0.5px #666; */
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.LoginBox .box2 {
  width: 100%;
}

.LoginBox div input {
  width: 50%;
  font-size: 18px;
  margin: 30px 0;
  color: #fff;
  border-bottom: 2px solid #fff;
  padding: 5px 0;
}
input::-webkit-input-placeholder {
  color: #ccc;
}
input {
  background: none;
  outline: none;
  border: none;
}
.LoginBox div button {
  width: 250px;
  height: 40px;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  color: #fff;
  font-size: 19px;
  border-radius: 20px;
}

/* 登录结束 */

/* 窗口宽度<768,设计宽度=640 */
@media screen and (max-width: 767px) {
  .LoginBox .box1 {
    height: 50%;
    width: 81%;
  }
  .LoginBox .box1 {
    padding-bottom: 30px;
  }
}
/* 窗口宽度<640,设计宽度=480 */
@media screen and (max-width: 639px) {
  .LoginBox .box1 {
    height: 44%;
    width: 81%;
  }
}
/* 窗口宽度<480,设计宽度=320 */
@media screen and (max-width: 479px) {
  .icon {
    padding: 0 10px;
    display: inline-flex;
    position: relative;
    top: 5px;
    right: 11px;
  }
  .LoginBox .box1 {
    width: 88%;
  }
  .LoginBox div input {
    width: 85%;
    margin: 10px 0;
  }
  .LoginBox div button {
    width: 140px;
    height: 38px;
    position: relative;
    top: 22px;
  }
}
@media screen and (max-width: 346px) { 
  .icon {
    display: none;
  }
}
</style>
