import React, { useState, useCallback } from 'react';
import { 
    Text, 
    StyleSheet, 
    View, 
    TouchableOpacity, 
    Alert, 
    ScrollView,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Animated,
    RefreshControl
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const EmployeeCard = ({ employee, onDelete, index }) => {
    const [scaleAnim] = useState(new Animated.Value(0));
    const [showPassword, setShowPassword] = useState(false);

    React.useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            delay: index * 100,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
        }).start();
    }, [scaleAnim, index]);

    const handleDelete = () => {
        Alert.alert(
            '⚠️ Confirmar eliminación',
            `¿Estás seguro de que deseas eliminar a ${employee.nombre}?\n\nEsta acción no se puede deshacer.`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        Animated.spring(scaleAnim, {
                            toValue: 0,
                            useNativeDriver: true,
                            tension: 100,
                            friction: 8,
                        }).start(() => {
                            onDelete(employee.id);
                        });
                    },
                },
            ]
        );
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getStatusColor = (rol) => {
        switch (rol.toLowerCase()) {
            case 'admin':
                return '#ff6b6b';
            case 'supervisor':
                return '#4ecdc4';
            case 'empleado':
                return '#525FE1';
            default:
                return '#95a5a6';
        }
    };

    return (
        <Animated.View 
            style={[
                styles.employeeCard,
                {
                    transform: [{ scale: scaleAnim }]
                }
            ]}
        >
            <View style={styles.cardHeader}>
                <View style={styles.nameContainer}>
                    <Text style={styles.employeeName}>{employee.nombre}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(employee.rol) }]}>
                        <Text style={styles.statusText}>{employee.rol}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDelete}
                    activeOpacity={0.7}
                >
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.employeeInfo}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>📧 Email:</Text>
                    <Text style={styles.value} numberOfLines={1}>{employee.email}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.label}>🔐 Contraseña:</Text>
                    <View style={styles.passwordContainer}>
                        <Text style={styles.passwordValue}>
                            {showPassword ? employee.password : '•'.repeat(employee.password.length)}
                        </Text>
                        <TouchableOpacity 
                            onPress={togglePasswordVisibility}
                            style={styles.eyeButton}
                        >
                            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>📅 Creado:</Text>
                    <Text style={styles.dateValue}>{employee.fechaCreacion}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

export default function Mostrar_Usuarios() {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    const [employees, setEmployees] = useState([
        {
            id: 1,
            nombre: 'Juan Pérez González',
            email: 'juan.perez@empresa.com',
            rol: 'Admin',
            password: 'admin123',
            fechaCreacion: '15/05/2024'
        },
        {
            id: 2,
            nombre: 'María García López',
            email: 'maria.garcia@empresa.com',
            rol: 'Supervisor',
            password: 'supervisor456',
            fechaCreacion: '20/05/2024'
        },
        {
            id: 3,
            nombre: 'Carlos López Martín',
            email: 'carlos.lopez@empresa.com',
            rol: 'Empleado',
            password: 'empleado789',
            fechaCreacion: '25/05/2024'
        },
        {
            id: 4,
            nombre: 'Ana Martínez Ruiz',
            email: 'ana.martinez@empresa.com',
            rol: 'Empleado',
            password: 'ana2024',
            fechaCreacion: '30/05/2024'
        },
        {
            id: 5,
            nombre: 'Roberto Silva Castro',
            email: 'roberto.silva@empresa.com',
            rol: 'Empleado',
            password: 'roberto123',
            fechaCreacion: '05/06/2024'
        }
    ]);

    useFocusEffect(
        useCallback(() => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, [fadeAnim])
    );

    const handleDeleteEmployee = (employeeId) => {
        setEmployees(prevEmployees => 
            prevEmployees.filter(emp => emp.id !== employeeId)
        );
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simular carga de datos
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const getTotalByRole = (role) => {
        return employees.filter(emp => emp.rol.toLowerCase() === role.toLowerCase()).length;
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
            
            <Animated.View style={[styles.padre, { opacity: fadeAnim }]}>
                <View style={styles.header}>
                    <Text style={styles.title}>👥 Usuarios: </Text>
                    <Text style={styles.subtitle}>
                        Total: {employees.length} usuarios registrados
                    </Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{getTotalByRole('admin')}</Text>
                        <Text style={styles.statLabel}>Admins</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{getTotalByRole('supervisor')}</Text>
                        <Text style={styles.statLabel}>Supervisores</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{getTotalByRole('empleado')}</Text>
                        <Text style={styles.statLabel}>Empleados</Text>
                    </View>
                </View>

                <View style={styles.tarjeta}>
                    <ScrollView 
                        style={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#525FE1']}
                                tintColor="#525FE1"
                            />
                        }
                    >
                        {employees.map((employee, index) => (
                            <EmployeeCard
                                key={employee.id}
                                employee={employee}
                                onDelete={handleDeleteEmployee}
                                index={index}
                            />
                        ))}
                        {employees.length === 0 && (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyIcon}>😔</Text>
                                <Text style={styles.emptyText}>No hay empleados registrados</Text>
                                <Text style={styles.emptySubtext}>Desliza hacia abajo para actualizar</Text>
                            </View>
                        )}
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={[styles.cajaBoton, styles.secundaryButton]} 
                            onPress={() => navigation.navigate('Login')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.TextoBotonSecundary}>🏠  Regresar al Inicio</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.cajaBoton, styles.primaryButton]} 
                            onPress={() => navigation.navigate('Actualizar_Usuarios')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.TextoBoton}>✏️ Actualizar Datos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    padre: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        minWidth: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#525FE1',
    },
    statLabel: {
        fontSize: 12,
        color: '#7f8c8d',
        marginTop: 2,
    },
    tarjeta: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 20,
    },
    employeeCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#e8ecf0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    nameContainer: {
        flex: 1,
        marginRight: 10,
    },
    employeeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    deleteButton: {
        backgroundColor: '#ff4757',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ff4757',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    deleteButtonText: {
        fontSize: 16,
    },
    employeeInfo: {
        gap: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#525FE1',
        width: 120,
    },
    value: {
        fontSize: 15,
        color: '#2c3e50',
        flex: 1,
        textAlign: 'right',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    passwordValue: {
        fontSize: 15,
        color: '#2c3e50',
        letterSpacing: 1,
        marginRight: 10,
    },
    eyeButton: {
        padding: 5,
    },
    eyeIcon: {
        fontSize: 16,
    },
    dateValue: {
        fontSize: 15,
        color: '#7f8c8d',
        flex: 1,
        textAlign: 'right',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 60,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#7f8c8d',
        fontWeight: '600',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#bdc3c7',
        fontStyle: 'italic',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    cajaBoton: {
        borderRadius: 25,
        paddingVertical: 15,
        flex: 1,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    primaryButton: {
        backgroundColor: '#525FE1',
    },
    secundaryButton: {
        backgroundColor: '#ecf0f1',
        borderWidth: 2,
        borderColor: '#bdc3c7',
    },
    TextoBoton: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    TextoBotonSecundary: {
        color: '#525FE1',
        fontSize: 16,
        fontWeight: '600',
    },
});