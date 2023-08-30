import { Component } from '@angular/core';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';

@Component({
  selector: 'app-home-account',
  templateUrl: './home-account.component.html',
  styleUrls: ['./home-account.component.scss']
})
export class HomeAccountComponent {

  links = [ 
    {
      es: "Información personal",
      en: "personal-info",
    }, 
    {
      es: "Seguridad",
      en: "security",
    },
    {
      es: "Mis compras",
      en: "my-buys"
    }
  ];
  activeLink: string = this.links[0].es;

  constructor( private sharedMethodServi: SharedMethodsService ) {
    this.route( this.links[0].en, this.links[0].es )
  }

  route( route: string, link: string ) {
    this.activeLink = link;
    this.sharedMethodServi.changeRoute( `/site/account/${route}` );
  }

}
