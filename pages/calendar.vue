<template>
  <DashboardLayout>
    <h2 class="text-xl font-semibold mb-4">Calendar</h2>
    <div class="bg-white p-6 rounded shadow">
      <p>Your main content goes here.</p>
    </div>
  </DashboardLayout>
</template>

<script lang="ts">
import DashboardLayout from '~/components/DashboardLayout.vue';

export default defineComponent({
  components: {
    DashboardLayout
  }
});
</script>