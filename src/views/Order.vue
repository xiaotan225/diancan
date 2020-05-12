<template>
  <div class="vessel">
    <div class="menvnav">
      <HeaderNav>
        <h2>订单页面</h2>
      </HeaderNav>
    </div>

    <div class="Order">
      <div>
        <div class="OrderHeader">
          <span>单号：{{numbers}}</span>
          <button @click="submit">提交订单</button>
        </div>
        <div class="Orderbody">
          <div class="OrderTitle">
            <ul>
              <li>序号</li>
              <li>菜名</li>
              <li>单价</li>
              <li>数量</li>
              <li>价格</li>
              <li>种类</li>
              <li>删除</li>
            </ul>
          </div>
          <Loading v-if="load" :msg="loadcont"></Loading>

          <div class="OrderCont">
            <ul v-for="(order, index) in orderData" :key="index">
              <li>{{index+1}}</li>
              <li class="name">{{order.name}}</li>
              <li class="ts">{{order.price | flite}}</li>
              <li>
                <button class="btn" @click="minus(order,index)">-</button>
                <input type="text" :value="order.num" @change="inpu(order,index)" id="in" />
                <button class="btn" @click="add(order)">+</button>
              </li>
              <li class="ts" id="jg">{{order.price * order.num | flite}}</li>
              <li>{{order.classify }}</li>
              <li>
                <button class="del" @click="del(order,index)">删除</button>
              </li>
            </ul>
            <ul v-if="isShow">
              <div>暂无数据</div>
            </ul>
          </div>

          <div class="cls" v-if="clsIsShow">
            <button @click="cls">一键清除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNav from "../components/HeaderNav";
import Loading from '../components/Loading'
export default {
  components: {
    HeaderNav,
    Loading
  },
  data() {
    return {
      clsIsShow: false,
      isShow: false,
      numbers: parseInt(Math.random() * 10000),
      load: true,
      loadcont: "加载中...",
    };
  },
  methods: {
    submit() {
      this.$axios.post("/submit.json", this.orderData).then(res => {
        this.cls();
        alert("提交成功");
      });
    },
    add(item) {
      item.num++;
      this.$axios
        .put("/order/" + item.has + ".json", item)
        .then(res => {})
        .catch(err => {});
    },
    minus(item, index) {
      item.num--;
      if (item.num <= 1) {
        this.del(item, index);
      } else {
        this.$axios
          .put("/order/" + item.has + ".json", item)
          .then(res => {})
          .catch(err => {});
      }
    },
    inpu(item, index) {
      var cn = document.getElementsByTagName("input");

      var val = "";

      for (let i = 0; i < cn.length; i++) {
        if (i === index) {
          val = cn[i].value;
        }
      }

      if (val.startsWith("-")) {
        alert("错误");
      } else {
        item.num = val;
        this.$axios.put("/order/" + item.has + ".json", item).then(res => {});
      }
    },
    del(item, index) {
      this.$axios
        .delete("/order/" + item.has + ".json", item)
        .then(res => {
          this.$store.commit("DeltorderData", index);
        })
        .catch(err => {});
    },
    cls() {
      this.$axios.delete("/order.json").then(res => {
        this.$store.commit("SettorderData", []);
      });
    }
  },
  filters: {
    flite(data) {
      let num = parseInt(data);
      return num.toFixed(2);
    }
  },
  created() {
    this.$axios
      .get("/order.json")
      .then(result => {
        let myarr = [];
        for (let key in result.data) {
          result.data[key].has = key;
          myarr.push(result.data[key]);
        }
        this.load = false
        // this.orderData = myarr;
        this.$store.commit("SettorderData", myarr);
      })
      .catch(err => {});
  },
  beforeUpdate() {
    if (this.orderData.length > 0) {
      this.clsIsShow = true;
      this.isShow = false;
    } else {
      this.clsIsShow = false;
      this.isShow = true;
    }
  },
  computed: {
    orderData() {
      return this.$store.getters.GetorderData;
    }
  }
};
</script>

<style scoped>
.vessel {
  height: 80%;
}
.Order {
  height: 80%;
  display: table;
  margin: 10px auto;
}
.OrderHeader {
  display: flex;
  width: 750px;
  height: 50px;
  background-color: #816b58;
  justify-content: space-between;
  padding: 0 10px;
  line-height: 50px;
  border-radius: 5px 5px 0 0;
  font-size: 18px;
}
.Orderbody {
  background-color: #fff;
  padding: 10px 0;
  border-radius: 0 0 5px 5px;
}
.OrderHeader button {
  width: 100px;
  height: 35px;
  margin-top: 7px;
  color: #816b58;
  font-size: 18px;
  -webkit-box-shadow: 1px 1px 1px #000;
  box-shadow: 1px 1px 2.5px #000;
}
.OrderTitle {
  width: 770px;
}
.OrderTitle ul {
  height: 35px;
  line-height: 35px;
  text-align: center;
  display: table;

  color: #716052;
  font-size: 16px;
}
.OrderTitle ul li {
  width: 110px;
  display: table-cell;
}
.OrderTitle ul li:nth-child(4) {
  flex: 0.2;
}
.OrderCont {
  width: 770px;
}
.OrderCont ul {
  height: 50px;
  text-align: center;
  display: table;
  width: 100%;
  line-height: 50px;
  border-bottom: 1px dotted #716052;
}

.OrderCont ul li .btn {
  width: 20px;
}
.OrderCont ul li .del {
  width: 50px;
}
.OrderCont ul li input {
  width: 45px;
  text-align: center;
}
.OrderCont ul li {
  width: 110px;
  display: table-cell;
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
.cls {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
.cls button {
  width: 100px;
  height: 35px;
  background-color: red;
  border: 1px solid #ccc;
  color: #fff;
  box-shadow: 1px 1px 1px #ccc;
  margin-right: 10px;
}

/* 窗口宽度<960,设计宽度=768 */
@media screen and (max-width: 959px) {
  .OrderCont {
    width: 700px;
  }
  .OrderTitle {
    width: 700px;
  }
  .OrderHeader {
    width: 700px;
  }
}
/* 窗口宽度<768,设计宽度=640 */
@media screen and (max-width: 767px) {
  .OrderCont {
    width: 550px;
  }
  .OrderTitle {
    width: 550px;
  }
  .OrderHeader {
    width: 550px;
  }
  .vessel {
    font-size: 15px;
  }
  .OrderCont ul li input {
    width: 33px;
  }
  .OrderCont ul li {
    width: 80px;
  }
}
/* 窗口宽度<640,设计宽度=480 */
@media screen and (max-width: 639px) {
  .OrderCont {
    width: 450px;
  }
  .OrderTitle {
    width: 450px;
  }
  .OrderTitle li {
    font-size: 15px;
  }
  .OrderHeader {
    width: 450px;
  }
  .vessel {
    font-size: 13px;
  }
  .OrderCont ul li input {
    width: 17px;
  }
  .OrderCont ul li {
    width: 58px;
  }
}
/* 窗口宽度<480,设计宽度=320 */
@media screen and (max-width: 479px) {
  .OrderCont {
    width: 280px;
  }
  .OrderTitle {
    width: 280px;
  }
  .OrderTitle li {
    font-size: 15px;
  }
  .OrderHeader {
    width: 280px;
  }
  .vessel {
    font-size: 10px;
  }
  .OrderCont ul li input {
    width: 4px;
  }
  .OrderCont ul li {
    width: 58px;
  }
  .OrderCont ul li .btn {
    width: 10px;
  }
  .OrderHeader button {
    font-size: 15px;
  }
  .name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100px;
  }
}
</style>