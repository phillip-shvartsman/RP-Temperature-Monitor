import moment from 'moment';


export default class LogEntry {
    public id?: number;
    public sensorUid: string;

    public temp: number;

    public year: number;
    public month: number;
    public day: number;
    public hour: number;
    public minute: number;

    constructor(sensorUid: string, temp: number) {
        this.sensorUid = sensorUid;
        this.temp = temp;

        const now = moment();

        this.year = now.year();
        this.month = now.month();
        this.day = now.daysInMonth();
        this.hour = now.hour();
        this.minute = now.minute();
    }
}
