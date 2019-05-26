<template>
  <div class="container">
    <refresh-icon-component v-bind:displayRefreshIcon="displayRefreshIcon" @refreshData="refreshData"></refresh-icon-component>
    <settings-icon-component @toggleSettings="showSettings" v-bind:displaySettingsIcon="displaySettingsIcon"></settings-icon-component>
    <settings-component @closeSettings="closeSettings" @saveSettings="saveSettings" v-bind:tempUnit="tempUnit" v-bind:displaySettings="displaySettings"></settings-component>
    <main-chart-component v-bind:tempData="tempData"></main-chart-component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SettingsComponent from './components/SettingsComponent.vue';
import SettingsIconComponent from './components/SettingsIconComponent.vue';
import MainChartComponent from './components/MainChart.vue';
import RefreshIconComponent from './components/RefreshIconComponent.vue'
import {postRequest} from './helperFunctions';
import Settings from '../common/Settings';

export default Vue.extend({
   data() {
    return {
      displaySettings: false,
      displayRefreshIcon: true,
      displaySettingsIcon: true,
      tempUnit: 'F',
      tempData: {},
    }
  },
  components: {
    SettingsIconComponent,
    SettingsComponent,
    MainChartComponent,
    RefreshIconComponent,
  },
  methods: {
    showSettings() {
      this.displaySettings = true;
      this.displaySettingsIcon = false;
      this.displayRefreshIcon =false;
    },
    closeSettings() {
      this.displaySettings = false;
      this.displaySettingsIcon = true;
      this.displayRefreshIcon = true;
    },
    async saveSettings(settings: Settings) {
      const response = await postRequest(['settings','set'], settings);
      await this.getSettings();
      this.closeSettings();
    },
    async getSettings(){
      const response = await postRequest(['settings','get']);
      this.tempUnit = response.data.tempUnit;
    },
    async getTodayLog(){
      const response = await postRequest(['logs','get','today']);
      this.tempData = response.data.log;
    },
    async refreshData(){
      await this.getTodayLog();
    }
  },
  async beforeMount(){
    await this.getSettings();
    await this.getTodayLog();
  },
})
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
</style>
