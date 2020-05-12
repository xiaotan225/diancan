<template>
  <div class="LoginBox">
    <Loading :msg="msg" class="syl" v-if="Login"></Loading>
    <Alert :alert="alert" v-if="IsShowAlert || isShow"></Alert>
    <div class="box1">
      <div class="box2">
        <!-- <label>用户名：</label> -->
        <input type="text" placeholder="用户名" v-model="user.username" />
        <br />
        <!-- <label>密码：</label> -->
        <input type="password" placeholder="密码" v-model="user.password" />
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
.syl{
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
  background: rgba(225, 225, 225, 0.7);
  border-radius: 10px;
  box-shadow: 1px 3px 0.5px #666;
  padding: 10px 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.LoginBox .box2 {
  width: 100%;
}

.LoginBox div input {
  height: 43px;
  width: 50%;
  font-size: 15px;
  margin: 20px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.LoginBox div button {
  width: 100px;
  height: 50px;
}

/* 登录结束 */

/* 窗口宽度<768,设计宽度=640 */
@media screen and (max-width: 767px) {
  .LoginBox .box1 {
    height: 44%;
    width: 81%;
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
  .LoginBox .box1 {
    height: 44%;
    width: 81%;
  }
  .LoginBox div input {
    height: 30px;
    width: 97%;
    margin: 10px 0;
  }
  .LoginBox div button {
    width: 86px;
    height: 38px;
  }
}
</style>
