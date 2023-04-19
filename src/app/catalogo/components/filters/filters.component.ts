import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  categorias = new FormControl();
  descuento = new FormControl();

  categoriasList = [
    {
      id: "adas",
      nombre: "niño"
    },
    {
      id: "asdas",
      nombre: "niña"
    }
  ];

  prueba(){
    console.log(this.descuento.value)
  }

}
