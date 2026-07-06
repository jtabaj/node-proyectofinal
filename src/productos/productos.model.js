import db from '../../config/firebase.js';

import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const productosCollection = collection(db, 'productos');

// Obtener todos los productos
export const obtenerProductos = async () => {
  const snapshot = await getDocs(productosCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener producto por ID
export const obtenerProducto = async (id) => {
  const docRef = doc(db, 'productos', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id, ...docSnap.data() } : null;
};

// Crear nuevo producto
export const crearProducto = async (nuevoProducto) => {
  const docRef = await addDoc(productosCollection, nuevoProducto);
  return { id: docRef.id, ...nuevoProducto };
};

// Actualizar producto
export const actualizarProducto = async (id, datosActualizados) => {
  const docRef = doc(db, 'productos', id);
  await updateDoc(docRef, datosActualizados);
  return await obtenerProducto(id);
};


// Eliminar producto
export const eliminarProducto = async (id) => {
  const docRef = doc(db, 'productos', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await deleteDoc(docRef);
    return { id, ...docSnap.data() };
  }
}