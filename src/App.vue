<script setup>
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue';
</script>

<template>
  <header>
    <div class="max-w-[30rem] w-full mx-auto my-4">
      <Navigation />
    </div>
  </header>

  <div class="max-w-[60rem] w-full mx-auto">
    <RouterView />
  </div>
</template>
