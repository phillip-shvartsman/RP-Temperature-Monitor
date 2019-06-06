<template>
    <div class='sensor-select'>
        <form class='toggle-display'>
            <input type='checkbox' id='checkbox' v-model='checked'>
        </form>
        <div class='custom-tooltip'>{{sensorData.name}}
            <span class='custom-tooltiptext'>Uid:{{sensorData.sensorUid}}</span>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue';
export default Vue.extend({
    props: ['sensorData'],
    data() {
        return {
            checked: false as boolean,
        };
    },
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

