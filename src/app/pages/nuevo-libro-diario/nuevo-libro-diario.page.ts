import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { historialCaja, LibroDiario } from 'src/app/clases/libro-diario';
import { User } from 'src/app/clases/user';
import { AperturaDeCajaComponent } from 'src/app/components/apertura-de-caja/apertura-de-caja.component';
import { CarritoComponent } from 'src/app/components/carrito/carrito.component';
import { FormActualizarItemLibroDiarioComponent } from 'src/app/components/forms/form-actualizar-item-libro-diario/form-actualizar-item-libro-diario.component';
import { FormDetalleVentaComponent, MediosDePago } from 'src/app/components/forms/form-detalle-venta/form-detalle-venta.component';
import { NuevoFormDetalleVentaComponent } from 'src/app/components/nuevo-form-detalle-venta/nuevo-form-detalle-venta.component';
import { Carrito, FormasDePago, ItemCarrito, Pago, SelectorDeProductosComponent } from 'src/app/components/selector-de-productos/selector-de-productos.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { Venta } from 'src/app/components/selector-de-productos/selector-de-productos.component';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from '../lista-productos/lista-productos.page';
// import { Producto } from 'src/app/components/nueva-funcionalidad/nueva-funcionalidad.component';

export class NuevoLibroDiario {
    id!: string;
    cuadra?: boolean;
    fecha?: number;
    fechaString?: string;
    montoInicial: number = 0;
    montoTotal: number = 0;
    montoTotalEfectivo: number = 0;
    montoTotalDolares: number = 0;
    montoTotalMercadoPago: number = 0;
    montoTotalTransferencia: number = 0;
    montoTotalCredito: number = 0;
    montoTotalDebito: number = 0;
    montoTotalVale: number = 0;
    ventas: Venta[] = [];
    montoTotalNegativo: number = 0;
    historialDeCierre?: historialCaja[] = [];
}

@Component({
    selector: 'app-nuevo-libro-diario',
    templateUrl: './nuevo-libro-diario.page.html',
    styleUrls: ['./nuevo-libro-diario.page.scss'],
})
export class NuevoLibroDiarioPage implements OnInit {
    productos: Producto[] = [];
    isActionSheetOpen = false;
    actionSheetButtons: any = [];

    montoInicialOriginal: number = 0;
    mostrarModalCierreDeCaja = false;
    resultadoDeCaja: number = 0;
    montoDeCaja = null;
    libroDiarioHoy: NuevoLibroDiario = {
        id: '',
        fecha: -1,
        ventas: [],
        montoInicial: 0,
        montoTotal: 0,
        cuadra: false,
        fechaString: '',
        montoTotalEfectivo: 0,
        montoTotalMercadoPago: 0,
        montoTotalTransferencia: 0,
        montoTotalCredito: 0,
        montoTotalDebito: 0,
        montoTotalVale: 0,
        montoTotalNegativo: 0,
        montoTotalDolares: 0
    }
    mostrarMontoInicial = true;
    montoIngresado: number = 0;
    loggedUser!: User;

    constructor(private authService: AuthService,
        private database: DataBaseService,
        public funcionesUtiles: FuncionesUtilesService,
        private modalController: ModalController,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private productosService: ProductosService,
        private alertService: AlertService,
    ) {
        this.getCurrentUser();

    }

    ngOnInit(): void {
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 ya que los meses se indexan desde 0
        const dia = fechaActual.getDate().toString().padStart(2, '0');

        const idDiaActual = `${anio}-${mes}-${dia}`;
        console.log(environment.TABLAS.ingresosNuevoLibro, idDiaActual);

        this.database.obtenerPorId(environment.TABLAS.ingresosNuevoLibro, idDiaActual).subscribe(res => {

            if (!res.payload.exists) {
                this.libroDiarioHoy = this.obtenerNuevoLibroDiario(idDiaActual);//aca debe estar el problema
                this.database.crearConCustomId(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy.id, this.libroDiarioHoy);
            } else {
                this.libroDiarioHoy = res.payload.data() as NuevoLibroDiario;
                this.libroDiarioHoy['id'] = res.payload.id;
            }

        });
    }







