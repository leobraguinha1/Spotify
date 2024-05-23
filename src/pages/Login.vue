<template>
    <section class="grid justify-items-center z-0 ">
     <section class="w-3/5 bg-white absolute inset-0 h-3/5 p-20 rounded-md m-auto text-center"  >
       <h2 class="text-black text-4x1 font-extrabold mt20 text-2xl">
         Venha conhecer todos segredos e playlists maravilhosas que o Spotify fez para você!
       </h2>
       <div class="text-center">
         <button @click="login" class="text-black text-4x1 font-bold bg-green-500 px-10 py-3 rounded-full border-2 mt-32 " >Entre com o Spotify</button>
       </div>
     </section>
  
   </section>
    <section >
      <img class="w-auto h-auto top-0 " src="./../assets/teladefundaSpotify.jpg">
    </section>
  
      
  </template>
  
  <script>
  export default {
    data() {
      return {
        clientID: "b26702aa2af449bd87d4f8401cef4fea",
        scopes: "ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public",
        redirectURI: "http://localhost:5174/home",
      }
    },
    methods: {
      login() {
        location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientID}&scope=${this.scopes}&redirect_uri=${this.redirectURI}`;
      }
    }
  }
  </script>
  
  
  