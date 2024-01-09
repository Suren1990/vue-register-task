<script setup>
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

const logOut = () => {
  localStorage.removeItem('token');
  router.push({ name: 'login' });
}

const checkLogined = computed(() => JSON.parse(localStorage.getItem('token')));

</script>

<template>
  {{ checkLogined }}
  <nav v-if="!checkLogined" class="flex justify-center gap-4 mb-5">
    <RouterLink to="/" active-class="underline text-green-500 underline-offset-[6px]"
      class="text-xl hover:text-green-500">Login</RouterLink>
    <RouterLink to="/register" active-class="underline text-green-500 underline-offset-[6px]"
      class="text-xl hover:text-green-500">
      Register</RouterLink>
  </nav>
  <button v-else @click="logOut"
    class="block w-[120px] h-[2.5rem] mx-auto mt-4 bg-green-500 text-white hover:bg-green-600">Log
    Out</button>
</template>
