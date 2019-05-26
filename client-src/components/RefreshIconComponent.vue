<template>
    <img v-if="displayRefreshIcon" v-on:click="refreshData" id="settings-icon" src="/images/refresh.png" height="32" width="32">
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: ['displayRefreshIcon'],
    methods: {
        refreshData() {
            this.$emit('refreshData');
        }
    }
})
</script>
