import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {useFavoritosStore} from './favoritos'
import {useBebidasStore} from './bebidas'

export const useModalStores = defineStore('modal', () =>{

    const favoritos = useFavoritosStore();
    const bebidas = useBebidasStore();
    const modal = ref(false)

    function handleClickModal() {
        modal.value = !modal.value
    }

    //Getter para pinia usar un computed
    const textoBoton = computed(() => {
        return favoritos.existeFavoritos(bebidas.receta.idDrink) ? 'Eliminar de favoritos' : 'Agregar a favoritos'
    })

    return {
        modal,
        handleClickModal,
        textoBoton
    }
})