import { FlatList, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput, ActivityIndicator, Text } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId } from '../../../actions/pokemons';

export const SearchScreen = () => {
    const { top } = useSafeAreaInsets();

    const {isLoading, data: pokemonNameList = []} = useQuery({
        queryKey:['pokemons', 'all'],
        queryFn: () => getPokemonNamesWithId()
    });

    console.log(pokemonNameList)


    return (
        <View style={[globalTheme.globalMargin, { paddingTop: top +10 }]}>
            <TextInput 
                placeholder='Buscar Pokémon'
                mode='flat'
                autoFocus
                autoCorrect
                onChangeText={value => console.log(value)}
                value={''}
            />

            <ActivityIndicator style={{ paddingTop: 20 }} />

            <Text>{ JSON.stringify(pokemonNameList, null, 2) }</Text>

            <FlatList 
                data={[] as Pokemon[]}
                keyExtractor={(pokemon, index) => `${pokemon.id}- ${index}`}
                numColumns={2}
                style={{paddingTop: top + 20}}
                renderItem={({item}) => (
                    <PokemonCard pokemon={item} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};
