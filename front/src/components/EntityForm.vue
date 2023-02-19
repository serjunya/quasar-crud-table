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
                  v-for="input in entityStore.inputs"
                  clearable
                  filled
                  :stack-label=input.stack_label
                  :type=input.type
                  :key=input.model
                  v-model=models[input.model].value
                  :label=input.label
                  lazy-rules
                  :rules=input.rules
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
  import {
    generateConcat,
    generateText,
    randomNumber,
    generatePassword,
    randomLang,
    randomName,
    entityTemplate
  } from 'src/setQTable';
  const entityStore = useEntityStore();

  const props = defineProps(Object.fromEntries(entityTemplate.entries()));

  const modelsMap: Map<string, any> = new Map;
  for (const model of Array.from(entityTemplate.keys())) {
    modelsMap.set(model, ref(props[model]));
  }
  const models = Object.fromEntries(modelsMap.entries());

  defineEmits([
    ...useDialogPluginComponent.emits
  ]);
  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
  const deleteEntity = () => {
    entityStore.deleteEntity(props._id ?? '');
    onDialogHide();
  }
  const onOKClick = () => {
    const resultMap: Map<string, any> = new Map;
    for (const model in models) {
      resultMap.set(model, models[model].value);
    }
    onDialogOK(Object.fromEntries(resultMap.entries()));
  }
  const randomize = () => {
    for (const input of entityStore.inputs) {
      switch (input.type) {
        case 'text':
          models[input.model].value = generateConcat();
          break;
        case 'number':
          models[input.model].value = randomNumber();
          break;
        case 'password':
          models[input.model].value = generatePassword();
          break;
        case 'date':
          const randomDate = new Date(Math.floor(Math.random() * 2 * 10e+11));
          let day = `${randomDate.getDate()}`,
              month = `${randomDate.getMonth() + 1}`;
          if (day.length === 1)
            day = `0${day}`;
          if (month.length === 1)
            month = `0${month}`;
          models[input.model].value = `${randomDate.getFullYear()}-${month}-${day}`;
          break;
      }
    }
  }
</script>