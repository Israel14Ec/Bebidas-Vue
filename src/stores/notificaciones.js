import {ref, watchEffect} from 'vue'
import {defineStore} from 'pinia'

export const useNotificacionStore = defineStore ('notificacion', () => {

    const texto = ref('')
    const error = ref(false)
    const mostrar = ref(false)

    //watch (observa solo un state) y watchEffect (observa multiples)
    watchEffect(() => {

        if(mostrar.value){
            setTimeout(() => {
                texto.value = ''
                error.value = false
                mostrar.value = false
            }, 3000);
        }
    })
    return {
        texto,
        error,
        mostrar,
    }
})