import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { boleta_estados } from 'src/app/services/info-compartida.service';
import { environment } from 'src/environments/environment';
import { OrderByDireccions } from '../pages/boletas/boletas.page';
import { Observable } from 'rxjs';


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
    console.log(coleccion, data, id);
    try {
      return this.firestore.collection(coleccion).doc(id).update(data);
    } catch (err) {
      console.log(err);
      return;
    }
  }


  async getDiasSinVentas() {
    let collectionRef = this.firestore.collection('ingresos').ref;

    try {
      const respuesta = await collectionRef
        .where('ventas', '==', [])  // Utilizamos '==' para comparar con un array vacío
        .get();

      if (respuesta.empty) return null;

      return respuesta.docs;
    } catch (err) {
      console.error('Error al realizar la consulta:', err);
      return null;
    }
  }
  public eliminar(collection: string, id: string) {
    return this.firestore.collection(collection).doc(id).delete();
  }

  async getBoletasPorDni(dni: any) {
    let collectionRef = this.firestore.collection(environment.TABLAS.boletasReparacion).ref;
    try {

      const respuesta = await collectionRef.where('dniCliente', '==', dni.toString()).get();
      if (respuesta.empty) return;

      return respuesta.docs;

    } catch (err) {
      console.error(err);
      return;
    }
  }

  async getPedidosConseguidos() {
    let collectionRef = this.firestore.collection(environment.TABLAS.pedidos).ref;
    try {
      const respuesta = await collectionRef.where('conseguido', '==', true).get();

      if (respuesta.empty) return;

      return respuesta.docs;

    } catch (err) {
      return
      console.error(err);
    }
  }


  async paginatorStart(collection: string, interval: number) {
    let collectionRef = this.firestore.collection(collection).ref;
    try {
      const respuesta = await collectionRef.orderBy('title', 'asc').limit(interval).get();

      if (respuesta.empty) return;
      return respuesta.docs;

    } catch (err) {
      return;
      console.error(err);
    }
  }

  async paginatorNext(collection: string, interval: number, lastDoc: any, orderByAtributo: string, orderByDirection: OrderByDireccions) {
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
  async paginatorPrevious(collection: string, interval: number, firstDoc: any, orderByAtributo: string, orderByDirection: OrderByDireccions) {
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

  async getLibrosDiariosMensual(fechaInput: any) {
    let collectionRef = this.firestore.collection(environment.TABLAS.ingresos).ref;

    try {
      const fecha = new Date(fechaInput);
      const primerDiaMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
      const ultimoDiaMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

      const respuesta = await collectionRef
        .where('fecha', '>=', primerDiaMes.getTime())
        .where('fecha', '<=', ultimoDiaMes.getTime())
        .get();

      if (respuesta.empty) return null;

      return respuesta.docs;
    } catch (err) {
      console.error('Error al realizar la consulta:', err);
      return null;
    }
  }

  async getLibrosDiariosEnIntervalo(fechaInicio: any, fechaFin: any) {
    let collectionRef = this.firestore.collection(environment.TABLAS.ingresos).ref;

    try {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);

      const respuesta = await collectionRef
        .where('fecha', '>=', inicio.getTime())
        .where('fecha', '<=', fin.getTime())
        .get();

      if (respuesta.empty) return null;

      return respuesta.docs;
    } catch (err) {
      console.error('Error al realizar la consulta:', err);
      return null;
    }
  }

  async getBoletasModificadasHoy(fechaInicio: any, fechaFin: any) {
    let collectionRef = this.firestore.collection(environment.TABLAS.boletasReparacion).ref;
    try {
      const respuesta = await collectionRef
        .where('fechaUltimoCambioDeEstado', '>', fechaInicio)
        .where('fechaUltimoCambioDeEstado', '<', fechaFin)
        .get();

      if (respuesta.empty) return null;

      return respuesta.docs;

    } catch (err) {
      // this.snackBar.open('Error, al traer los pedidos faltantes', 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
      return null;
    }
  }

  async getBoletasPorIntervaloDeFecha(fechaInicio: any, fechaFin: any) {
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


  async obtenerBoletaPorNroBoleta(coleccion: any, nroBoleta: any) {
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

  async obtenerBoletaPorEstadoBoleta(coleccion: any, estado: boleta_estados) {
    let collectionRef = this.firestore.collection(coleccion).ref;
    try {
      const respuesta = await collectionRef.where('estado', '==', estado).get();

      if (respuesta.empty) return null;

      return respuesta.docs;

    } catch (err) {
      // this.snackBar.open(`Error, al traer las boletas con numero ${nroBoleta} `, 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
      return null;
    }
  }
  async obtenerBoletaPorDni(coleccion: any, dniCliente: any) {
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
  async obtenerBoletaPorModelo(coleccion: any, textoABuscar: string) {
    let collectionRef = this.firestore.collection(coleccion).ref;
    try {
      const respuesta = await collectionRef
        .orderBy('modelo')
        .startAt(textoABuscar)
        .endAt(textoABuscar + '\uf8ff')
        .get();

      if (respuesta.empty) return null;

      return respuesta.docs;

    } catch (err) {
      // Manejo de errores, por ejemplo, mostrar un mensaje de error
      // this.snackBar.open(`Error al buscar boletas por modelo: ${textoABuscar}`, 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
      return null;
    }
  }







  public obtenerUltimos60dias(coleccion: string): Observable<any[]> {
 // Obtén la fecha actual y la fecha de hace 60 días en milisegundos
 const fechaActualEnMillis = new Date().getTime();
 const fecha60DiasAtrasEnMillis = fechaActualEnMillis - (60 * 24 * 60 * 60 * 1000);

 // Realiza la consulta con el rango de fechas
 return this.firestore.collection(coleccion, ref =>
   ref.where('fecha', '>=', fecha60DiasAtrasEnMillis).where('fecha', '<=', fechaActualEnMillis)
 ).snapshotChanges();
}

}
