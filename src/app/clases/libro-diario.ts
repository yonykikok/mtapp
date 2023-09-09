interface historialCaja {
    fecha: number,
    fechaString: string,
    mensaje: string,
    usuario: string,
    resultadoDeCaja: number
}

export class LibroDiario {
    cuadra: boolean;
    fecha: number | Date;
    fechaString: string;
    montoInicial: number
    montoTotal: number
    montoTotalEfectivo: number
    montoTotalMercadoPago: number
    montoTotalTransferencia: number
    ventas: any[];
    montoTotalNegativo: number;
    historialDeCierre?: historialCaja[];
}
