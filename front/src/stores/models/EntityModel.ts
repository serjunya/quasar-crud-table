import { Model } from 'pinia-orm';

export default class EntityModel extends Model {
    static entity = 'ents';
    static primaryKey = '_id';
    static fields() {
        return {
            _id: this.uid(),
            _createUser: this.string(''),
            _updateUser: this.string(''),
            _createDt: this.string(''),
            _updateDt: this.string(''),
            Login: this.string(''),
            Name: this.string(''),
            Password: this.string(''),
            Lang: this.string(''),
            LoginsCount: this.number(0)
        }
    }
    declare _id: string;
    declare _createUser: string;
    declare _updateUser: string;
    declare _createDt: string;
    declare _updateDt: string;
    declare Login: string;
    declare Name: string
    declare Password: string;
    declare Lang: string;
    declare LoginsCount: number;
}