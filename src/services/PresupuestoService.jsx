import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzPuunIosyXp4HaX0uKGaoG120I8FKEAE",
  authDomain: "rs-construccion-app.firebaseapp.com",
  projectId: "rs-construccion-app",
  storageBucket: "rs-construccion-app.firebasestorage.app",
  messagingSenderId: "637873989874",
  appId: "1:637873989874:web:0d909de0f97ae97fa3086b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Exportamos db para que otros archivos lo usen si hace falta

export const presupuestoService = {
  // GUARDAR
  async crear(datos) {
    try {
      // Usamos la fecha del sistema para evitar problemas de sincronización inmediatos
      const docRef = await addDoc(collection(db, "presupuestos"), {
        ...datos,
        fechaGuardado: new Date().toISOString() 
      });
      console.log("Guardado con ID:", docRef.id);
      return { id: docRef.id, success: true };
    } catch (error) {
      console.error("Error al crear presupuesto:", error);
      return { success: false, error: error.message };
    }
  },

  // ESTA ES LA FUNCIÓN QUE USARÁ EL HISTORIAL Y CLIENTES
  async obtenerTodos() {
    try {
      const q = query(collection(db, "presupuestos"), orderBy("fecha", "desc"));
      const snapshot = await getDocs(q);
      const resultados = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Datos recuperados:", resultados);
      return resultados;
    } catch (error) {
      console.error("Error al listar presupuestos:", error);
      return [];
    }
  },

  // Por si acaso algún componente todavía usa .listar()
  async listar() {
    return this.obtenerTodos();
  },

  async obtenerPorId(id) {
    try {
      const docRef = doc(db, "presupuestos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error("Error al obtener presupuesto:", error);
      return null;
    }
  }
};