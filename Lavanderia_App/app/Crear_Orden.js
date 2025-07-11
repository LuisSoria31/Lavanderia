import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const constants = {
  garments: ['Camisa', 'Pantalón', 'Falda'],
  services: [
    { name: 'Lavado', quantity: 1, unitPrice: 20 },
    { name: 'Planchado', quantity: 1, unitPrice: 15 },
    { name: 'Tintorería', quantity: 1, unitPrice: 50 },
  ],
};

const defaultGarment = {
  type: 'Camisa',
  description: '',
  observations: '',
  services: [constants.services[0]],
};

export default function CreateOrder() {
  const [order, setOrder] = useState({
    client_id: 0,
    user_id: 0,
    state: 'recibido',
    total: 0,
    pagado: false,
    garments: [defaultGarment],
  });

  const [total, setTotal] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const calculateTotal = () => {
    let subTotal = 0;
    order.garments.forEach((garment) => {
      garment.services.forEach((service) => {
        subTotal += service.quantity * service.unitPrice;
      });
    });
    setTotal(subTotal);
  };

  const addGarment = () => {
    setOrder({ ...order, garments: [...order.garments, { ...defaultGarment }] });
  };

  const deleteGarment = (index) => {
    const updated = order.garments.filter((_, i) => i !== index);
    setOrder({ ...order, garments: updated });
  };

  const addServiceToGarment = (gIndex) => {
    const garments = [...order.garments];
    garments[gIndex].services.push({ ...constants.services[0] });
    setOrder({ ...order, garments });
  };

  const deleteServiceFromGarment = (gIndex, sIndex) => {
    const garments = [...order.garments];
    garments[gIndex].services = garments[gIndex].services.filter((_, i) => i !== sIndex);
    setOrder({ ...order, garments });
  };

  const onChangeGarment = (key, value, gIndex) => {
    const garments = [...order.garments];
    garments[gIndex][key] = value;
    setOrder({ ...order, garments });
  };

  const onChangeService = (key, value, gIndex, sIndex) => {
    const garments = [...order.garments];
    if (key === 'name') {
      const newService = constants.services.find((s) => s.name === value);
      if (newService) {
        garments[gIndex].services[sIndex] = { ...newService };
      }
    } else {
      garments[gIndex].services[sIndex][key] = parseFloat(value) || 0;
    }
    setOrder({ ...order, garments });
  };

  return (  
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Creación de Orden</Text>
      <Button title="Agregar Prenda" onPress={addGarment} />

      {order.garments.map((garment, gIndex) => (
        <View key={gIndex} style={styles.garmentBox}>
          <Text style={styles.subtitle}>Prenda #{gIndex + 1}</Text>
          {gIndex > 0 && (
            <Button title="Eliminar Prenda" color="crimson" onPress={() => deleteGarment(gIndex)} />
          )}

          <Text style={styles.label}>Tipo:</Text>
          <Picker
            selectedValue={garment.type}
            onValueChange={(value) => onChangeGarment('type', value, gIndex)}
          >
            {constants.garments.map((g, i) => (
              <Picker.Item key={i} label={g} value={g} />
            ))}
          </Picker>

          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={styles.input}
            value={garment.description}
            onChangeText={(value) => onChangeGarment('description', value, gIndex)}
          />

          <Text style={styles.label}>Observaciones:</Text>
          <TextInput
            style={styles.input}
            value={garment.observations}
            onChangeText={(value) => onChangeGarment('observations', value, gIndex)}
          />

          <Text style={styles.subtitle}>Servicios:</Text>
          {garment.services.map((service, sIndex) => (
            <View key={sIndex} style={styles.serviceBox}>
              {sIndex > 0 && (
                <Button
                  title="Eliminar Servicio"
                  color="darkred"
                  onPress={() => deleteServiceFromGarment(gIndex, sIndex)}
                />
              )}
              <Text style={styles.label}>Nombre:</Text>
              <Picker
                selectedValue={service.name}
                onValueChange={(value) => onChangeService('name', value, gIndex, sIndex)}
              >
                {constants.services.map((s, i) => (
                  <Picker.Item key={i} label={s.name} value={s.name} />
                ))}
              </Picker>

              <Text style={styles.label}>Cantidad:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(service.quantity)}
                onChangeText={(value) => onChangeService('quantity', value, gIndex, sIndex)}
              />

              <Text style={styles.label}>Precio Unitario:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(service.unitPrice)}
                onChangeText={(value) => onChangeService('unitPrice', value, gIndex, sIndex)}
              />
            </View>
          ))}
          <Button title="Agregar Servicio" onPress={() => addServiceToGarment(gIndex)} />
        </View>
      ))}

      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <Button title="Calcular Total" onPress={calculateTotal} />

      {/* ✅ Botón Ver Orden y resumen */}
      <Button
        title="Ver Orden"
        onPress={() => {
          calculateTotal();
          setShowSummary(true);
        }}
        color="green"
      />

      {showSummary && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Resumen de la Orden</Text>
          {order.garments.map((garment, gIndex) => (
            <View key={gIndex} style={styles.summaryItem}>
              <Text style={styles.bold}>Prenda #{gIndex + 1} - {garment.type}</Text>
              <Text>Descripción: {garment.description}</Text>
              <Text>Observaciones: {garment.observations}</Text>
              <Text style={styles.bold}>Servicios:</Text>
              {garment.services.map((service, sIndex) => (
                <View key={sIndex} style={{ marginLeft: 10 }}>
                  <Text>- {service.name}</Text>
                  <Text>  Cantidad: {service.quantity}</Text>
                  <Text>  Precio Unitario: ${service.unitPrice}</Text>
                  <Text>  Subtotal: ${service.quantity * service.unitPrice}</Text>
                </View>
              ))}
              <Text style={styles.line}></Text>
            </View>
          ))}
          <Text style={styles.total}>TOTAL ORDEN: ${total.toFixed(2)}</Text>
          
        </View>
      )}
      <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Mostrar_Clientes')}>
            <Text style={styles.TextoBoton}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  garmentBox: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 20, borderRadius: 8,
  },
  serviceBox: {
    borderTopWidth: 1, borderColor: '#ccc', marginTop: 10, paddingTop: 10,
  },
  subtitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 8, marginTop: 8 },
  label: { marginTop: 6 },
  input: {
    borderWidth: 1, borderColor: '#aaa', padding: 8, marginBottom: 8, borderRadius: 4,
  },
  total: {
    fontSize: 20, marginVertical: 16, textAlign: 'center', fontWeight: 'bold',
  },
  summaryBox: {
    borderTopWidth: 2, paddingTop: 16, marginTop: 20,
  },
  summaryTitle: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center',
  },
  summaryItem: {
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
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