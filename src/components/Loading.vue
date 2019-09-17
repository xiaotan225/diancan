<template>
    <div class="loading">
        {{msg}}
    </div>
</template>
<script>
export default {
    props:['msg']
}
</script>

<style scoped>
.loading{
    background: rgba(0, 0, 0, 0.5) ;
    position: absolute;
    top: 0 ;
    left: 0;
    bottom: 0;
    right: 0;
    color: #fff;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    
}
</style>