<template>
    <canvas id="main-chart" width="400" height="400"></canvas>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart, { ChartConfiguration, ChartData, ChartDataSets } from 'chart.js';
import LogEntry from '../../common/LogEntry';

function cleanData(data: LogEntry[]): ChartData {
    const bareData: {t: number, y: number}[] = [];
    for(let i = 0; i < data.length; i++) {
        bareData.push({t: data[i].timeStamp, y: data[i].temp});
    }
    const dataSet: ChartDataSets = {
        label: 'Temperature',
        data: bareData,
        }
    return {datasets: [dataSet] };
}

export default Vue.extend({
    props: ['tempData'],
    data(){
        return {
           logs: {}
        }
    },
    methods : {
        createChart() {
            const canvas = <HTMLCanvasElement> document.getElementById('main-chart');
            const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');
            const data: ChartData = cleanData(this.tempData);
            
            const options: ChartConfiguration = 
            {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'minute'
                            }
                        }]
                    }
                }  
            };
            const chart = new Chart(ctx,options);
        },
    },
    watch: {
        tempData: function(){
            this.createChart();
        }
    }
})
</script>

<style>

</style>

