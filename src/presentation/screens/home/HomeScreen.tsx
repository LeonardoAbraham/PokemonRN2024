import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';


export const HomeScreen = () => {

    const {isLoading, data = []} = useQuery({
        queryKey:['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 60 //60 minutos
    });

    return (
        <View style={{}}>
            <PokeballBg style={ styles.imgPosition } />
            
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