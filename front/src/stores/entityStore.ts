import { defineStore } from 'pinia';
import { Entity, setColumns, setFormInputs } from 'src/utils/setQTable';
import axios from 'axios';
import { useRepo } from 'pinia-orm'
import EntityModel from 'src/stores/models/EntityModel'

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
}`,	  entRepo = useRepo(EntityModel),
	  entities: Entity[] = [],
	  columns = setColumns(JSON.parse(metaData)),
	  inputs = setFormInputs(JSON.parse(metaData)),
	  currentEntity: Entity = {};
export const useEntityStore = defineStore('entityStore', {
    state: () => ({
        entities,
        columns,
        inputs,
		currentEntity,
		selectedRow: -1,
		drawer: false,
		loading: false
    }),
    actions: {
        async fetchEntities() {
            try {
                const fetchedEnts = await axios.get('http://localhost:3000/api/entities');
				entRepo.save(fetchedEnts.data);
				this.entities = entRepo.all();
            }
            catch (error) {
                console.log(error);
            }
        },
        async addEntity(entity: Entity) {
            try {
                const res = await axios.post('http://localhost:3000/api/entities', entity);
				const newEnt = res.data;
				entRepo.save(newEnt);
				this.entities.push(newEnt);
            }
            catch (error) {
                console.log(error);
            }
        },
        async editEntity(entity: Entity) {
            try {
                await axios.put(`http://localhost:3000/api/entities/edit/${entity._id}`,
				entity);
				entRepo.save(entity);
				this.entities[this.selectedRow] = entity;
            }
            catch (error) {
                console.log(error);
            }
        },
        async deleteEntity(id: string) {
            try {
                await axios.delete(`http://localhost:3000/api/entities/${id}`);
				entRepo.destroy(id);
				this.entities.splice(this.selectedRow, 1);
            }
            catch (error) {
                console.log(error);
            }
        },
		showDrawer() {
			this.drawer = true;
		},
		hideDrawer() {
			this.drawer = false;
		},
		pullCurrentEnt() {
			this.currentEntity = this.entities[this.selectedRow];
		},
		setCurrentEnt(entity: Entity) {
			this.currentEntity = entity;
		}
    }
});