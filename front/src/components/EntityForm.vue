<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
      <q-card class="q-dialog-plugin">
        <q-card-section>
          <div class="row">
            <div v-if="entityStore.editing" class="text-h6">Редактировать</div>
            <div v-if="!entityStore.editing" class="text-h6">Новая сущность</div>
            <q-space />
            <q-btn round color="primary" icon="shuffle" @click="randomize" />
          </div>
        </q-card-section>
        <q-separator  />
        <q-form @submit="onOKClick">
          <q-card-section>
          <div class="q-gutter-y-md column">
            <q-input
              clearable
              filled
              v-model="newCreateUser"
              label="Создал"
              lazy-rules
              :rules="[ val => !!val || 'Введите данные' ]"
            />
            <q-input
              clearable
              filled
              v-model="newUpdateUser"
              label="Изменил"
              lazy-rules
              :rules="[ val => !!val || 'Введите данные' ]"
            />
            <q-input
              clearable
              filled
              v-model="newLogin"
              label="Login"
              lazy-rules
              :rules="[ val => !!val || 'Введите данные' ]"
            />
            <q-input
              clearable
              filled
              v-model="newName"
              label="Name"
              lazy-rules
              :rules="[ val => !!val || 'Введите данные' ]"
            />
            <q-input
              clearable
              filled
              v-model="newPassword"
              label="Password"
              lazy-rules
              :rules="[ val => !!val || 'Введите данные' ]"
            />
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
            <q-input
              clearable
              filled
              v-model="newLoginsCount"
              label="Logins count"
              lazy-rules
              :rules="[ val => !!val && Number.isInteger(+val) || 'Введите целое число' ]"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="q-ma-sm" align="left">
          <q-btn color="primary" type="submit" label="Сохранить"/>
          <q-btn color="primary" label="Отмена" @click="onDialogCancel" />
          <q-space />
          <q-btn
            v-if="entityStore.editing"
            color="negative"
            icon="delete"
            @click="deleteEntity"
          />
        </q-card-actions>
        </q-form>

      </q-card>
    </q-dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useDialogPluginComponent } from 'quasar'
  import { useEntityStore } from 'src/stores/entityStore';
  import { generateConcat, generateText, randomNumber, generatePassword, randomLang, randomName } from 'src/setQTable';
  
  const entityStore = useEntityStore();
  const props = defineProps({
    id: String,
    createUser: String,
    updateUser: String,
    createDt: String,
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
      newLang = !!props.lang ? ref(props.lang) : ref('Ru'),
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
    entityStore.deleteEntity(props.id ?? '');
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
  const randomize = () => {
    newCreateUser.value = generateConcat(),
    newUpdateUser = ref(generateConcat()),
    newLogin = ref(generateText()),
    newName = ref(randomName()),
    newPassword = ref(generatePassword()),
    newLang = ref(randomLang()),
    newLoginsCount = ref(randomNumber());
  }
  </script>