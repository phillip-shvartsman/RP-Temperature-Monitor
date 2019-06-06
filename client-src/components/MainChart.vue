<template>
    <canvas id='main-chart' width='400' height='400'></canvas>
</template>

<script lang='ts'>
import Chart, { ChartConfiguration, ChartData, ChartDataSets } from 'chart.js';
import Vue from 'vue';

import LogEntry from '../../common/LogEntry';
import SensorData from '../../common/SensorData';
import Settings from '../../common/Settings';

import {celsiusToFahrenheit} from '../helperFunctions';

function cleanData(data: LogEntry[], currentSensors: SensorData[], settings: Settings): ChartData {
    // Create a data set for each currently selected sensor.
    const dataSets: ChartDataSets[] = [];
    for (const currentSensor of currentSensors) {
        // Filterout data with the appropriate uid.
        const filtered = data.filter((logEntry, index, logEntries) => {
            return logEntry.sensorUid === currentSensor.sensorUid;
        });
        // Stripout data required for the graph.
        const bareData: Array<{t: number, y: number}> = [];
        for (const logEntry of filtered) {
            if (settings.tempUnit === 'F') {
                bareData.push({t: logEntry.timeStamp, y: celsiusToFahrenheit(logEntry.temp)});
            } else {
                bareData.push({t: logEntry.timeStamp, y: logEntry.temp});
            }
        }
        dataSets.push({label: currentSensor.name as string, data: bareData as Array<{t: number, y: number}>});
    }
    return {datasets: dataSets };
}

export default Vue.extend({
    data() {
        return {
           chart: {} as Chart,
        };
    },
    methods: {
        destroyChart() {
            if (Object.keys(this.chart).length !== 0 ) {
                this.chart.destroy();
            }
        },
        createChart() {
            const canvas = document.getElementById('main-chart') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            const data: ChartData = cleanData(this.tempData, this.currentSensors, this.settings);

            const options: ChartConfiguration = {
                data,
                options: {
                    scales: {
                        xAxes: [{
                            time: {
                                unit: 'minute',
                            },
                            type: 'time',
                        }],
                    },
                },
                type: 'line',
            };
            this.chart = new Chart(ctx, options);
        },
    },
    props: ['tempData', 'currentSensors', 'settings'],
    watch: {
        tempData() {
            this.destroyChart();
            this.createChart();
        },
        currentSensors() {
            this.destroyChart();
            this.createChart();
        },
        settings() {
            this.destroyChart();
            this.createChart();
        },
    },
});
</script>

<style>

</style>

