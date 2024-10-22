<!-- <script setup>
    import RecipeList from '../recipe/RecipeList.vue';
    import RECIPE_DATA from '../../recipe.js';

    const recipeList = RECIPE_DATA;
</script> -->
<!-- Karena kita pakai firebase, maka tidak perlu yang diatas lagi -->
<script setup>
    import RecipeList from '../recipe/RecipeList.vue';
    import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    const recipeListStatus = ref(false);
    const recipeList = ref();

    onMounted(async () => {
        try {
            await store.dispatch("recipe/getRecipeData");
            recipeListStatus.value = true;
            recipeList.value = store.state.recipe.recipes;
        } catch (error) {
            consloe.log(error);
        }
    });
</script>

<template>
    <div class="container-md my-5 py-5">
        <div class="recipe_title text-center">
            <h2>All Recipe</h2>
            <p style="font-size: 15px;">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi repellat adipisci reiciendis inventore iure, nesciunt cumque dignissimos libero suscipit, debitis, aliquid consectetur esse optio culpa incidunt eveniet tempore laborum in!
            </p>
        </div>
        <recipe-list :recipes="recipeList" v-if="recipeListStatus"></recipe-list>
        <!-- <router-link to="/recipe/1">
            <recipe-list :recipes="recipeList"></recipe-list>
        </router-link> -->
    </div>
</template>