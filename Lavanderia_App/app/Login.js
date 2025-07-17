import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); // 👈 aquí usamos el hook

    const logueo = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'El usuario o la contraseña son incorrectos');
        }
    };

    const register = async () => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            const userRef = ref(db, `users/${user.uid}`);
            const data = { email, password }; // asegúrate de definir 'data'
            await set(userRef, data);
            console.log('Se guardaron los datos en la DB');
            navigation.navigate('Login');
            Alert.alert('Usuario registrado con éxito');
        } catch (error) {
            console.log(error);
            Alert.alert('Favor de llenar los campos');
        }
    };

    return (
    <ScrollView>
        <View style={styles.padre}>
            <View style={styles.tarjeta}>
                <Text style={styles.title}>
                       Login 
                </Text>
                <View style={styles.cajaTexto}>
                    <TextInput
                        placeholder='Correo Electronico'
                        style={{ paddingHorizontal: 15 }}
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput
                        placeholder='Contraseña'
                        style={{ paddingHorizontal: 15 }}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                        value={password}
                    />
                </View>

                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Mostrar_Usuarios')}>
                        <Text style={styles.TextoBoton}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Registro')}>
                        <Text style={styles.TextoBoton}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        
            <View style={styles.tarjeta}>
                <Text style={styles.title}>
                    Crear Cliente
                </Text>
                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Crear_Clientes')}>
                        <Text style={styles.TextoBoton}>Ir a Crear</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tarjeta}>
                <Text style={styles.title}>
                    CRUD de Servicio y Prendas (REMEDIAL)
                </Text>
                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Garments_Services_CRUD')}>
                        <Text style={styles.TextoBoton}>Ir al CRUD</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 35,
        alignContent: 'center'
    },
    tarjeta: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cajaTexto: {
        paddingVertical: 20,
        backgroundColor: '#cccccc40',
        borderRadius: 30,
        marginVertical: 10,
    },
    PadreBoton: {
        alignItems: 'center',
    },
    cajaBoton: {
        backgroundColor: '#525FE1',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 20,
    },
    TextoBoton: {
        textAlign: 'center',
        color: 'white',
    },
});
