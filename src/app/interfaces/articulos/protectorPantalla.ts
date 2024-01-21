import { Articulo } from "src/app/clases/articulo";

export enum tipo {
    comun = 'comun',
    full = 'pantalla completa'
}
export interface ProtectorPantalla extends Articulo {
    modelo: string,
    tipo: tipo,
    compatibilidad: string[],
    imagen: string
}