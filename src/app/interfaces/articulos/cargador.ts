import { Articulo } from "src/app/clases/articulo";


export enum tiposCargadores {
    inalambrico = 'inalambrico',
    con_cable = 'con cable',
}
export enum compatibilidad {
    v8 = 'ficha comun',
    type_c = 'ficha tipo c',
    lightning = 'ficha iphone',
    otros = '--',
}
export enum velocidad {
    carga_normal = 'carga lenta',
    carga_rapida = 'carga rapida',
    turbo_power = 'turbo power',
    otros = '--',
}
export interface Cargador extends Articulo {
    marca: string,
    velocidad: velocidad,
    compatibilidad: compatibilidad[],
    imagen: string,
    tipo: tiposCargadores;

 
}