import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/Login';
import Crear_Cliente from './app/Crear_Cliente';
import Mostrar_Cliente from './app/Mostrar_Clientes';
import Mostrar_Clientes from './app/Mostrar_Clientes';
import Crear_Clientes from './app/Crear_Clientes';
import Mostrar_Usuarios from './app/Mostrar_Usuarios';
import Actualizar_Usuarios from './app/Actualizar_Usuarios';
import Actualizar_Clientes from './app/Actualizar_Clientes';
import Crear_Orden from './app/Garments_Services_CRUD';
import CRUD from './app/Garments_Services_CRUD';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ 
            title: 'LOGIN',
            headerShown: false
          }} 
        />
        <Stack.Screen
          name="Crear_Clientes"
          component={Crear_Clientes}
        />
        <Stack.Screen
        name="Mostrar_Clientes"
        component={Mostrar_Clientes}
        />
        <Stack.Screen
        name="Mostrar_Usuarios"
        component={Mostrar_Usuarios}
        />
        <Stack.Screen
        name="Actualizar_Usuarios"
        component={Actualizar_Usuarios}
        />
        <Stack.Screen
        name="Actualizar_Clientes"
        component={Actualizar_Clientes}
        />
        <Stack.Screen
        name="Crear_Orden"
        component={CreateOrder}
        />
         <Stack.Screen
        name="Garments_Services_CRUD"
        component={BasicLaundryApp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
