import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbName = 'miBaseDeDatos';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  constructor() {
    this.inicializarBaseDeDatos();
  }

  // Inicializar la base de datos y crear los almacenes
  private inicializarBaseDeDatos(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      // Crear almacenes según necesidad
      const almacenes = ['productos', 'modulos', 'trabajos'];
      almacenes.forEach(almacen => {
        if (!db.objectStoreNames.contains(almacen)) {
          db.createObjectStore(almacen, { keyPath: 'id', autoIncrement: true });
        }
      });
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('Base de datos inicializada con éxito');
    };

    request.onerror = (event) => {
      console.error('Error al abrir la base de datos:', (event.target as IDBOpenDBRequest).error);
    };
  }

  // Método para actualizar una lista completa en un almacén específico
  public actualizarLista<T>(almacen: string, items: T[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.db) return reject('Base de datos no inicializada');
      
      const transaction = this.db.transaction(almacen, 'readwrite');
      const store = transaction.objectStore(almacen);

      // Limpiar el almacén antes de actualizar con nuevos elementos
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        // Agregar cada item en la lista
        items.forEach(item => {
          store.add(item);
        });
        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => reject((event.target as IDBRequest).error);
      };
      clearRequest.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  // Método para obtener todos los elementos de un almacén específico
  public obtenerLista<T>(almacen: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('Base de datos no inicializada');
      const transaction = this.db.transaction(almacen, 'readonly');
      const store = transaction.objectStore(almacen);

      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  // Método para eliminar todos los elementos de un almacén específico
  public eliminarLista(almacen: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('Base de datos no inicializada');
      const transaction = this.db.transaction(almacen, 'readwrite');
      const store = transaction.objectStore(almacen);

      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }
}
