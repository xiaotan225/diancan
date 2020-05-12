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
    /* background: rgba(0, 0, 0, 0.5) ; */
   
    color: #000;
    display: flex;
    align-items: center;
    justify-content:center;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    
}
</style>