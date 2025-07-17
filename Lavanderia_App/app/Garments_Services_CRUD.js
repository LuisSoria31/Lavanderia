import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView, FlatList } from 'react-native';

export default function LaundryApp() {
    const [servicios, setServicios] = useState([
        { id: 1, nombre: 'Lavado Express', precio: 25, duracion: '2 horas' },
        { id: 2, nombre: 'Lavado Premium', precio: 45, duracion: '4 horas' },
    ]);

    const [prendas, setPrendas] = useState([
        { id: 1, nombre: 'Camisa', categoria: 'Formal', precio: 15 },
        { id: 2, nombre: 'Pantalón', categoria: 'Casual', precio: 20 },
    ]);

    const [activeTab, setActiveTab] = useState('servicios');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [duracion, setDuracion] = useState('');
    const [categoria, setCategoria] = useState('');

    const resetForm = () => {
        setNombre('');
        setPrecio('');
        setDuracion('');
        setCategoria('');
        setEditingId(null);
        setShowForm(false);
    };

    const openForm = (item = null) => {
        if (item) {
            setEditingId(item.id);
            setNombre(item.nombre);
            setPrecio(item.precio.toString());
            if (activeTab === 'servicios') {
                setDuracion(item.duracion);
            } else {
                setCategoria(item.categoria);
            }
        }
        setShowForm(true);
    };

    const saveItem = () => {
        if (!nombre || !precio) {
            Alert.alert('Error', 'Nombre y precio son obligatorios');
            return;
        }

        if (activeTab === 'servicios') {
            const newService = {
                id: editingId || Date.now(),
                nombre,
                precio: parseFloat(precio),
                duracion: duracion || 'No especificada',
            };

            if (editingId) {
                setServicios(prev => prev.map(s => s.id === editingId ? newService : s));
            } else {
                setServicios(prev => [...prev, newService]);
            }
        } else {
            const newPrenda = {
                id: editingId || Date.now(),
                nombre,
                precio: parseFloat(precio),
                categoria: categoria || 'General',
            };

            if (editingId) {
                setPrendas(prev => prev.map(p => p.id === editingId ? newPrenda : p));
            } else {
                setPrendas(prev => [...prev, newPrenda]);
            }
        }

        resetForm();
        Alert.alert('Éxito', editingId ? 'Actualizado correctamente' : 'Creado correctamente');
    };

    const deleteItem = (id) => {
        console.log('deleteItem llamado con id:', id);
        console.log('activeTab:', activeTab);
        
        if (activeTab === 'servicios') {
            console.log('Servicios antes:', servicios);
            setServicios(prev => {
                const newServicios = prev.filter(s => s.id !== id);
                console.log('Servicios después:', newServicios);
                return newServicios;
            });
        } else {
            console.log('Prendas antes:', prendas);
            setPrendas(prev => {
                const newPrendas = prev.filter(p => p.id !== id);
                console.log('Prendas después:', newPrendas);
                return newPrendas;
            });
        }
        
        Alert.alert('Eliminado', 'Elemento eliminado correctamente');
    };

    const renderService = ({ item }) => (
        <View style={styles.tarjeta}>
            <Text style={styles.itemTitle}>{item.nombre}</Text>
            <Text style={styles.itemText}>Precio: ${item.precio}</Text>
            <Text style={styles.itemText}>Duración: {item.duracion}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cajaBoton} onPress={() => openForm(item)}>
                    <Text style={styles.TextoBoton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.cajaBoton, styles.deleteButton]} 
                    onPress={() => {
                        console.log('Eliminando servicio con id:', item.id);
                        deleteItem(item.id);
                    }}
                >
                    <Text style={styles.TextoBoton}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderPrenda = ({ item }) => (
        <View style={styles.tarjeta}>
            <Text style={styles.itemTitle}>{item.nombre}</Text>
            <Text style={styles.itemText}>Precio: ${item.precio}</Text>
            <Text style={styles.itemText}>Categoría: {item.categoria}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cajaBoton} onPress={() => openForm(item)}>
                    <Text style={styles.TextoBoton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.cajaBoton, styles.deleteButton]} 
                    onPress={() => {
                        console.log('Eliminando prenda con id:', item.id);
                        deleteItem(item.id);
                    }}
                >
                    <Text style={styles.TextoBoton}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (showForm) {
        return (
            <ScrollView>
                <View style={styles.padre}>
                    <View style={styles.tarjeta}>
                        <Text style={styles.title}>
                            {editingId ? 'Editar' : 'Agregar'} {activeTab === 'servicios' ? 'Servicio' : 'Prenda'}
                        </Text>
                        
                        <View style={styles.cajaTexto}>
                            <TextInput
                                placeholder="Nombre"
                                style={{ paddingHorizontal: 15 }}
                                onChangeText={text => setNombre(text)}
                                value={nombre}
                            />
                        </View>
                        
                        <View style={styles.cajaTexto}>
                            <TextInput
                                placeholder="Precio"
                                style={{ paddingHorizontal: 15 }}
                                onChangeText={text => setPrecio(text)}
                                keyboardType="numeric"
                                value={precio}
                            />
                        </View>
                        
                        {activeTab === 'servicios' ? (
                            <View style={styles.cajaTexto}>
                                <TextInput
                                    placeholder="Duración (ej: 2 horas)"
                                    style={{ paddingHorizontal: 15 }}
                                    onChangeText={text => setDuracion(text)}
                                    value={duracion}
                                />
                            </View>
                        ) : (
                            <View style={styles.cajaTexto}>
                                <TextInput
                                    placeholder="Categoría"
                                    style={{ paddingHorizontal: 15 }}
                                    onChangeText={text => setCategoria(text)}
                                    value={categoria}
                                />
                            </View>
                        )}
                        
                        <View style={styles.PadreBoton}>
                            <TouchableOpacity style={styles.cajaBoton} onPress={saveItem}>
                                <Text style={styles.TextoBoton}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.PadreBoton}>
                            <TouchableOpacity style={[styles.cajaBoton, styles.cancelButton]} onPress={resetForm}>
                                <Text style={styles.TextoBoton}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView>
            <View style={styles.padre}>
                <View style={styles.tarjeta}>
                    <Text style={styles.title}>
                        CRUD
                    </Text>
                    
                    <View style={styles.tabContainer}>
                        <TouchableOpacity 
                            style={[styles.tabButton, activeTab === 'servicios' && styles.activeTab]} 
                            onPress={() => setActiveTab('servicios')}
                        >
                            <Text style={styles.tabText}>Servicios</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.tabButton, activeTab === 'prendas' && styles.activeTab]} 
                            onPress={() => setActiveTab('prendas')}
                        >
                            <Text style={styles.tabText}>Prendas</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.PadreBoton}>
                        <TouchableOpacity style={styles.cajaBoton} onPress={() => openForm()}>
                            <Text style={styles.TextoBoton}>+ Agregar {activeTab === 'servicios' ? 'Servicio' : 'Prenda'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Login')}>
                             <Text style={styles.TextoBoton}>Regresar al Inicio</Text>
                         </TouchableOpacity>
                    </View>
                </View>
                
                <FlatList
                    data={activeTab === 'servicios' ? servicios : prendas}
                    renderItem={activeTab === 'servicios' ? renderService : renderPrenda}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                />
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
        alignContent: 'center',
        textAlign: 'center',
        marginBottom: 20,
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
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#cccccc40',
    },
    activeTab: {
        backgroundColor: '#525FE1',
    },
    tabText: {
        textAlign: 'center',
        color: '#525FE1',
        fontWeight: 'bold',
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    cancelButton: {
        backgroundColor: '#95a5a6',
    },
});