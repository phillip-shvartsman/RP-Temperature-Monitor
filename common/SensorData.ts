export default class SensorData {
    public id?: number;
    public sensorUid?: string;
    public name?: string;

    public constructor(sensorUid: string) {
        this.sensorUid = sensorUid;
        this.name = sensorUid;
    }
}
