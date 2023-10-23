import { Component, Input, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/account/services/shopping.service';
import { IShopping } from 'src/app/interfaces/account/shopping.interface';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import alertSwal from 'src/app/utils/alertSwal';
import { openPDF } from 'src/app/utils/manageFile';

@Component({
  selector: 'app-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.scss']
})
export class BuysComponent {

  @Input() shopping?: IShopping

  constructor( private shoppingService: ShoppingService, private dialogsService: DialogsService ){}

  donwloadPDF( ){
    this.dialogsService.openSpinner();

    if( this.shopping ){

      this.shoppingService.getBillPDF( this.shopping?._id ).subscribe(
        res => {
          
          if( res.status == 500 || res.status == 400){
            this.dialogsService.close();
            alertSwal.messageError( "A ocurrido un error" );

          }else{
            const blobPDF = res.body;
            blobPDF.name = res.headers.get('filname') || "";
            
            openPDF( blobPDF as Blob, res.headers.get('filname') || "" );
            this.dialogsService.close();
          }
        }
      )
    }

  }

}
