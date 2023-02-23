<template>
  <q-drawer
    @before-show="changeEnt"
    v-model="entityStore.drawer"
    :width="400"
    :breakpoint="700"
    elevated
  >
    <q-form @submit="onSubmit">
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
        <q-btn color="primary" label="Отмена" @click="hide" />
        <q-space />
        <q-btn color="negative" icon="delete" @click="deleteEntity" />
      </q-card-actions>
    </q-form>
  </q-drawer>
</template>

<script lang="ts" setup>
import { useEntityStore } from 'src/stores/entityStore';
import { defineModels, Entity } from 'src/setQTable';

const entityStore = useEntityStore();
let models = defineModels();
const changeEnt = () => {
  for (const model in models) {
    models[model].value = entityStore.currentEntity[model];
  }
}
const hide = () => {
  entityStore.hideDrawer();
}
const deleteEntity = () => {
  entityStore.deleteEntity(entityStore.currentEntity._id ?? '');
  hide();
}
const onSubmit = () => {
  const ent: Entity = {};
  for (const model in models) {
    ent[model] = models[model].value;
  }
  entityStore.editEntity(ent);
  hide();
}
</script>
