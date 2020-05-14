<template>
  <div class="intro">
    <div class="container">
      <section>
        <h3>个人信息</h3>
        <div class="cnot">
          <div class="message">
            <div>●&nbsp;张潭潭&nbsp;|&nbsp;男&nbsp;|&nbsp;2001</div>
            <div>●&nbsp;大专&nbsp;|&nbsp;山东蓝翔技师学院&nbsp;|&nbsp;计算机系</div>
            <div>●&nbsp;期望职位：Web高级前端</div>
          </div>
          <div>
            ● Github:&nbsp;
            <a href="https://github.com/xiaotan225">https://github.com/xiaotan225</a>
          </div>
        </div>
      </section>
      <section>
        <section>
   <!-- html+css+javascript+vue+vuerouter+axios -->
          <h3>技能掌握</h3>
          <div class="cnot">
            <div>
              <div>●&nbsp;基础部分:&nbsp;Html/Css/JavaScript/Ajax</div>
              <div>●&nbsp;前端框架:&nbsp;Vue全家桶</div>
              <div>●&nbsp;前端相关工具:&nbsp;Git/Npm/Webpack/Ps/Less</div>
              <div>●&nbsp;后端相关语言:&nbsp;Node/PHP</div>
            </div>
          </div>
        </section>
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
 margin: 20px auto;
  padding: 0 20px 20px  20px;
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
  margin-top: 30px;
  display: block;
}
section .cnot {
 
  border: 2px solid transparent;
  border-radius: 5px;
  background-color: #f5f5f5;
  padding: 10px 10px;
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
  }
}
/* 窗口宽度<480,设计宽度=320 */
@media screen and (max-width: 479px) {
  .container{
    font-size: 12px;
  }
  .cnot a{
    font-size: 12px;
  }

}
</style>