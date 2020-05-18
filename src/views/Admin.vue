<template>
  <div class="admin">
    <div class="menvnav">
      <HeaderNav>
        <h2>管理页面</h2>
      </HeaderNav>
    </div>
    <div class="AdminCont">
      <Alert class="al" v-if="isShow" :alert="alert"></Alert>
      <div class="add">
        <div class="title">
          <h3>添加菜品</h3>
        </div>
        <div class="addcont">
          <div>
            菜品：
            <input type="text" v-model="greens.name" />
          </div>
          <div>
            分类：
            <input type="text" v-model="greens.classify" />
          </div>
          <div>
            单价：
            <input type="text" v-model="greens.price" />
          </div>
          <div>
            图片：
            <input type="text" v-model="greens.img" />
          </div>
          <button @click="add">添加</button>
        </div>
      </div>
      <div class="del">
        <div class="title">
          <h3>删除菜品</h3>
        </div>
        <div class="delcont" v-for="(getGreen) in GetGreensData" :key="getGreen.id">
          <h4>{{getGreen.name}}</h4>
          <a href="javascript:;" @click="del(getGreen)">删除</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../components/HeaderNav";
import Alert from "../components/Alert";
import { apiAddGreens, apiGreensDel, apiGreens } from "@/utils/api.js";

export default {
  components: {
    HeaderNav,
    Alert
  },
  data() {
    return {
      greens: {
        name: "",
        classify: "",
        price: "",
        img: "",
        num: 0
      },
      // getGreens: [],
      isShow: false,
      alert: ""
    };
  },
  methods: {
    /* 添加商品 */
    async add() {
      let verify =
        this.greens.name == "" ||
        this.greens.classify == "" ||
        this.greens.price == "" ||
        this.greens.img == "";
      if (verify) {
        this.alert = "请输入以下信息";
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 2000);
        return;
      } else {
        this.alert = "菜品添加中...";
        this.isShow = true;
        try {
          let result = await apiAddGreens(this.greens);
          this.$store.commit("AddGreens", JSON.parse(result.config.data));
          this.greens.name = "";
          this.greens.classify = "";
          this.greens.price = "";
          this.greens.img = "";
          this.alert = "添加成功";
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
        } catch (error) {
          this.alert = "添加失败";
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
        }
      }
    },
    async del(id) {
      try {
        let result = await apiGreensDel(id.id);

        this.alert = "删除成功";
        this.isShow = true;
        this.$store.commit("DelGreens", id);
        setTimeout(() => {
          this.isShow = false;
        }, 2000);
      } catch (error) {
        this.alert = "删除失败";
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 2000);
      }
    },
    async GetData() {
      try {
        let result = await apiGreens();
        let arr = [];
        for (let key in result.data) {
          result.data[key].id = key;
          arr.push(result.data[key]);
        }
        // this.getGreens = arr;
        this.$store.commit("SetGreens", arr);
      } catch (error) {
        this.alert = "获取菜品失败";
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 2000);
      }
    }
  },
  created() {
    this.GetData();
  },
  computed: {
    GetGreensData() {
      return this.$store.getters.GetGreens;
    }
  }
};
</script>


<style  scoped>
.admin {
  height: 100%;
}
.al {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.AdminCont {
  position: relative;
  height: 100%;
  padding-top: 29px;
  font-size: 15px;
  background: rgba(225, 225, 225, 0.8);
}

.title h3 {
  color: #ca6c15;
}
.addcont {
  padding: 10px;
}
.addcont div {
  margin: 10px 0;
}
.addcont input {
  height: 25px;
  width: 200px;
}
.addcont button {
  width: 100px;
  height: 40px;
  position: relative;
  left: 92px;
}

.delcont {
  display: flex;
  padding: 10px;
  width: 250px;
  justify-content: space-between;
}

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

.menvnav .list li a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>