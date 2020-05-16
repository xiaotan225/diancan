
<template>
  <!-- 注册 -->
  <div class="LoginBox">
    <Alert :alert="alert" v-if="isShow"></Alert>
    <div class="box1">
      <div class="box2">
        <span class="icon iconfont">&#xe621;</span>
        <input type="text" placeholder="用户名" v-model="user.username" />
        <br />
        <span class="icon iconfont">&#xe634;</span>
        <input type="password" placeholder="密码" v-model="user.password" />
        <br />
        <span class="icon iconfont">&#xe634;</span>
        <input type="password" placeholder="确认密码" v-model="affirmpass" @keydown.enter="register" />
        <br />
        <Loading :msg="msg" v-if="IsShowLoading"></Loading>
        <button @click="register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import Alert from "../components/Alert";
export default {
  name: "register",
  components: {
    Loading,
    Alert
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      affirmpass: "",
      msg: "注册中...",
      IsShowLoading: false,
      alert: "",
      isShow: false,
      users: null,
      usernames: []
    };
  },
  methods: {
    getUser() {
      this.$axios
        .get("/user.json")
        .then(result => {
          this.users = result.data;
        })
        .catch(err => {});
    },
    register() {
      // console.log(this.user)
      for (const key in this.users) {
        if (this.users.hasOwnProperty(key)) {
          const val = this.users[key];
          if (val.username === this.user.username) {
            this.alert = "用户名已存在";
            this.isShow = true;

            return;
          }
        }
      }
      if (this.user.username == "" || this.user.password == "") {
        this.alert = "请输入用户名或密码";
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
          this.alert = "";
        }, 2000);
        return;
      } else if (this.user.password !== this.affirmpass) {
        this.alert = "两次密码不相等";
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
          this.alert = "";
        }, 2000);
        return;
      } else {
        this.IsShowLoading = true;
        this.$axios
          .post("/user.json", this.user)
          .then(result => {
            this.$store.commit("SetIsRegisterSuc", true);
            this.IsShowLoading = false;
            this.$router.push({ path: "/login" });
          })
          .catch(err => {});
      }
    }
  },
  computed: {
    IsShowAlert() {
      return this.$store.getters.GetIsRegisterSuc;
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style scoped>
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
    top: 10px;
  }
}
@media screen and (max-width: 346px) { 
  .icon {
    display: none;
  }
}
</style>
