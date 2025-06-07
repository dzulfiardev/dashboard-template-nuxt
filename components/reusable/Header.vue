<template>
  <header class="bg-white shadow px-4 flex items-center justify-between">
    <!-- hide sidebar menu icon -->
    <div class="text-gray-500 hover:text-gray-700">
      <button type="button" class="slide-menu-button" @click="toggleSidebar">
        <i class="fas fa-bars text-2xl cursor-pointer"></i>
      </button>
    </div>

    <div class="flex items-center relative">
      <div class="light-and-dark-theme-toggle-wrapper">
        <button @click="toggleTheme" class="rounded-full hover:bg-gray-200 w-10 h-10 cursor-pointer">
          <i :class="isDarkTheme ? 'fas fa-sun text-yellow-500' : 'fas fa-moon text-gray-500'"></i>
        </button>
      </div>

      <div class="notification-wrapper px-2 relative" ref="notificationWrapper">
        <button @click="toggleNotifications" class="rounded-full hover:bg-gray-200 w-10 h-10 cursor-pointer">
          <i class="fas fa-bell text-xl text-gray-500"></i>
        </button>
        <transition name="fade">
          <div v-if="showNotifications"
            class="absolute right-0 mt-2 w-90 bg-white shadow-lg rounded-lg overflow-hidden z-20">
            <div class="p-4 bg-blue-950 notification-header">
              <h3 class="text-lg text-gray-200 font-semibold">Notifications</h3>
            </div>
            <div class="max-h-60 overflow-y-auto">
              <NuxtLink to="/" class="text-sm text-blue-500">
                <div
                  class="p-4 border-b border-gray-200 flex items-start space-x-4 hover:bg-blue-200 transition notification-list">
                  <img src="https://placehold.co/600x400" alt="Notification Image"
                    class="w-10 h-10 rounded-full object-cover">
                  <div>
                    <h4 class="text-sm font-semibold">Notification Title 1</h4>
                    <p class="text-sm text-gray-600">This is the message for notification 1.</p>
                  </div>
                </div>
              </NuxtLink>

              <NuxtLink to="/" class="text-sm text-blue-500 ">
                <div
                  class="p-4 border-b border-gray-200 flex items-start space-x-4 hover:bg-blue-200 transition notification-list">
                  <img src="https://placehold.co/600x400" alt="Notification Image"
                    class="w-10 h-10 rounded-full object-cover">
                  <div>
                    <h4 class="text-sm font-semibold">Notification Title 2</h4>
                    <p class="text-sm text-gray-600">This is the message for notification 2.</p>
                  </div>
                </div>
              </NuxtLink>

              <NuxtLink to="/" class="text-sm text-blue-500">
                <div
                  class="p-4 border-b border-gray-200 flex items-start space-x-4 hover:bg-blue-200 transition notification-list">
                  <img src="https://placehold.co/600x400" alt="Notification Image"
                    class="w-10 h-10 rounded-full object-cover">
                  <div>
                    <h4 class="text-sm font-semibold">Notification Title 3</h4>
                    <p class="text-sm text-gray-600">This is the message for notification 3.</p>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </transition>
      </div>

      <div
        class="user-information-wrapper flex items-center space-x-5 cursor-pointer hover:bg-gray-200 transition duration-300 p-3 rounded">
        <img src="https://placehold.co/600x400" alt="User Avatar" class="rounded-full w-10 h-10 object-cover">
        <div>
          <div class="text-gray-800 font-semibold">Dzulfikar Akmal</div>
          <div class="text-gray-500 text-sm">Administrator</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Header',
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true
    },
  },
  setup(props, { emit }) {
    const notificationWrapper = ref<HTMLElement | null>(null);
    const showNotifications = ref(false);
    const isDarkTheme = ref(props.isDarkTheme);

    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value;
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (notificationWrapper.value && !notificationWrapper.value.contains(event.target as Node)) {
        showNotifications.value = false;
      }
    };

    const toggleSidebar = () => {
      emit('toggleSidebar');
    }

    const toggleSidebarMobile = () => {
      // emit('toggleSidebarMobile');
      console.log('test');
    }

    const toggleTheme = () => {
      emit('toggleTheme');
      isDarkTheme.value = !isDarkTheme.value;
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        isDarkTheme.value = true;
        document.documentElement.classList.add('dark');
      }
    });
    
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      notificationWrapper,
      toggleNotifications,
      showNotifications,
      toggleTheme,
      toggleSidebar,
      isDarkTheme,
      toggleSidebarMobile,
    };
  }
});
</script>

<style scoped>
/* Add any additional styles here */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>