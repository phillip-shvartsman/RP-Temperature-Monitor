<template>

    <div id='settings' v-show='displaySettings'>
            <h2>Settings</h2>
            <form>
                <label>Temperature Unit</label> <br>
                Fahrenheit<input class='radio-option' type='radio' value='F' v-bind:checked='localSettings.tempUnit==F' v-model='localSettings.tempUnit'><br>
                Celsius<input class='radio-option' type='radio' value='C' v-bind:checked='localSettings.tempUnit==C' v-model='localSettings.tempUnit'><br>
                <button type='button' @click='saveSettings' class='btn btn-primary'>Save</button>
            </form>
            <img src='/images/close.png' v-on:click='closeSettings' id='close-settings-icon' height='32' width='32'>
    </div>

</template>

<script lang='ts'>
import Vue from 'vue';
import Settings from '../../common/Settings';

export default Vue.extend({
    data() {
        return {
            localSettings: this.settings,
        };
    },
    methods: {
        closeSettings() {
            this.$emit('closeSettings');
        },
        saveSettings() {
            this.$emit('saveSettings', this.localSettings);
        },
    },
    props: ['displaySettings', 'settings'],
    watch: {
        settings() {
            this.localSettings = this.settings;
        },
    },
});
</script>


<style>
    #settings {
        z-index: 1050;
        position: fixed;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        background-color: antiquewhite;
        padding: 10px;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -100px;
    }

    .radio-option {
        float:left;
    }
    #close-settings-icon{
        position: absolute;
        top:5px;
        right:5px;
    }
</style>

