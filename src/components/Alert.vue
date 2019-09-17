<template>
    <div class="alert">
        {{alert}}
    </div>
</template>
<script>
export default {
    props:['alert']
}
</script>
<style scoped>
.alert{
    position: absolute;
    top: 0;
    width: 80%;
    height: 30px;
    text-align: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    line-height: 30px;
    font-size: 18px;
    color: #fff;
}
</style>