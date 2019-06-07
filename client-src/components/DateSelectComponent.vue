<template>
    <form>
        <label for='date-select'>Select Date: </label>
        <input type="date" v-model="newDate" id='date-select'>
    </form>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data() {
        return {
            newDate: '' as string,
        };
    },
    props: ['selectedDate'],
    watch: {
        newDate() {
            this.$emit('dateChanged', this.newDate);
        },
    },
});
</script>

<style>

</style>

