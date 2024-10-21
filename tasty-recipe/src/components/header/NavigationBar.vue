<template>
    <div class="header_navbar row justify-content-between align-items-center" style="width: 450px;">
        <search-menu></search-menu>
        <signup-menu></signup-menu>
    </div>
</template>

<script>
    import SearchMenu from '@/components/header/SearchMenu.vue';
    import SignupMenu from '@/components/header/SignupMenu.vue';
    export default {
        components: {
            SearchMenu,
            SignupMenu,
        }
    }
</script>