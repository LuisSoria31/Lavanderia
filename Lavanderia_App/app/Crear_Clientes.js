import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Crear_Clientes() {
    const navigation = useNavigation(); // 👈 aquí usamos el hook

    const create_client = async () => {
        try {
            navigation.navigate('Crear_Clientes');
        } catch (error) {
        }
    };

    return (
        <View style={styles.padre}>
            <View style={styles.tarjeta}>
               <Text style={styles.title}>
                      Crea un Cliente
               </Text>
               <View style={styles.cajaTexto}>
                    <TextInput
                       placeholder='Nombre'
                       style={{ paddingHorizontal: 15 }}
                    />
               </View>
                <View style={styles.cajaTexto}>
                    <TextInput
                        placeholder='Numero de Telefono'
                        style={{ paddingHorizontal: 15 }}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput
                        placeholder='Dirección'
                        style={{ paddingHorizontal: 15 }}
                        onChangeText={text => setAddres(text)}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Mostrar_Clientes')}>
                        <Text style={styles.TextoBoton}>Crear</Text>
                    </TouchableOpacity>
                </View>
            </View>
                </View>
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
        fontSize: 35
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
