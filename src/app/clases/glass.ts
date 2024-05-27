export enum EstadoRepuesto {
    Usado = "Usado",
    Nuevo = "Nuevo"
}

export enum Ubicaciones {
    LocalSanMartin = "LocalSanMartin",
    LocalAvellaneda = "LocalAvellaneda",
    Deposito = "Deposito",
    Exhibicion = "Exhibicion",
    ParaCambio = "ParaCambio"
}

export class Glass {
    id!: string;
    marca: string;
    modelo: string;
    precio: number;
    marco: boolean;
    oca: boolean;
    touch: boolean;
    curvo: boolean;
    stock: number;
    compatibilidad: any[];
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
