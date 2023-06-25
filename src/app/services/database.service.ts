import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { boleta_estados } from 'src/app/services/info-compartida.service';


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
      console.log(err);
    }
  }

  public eliminar(collection: string, id: string) {
    return this.firestore.collection(collection).doc(id).delete();
  }

  async getBoletasPorDni(dni) {
    let collectionRef = this.firestore.collection('boletas').ref;
    try {

      const respuesta = await collectionRef.where('dni', '==', dni).get();

      if (respuesta.empty) return;

      return respuesta.docs;

    } catch (err) {
      //console.log(err);
    }
  }

  async getPedidosConseguidos() {
    let collectionRef = this.firestore.collection('pedidos').ref;
    try {
      const respuesta = await collectionRef.where('conseguido', '==', true).get();

      if (respuesta.empty) return;

      return respuesta.docs;

    } catch (err) {
      //console.log(err);
    }
  }


  async paginatorStart(collection: string, interval: number) {
    let collectionRef = this.firestore.collection(collection).ref;
    try {
      const respuesta = await collectionRef.orderBy('title', 'asc').limit(interval).get();

      if (respuesta.empty) return;
      return respuesta.docs;

    } catch (err) {
      //console.log(err);
    }
  }



  async paginatorNext(collection: string, interval: number, lastDoc) {
    let collectionRef = this.firestore.collection(collection).ref;
    try {
      //console.log("sin errors")
      const respuesta = await collectionRef.
        orderBy('title', 'asc').
        limit(interval).
        startAfter(lastDoc).
        get();

      if (respuesta.empty) return;


      return respuesta.docs;

    } catch (err) {
      //console.log(err);
    }
  }


  async paginatorPrevious(collection: string, interval: number, firstDoc) {
    let collectionRef = this.firestore.collection(collection).ref;
    try {
      const respuesta = await collectionRef.
        orderBy('title', 'desc').
        limit(interval).
        startAfter(firstDoc).
        get();

      if (respuesta.empty) return;
      //console.log(respuesta.docs)
      return respuesta.docs.reverse();

    } catch (err) {
      //console.log(err);
    }
  }

}
