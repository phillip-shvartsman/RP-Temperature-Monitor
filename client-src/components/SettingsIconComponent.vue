<template>
    <img v-if='displaySettingsIcon' v-on:click='showSettings' id='settings-icon' src='/images/settings.png' height='32' width='32'>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
    methods: {
        showSettings() {
            this.$emit('toggleSettings');
        },
    },
    props: ['displaySettingsIcon'],
})
export default class App extends Vue {}
</script>

<style>
    #settings-icon {
        float:right;
    }
    #setting-icon:hover {
        cursor: pointer;
    }
</style>


