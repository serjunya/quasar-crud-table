import { defineStore } from 'pinia';
import { Entity } from 'src/types';

//---------------------------------------------УБРАТЬ
import {
	randomDate,
	generateConcat,
	randomName,
	generatePassword,
	randomLang,
	randomNumber,
	generateText
} from 'src/setQTable';

const rows: Entity[] = [];
for (let i = 0; i < 8; i++) {
	rows.push({
    _id: generateConcat(),
    _createUser: generateText(),
    _createDt: randomDate(),
    _updateUser: generateConcat(),
    _updateDt: randomDate(),
    Login: generateConcat(),
    Name: randomName(),
    Password: generatePassword(),
    Lang: randomLang(),
    LoginsCount: randomNumber()
  })
}
//---------------------------------------------УБРАТЬ

export const useEntityStore = defineStore('entityStore', {
    state: () => ({
        entities: rows,
        editing: false
    }),
    actions: {
        addEntity(entity: Entity) {
            this.entities.push(entity);
        },
        editEntity(entity: Entity, index: number) {
            this.entities[index] = entity;
        },
        deleteEntity(index: number) {
            if (index >= 0) {
                this.entities.splice(index, 1);
            }
        },
        isEditing() {
            this.editing = true;
        },
        isAdding() {
            this.editing = false;
        }
    }
});