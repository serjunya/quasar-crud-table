import { defineStore } from 'pinia';
import { setColumns, setFormInputs } from 'src/setQTable';
import axios from 'axios';
import { Entity } from 'src/Entity';

const metaData = `{
	"properties": [
		{
			"name": "_id",
			"title": "Идентификатор объекта",
			"nullable": false,
			"dataType": "string"
		},
		{
			"name": "_createUser",
			"title": "Имя пользователя, создавшего элемент",
			"dataType": "string",
			"nullable": false,
			"defaultValue": ""
		},
		{
			"name": "_createDt",
			"title": "Дата и время создания элемента",
			"className": "_sysElement",
			"nullable": false,
			"dataType": "Date"
		},
		{
			"description": "Имя пользователя, изменившего элемент",
			"name": "_updateUser",
			"title": "Изменил",
			"className": "_sysElement",
			"dataType": "string"
		},
		{
			"name": "_updateDt",
			"title": "Дата и время обновления элемента",
			"className": "_sysElement",
			"dataType": "Date"
		},
		{
			"name": "Login",
			"title": "Login",
			"className": "User",
			"summary.ru": "Логин",
			"dataType": "string"
		},
		{
			"name": "Name",
			"title": "Name",
			"className": "User",
			"summary.ru": "Имя",
			"nullable": false,
			"dataType": "string",
			"maxLength": 150
		},
		{
			"name": "Password",
			"title": "Password",
			"className": "User",
			"summary.ru": "Пароль",
			"dataType": "password",
			"defaultValue": ""
		},
		{
			"name": "Lang",
			"title": "User Language",
			"className": "User",
			"summary.ru": "Язык пользователя",
			"dataType": "string",
			"defaultValue": ""
		},
		{
			"name": "LoginsCount",
			"title": "Logins Count",
			"className": "User",
			"summary.ru": "Количество логинов",
			"dataType": "number",
			"defaultValue": 0
		}
	],
	"name": "User",
	"title": "Пользователь"
}`
const rows: Entity[] = [];
const columns = setColumns(JSON.parse(metaData));
const inputs = setFormInputs(JSON.parse(metaData));
export const useEntityStore = defineStore('entityStore', {
    state: () => ({
        entities: rows,
        columns,
        inputs,
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
            }
            catch (error) {
                console.log(error);
            }
        },
        async deleteEntity(id: string) {
            try {
                await axios.delete(`http://localhost:3000/api/entities/${id}`);
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