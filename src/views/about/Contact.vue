<template>
  <div class="intro">
    <div class="container">
      <section>
        <h3>联系方式</h3>
        <div class="cnot">
          <div>●&nbsp;手机号:&nbsp;15506624783</div>
          <div>●&nbsp;Email:&nbsp;2254301565@qq.com</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.intro {
  width: 100%;
  max-width: 1000px;
  padding: 20px 0 20px 20px;
  margin: 20px auto;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.15);
  background: url("../../assets/bg1.jpg");
  color: #3f1c1c;
  font-size: 14px;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
}
.container h3 {
  margin-left: -20px;
  padding-left: 15px;
  border-left: 5px solid #8fe3d5;
  text-align: left;
  font-size: 14px;
}
section {
  margin-bottom: 30px;
  display: block;
}
section .cnot {
  border: 2px solid transparent;
  border-radius: 5px;
  background-color: #f5f5f5;
  padding: 10px 10px;
  margin-top: 30px;
}

section .cnot .message {
  display: flex;
  justify-content: space-between;
}
section .cnot div {
  margin-bottom: 10px;
}
a {
  font-size: 14px;
}

/* 窗口宽度<640,设计宽度=480 */
@media screen and (max-width: 704px) {
  section .cnot .message {
    display: flex;
    flex-direction: column;
    background: red;
  }
}
/* 窗口宽度<480,设计宽度=320 */
@media screen and (max-width: 479px) {
  .container{
    font-size: 12px;
  }
 

}
</style>