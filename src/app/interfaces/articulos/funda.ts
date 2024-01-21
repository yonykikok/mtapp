import { Articulo } from "src/app/clases/articulo";

export enum tiposFundas {
    silicona = 'silicona',
    armor = 'rigidas',
    animada = 'animada',
    ejecutiva = 'con tapa',
    case = 'original'
}
export interface Funda extends Articulo{
    modelo: string,
    marca: string,
    resistenteGolpes: boolean,
    tipo: tiposFundas,
    imagen: string
}