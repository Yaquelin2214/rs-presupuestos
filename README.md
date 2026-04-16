# RS Gestión - Sistema de Presupuestos Profesionales 🏗️

Este es un proyecto real desarrollado para **Raúl Silva - Instalaciones Sanitarias**, diseñado para digitalizar y optimizar la creación de presupuestos técnicos.

## 🚀 Propósito del Proyecto
Optimizar el flujo de trabajo administrativo, permitiendo la generación de documentos PDF profesionales y el almacenamiento automático de clientes en una base de datos en la nube.

## 🛠️ Stack Tecnológico
- **Frontend:** React.js + Vite
- **Estilos:** Tailwind CSS (Diseño Industrial/Moderno)
- **Iconografía:** Lucide React
- **Backend:** Firebase Firestore (En desarrollo)
- **Documentación:** jsPDF para generación de reportes técnicos.

## 📸 Funcionalidades Visuales
- **Dashboard Principal:** Acceso rápido a las áreas clave del negocio.
- **Formulario Inteligente:** Cálculos automáticos de subtotales y totales.
- **Historial & Clientes:** Interfaz limpia para gestión de datos.


## ☁️ Integración con Firebase (Backend)

El sistema utiliza **Firebase Cloud Firestore** como base de datos NoSQL para garantizar la persistencia de datos y el acceso multiplataforma (escritorio y móvil).

### Configuración de la Base de Datos:
1. Se configuró un proyecto en modo de prueba para permitir el desarrollo ágil.
2. La estructura de datos se organiza en una colección principal:
   - `presupuestos`: Almacena cliente, teléfono, desglose de ítems, total y marca de tiempo.

### Seguridad y Despliegue:
- **Reglas de Firestore:** Configuradas para permitir lectura/escritura durante la fase de desarrollo.
- **Variables de Entorno:** Las credenciales se gestionan a través de un archivo de configuración centralizado (`firebase.js`).v

---
*Desarrollado con ❤️ por Yaquelin Rugel - Estudiante de Ingeniería Informática Duoc UC*