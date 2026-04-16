const BASE_URL = 'http://localhost:8080/api/presupuestos';

export const presupuestoService = {
  crear: async (datos) => {
    // Aquí irá el fetch o axios cuando el backend esté listo
    console.log("Enviando al backend:", datos);
  },
  listar: async () => {
    // Para el historial
    return [];
  }
};