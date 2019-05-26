import moment from 'moment';


export default class Settings {
    public id?: number;
    public tempUnit: string;

    constructor(tempUnit: string) {
        this.id = 1;
        this.tempUnit = tempUnit;
    }
}
