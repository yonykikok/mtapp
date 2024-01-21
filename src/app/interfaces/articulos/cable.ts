import { Articulo } from "src/app/clases/articulo";


export enum compatibilidadCableUsb {
    v8 = 'ficha comun',
    type_c = 'ficha tipo c',
    lightning = 'ficha iphone',
    otros = '--',
}
export interface Cable extends Articulo {
    marca: string,
    compatibilidad: compatibilidadCableUsb[],
    imagen: string,
}