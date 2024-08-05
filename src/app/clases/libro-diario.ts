export interface historialCaja {
    fecha: number,
    fechaString: string,
    mensaje: string,
    usuario: string,
    resultadoDeCaja: number
}

export class LibroDiario {
    id!: string;
    cuadra?: boolean;
    fecha?: number;
    fechaString?: string;
    montoInicial?: number
    montoTotal?: number
    montoTotalEfectivo?: number
    montoTotalMercadoPago?: number
    montoTotalTransferencia?: number
    ventas: any[] = [];
    montoTotalNegativo?: number;
    historialDeCierre?: historialCaja[];
}
