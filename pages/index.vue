<template>
  <DashboardLayout>
    <h2 class="text-xl font-semibold mb-4">{{ dashboardTitle }}</h2>
    <div class="bg-white p-6 rounded shadow">
      <p>{{ dashboardData }}</p>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '~/components/DashboardLayout.vue';

const { dashboardTitle, dashboardData } = useDashboard();
</script>