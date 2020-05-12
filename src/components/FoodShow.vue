<template>
  <div class="hot">
    <Loading v-if="load" :msg="loadcont"></Loading>

    <ul>
      <li v-for="GetGreens in GetGreensData" :key="GetGreens.id">
        <div class="img">
          <img :src="GetGreens.img" alt />
        </div>
        <div class="cont">
          <h4>{{GetGreens.name}}</h4>
          <span class="color">
            RMB
            <strong>{{GetGreens.price}}/元</strong>
          </span>
          <div @click="add(GetGreens)" class="add">+</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Loading from './Loading'

export default {
  components:{
    Loading
  },  
  props: ["name"],
  data() {
    return {
      load: true,
      loadcont: "加载中...",
      signify: "",
      has: "",
      bug: true
    };
  },
  methods: {
    add(GetGreens) {
      this.$axios
        .get("/order.json")
        .then(result => {
          for (let key in result.data) {
            if (result.data[key].name === GetGreens.name) {
              this.has = key;

              this.signify = true;
              break;
            } else {
              this.signify = false;
            }
          }
          return result;
        })
        .then(res => {
          if (this.bug) {
            this.bug = false;
            if (!this.signify) {
              GetGreens.num++;

              this.$axios.post("/order.json", GetGreens).then(res => {});
            }
          } else {
            if (this.signify) {
              GetGreens.num = ++res.data[this.has].num;
              this.$axios
                .put("/order/" + this.has + ".json", GetGreens)
                .then(res => {});
            }
          }
        })
        .catch(err => {
          this.alert = "添加订单失败";
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
        });
    },
    GetData() {
      this.$axios
        .get("/greens.json")
        .then(result => {
          let arr = [];
          for (let key in result.data) {
            result.data[key].id = key;
            arr.push(result.data[key]);
          }

          this.$store.commit("SetGreens", arr);
        })
        .catch(err => {
          this.alert = "获取菜品失败";
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
        });
    }
  },
  beforeUpdate() {
    if (this.GetGreensData.length === 0) {
      this.load = true;
      this.loadcont = "暂无商品";
    } else {
      this.load = false;
    }
  },
  created() {
    this.GetData();
  },
  computed: {
    GetGreensData() {
      return this.$store.getters.GetGreens.filter(item => {
        return item.classify == this.name;
      });
    }
  }
};
</script>
<style scoped>
img {
  width: 300px;
  height: 230px;
  border-radius: 20px 20px 0 0;
}

.hot ul li {
  background-color: #fff;
  float: left;
  margin: 10px 10px;
  border-radius: 20px;
}
.cont {
  position: relative;
  padding: 10px 10px;
  font-size: 12px;
}
.cont h4 {
  margin-bottom: 10px;
  font-size: 16px;
}
.add {
  position: absolute;
  right: 12px;
  top: 13px;
  width: 50px;
  height: 50px;
  background: rgb(131, 131, 131);
  color: #fff;
  text-align: center;
  line-height: 41px;
  font-size: 59px;
  border-radius: 50%;
  cursor: pointer;
}
.color {
  color: rgb(255, 201, 23);
}
strong {
  font-size: 15px;
}

@media screen and (max-width: 768px) {
  img {
    width: 200px;
    height: 150px;
    border-radius: 20px 20px 0 0;
  }
}
@media screen and (max-width: 500px) {
  img {
    width: 150px;
    height: 100px;
    border-radius: 20px 20px 0 0;
  }
  .add {
    position: absolute;
    right: 12px;
    top: 33px;
    width: 30px;
    height: 30px;
    background: rgb(131, 131, 131);
    color: #fff;
    text-align: center;
    line-height: 22px;
    font-size: 39px;
    border-radius: 50%;
    cursor: pointer;
  }
}
@media screen and (max-width: 406px) {
  .img{
    width: 60%;
  }
    img {
    width: 100%;
    height: 100px;
    border-radius: 20px 20px 0 0;
  }
  .hot ul li {
    background-color: #fff;
    display: flex;
    justify-content:space-between;
    margin: 10px 10px;
    border-radius: 20px;
  }
  .color{
   width: 100px;
  }
  .add {
   position: absolute;
    right: 12px;
    top: 70px;
    width: 30px;
    height: 30px;
    background: rgb(131, 131, 131);
    color: #fff;
    text-align: center;
    line-height: 22px;
    font-size: 39px;
    border-radius: 50%;
    cursor: pointer;
  }
}
@media screen and (max-width: 300px) {
  img {
    width: 100px;
    height: 100px;
    border-radius: 20px 20px 0 0;
  }
  .add {
    position: absolute;
    right: 12px;
    top: 69px;
    width: 30px;
    height: 30px;
    background: rgb(131, 131, 131);
    color: #fff;
    text-align: center;
    line-height: 22px;
    font-size: 39px;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>