<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <DrawerForm />
      <q-page-container>
        <q-table
          dense
          :rows="Array.from(entityStore.entities.values())"
          :columns="entityStore.columns"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          :table-class="{ 'data': true }"
          @row-click="edit"
        >
          <template v-slot:top>
            <q-btn
              round
              class="q-mt-sm q-mb-xs"
              color="primary"
              icon="add"
              @click="add"
            />
          </template>
        </q-table>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useEntityStore } from 'src/stores/entityStore';
import { useQuasar } from 'quasar';
import PopupForm from 'src/components/PopupForm.vue';
import DrawerForm from 'src/components/DrawerForm.vue';
import { Entity, highlightRow, unhighlightRow } from 'src/setQTable';

const entityStore = useEntityStore();
(async () => {
  await entityStore.fetchEntities();
})();
const $q = useQuasar();
const pagination = ref({
  rowsPerPage: 0
})
const add = () => {
  if (!entityStore.drawer) {
    $q.dialog({
      component: PopupForm
    }).onOk((ent: Entity) => {
      entityStore.addEntity(ent);
    });
  }
}
const edit = (evt: Event, row: Entity, index: number) => {
  if (!entityStore.drawer) {
    if (entityStore.selectedRow >= 0) {
      unhighlightRow(entityStore.selectedRow);
    }
    entityStore.selectedRow = index;
    highlightRow(index);
    entityStore.showDrawer(row);
  }
}
</script>
