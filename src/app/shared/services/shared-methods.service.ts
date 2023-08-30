import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

  constructor( private location: Location, private router: Router ) { }

  backRoute(){
    this.location.back();
  }

  changeRoute( route: string ){
    this.router.navigate([route]);
  }

}
