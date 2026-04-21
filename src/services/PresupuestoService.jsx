import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzPuunIosyXp4HaX0uKGaoG120I8FKEAE",
  authDomain: "rs-construccion-app.firebaseapp.com",
  projectId: "rs-construccion-app",
  storageBucket: "rs-construccion-app.firebasestorage.app",
  messagingSenderId: "637873989874",
  appId: "1:637873989874:web:0d909de0f97ae97fa3086b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const presupuestoService = {
  async crear(datos) {
    try {
      const docRef = await addDoc(collection(db, "presupuestos"), {
        ...datos,
        createdAt: serverTimestamp(),
      });
      return { id: docRef.id, success: true };
    } catch (error) {
      console.error("Error al crear presupuesto:", error);
      return { success: false, error: error.message };
    }
  },

  async listar() {
    try {
      const q = query(collection(db, "presupuestos"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));
    } catch (error) {
      console.error("Error al listar presupuestos:", error);
      return [];
    }
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