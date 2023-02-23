<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="row">
          <div class="text-h6">Новая сущность</div>
          <q-space />
          <q-btn
            round
            color="primary"
            icon="shuffle"
            @click="randomize(models, entityStore.inputs)"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-form @submit="onOKClick">
        <q-card-section>
          <div class="q-gutter-y-md column">
            <q-input
              v-for="input in entityStore.inputs"
              clearable
              filled
              :stack-label="input.stackLabel"
              :type="input.type"
              :key="input.model"
              v-model="models[input.model].value"
              :label="input.label"
              lazy-rules
              :rules="input.rules"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="q-ma-sm" align="left">
          <q-btn color="primary" type="submit" label="Сохранить" />
          <q-btn color="primary" label="Отмена" @click="onDialogCancel" />
          <q-space />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
  
<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar'
import { useEntityStore } from 'src/stores/entityStore';
import { defineModels, Entity, randomize } from 'src/setQTable';

const entityStore = useEntityStore();
const models = defineModels();
defineEmits([
  ...useDialogPluginComponent.emits
]);
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
const onOKClick = () => {
  const ent: Entity = {};
  for (const model in models) {
    ent[model] = models[model].value;
  }
  onDialogOK(ent);
}
</script>
