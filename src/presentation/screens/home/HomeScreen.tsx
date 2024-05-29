import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { FlatList } from 'react-native-gesture-handler';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';


export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();

    const {isLoading, data: pokemons = []} = useQuery({
        queryKey:['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 60 //60 minutos
    });

    return (
        <View style={globalTheme.globalMargin}>
            <PokeballBg style={ styles.imgPosition } />
            <FlatList 
                data={pokemons}
                keyExtractor={(pokemon, index) => `${pokemon.id}- ${index}`}
                numColumns={2}
                style={{paddingTop: top + 20}}
                ListHeaderComponent={
                    () => (
                        <Text variant='displayMedium'>Pokedex</Text>
                    )
                }
                renderItem={({item}) => (
                    <PokemonCard pokemon={item} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100
    }
});




/* Ejemplo de botones con iconos de diferente iconografia */

/* import IconIon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'; */

/* export const HomeScreen = () => {
    return (
        <View>
            <Text variant='displaySmall'>HomeScreen</Text>
            <Button
                icon={() => <IconMaterial name="camera" size={20} color={"white"} />}
                mode="contained" 
                onPress={() => console.log('Pressed')}
            >
                Register me! 
            </Button>
            <Button 
                style={{marginTop: 10}} 
                icon={() => <IconIon name="camera-outline" size={20} color={"white"} />}
                mode="contained" 
                onPress={() => console.log('Pressed')}
            >
                Register me! 
            </Button>
        </View>
    );
}; */