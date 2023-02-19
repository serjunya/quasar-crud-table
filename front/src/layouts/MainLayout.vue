<template>
  <div class="q-pa-md">
    <q-table
      title="Entities"
	  dense
      :rows="entityStore.entities"
      :columns="entityStore.columns"
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
import { useEntityStore } from 'src/stores/entityStore';
import { useQuasar } from 'quasar';
import EntityForm from 'src/components/EntityForm.vue';
import { Entity } from 'src/Entity';
import { setProps } from 'src/setQTable';

export default {
    setup() {
		const entityStore = useEntityStore();
		entityStore.fetchEntities();
		const $q = useQuasar();
        return {
			entityStore,
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
					componentProps: setProps(row)
				}).onOk((ent) => {
					entityStore.editEntity(ent);
				});
			}
        }
    }
}
</script>
