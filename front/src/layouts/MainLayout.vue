<template>
  <div class="q-pa-md">
    <q-table
      title="Entities"
	  dense
      :rows="entityStore.entities"
      :columns="columns"
      row-key="name"
	  virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
	  @row-click="edit"
    >
	  <template v-slot:top>
		<q-btn round class="q-mt-sm q-mb-xs" color="primary" icon="add" @click="add" />
	  </template>
	</q-table>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { setColumns } from 'src/setQTable';
import { useEntityStore } from 'src/stores/entityStore';
import { useQuasar } from 'quasar';
import EntityForm from 'src/components/EntityForm.vue';
import { Entity } from 'src/Entity';
const columns = setColumns(JSON.parse(`
{
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
}
`));
export default {
    setup() {
		const entityStore = useEntityStore();
		entityStore.fetchEntities();
		const $q = useQuasar();
        return {
			entityStore,
            columns,
            pagination: ref({
                rowsPerPage: 0
            }),
			add() {
				entityStore.isAdding();
				$q.dialog({
					component: EntityForm
				}).onOk((ent) => {
					entityStore.addEntity(ent);
				});
			},
			edit(evt: Event, row: Entity, index: number) {
				entityStore.isEditing();
				$q.dialog({
					component: EntityForm,
					componentProps: {
						rowIndex: index,
						id: row._id,
						createUser: row._createUser,
						updateUser: row._updateUser,
						createDt: row._createDt,
						login: row.Login,
						name: row.Name,
						password: row.Password,
						lang: row.Lang,
						loginsCount: row.LoginsCount
					}
				}).onOk((ent) => {
					entityStore.editEntity(ent, index);
				});
			}
        }
    }
}
</script>
