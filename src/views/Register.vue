
<template>
  <!-- 注册 -->
  <div class="LoginBox">
    <Alert :alert="alert" v-if="isShow"></Alert>
    <div class="box1">
      <div class="box2">
        <input type="text" placeholder="用户名" v-model="user.username" />
        <br />
        <input type="password" placeholder="密码" v-model="user.password" />
        <br />
        <input type="password" placeholder="确认密码" v-model="affirmpass" />
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
        password: "",
        
      },
      affirmpass: "",
      msg: "注册中...",
      IsShowLoading: false,
      alert: "",
      isShow: false
    };
  },
  methods: {
    register() {
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
  }
};
</script>

<style scoped>
.LoginBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.LoginBox .box1 {
  text-align: center;
  height: 60%;
  width: 55%;
  background: rgba(225, 225, 225, 0.7);
  border-radius: 10px;
  box-shadow: 1px 3px 0.5px #666;
  padding: 10px 10px;

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
</style>
