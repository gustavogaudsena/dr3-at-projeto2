import GaleriaScreen from './screens/GaleriaScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {  useState } from 'react';
import DetalhesScreen from './screens/DetalhesScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [database, setDatabase] = useState([])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Galeria" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Galeria" options={({ navigation }) => ({
          headerShown: true,
          title: 'Galeria da Nasa'
        })} >
          {(props) => <GaleriaScreen database={database} setDatabase={setDatabase} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Detalhes" options={{
          headerShown: true,
          title: 'Detalhes',
          headerBackVisible: true
        }} >
          {(props) => <DetalhesScreen database={database} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer >
  );
}
