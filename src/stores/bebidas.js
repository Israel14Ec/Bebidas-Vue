import {ref, reactive, onMounted, computed} from 'vue'
import {defineStore} from 'pinia'
import {useModalStores} from './modal'
import APIService  from '../services/APIService'


export const useBebidasStore = defineStore('bebidas', () =>{

    const modal = useModalStores()
    const categorias = ref([])
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    })
    const recetas = ref([])
    const receta = ref({})

    onMounted( async function() {
        const {data: {drinks}} = await APIService.obtenerCategorias()
        categorias.value = drinks
    })

    //accion en pinia, es una funcion, puede ser tambien con un arow funciton
    async function obtenerRecetas() {
        const {data: {drinks}} =  await APIService.buscarRecetas(busqueda)
        recetas.value = drinks
    }

    //esta usando el store de modal
    async function seleccionarBebida(id){
        const {data: {drinks}} = await APIService.buscarReceta(id)
        receta.value = drinks[0]
        modal.handleClickModal()
    }

    const noRecetas = computed(() => recetas.value.length === 0)
    
    return {
        categorias,
        busqueda,
        recetas,
        receta,
        obtenerRecetas,
        seleccionarBebida,
        noRecetas
    }
})