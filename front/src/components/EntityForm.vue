<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
      <q-card class="q-dialog-plugin">
        <q-card-section>
          <div v-if="entityStore.editing" class="text-h6 q-mb-md">Редактировать</div>
          <div v-if="!entityStore.editing" class="text-h6 q-mb-md">Новая сущность</div>
          <div class="q-gutter-y-md column">
            <q-input clearable filled v-model="newCreateUser" label="Создал" />
            <q-input clearable filled v-model="newUpdateUser" label="Изменил" />
            <q-input clearable filled v-model="newLogin" label="Login" />
            <q-input clearable filled v-model="newName" label="Name" />
            <q-input clearable filled v-model="newPassword" label="Password" />
            <div class="bg-grey-2 q-pa-sm rounded-borders">
              <div class="text-caption text-grey-7 q-ml-xs">Язык интерфейса</div>
              <q-option-group
                name="language"
                v-model="newLang"
                :options="langOptions"
                color="primary"
                inline
              />
            </div>
            <q-input clearable filled v-model="newLoginsCount" label="Logins count" />
          </div>
        </q-card-section>
        <q-card-actions class="q-ma-sm" align="left">
          <q-btn color="primary" label="Сохранить" @click="onOKClick" />
          <q-btn color="primary" label="Отмена" @click="onDialogCancel" />
          <q-space />
          <q-btn
            v-if="entityStore.editing"
            color="negative"
            icon="delete"
            @click="deleteEntity"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useDialogPluginComponent } from 'quasar'
  import { useEntityStore } from 'src/stores/entityStore';
  
  const entityStore = useEntityStore();
  const props = defineProps({
    rowIndex: Number,
    id: String,
    createUser: String,
    updateUser: String,
    createDt: Date,
    login: String,
    name: String,
    password: String,
    lang: String,
    loginsCount: Number
  });
  let newCreateUser = ref(props.createUser),
      newUpdateUser = ref(props.updateUser),
      newLogin = ref(props.login),
      newName = ref(props.name),
      newPassword = ref(props.password),
      newLang = ref(props.lang),
      newLoginsCount = ref(props.loginsCount);
  defineEmits([
    ...useDialogPluginComponent.emits
  ]);
  const langOptions = [
    {
      label: 'Русский',
      value: 'Ru'
    },
    {
      label: 'Английский',
      value: 'En'
    }
  ]
  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
  const deleteEntity = () => {
    entityStore.deleteEntity(props.rowIndex ?? -1);
    onDialogHide();
  }
  const onOKClick = () => {
    onDialogOK({
      _id: props.id,
      _createUser: newCreateUser.value,
      _updateUser: newUpdateUser.value,
      _createDt: props.createDt || Date.now(),
      _updateDt: Date.now(),
      Login: newLogin.value,
      Name: newName.value,
      Password: newPassword.value,
      Lang: newLang.value,
      LoginsCount: newLoginsCount.value
    });
  }
  </script>