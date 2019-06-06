
export default class Settings {
    public id?: number;
    public tempUnit: string;

    public constructor(tempUnit: string) {
        this.id = 1;
        this.tempUnit = tempUnit;
    }
}
