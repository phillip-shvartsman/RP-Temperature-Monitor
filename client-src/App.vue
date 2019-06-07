<template>
  <div>
    <black-background-component v-if='displaySettings'></black-background-component>
    <div class='container'>
      <refresh-icon-component v-bind:displayRefreshIcon='displayRefreshIcon' @refreshData='getLogs'></refresh-icon-component>
      <settings-icon-component @toggleSettings='showSettings' v-bind:displaySettingsIcon='displaySettingsIcon'></settings-icon-component>
      <date-select-component @dateChanged='changeDate' v-bind:selectedDate="selectedDate"></date-select-component>
      <sensor-select-component @changeSensorName='changeSensorName' @toggleSensor='toggleSensor' v-for='sensorData in sensorsData' v-bind:sensorData='sensorData' v-bind:currentSensors='currentSensors' v-bind:key='sensorData.id'></sensor-select-component>
      <settings-component @closeSettings='closeSettings' @saveSettings='saveSettings' v-bind:settings='settings' v-bind:displaySettings='displaySettings'></settings-component>
      <main-chart-component v-bind:settings='settings' v-bind:currentSensors='currentSensors' v-bind:tempData='tempData'></main-chart-component>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import BlackBackgroundComponent from './components/BlackBackgroundComponent.vue';
import DateSelectComponent from './components/DateSelectComponent.vue';
import MainChartComponent from './components/MainChart.vue';
import RefreshIconComponent from './components/RefreshIconComponent.vue';
import SensorSelectComponent from './components/SensorSelectComponent.vue';
import SettingsComponent from './components/SettingsComponent.vue';
import SettingsIconComponent from './components/SettingsIconComponent.vue';

import {postRequest} from './helperFunctions';

import Date from '../common/Date';
import LogEntry from '../common/LogEntry';
import SensorData from '../common/SensorData';
import Settings from '../common/Settings';

export default Vue.extend({
    data() {
        return {
            currentSensors: [] as SensorData[],
            displayRefreshIcon: true,
            displaySettings: false,
            displaySettingsIcon: true,
            selectedDate: new Date(),
            sensorsData: [] as SensorData[],
            settings: {
                tempUnit: 'F',
            } as Settings,
            tempData: [] as LogEntry[],
        };
    },
    components: {
        BlackBackgroundComponent,
        DateSelectComponent,
        MainChartComponent,
        RefreshIconComponent,
        SensorSelectComponent,
        SettingsComponent,
        SettingsIconComponent,
    },
    methods: {
        async changeDate(newDateString: string) {
            this.selectedDate = new Date(newDateString);
            await this.getLogs();
        },
        async changeSensorName(newName: string, sensorData: SensorData) {
            await postRequest(['sensors', 'rename'], {newName, sensorData});
            await this.getSensorData();
            this.currentSensors = [];
        },
        toggleSensor(checked: boolean, sensorData: SensorData) {
            const id = sensorData.id;
            // Remove incase the sensor already exists.
            this.currentSensors = this.currentSensors.filter((sensorDataTemp, i, sensorsData) => {
                return sensorDataTemp.id !== id;
            });
            if (checked === true) {
                this.currentSensors.push(sensorData);
            }
        },
        showSettings() {
            this.displaySettings = true;
            this.displaySettingsIcon = false;
            this.displayRefreshIcon = false;
        },
        closeSettings() {
            this.displaySettings = false;
            this.displaySettingsIcon = true;
            this.displayRefreshIcon = true;
        },
        async saveSettings(settings: Settings) {
            await postRequest(['settings', 'set'], settings);
            await this.getSettings();
            this.closeSettings();
        },
        async getSettings() {
            const response = await postRequest(['settings', 'get']);
            this.settings = response.data.settings;
        },
        async getLogs() {
            const response = await postRequest(['logs', 'get'], {date: this.selectedDate});
            this.tempData = response.data.log;
        },
        async getSensorData() {
            const response = await postRequest(['sensors', 'get']);
            this.sensorsData = response.data.sensorData;
        },
    },
    async beforeMount() {
        await this.getSettings();
        await this.getLogs();
        await this.getSensorData();
    },
});
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  margin-right: 20%;
  margin-left: 20%;
}
</style>
