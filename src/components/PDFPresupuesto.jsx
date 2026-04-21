import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottom: 2, borderBottomColor: '#1e293b', pb: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  eslogan: { fontSize: 9, color: '#059669', marginTop: 2 },
  
  // DATOS DE RAÚL (FIJOS)
  providerInfo: { textAlign: 'right', fontSize: 9, color: '#475569' },
  providerName: { fontWeight: 'bold', color: '#0f172a', fontSize: 10 },

  infoSection: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, padding: 10, backgroundColor: '#f8fafc' },
  infoGroup: { width: '50%', marginBottom: 8 },
  label: { fontWeight: 'bold', color: '#64748b', fontSize: 8, marginBottom: 2, textTransform: 'uppercase' },
  value: { color: '#1e293b', fontWeight: 'bold', fontSize: 10 },

  tableTitle: { fontSize: 10, fontWeight: 'bold', color: '#fff', backgroundColor: '#1e293b', padding: 5, marginTop: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', minHeight: 25, alignItems: 'center' },
  colCant: { width: '10%', padding: 5, textAlign: 'center' },
  colDesc: { width: '60%', padding: 5 },
  colPrec: { width: '15%', padding: 5, textAlign: 'right' },
  colTotal: { width: '15%', padding: 5, textAlign: 'right', fontWeight: 'bold' },

  footer: { marginTop: 30, textAlign: 'right', borderTop: 2, borderTopColor: '#1e293b', pt: 10 },
  grandTotal: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' }
});

const PresupuestoPDF = ({ datos, tipo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Encabezado: RS GESTIÓN + DATOS RAÚL */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>RS GESTIÓN</Text>
          <Text style={styles.eslogan}>"Calidad y Compromiso en cada detalle"</Text>
        </View>
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>RAÚL SILVA DONOSO</Text>
          <Text>Teléfono: +56 9 8805 3584</Text>
          <Text>Correo: SILVAD0011@GMAIL.COM</Text>
        </View>
      </View>

      {/* Datos del Cliente y Obra */}
      <View style={styles.infoSection}>
        <View style={styles.infoGroup}>
          <Text style={styles.label}>CLIENTE</Text>
          <Text style={styles.value}>{datos.clienteNombre || '---'}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.label}>TELÉFONO</Text>
          <Text style={styles.value}>{datos.clienteTelefono || '---'}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.label}>DIRECCIÓN / OBRA</Text>
          <Text style={styles.value}>{datos.clienteDireccion || '---'}</Text>
        </View>
        <View style={styles.infoGroup}>
          <Text style={styles.label}>TIPO DE TRABAJO</Text>
          <Text style={styles.value}>{tipo === 'vendida' ? 'OBRA INTEGRAL' : 'MANO DE OBRA'}</Text>
        </View>
      </View>

      {/* Materiales */}
      {tipo === 'vendida' && datos.materiales?.length > 0 && (
        <View>
          <Text style={styles.tableTitle}>DETALLE DE MATERIALES</Text>
          {datos.materiales.map((m, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.colCant}>{m.cant}</Text>
              <Text style={styles.colDesc}>{m.desc}</Text>
              <Text style={styles.colPrec}>${Number(m.precio).toLocaleString()}</Text>
              <Text style={styles.colTotal}>${Number(m.total).toLocaleString()}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Mano de Obra */}
      <View style={{ marginTop: 10 }}>
        <Text style={styles.tableTitle}>DETALLE DE MANO DE OBRA</Text>
        {datos.manoObra?.map((mo, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.colCant}>{mo.cant}</Text>
            <Text style={styles.colDesc}>{mo.detalle}</Text>
            <Text style={styles.colPrec}>${Number(mo.precio).toLocaleString()}</Text>
            <Text style={styles.colTotal}>${Number(mo.total).toLocaleString()}</Text>
          </View>
        ))}
      </View>

      {/* Footer del PDF con desglose */}
<View style={styles.footer}>
  {tipo === 'vendida' && (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4 }}>
        <Text style={{ color: '#64748b', fontSize: 9 }}>TOTAL MATERIALES: </Text>
        <Text style={{ fontSize: 10, fontWeight: 'bold', width: 80, textAlign: 'right' }}>
          ${Number(datos.subtotalMateriales || 0).toLocaleString('es-CL')}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 }}>
        <Text style={{ color: '#64748b', fontSize: 9 }}>TOTAL MANO DE OBRA: </Text>
        <Text style={{ fontSize: 10, fontWeight: 'bold', width: 80, textAlign: 'right' }}>
          ${Number(datos.subtotalManoObra || 0).toLocaleString('es-CL')}
        </Text>
      </View>
    </>
  )}
  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#1e293b', paddingTop: 8 }}>
    <Text style={{ color: '#1e293b', fontSize: 11, fontWeight: 'bold' }}>TOTAL NETO A PAGAR: </Text>
    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1e293b', width: 100, textAlign: 'right' }}>
      ${Number(datos.totalFinal).toLocaleString('es-CL')}
    </Text>
  </View>
</View>
    </Page>
  </Document>
);

export default PresupuestoPDF;