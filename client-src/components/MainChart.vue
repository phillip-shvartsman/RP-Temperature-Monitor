<template>
    <canvas id='main-chart' width='400' height='400'></canvas>
</template>

<script lang='ts'>
import Chart, { ChartConfiguration, ChartData, ChartDataSets } from 'chart.js';
import Vue from 'vue';
import LogEntry from '../../common/LogEntry';
import SensorData from '../../common/SensorData';

function cleanData(data: LogEntry[], currentSensors: SensorData[]): ChartData {
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
            bareData.push({t: logEntry.timeStamp, y: logEntry.temp});
        }
        dataSets.push({label: currentSensor.name as string, data: bareData as Array<{t: number, y: number}>});
    }
    return {datasets: dataSets };
}

export default Vue.extend({
    data() {
        return {
           logs: {},
        };
    },
    methods: {
        createChart() {
            const canvas = document.getElementById('main-chart') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            const data: ChartData = cleanData(this.tempData, this.currentSensors);

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
            const chart = new Chart(ctx, options);
        },
    },
    props: ['tempData', 'currentSensors'],
    watch: {
        tempData() {
            this.createChart();
        },
        currentSensors() {
            this.createChart();
        },
    },
});
</script>

<style>

</style>

