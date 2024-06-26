import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, FAB, Text, useTheme } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { FlatList } from 'react-native-gesture-handler';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/StackNavigator';


interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'>{};

export const HomeScreen = ({navigation}: Props) => {

    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const theme =  useTheme();

    //* Esta es la forma tradicional de una petición http
    //const {isLoading, data: pokemons = []} = useQuery({
    //    queryKey:['pokemons'],
    //    queryFn: () => getPokemons(0),
    //    staleTime: 1000 * 60 * 60 //60 minutos
    //});

    const {isLoading, data, fetchNextPage} = useInfiniteQuery({
        queryKey:['pokemons', 'infinite'],
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60, //60 minutos
        queryFn: async ( params ) => {

            const pokemons = await getPokemons(params.pageParam);

            pokemons.forEach(pokemon =>{
                queryClient.setQueryData(['pokemon', pokemon.id], pokemon)
            })
            
            return pokemons;
        },
        getNextPageParam: (lastPage, pages) => pages.length,
    });

    return (
        <View style={globalTheme.globalMargin}>
            <PokeballBg style={ styles.imgPosition } />
            <FlatList 
                data={data?.pages.flat() ?? []}
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
                onEndReachedThreshold={0.6}
                onEndReached={() => fetchNextPage()}
                showsVerticalScrollIndicator={false}
            />

            <FAB 
                label='Buscar'
                style={[globalTheme.fab, {backgroundColor: theme.colors.primary}]}
                mode='elevated'
                color={theme.dark ? 'black':'white'}
                onPress={() => navigation.push('SearchScreen')}
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