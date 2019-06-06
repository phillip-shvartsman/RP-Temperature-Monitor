<template>
    <img v-if='displayRefreshIcon' v-on:click='refreshData' id='settings-icon' src='/images/refresh.png' height='32' width='32'>
</template>

<script lang='ts'>
import Vue from 'vue';
export default Vue.extend({
    methods: {
        refreshData() {
            this.$emit('refreshData');
        },
    },
    props: ['displayRefreshIcon'],
});
</script>
