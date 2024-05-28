import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';


export const HomeScreen = () => {


    getPokemons();

    return (
        <View>
            <Text variant='displaySmall'>HomeScreen</Text>
            <Button
                mode="contained" 
                onPress={() => console.log('Pressed')}
            >
                Press me
            </Button>
        </View>
    );
};




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