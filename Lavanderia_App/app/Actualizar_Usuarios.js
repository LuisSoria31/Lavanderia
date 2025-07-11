import React, { use, useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Actualizar_Usuarios(props) {
    const [data, setData] = useState({});
    const navigation = useNavigation();

    const onChange = (texto,prop)=>{
        const newData = data;
        newData[prop] = texto;
        setData(newData)
    }
    
    const update_user = async () => {
        try {
            const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const userRef = ref(db, `users/${user.uid}`);
            navigation.navigate('Actualizar_Usuarios');

            set(userRef,data).then(()=>console.log("Se guardaron los datos en la DB")).catch(()=>console.log("Algo salio mal con la DB"))
            props.navigation.navigate('Mostrar_Usuarios')
            Alert.alert('Usuario registrado con exito')
        } catch (error) {
            console.log(error);
            Alert.alert('Favor de llenar los campos')
        }
    }
    return (
            <View style={styles.padre}>
                <View style={styles.tarjeta}>
                    <Text style={styles.title}>
                        Actualizar Usuario
                    </Text>
                    <View style={styles.cajaTexto}>
                        <TextInput onChangeText={(t)=>onChange(t,"name")} placeholder='Nombres' style={{ paddingHorizontal: 15 }} />
                    </View>
                    <View style={styles.cajaTexto}>
                        <TextInput placeholder='Correo Electronico' style={{ paddingHorizontal: 15 }}
                            onChangeText={(t) => onChange(t,"email")} />
                    </View>
                    <View style={styles.cajaTexto}>
                        <TextInput onChangeText={(t)=>onChange(t,"rol")} placeholder='Rol' style={{ paddingHorizontal: 15 }} />
                    </View>
                    <View style={styles.cajaTexto}>
                        <TextInput placeholder='Contraseña' style={{ paddingHorizontal: 15 }}
                            onChangeText={(t) => onChange(t,"password")} secureTextEntry={true} />
                    </View>

                    <View style={styles.PadreBoton}>
                        <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Mostrar_Usuarios')}>
                            <Text style={styles.TextoBoton}>Actualizar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    padre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
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
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cajaTexto: {
        paddingVertical: 20,
        backgroundColor: '#cccccc40',
        borderRadius: 30,
        marginVertical: 10,
        height: 80,
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
    }
});