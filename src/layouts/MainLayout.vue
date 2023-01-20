<template>
  <div class="q-pa-md">
    <q-table
      title="Entites"
      :rows="rows"
      :columns="columns"
      row-key="name"
	  virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { setColumns, randomDate, generateConcat, randomName, generatePassword, randomLang, randomNumber } from 'src/setQTable';
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
`))
const rows = [];
for (let i = 0; i < 10000; i++) {
	rows.push({
    _id: generateConcat(),
    _createUser: randomName(),
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
export default {
  setup () {
    return {
      columns,
      rows,
	  pagination: ref({
        rowsPerPage: 0
      })
    }
  }
}
</script>
