import { Articulo } from "src/app/clases/articulo";

export enum compatibilidadJoystick {
    ios = 'ios',
    android = 'android',
    pc = 'pc',
    notebook = 'notebook',
    ps2 = 'ps2',
    ps3 = 'ps3',
    ps4 = 'ps4',
    ps5 = 'ps5',
}
export enum conexionJoystick {
    cable = 'cable',
    usb = 'usb',
    bluetooth = 'inalambrica bluetooth'
}
export interface Joystick extends Articulo {
    marca: string,
    compatibilidad: compatibilidadJoystick[],
    conexion: conexionJoystick,
    imagen: string
}