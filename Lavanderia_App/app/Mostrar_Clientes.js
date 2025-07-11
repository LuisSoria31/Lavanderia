import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ClienteCard = ({ cliente, onDelete }) => {
    const handleDelete = () => {
        Alert.alert(
            'Confirmar eliminación',
            `¿Estás seguro de que deseas eliminar a ${cliente.nombre}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => onDelete(cliente.id),
                },
            ]
        );
    };

    return (
        <View style={styles.clienteCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.clienteNombre}>{cliente.nombre}</Text>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDelete}
                >
                    <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.clienteInfo}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>📞 Teléfono:</Text>
                    <Text style={styles.value}>{cliente.telefono}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.label}>🏠 Dirección:</Text>
                    <Text style={styles.direccionValue} numberOfLines={2}>
                        {cliente.direccion}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default function Mostrar_Clientes() {
    const navigation = useNavigation();

    const [clientes, setClientes] = useState([
        {
            id: 1,
            nombre: 'Ana María González',
            telefono: '+52 442 123 4567',
            direccion: 'Av. Constituyentes #123, Col. Centro, Querétaro, Qro.'
        },
        {
            id: 2,
            nombre: 'Carlos Roberto Jiménez',
            telefono: '+52 442 234 5678',
            direccion: 'Calle Reforma #456, Col. Alameda, Querétaro, Qro.'
        },
        {
            id: 3,
            nombre: 'María Elena Vázquez',
            telefono: '+52 442 345 6789',
            direccion: 'Blvd. Bernardo Quintana #789, Col. San Pablo, Querétaro, Qro.'
        },
        {
            id: 4,
            nombre: 'José Luis Martínez',
            telefono: '+52 442 456 7890',
            direccion: 'Av. Universidad #321, Col. Las Campanas, Querétaro, Qro.'
        },
        {
            id: 5,
            nombre: 'Laura Patricia Hernández',
            telefono: '+52 442 567 8901',
            direccion: 'Calle Juárez #654, Col. La Loma, Querétaro, Qro.'
        }
    ]);

    const handleDeleteCliente = (clienteId) => {
        setClientes(prevClientes => 
            prevClientes.filter(cliente => cliente.id !== clienteId)
        );
    };

    const show_client = async () => {
        try {
            navigation.navigate('Mostrar_Clientes');
        } catch (error) {
        }
    };

    return (
        <View style={styles.padre}>
            <View style={styles.tarjeta}>
                <Text style={styles.title}>
                    Clientes:
                </Text>
                
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>
                        Total: {clientes.length} clientes registrados
                    </Text>
                </View>
                
                <ScrollView 
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {clientes.map((cliente) => (
                        <ClienteCard
                            key={cliente.id}
                            cliente={cliente}
                            onDelete={handleDeleteCliente}
                        />
                    ))}
                    {clientes.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No hay clientes registrados</Text>
                            <Text style={styles.emptySubtext}>Los clientes aparecerán aquí</Text>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.TextoBoton}>Regresar al Inicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Actualizar_Clientes')}>
                        <Text style={styles.TextoBoton}>Actualizar Datos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Crear_Orden')}>
                        <Text style={styles.TextoBoton}>Crear Orden</Text>
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
        fontSize: 35,
        marginBottom: 10,
        textAlign: 'center',
    },
    totalContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    totalText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
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
        maxHeight: '85%',
    },
    scrollContainer: {
        maxHeight: 400,
        marginBottom: 20,
    },
    clienteCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 15,
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    clienteNombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    deleteButton: {
        backgroundColor: '#ff4757',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    clienteInfo: {
        gap: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#525FE1',
        width: 100,
        marginRight: 10,
    },
    value: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        fontWeight: '500',
    },
    direccionValue: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        lineHeight: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        fontWeight: '600',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        fontStyle: 'italic',
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