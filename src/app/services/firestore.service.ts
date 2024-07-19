import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Producto } from '../components/nueva-funcionalidad/nueva-funcionalidad.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private productosSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);
  public productos$: Observable<Producto[]> = this.productosSubject.asObservable();

  constructor(private firestore: AngularFirestore) {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.firestore.collection(environment.TABLAS.productos).snapshotChanges().pipe(
      map((docsProductosRef: any) => {
        return docsProductosRef.map((productoRef: any) => {
          let producto: Producto = productoRef.payload.doc.data() as Producto;
          producto['id'] = productoRef.payload.doc.id;
          return producto;
        });
      })
    ).subscribe((productos: any) => {
      this.productosSubject.next(productos);
    });
  }
}
