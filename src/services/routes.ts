import Axios from "axios"

const baseApi = "https://pokeapi.co/api/v2/"
const BaseRoutesService = {

    searchMethod: function(name: string){
        return Axios.get(`${baseApi}pokemon/${name}`)
    },
    fetchAllPokemon : function(){
        return Axios.get(`${baseApi}pokemon/`)

    }
};

export default BaseRoutesService