export enum EstadoRepuesto {
    Usado = "Usado",
    Nuevo = "Nuevo"
}

export enum Ubicaciones {
    LocalSanMartin = "Nuevo",
    LocalAvellaneda = "Usado",
    Deposito = "Deposito",
    Exhibicion = "Exhibicion",
    ParaCambio = "ParaCambio"
}

export class Glass {
    marca: string;
    modelo: string;
    precio: number;
    marco: boolean;
    oca: boolean;
    touch: boolean;
    curvo: boolean;
    stock: number;
    compatibilidad: string[];
    ubicacionRepuesto: Ubicaciones;
    estado: EstadoRepuesto;

    constructor(marca: string, modelo: string, precio: number, marco: boolean, oca: boolean, touch: boolean, curvo: boolean, stock: number,
        compatibilidad: string[], ubicacionRepuesto: Ubicaciones, estado: EstadoRepuesto) {
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.marco = marco;
        this.oca = oca;
        this.touch = touch;
        this.curvo = curvo;
        this.stock = stock;
        this.compatibilidad = compatibilidad;
        this.ubicacionRepuesto = ubicacionRepuesto;
        this.estado = estado;
    }

    agregarStock(cantidad: number) {
        this.stock += cantidad;
    }

    quitarStock(cantidad: number) {
        if (this.stock >= cantidad) {
            this.stock -= cantidad;
        } else {
            console.log("No hay suficiente stock disponible.");
        }
    }
}
