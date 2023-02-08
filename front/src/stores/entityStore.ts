import { defineStore } from 'pinia';
import { Entity } from 'src/Entity';
import axios from 'axios'

const rows: Entity[] = [];
export const useEntityStore = defineStore('entityStore', {
    state: () => ({
        entities: rows,
        editing: false
    }),
    actions: {
        async fetchEntities() {
            try {
                const fetchedEnts = await axios.get('http://localhost:3000/api/entities');
                this.entities = fetchedEnts.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        async addEntity(entity: Entity) {
            try {
                const res = await axios.post('http://localhost:3000/api/entities', entity);
                this.entities.push(res.data);
            }
            catch (error) {
                console.log(error);
            }
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