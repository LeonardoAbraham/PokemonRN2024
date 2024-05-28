import { pokeApi } from "../../config/api/pokeApi";
import type { Pokemon } from "../../domain/entities/pokemon";
import type { PokeAPIPaginateResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";


export const getPokemons = async (page: number, limit: number = 20):Promise<Pokemon[]> => {
    try {
        const url = `/pokemon?offset=${ page * 10 }&limit=${ limit }`;
        const { data } = await pokeApi.get<PokeAPIPaginateResponse>(url);

        const pokemonPromises = data.results.map((info) => {
            return pokeApi.get<PokeAPIPokemon>(info.url)
        })

        const pokeApiPokemons = await Promise.all(pokemonPromises);

        const pokemons = pokeApiPokemons.map(item => 
            PokemonMapper.pokeApiPokemonToEntry(item.data)
        )

        console.log(pokemons[0])
        
        return pokemons;
    } catch (error) {
        throw new Error('Error getting pokemons');
    }
}



