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
        async editEntity(entity: Entity) {
            try {
                await axios.put(`http://localhost:3000/api/entities/edit/${entity._id}`, entity);
                window.location.reload();
            }
            catch (error) {
                console.log(error);
            }
        },
        async deleteEntity(id: string) {
            try {
                await axios.delete(`http://localhost:3000/api/entities/${id}`);
                window.location.reload();
            }
            catch (error) {
                console.log(error);
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