    async mostrarModalAbrirCaja() {
        try {
            const modal = await this.modalController.create({
                component: AperturaDeCajaComponent,
                componentProps: {
                    isModal: false,
                    libroDiarioHoy: this.libroDiarioHoy
                },
            })

            modal.onDidDismiss().then(async (result: any) => {
                if (!result.data == undefined || !result.role) return;


                console.log("Guardando")
                if (result.role == 'guardar') {
                    this.spinnerService.showLoading("Cargando monto...");
                    this.libroDiarioHoy.montoInicial = Number(result.data);
                    await this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id)?.then(res => {
                        this.spinnerService.stopLoading();
                    });
                }

            })
            return await modal.present();
        } catch (err) {
        }
    }
    cargarActionSheet() {
        this.actionSheetButtons = [];

        if (this.funcionesUtiles.roleMinimoNecesario('EMPLEADO', this.loggedUser)) {
            this.actionSheetButtons.unshift({
                text: (this.libroDiarioHoy.montoInicial && this.libroDiarioHoy.montoInicial > 0)
                    ? 'Cambiar monto inicial' : 'Iniciar Caja',
                icon: 'calculator-outline',
                handler: () => {
                    this.mostrarModalAbrirCaja();
                },
            });
        }
        this.actionSheetButtons.push({
            text: 'Cancelar',
            role: 'cancel',
            icon: 'close',
            handler: () => { },
        })
    }
    setOpen(isOpen: boolean) {
        this.isActionSheetOpen = isOpen;
    }
    async cargarMontoInicial() {
        this.libroDiarioHoy.montoInicial = Number(this.montoIngresado);
        await this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id);
        this.cargarActionSheet();
    }

    obtenerNuevoLibroDiario(id: string) {
        let hoy = new Date();
        hoy.setHours(0);
        hoy.setMinutes(0);
        hoy.setSeconds(0);

        let libroDiario: NuevoLibroDiario = {
            montoTotalCredito: 0,
            montoTotalDebito: 0,
            montoTotalEfectivo: 0,
            montoTotalDolares: 0,
            montoTotalMercadoPago: 0,
            montoTotalNegativo: 0,
            montoTotalTransferencia: 0,
            montoTotalVale: 0,
            id,
            fecha: hoy.getTime(),
            fechaString: hoy.toString(),
            ventas: [],
            montoInicial: Number(this.montoIngresado) | 0,
            montoTotal: Number(this.montoIngresado) | 0,
            cuadra: false
        }
        this.montoIngresado = 0;//ver si resuelve la apertura de caja erronea, sino eliminar.
        return libroDiario;
    }

    showConfirmDialog() {
        this.alertService.alertConfirmacion('Confirmación', `La caja inicial es: $${this.montoIngresado}?`, 'Si, confirmo', this.cargarMontoInicial.bind(this));
    }

    getCurrentUser() {
        this.authService.getCurrentUser().subscribe(userRef => {
            if (!userRef) return;

            this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
                let usuario: any = res.payload.data();
                usuario['uid'] = res.payload.id;

                this.loggedUser = {
                    uid: usuario['uid'],
                    email: usuario['email'],
                    displayName: usuario['displayName'],
                    emailVerified: usuario['emailVerified'],
                    photoURL: usuario['photoURL'],
                    role: usuario['role'],
                    securityCode: usuario['securityCode']
                };

                this.cargarActionSheet();
            })
        })
    }

    obtenerMontoTotalPorMedioDePago(medioDePago: FormasDePago): number {
        let acumulador = 0;
        this.libroDiarioHoy.ventas.forEach((venta: Venta) => {
            venta.pagos.forEach((pago: Pago) => {
                if (pago.formaDePago === medioDePago) {
                    acumulador += pago.cantidad;
                }
            });
        });
        return acumulador;
    }

    obtenerMontoTotalPorNegativo(): number {
        let acumulador = 0;
        this.libroDiarioHoy.ventas.forEach((venta: Venta) => {
            if (venta.total < 0) {
                acumulador += venta.total;
            }
        });
        return acumulador;
    }

    comprobar() {
        if (this.libroDiarioHoy.montoTotalEfectivo && this.libroDiarioHoy.montoInicial && this.montoDeCaja) {

            this.resultadoDeCaja = (this.libroDiarioHoy.montoTotalEfectivo + this.libroDiarioHoy.montoInicial) - this.montoDeCaja;

            let mensaje = '';
            if (this.resultadoDeCaja > 0) {//(falta plata en la caja)
                mensaje = 'falta plata en la caja';
            }
            else if (this.resultadoDeCaja < 0) {//(hay de mas en la caja)
                mensaje = 'hay de mas en la caja';
            } else {//Cerro perfecto!
                mensaje = 'Cerro perfecto!';
            }

            if (!this.libroDiarioHoy.historialDeCierre) {
                this.libroDiarioHoy.historialDeCierre = [];
            }

            this.libroDiarioHoy.historialDeCierre.push({
                fecha: Date.now(),
                fechaString: new Date().toLocaleString(),
                mensaje,
                usuario: this.loggedUser.displayName || '',
                resultadoDeCaja: this.montoDeCaja - (this.libroDiarioHoy.montoTotalEfectivo + this.libroDiarioHoy.montoInicial),
            });

            this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id);
        }

    }
    detenerPropagacion(e: any) {
        e.stopPropagation();
    }
    reiniciarMontoInicialDeCaja() {
        this.libroDiarioHoy.montoInicial = 0;
    }


    async mostrarModalEditarVenta(venta: any) {
        try {
            const modal = await this.modalController.create({
                component: FormActualizarItemLibroDiarioComponent,
                componentProps: {
                    item: venta
                },
            })

            modal.onDidDismiss().then((result: any) => {
                if (!result.role) return;
                let necesitaActualizar = false;


                // if (result.role == 'confirmarActualizacion') {
                //     necesitaActualizar = true;

                // } else if (result.role == 'eliminarItemVenta') {
                //     let indexAEliminar: number = this.libroDiarioHoy.ventas.findIndex(auxVenta => auxVenta == venta);
                //     //console.log(indexAEliminar)
                //     if (indexAEliminar != -1) {
                //         this.libroDiarioHoy.ventas.splice(indexAEliminar, 1);
                //         necesitaActualizar = true;
                //     }

                // }
                // if (necesitaActualizar) {
                //     this.libroDiarioHoy.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(FormasDePago.EFECTIVO);//total en efectivo
                //     this.libroDiarioHoy.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(FormasDePago.TRANSFERENCIA);//total en efectivo
                //     this.libroDiarioHoy.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(FormasDePago.MERCADO_PAGO);//total en efectivo
                //     this.libroDiarioHoy.montoTotalCredito = this.obtenerMontoTotalPorMedioDePago(FormasDePago.TARJETA_CREDITO);//total en efectivo
                //     this.libroDiarioHoy.montoTotalDebito = this.obtenerMontoTotalPorMedioDePago(FormasDePago.TARJETA_DEBITO);//total en efectivo
                //     this.libroDiarioHoy.montoTotalVale = this.obtenerMontoTotalPorMedioDePago(FormasDePago.VALE);//total en efectivo
                //     this.libroDiarioHoy.montoTotalNegativo = this.obtenerMontoTotalPorNegativo();//total negativo

                //     this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id)?.then(res => {
                //         this.toastService.simpleMessage('Exito', 'Se modifico la venta', ToastColor.success);
                //     });
                // }

            })
            return await modal.present();
        } catch (err) {
        }

    }


    mostrarOpciones() {
        this.setOpen(true);
    }

    async nuevoCarrito() {
        try {
            const modal = await this.modalController.create({
                component: SelectorDeProductosComponent,
                componentProps: {
                    // productos: this.productos,
                    isModal: false
                },
            })

            modal.onDidDismiss().then((result: any) => {
                if (!result.data || !result.role) return;


                if (result.role == 'ventaProcesada') {

                    if (!this.libroDiarioHoy.montoTotalEfectivo) {
                        this.libroDiarioHoy.montoTotalEfectivo = Number(this.libroDiarioHoy.montoInicial);
                    }

                    this.libroDiarioHoy.ventas = this.libroDiarioHoy.ventas || [];
                    this.libroDiarioHoy.ventas.push(result.data);
                    console.log(result.data)

                    result.data.pagos.forEach((pago: { formaDePago: FormasDePago, cantidad: number }) => {
                        console.log(pago)
                        switch (pago.formaDePago) {
                            case FormasDePago.EFECTIVO:
                                if (!this.libroDiarioHoy.montoTotalEfectivo) {
                                    this.libroDiarioHoy.montoTotalEfectivo = 0;
                                }
                                this.libroDiarioHoy.montoTotalEfectivo += pago.cantidad;
                                break;
                            case FormasDePago.DOLARES:
                                if (!this.libroDiarioHoy.montoTotalDolares) {
                                    this.libroDiarioHoy.montoTotalDolares = 0;
                                }
                                this.libroDiarioHoy.montoTotalDolares += pago.cantidad;
                                break;
                            case FormasDePago.TRANSFERENCIA:
                                if (!this.libroDiarioHoy.montoTotalTransferencia) {
                                    this.libroDiarioHoy.montoTotalTransferencia = 0;
                                }
                                this.libroDiarioHoy.montoTotalTransferencia += pago.cantidad;
                                break;
                            case FormasDePago.MERCADO_PAGO:
                                if (!this.libroDiarioHoy.montoTotalMercadoPago) {
                                    this.libroDiarioHoy.montoTotalMercadoPago = 0;
                                }
                                this.libroDiarioHoy.montoTotalMercadoPago += pago.cantidad;
                                break;
                            case FormasDePago.TARJETA_CREDITO:
                                if (!this.libroDiarioHoy.montoTotalCredito) {
                                    this.libroDiarioHoy.montoTotalCredito = 0;
                                }
                                this.libroDiarioHoy.montoTotalCredito += pago.cantidad;
                                break;
                            case FormasDePago.TARJETA_DEBITO:
                                if (!this.libroDiarioHoy.montoTotalDebito) {
                                    this.libroDiarioHoy.montoTotalDebito = 0;
                                }
                                this.libroDiarioHoy.montoTotalDebito += pago.cantidad;
                                break;
                            case FormasDePago.VALE:
                                if (!this.libroDiarioHoy.montoTotalVale) {
                                    this.libroDiarioHoy.montoTotalVale = 0;
                                }
                                this.libroDiarioHoy.montoTotalVale += pago.cantidad;
                                break;
                            default:
                                // Handle any other cases if needed
                                break;
                        }
                    });
                    this.libroDiarioHoy.montoTotalNegativo = this.obtenerMontoTotalPorNegativo();//total negativo
                    console.log(this.libroDiarioHoy)
                    // this.libroDiarioHoy.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.EFECTIVO);//total en efectivo
                    // this.libroDiarioHoy.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.TRANSFERENCIA);//total en efectivo
                    // this.libroDiarioHoy.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.MERCADO_PAGO);//total en efectivo
                    // this.libroDiarioHoy.montoTotalCredito = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.TARJETA_CREDITO);//total en efectivo
                    // this.libroDiarioHoy.montoTotalDebito = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.TARJETA_DEBITO);//total en efectivo
                    // this.libroDiarioHoy.montoTotalVale = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.VALE);//total en efectivo

                    //   this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id);
                }

            });
            return await modal.present();
        } catch (err) {
        }
    }
}