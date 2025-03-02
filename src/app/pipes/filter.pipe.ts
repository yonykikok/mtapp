import { Pipe, PipeTransform } from '@angular/core';
import { EquipoDisponible } from '../services/info-compartida.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(equipos: EquipoDisponible[], searchText: string): EquipoDisponible[] {
    if (!searchText) {
      return equipos;
    }
    searchText = searchText.toLowerCase();
    return equipos.filter(equipo => 
      equipo.marca.toLowerCase().includes(searchText) ||
      equipo.modelo.toLowerCase().includes(searchText)
    );
  }
}
