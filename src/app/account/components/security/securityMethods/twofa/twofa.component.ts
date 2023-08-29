import { Component } from '@angular/core';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';

@Component({
  selector: 'app-twofa',
  templateUrl: './twofa.component.html',
  styleUrls: ['./twofa.component.scss']
})
export class TwofaComponent {

  constructor( private sharedMethodsServi: SharedMethodsService ) { }

  back(){
    this.sharedMethodsServi.backRoute();
  }

}
