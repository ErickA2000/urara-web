import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  filtrosForm = new FormGroup({
    categorias: new FormControl(),
    descuento: new FormControl(false)
  })

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
    console.log(this.filtrosForm.value)

  }

}
