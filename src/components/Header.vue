<template>
    <header
        class="bg-slate-800"
        :class="{header: paginaInicio}"
    >
        <div class="mx-auto container px-5 py-4">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink
                        :to="{name: 'inicio'}"
                    >
                        <img class="w-32" src="/img/logo.svg" alt="logotipo">
                    </RouterLink>
                </div>

                <nav class="flex gap-10 text-white">
                    <RouterLink
                        :to="{name: 'inicio'}"
                        class=" uppercase font-bold"
                        active-class="text-orange-600"
                    >
                        
                        Inicio
                    </RouterLink>

                    <RouterLink
                        :to="{name: 'favoritos'}"
                        class=" uppercase font-bold"
                        active-class="text-orange-600"
                    >
                        
                        Favoritos
                    </RouterLink>
                </nav>
            </div>

            <form
                v-if="paginaInicio"
                class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-14 p-10 rounded-lg shadow space-y-4"
                @submit.prevent="handleSubmit"
            >

                <div
                    class="space-y-3">
                    <label 
                        class="block text-white uppercase font-bold text-lg"
                        for="ingrediente">Nombre o Ingredientes</label>
                    <input
                        id="ingrediente" 
                        type="text"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Nombre o Ingrediente: ej. Vodka, Norteño, etc"  
                        v-model="store.busqueda.nombre"  
                    >

                </div>

                <div
                    class="space-y-4 ">
                    <label 
                        class="block text-white uppercase font-bold text-lg"
                        for="categoria">Categoria</label>
                    <select
                        id="categoria" 
                        class="p-3 w-full rounded-lg focus:outline-none"
                        v-model="store.busqueda.categoria"  
                    >
                        <option value=""> --Selecione -- </option>
                        <option
                            v-for="categoria in store.categorias"
                            :key="categoria.strCategory"
                            :value="categoria.strCategory"
                        > 
                            {{ categoria.strCategory }}
                        </option>
                    </select>

                </div>

                <input 
                    type="submit"
                    class="bg-gray-800 hover:bg-opacity-90 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
                    value="Buscar Recetas"
                >

            </form>
        </div>
    </header>
</template>

<script setup>
    
    import {RouterLink, useRoute} from 'vue-router'
    import {computed} from 'vue'
    import { useBebidasStore } from '../stores/bebidas'
    import { useNotificacionStore } from '../stores/notificaciones'

    
    const route = useRoute()
    const store  = useBebidasStore() //no aplicar destructuring, rompe la reactividad
    const notificaciones  = useNotificacionStore()
    const paginaInicio = computed( () => route.name === 'inicio')
    
    const handleSubmit = () => {
        
        if(Object.values(store.busqueda).includes('')){

            /*
            Forma alternativa -------------------

            notificaciones.texto = "Todos los campos son obligatorios"
            notificaciones.mostrar = true
            notificaciones.error = true
            */
            
            //En este estoy usando una funcion de pinia que si soporta - Composition API
            notificaciones.$patch({
                texto: "Todos los campos son obligatorios",
                mostrar: true,
                error: true
            })

            //Otra forma: En este estoy usando una funcion de pinia que si soporta - Composition API
            notificaciones.$state = {
                texto: "Todos los campos son obligatorios",
                mostrar: true,
                error: true
            }

            return
        }
        store.obtenerRecetas()
    }
</script>

<style>
    .header{
        background-image: url('/img/bg.jpg');
        background-size:auto;
        background-position: center;
    }
</style>