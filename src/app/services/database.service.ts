import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { boleta_estados } from 'src/app/services/info-compartida.service';
import { environment } from 'src/environments/environment';
import { OrderByDireccions } from '../pages/boletas/boletas.page';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {


  constructor(private firestore: AngularFirestore) { }


  //Crea un nuevo dato   
  public crear(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
  }

  public crearConCustomId(collection: string, id: string, data: any) {
    return this.firestore.collection(collection).doc(id).set(data);
  }

  public obtenerPorId(coleccion: string, id: string) {
    return this.firestore.collection(coleccion).doc(id).snapshotChanges();
    // El documento que tenga ese id tal cual este ahora, le saca una foto y me lo devuelve
  }

  public obtenerTodos(coleccion: string) {
    return this.firestore.collection(coleccion).snapshotChanges();
  }

  public actualizar(coleccion: string, data: any, id: string) {
    try {
      return this.firestore.collection(coleccion).doc(id).set(data);
    } catch (err) {
      console.error(err);
    }
  }

  public eliminar(collection: string, id: string) {
    return this.firestore.collection(collection).doc(id).delete();
  }

  async getBoletasPorDni(dni) {
    let collectionRef = this.firestore.collection(environment.TABLAS.boletasReparacion).ref;
    try {

      const respuesta = await collectionRef.where('dniCliente', '==', dni.toString()).get();
      if (respuesta.empty) return;

      return respuesta.docs;

    } catch (err) {
      //console.error(err);
    }
  }

  async getPedidosConseguidos() {
    let collectionRef = this.firestore.collection(environment.TABLAS.pedidos).ref;
    try {
      const respuesta = await collectionRef.where('conseguido', '==', true).get();

      if (respuesta.empty) return;

      return respuesta.docs;

    } catch (err) {
      //console.error(err);
    }
  }


  async paginatorStart(collection: string, interval: number) {
    let collectionRef = this.firestore.collection(collection).ref;
    try {
      const respuesta = await collectionRef.orderBy('title', 'asc').limit(interval).get();

      if (respuesta.empty) return;
      return respuesta.docs;

    } catch (err) {
      //console.error(err);
    }
  }

  async paginatorNext(collection: string, interval: number, lastDoc, orderByAtributo: string, orderByDirection: OrderByDireccions) {
    let collectionRef = this.firestore.collection(collection).ref;
    try {
      const respuesta = await collectionRef.
        orderBy(orderByAtributo, orderByDirection).
        limit(interval).
        startAfter(lastDoc).
        get();

      if (respuesta.empty) return null;
      return respuesta.docs;

    } catch (err) {
      // this.snackBar.open(`Error, al traer la informacion de ${collection} `, 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
      return null;
    }
  }
  async paginatorPrevious(collection: string, interval: number, firstDoc, orderByAtributo: string, orderByDirection: OrderByDireccions) {
    let collectionRef = this.firestore.collection(collection).ref;
    try {
      const respuesta = await collectionRef.
        orderBy(orderByAtributo, orderByDirection).//este debe ser opuesto al paginatorNext y paginatorStart
        limit(interval).
        startAfter(firstDoc).
        get();

      if (respuesta.empty) return null;
      return respuesta.docs.reverse();

    } catch (err) {
      // this.snackBar.open(`Error, al traer la informacion de ${collection} `, 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
      return null;
    }
  }

  // async paginatorNext(collection: string, interval: number, lastDoc) {
  //   let collectionRef = this.firestore.collection(collection).ref;
  //   try {
  //     const respuesta = await collectionRef.
  //       orderBy('title', 'asc').
  //       limit(interval).
  //       startAfter(lastDoc).
  //       get();

  //     if (respuesta.empty) return;


  //     return respuesta.docs;

  //   } catch (err) {
  //     //console.error(err);
  //   }
  // }


  // async paginatorPrevious(collection: string, interval: number, firstDoc) {
  //   let collectionRef = this.firestore.collection(collection).ref;
  //   try {
  //     const respuesta = await collectionRef.
  //       orderBy('title', 'desc').
  //       limit(interval).
  //       startAfter(firstDoc).
  //       get();

  //     if (respuesta.empty) return;
  //     return respuesta.docs.reverse();

  //   } catch (err) {
  //     //console.error(err);
  //   }
  // }


  
  async getBoletasPorIntervaloDeFecha(fechaInicio, fechaFin) {
    let collectionRef = this.firestore.collection(environment.TABLAS.boletasReparacion).ref;
    try {
      const respuesta = await collectionRef
        .where('fechaAlta', '>', fechaInicio)
        .where('fechaAlta', '<', fechaFin)
        .get();

      if (respuesta.empty) return null;

      return respuesta.docs;

    } catch (err) {
      // this.snackBar.open('Error, al traer los pedidos faltantes', 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
      return null;
    }
  }


  async obtenerBoletaPorNroBoleta(coleccion, nroBoleta) {
    let collectionRef = this.firestore.collection(coleccion).ref;
    try {
      const respuesta = await collectionRef.where('nroBoleta', '==', nroBoleta).get();

      if (respuesta.empty) return null;

      return respuesta.docs;

    } catch (err) {
      // this.snackBar.open(`Error, al traer las boletas con numero ${nroBoleta} `, 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
      return null;
    }
  }
  async obtenerBoletaPorDni(coleccion, dniCliente) {
    let collectionRef = this.firestore.collection(coleccion).ref;
    try {
      const respuesta = await collectionRef.where('dniCliente', '==', dniCliente).get();

      if (respuesta.empty) return null;

      return respuesta.docs;

    } catch (err) {
      // this.snackBar.open(`Error, al traer las boletas con DNI ${dniCliente} `, 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
      return null;
    }
  }


}