<script setup>
import { useRouter } from 'vue-router';

    const router = useRouter();

    const logOut = () => {
        localStorage.removeItem('token');
        router.push({ name: 'login' });
    }
</script>

<template>
    <div>
        <h1 class=" text-center text-5xl">Dashboard Page</h1>
        <button
          @click="logOut"
          class="block w-[120px] h-[2.5rem] mx-auto mt-4 bg-green-500 text-white hover:bg-green-600"
        >Log Out</button>
    </div>
</template>

<style lang="scss" scoped>

</style>
