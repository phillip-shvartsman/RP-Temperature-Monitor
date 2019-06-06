<template>
    <div id='black-background'></div>
</template>

<script lang='ts'>
import Vue from 'vue';
export default Vue.extend({
    props: ['displayBlackBackground'],
});
</script>

<style>
    #black-background {
        position: fixed;
        top: 0px;
        bottom: 0px;
        background-color: black;
        opacity: 0.8;
        width: 100%;
        height: 100%;
        z-index:1040;
    }
</style>
