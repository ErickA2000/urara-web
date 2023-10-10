import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/shared/services/categoria.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit{

  filtrosForm = new FormGroup({
    categoria: new FormControl(),
    descuento: new FormControl(false)
  })

  constructor( private categoriaService: CategoriaService, private router: Router ){}

  categoriasList: ListCategory[] = [];

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){

    this.categoriaService.getCategorias().subscribe(
      res => {

        if( res.success ){

          for( let category of res.data ){

            const tempCategory: ListCategory = {
              id: category._id,
              nombre: category.nombre
            };

            this.categoriasList.push(tempCategory);
          }
        }

      }
    )
  }

  filter(){
  
    this.router.navigate([], {
      queryParams: {
        filter: "categoria",
        value: this.filtrosForm.get("categoria")?.value,
        discount: this.filtrosForm.get("descuento")?.value
      }
    });
  }

}

interface ListCategory{
  id: string;
  nombre: string
}