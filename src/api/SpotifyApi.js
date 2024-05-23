import axios from "axios"

const clientId = "b26702aa2af449bd87d4f8401cef4fea"
const clientSecret = "8bfc843e906b43d4a4833c6fceee750d"

let accessToken
let refreshToken
let expiresIn
let tokenExpirado = false

export default class SpotifyApi{
    static async getToken(code){
        const body ={
            grant_type:"authorization_code",
            code: code,
            redirect_uri:"http://localhost:5174/home"
        }

        const resposta = await axios({
            method :"POST",
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams(Object.entries(body)).toString(),
            headers: {
                Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
                "Content-Type": "application/x-www-form-urlencoded"

            }
        })

        accessToken = resposta.data.access_token
        refreshToken = resposta.data.refresh_token
        expiresIn = resposta.data.expires_in
        tokenExpirado = false
        
        setTimeout(() => {
            tokenExpirado = true
        },expiresIn);

    }

    static async refreshToken(){
        const body = {
            grant_type:"refresh_token",
            refresh_token: refreshToken,
        }

        const resposta = await axios({
            method :"POST",
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams(Object.entries(body)).toString(),
            headers: {
                Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
                "Content-Type": "application/x-www-form-urlencoded"

            }
        })

        accessToken = resposta.data.access_token
        expiresIn = resposta.data.expires_in
        tokenExpirado = false
        
        setTimeout(() => {
            tokenExpirado = true
        },expiresIn);
    }

    static async getUsuario(){
        if(tokenExpirado) await SpotifyApi.refreshToken()
       const resposta = await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me ",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
        const usuarioLogado = {
            nome : resposta.data.display_name,
            id : resposta.data.id
        }

        return usuarioLogado
    }

    static async getPlaylists() {
        if(tokenExpirado) await SpotifyApi.refreshToken()
        const resposta = await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me/playlists",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${accessToken}`,
            }

        })
        return resposta.data.items
    }
  
}
