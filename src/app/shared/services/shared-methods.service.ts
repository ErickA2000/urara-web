import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

  constructor( private location: Location ) { }

  backRoute(){
    this.location.back();
  }

}
