import {ref, watch, onMounted, computed} from 'vue'
import {defineStore} from 'pinia'
import {useBebidasStore} from './bebidas'
import { useModalStores } from './modal'
import {useNotificacionStore} from './notificaciones'

export const useFavoritosStore = defineStore('favoritos', () =>{

    const bebidas = useBebidasStore()
    const modal = useModalStores()
    const notificaciones = useNotificacionStore()
    const favoritos = ref([])

    onMounted( () => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos' ?? []))
    })

    watch(favoritos, () => {
        sincronizarLocalStorage()
    }, {
        deep: true
    })

    function sincronizarLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }
    
    function eliminarFavorito(id){
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink)
        notificaciones.mostrar=true
        notificaciones.texto = "Se elimino de favoritos"
        
    }

    function agregarFavorito () {
        favoritos.value.push(bebidas.receta)
        notificaciones.mostrar=true
        notificaciones.texto = "Se agrego a favoritos"
        
    }

    function handleClickFavorito() {
        
        if(existeFavoritos()){
            eliminarFavorito()
           
        }else {
            agregarFavorito()
        }
        modal.modal = false
    }

    function existeFavoritos() {
        const favoritosLocalSorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalSorage.some(favorito => favorito.idDrink === bebidas.receta.idDrink)
    }

    const noFavoritos = computed(() => favoritos.value.length === 0)
    
    return {
        favoritos,
        handleClickFavorito,
        existeFavoritos,
        noFavoritos
    }
})