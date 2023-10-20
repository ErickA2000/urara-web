import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/account/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IdataUser } from 'src/app/interfaces/auth/user.interface';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import alertSwal from 'src/app/utils/alertSwal';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  constructor( private authService: AuthService, private userService: UserService, private dialogService: DialogsService ){}

  public dataUser?: IdataUser;

  ngOnInit(): void {
    this.dataUser = this.authService.user;
  }

  deleteAddress( index: number ){
    this.dialogService.openSpinner();
    this.dataUser?.direcciones.splice(index,1);

    this.userService.updateData( { direcciones: this.dataUser?.direcciones } ).subscribe(
      res => {

        if( res.success ){
          this.dialogService.close();
          alertSwal.messageSuccess( "Dirección eliminada", "" );
        }else{
          this.dialogService.close();
          alertSwal.messageError( res.message || "" );
        }

      }
    )
  }

}
