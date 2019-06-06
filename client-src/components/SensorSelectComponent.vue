<template>
    <div class='sensor-select'>
        <form v-show='!waitingForNameChange' class='toggle-display'>
            <input type='checkbox' id='checkbox' v-model='checked'>
        </form>
        <div v-show='!waitingForNameChange' v-on:click="changeName" class='custom-tooltip'>{{sensorData.name}}
            <span class='custom-tooltiptext'>Uid:{{sensorData.sensorUid}}</span>
        </div>
        <input v-model="newName" v-show='waitingForNameChange' v-on:blur="cancel" v-on:keyup.esc="cancel" v-on:keyup.enter="sendNewName" type="text" :placeholder="sensorData.name">
    </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import SensorData from '../../common/SensorData';

export default Vue.extend({
    data() {
        return {
            checked: false as boolean,
            newName: '' as string,
            waitingForNameChange: false as boolean,
        };
    },
    methods: {
        cancel() {
            this.waitingForNameChange = false;
        },
        changeName() {
            this.waitingForNameChange = true;
        },
        sendNewName() {
            this.$emit('changeSensorName', this.newName, this.sensorData);
            this.waitingForNameChange = false;
            this.checked = false;
        },
    },
    props: ['sensorData'],
    watch: {
        checked() {
            this.$emit('toggleSensor', this.checked, this.sensorData);
        },
    },
});
</script>

<style>
    .sensor-select {
        display: inline-block;
    }
    .sensor-select .toggle-display {
        float: left;
    }
    .custom-tooltip {
        position: relative;
        display: inline-block;
    }
    .custom-tooltip .custom-tooltiptext {
        top: 100%;
        visibility: hidden;
        background-color: black;
        color: #fff;
        text-align: center;
        padding: 5px;
        border-radius: 8px;
        
        /* Position the tooltip text - see examples below! */
        position: absolute;
        z-index: 1;
    }
    .custom-tooltip:hover .custom-tooltiptext {
        visibility: visible;
    }

</style>

