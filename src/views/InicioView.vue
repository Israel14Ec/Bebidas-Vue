<template>
    <h1 class="text-5xl font-extrabold">
        Recetas
    </h1>

    <p v-if="bebidas.noRecetas" class="my-10 text-center text-2xl">No hay resultados, usa el formulario para buscar las recetas</p>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-20 h-20">
        <Receta
            v-for="receta in bebidas.recetas"
            :receta="receta"
            :key="receta.idDrink"
        />
    </div>
</template>

<script setup>
    import Receta from '../components/Receta.vue';
    import { useBebidasStore } from '../stores/bebidas'

    const bebidas = useBebidasStore()

</script>

