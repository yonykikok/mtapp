import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsValidatorsService {
  constructor() { }

  isNumber(control: AbstractControl) {
    const numero = Number(control.value);
    return isNaN(control.value)
      ? { isNaN: true }
      : null;
  }

  isInt(control: AbstractControl) {
    const numero = Number(control.value);
    return isNaN(numero) || !Number.isInteger(numero)
      ? { isNotIntNumber: true }
      : null;
  }

  validImeiNumber(control: AbstractControl) {
    if (
      !Number.isInteger(control.value) ||
      control.value.toString().includes('e') ||
      control.value.toString().includes('.') ||
      control.value.toString().length != 15
    ) {
      return { invalidImeiNumber: true }
    } else {
      return null;
    }
  }


}
