<template>
    <div class="col align-self-end" id="settings" v-if="displaySettings">
        <div class="row">
            <form>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Settings</label>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Temperature Unit</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="F" v-bind:checked="localTempUnit=='F'" v-model="localTempUnit">
                    <label class="form-check-label"> Fahrenheit </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="C" v-bind:checked="localTempUnit=='C'" v-model="localTempUnit">
                    <label class="form-check-label"> Celsius </label>
                </div>
                <button type="button" @click="saveSettings" class="btn btn-primary">Save</button>
            </form>
            <img src="/images/close.png" v-on:click="closeSettings" id="close-settings-icon" height="32" width="32">
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Settings from '../../common/Settings';

export default Vue.extend({
    props:['displaySettings','tempUnit'],
    data() {
        return {
            localTempUnit: this.tempUnit,
        }   
    },
    methods: {
        closeSettings: function(){
            this.$emit('closeSettings');
        },
        saveSettings(){
            const settings = new Settings(this.localTempUnit);
            this.$emit('saveSettings',settings);
        },
    },
    watch: {
        tempUnit: function(){
            this.localTempUnit = this.tempUnit;
        },
    }
})
</script>


<style>
    #settings {
        z-index: 1050;
    }
    #settings-close-icon {
        float: right;
    }
</style>

