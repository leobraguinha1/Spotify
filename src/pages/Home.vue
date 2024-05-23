<template>
    <div class="vl-parent">
        <loading v-model:active="carregando"
                 :can-cancel="false"
                 :is-full-page="true"/>
    </div>

    <nav class="py-6 justify-between flex bg-black " >
        <img class="w-24 ml-5" src="./../assets/spotify_logo_icon_170709.png">
        <div class="text-white text-bold">
        <span> {{ usuarioLogado.nome }}</span>
        <button class="mr-5 ml-5 text-black text-4x1 font-bold bg-green-500 px-10 py-3 rounded-full border-2 " @click="logout">Sair</button>
        </div>
    </nav>
    
    <section>
        <h1 class="text-green-500 text-4xl font-bold text-center flex justify-center">Suas Playliyst</h1>
    </section>

    <section class="playlists mt-10">
        <div class="text-white py-8 px-10 flex justify-evenly font-bold text-xl">
            <p class="w-40">Nome</p>
            <p class="w-40">Pública</p>
            <p class="w-40">Colaborativa</p>
            
        </div>
        <div class="text-white py-5 px-10 flex justify-evenly ml-3"v-for="item in playlists" :key="item.id">
            <p class="w-40">{{ item.name }}</p>
            <p class="w-40">{{ item.public ? "sim": "não"}}</p>
            <p class="w-40">{{ item.collaborative ? "sim": "não"}}</p>
            
        </div>
    </section> 

  

    <footer class="py-7 px-10 text-white text-center mt-10 bg-zinc-900">
        <span>   
            Projeto desenvolvido para ativade acadêmica
        </span>
    </footer>
</template>

<script>

import SpotifyApi from "../api/SpotifyApi";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


export default {
    components: {
        Loading
    },
    data: () => {
        return{
            usuarioLogado: {},
            playlists: [],
            carregando: true,
        }
    },
    methods: {
        logout() {
            this.$router.push("/")
        }
    },

    async mounted() {
        
        let params = new URLSearchParams(document.location.search)
        let code = params.get("code")

    
        //obtendo o acess token
        await SpotifyApi.getToken(code)

        //obter o id do usuário
        this.usuarioLogado = await SpotifyApi.getUsuario()
      

        // obter a playslist do usuário
       this.playlists = await SpotifyApi.getPlaylists()

       this.carregando = false

        //refresh token
    }
}
</script>