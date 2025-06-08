<template>
  <div :class="[isDarkTheme ? 'dark' : '', 'flex h-screen bg-gray-100 overflow-hidden']">

    <!-- Overlay for mobile when sidebar is open -->
    <div 
      v-if="isSidebarOpen && isMobile" 
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    ></div>

    <Sidebar :isSidebarOpen="isSidebarOpen" :dropdownOpen="dropdownOpen" :toggleDropdown="toggleDropdown" :isMobile="isMobile" />
  
    <div :class="[
      'flex flex-col flex-1 transition-all duration-300',
      isSidebarOpen && !isMobile ? 'ml-64' : 'ml-0'
    ]">
      <Header :isDarkTheme="isDarkTheme" @toggleSidebar="toggleSidebar" @toggleTheme="toggleTheme" />

      <main class="flex-1 p-6 overflow-auto">
        <slot></slot>
      </main>

      <footer class="bg-white shadow p-4 text-center">
        <p>Dashboard Footer</p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import Sidebar from './reusable/Sidebar.vue';
import Header from './reusable/Header.vue';

export default defineComponent({
  name: 'DashboardLayout',
  components: {
    Sidebar,
    Header
  },
  setup() {
    const dropdownOpen = reactive<{ [key: string]: boolean }>({
      dashboard: false,
      messages: false
    });

    const isSidebarOpen = ref<boolean>(true);
    const isMobile = ref<boolean>(false);

    const handleResize = () => {
      isMobile.value = window.innerWidth < 1024;
      isSidebarOpen.value = window.innerWidth >= 1024;
    };

    onMounted(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
    });
    
    const toggleDropdown = (menu: keyof typeof dropdownOpen) => {
      dropdownOpen[menu] = !dropdownOpen[menu];
    };
    
    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };
    
    const isDarkTheme = ref<boolean>(false);

    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      if (isDarkTheme.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };

    onMounted(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        isDarkTheme.value = true;
        document.documentElement.classList.add('dark');
      }
    })

    return {
      dropdownOpen,
      isSidebarOpen,
      isMobile,
      isDarkTheme,
      toggleSidebar,
      toggleDropdown,
      toggleTheme,
    };
  }
});
</script>

<style>
/* Add any additional styles here */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter,
.dropdown-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Dark mode styles */
.dark .bg-gray-100 {
  background-color: #1a202c;
}

.dark .bg-white {
  background-color: #2d3748;
}

.dark .text-gray-800 {
  color: #e2e8f0;
}

.dark .text-gray-500 {
  color: #a0aec0;
}

.dark .text-gray-300 {
  color: #cbd5e0;
}

.dark .sidebar-layout {
  background-color: #10151d;
}

.dark .hover\:bg-gray-200:hover {
  background-color: #4a5568;
}

.dark .notification-list {
  border-color: #41526e;
}

.dark .notification-list:hover {
  background-color: #425169;
}

.dark .notification-header {
  background-color: #10151d;
}

/* Ensure all text elements are light in dark mode */
.dark h1,
.dark h2,
.dark h3,
.dark h4,
.dark h5,
.dark h6,
.dark p,
.dark i,
.dark a,
.dark span,
.dark div,
.dark li,
.dark ul,
.dark ol,
.dark label,
.dark button {
  color: #e2e8f0;
}
</style>