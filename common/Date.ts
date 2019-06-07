import moment from 'moment';

export default class Date {
    public year: number;
    public month: number;
    public day: number;

    public constructor(dateString?: string) {
        if (dateString === undefined) {
            const now = moment();
            this.year = now.year();
            this.month = now.month();
            this.day = now.date();
        } else {
            const split = dateString.split('-');
            this.year = parseInt(split[0], 10);
            this.month = parseInt(split[1], 10) - 1;
            this.day = parseInt(split[2], 10);
        }
    }

    public outputDateString() {
        let monthString: string;
        if (this.month < 10) {
            monthString = '0' + this.month.toString();
        } else {
            monthString = this.month.toString();
        }
        let dayString: string;
        if (this.day < 10) {
            dayString = '0' + this.month.toString();
        } else {
            dayString = this.month.toString();
        }
        return this.year.toString() + '-' + monthString + '-' + dayString;
    }
}
