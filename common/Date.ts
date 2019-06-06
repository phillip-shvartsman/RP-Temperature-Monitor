import moment from 'moment';

export default class Date {
    public year?: number;
    public month?: number;
    public day?: number;

    public constructor() {
        const now = moment();
        this.year = now.year();
        this.month = now.month();
        this.day = now.date();
    }
}
