import { Articulo } from "src/app/clases/articulo";

export enum conexionAuricular {
    lightning = 'ficha iphone',
    type_c = 'ficha tipo c',
    auxiliar = 'ficha auxiliar',
    bluetooth = 'inalambrica bluetooth'
}
export interface Auricular extends Articulo {
    marca: string,
    conexion: conexionAuricular[],
    cancelacionRuido: boolean,
    imagen: string,
    microfono: boolean
}
