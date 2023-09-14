import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { IChangePassword, IDataUserOptional } from 'src/app/interfaces/auth/user.interface';
import { IRequestEncrypt, IResponse } from 'src/app/interfaces/global.interface';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';
import alertSwal from 'src/app/utils/alertSwal';
import encryptAndDecrypt from 'src/app/utils/encryptAndDecrypt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.API_URL;

  constructor( private http: HttpClient, private transferDataLocalService: TransferDataLocalService ) { }

  public updateData( data: IDataUserOptional ): Observable<IResponse>{
    const url = `${this.baseUrl}/users/update`;

    const headers = new HttpHeaders()
      .set('token', localStorage.getItem('token') || "");

    try {
      const encrypt = encryptAndDecrypt.encrypt( data );
      const dataEncrypt: IRequestEncrypt = {
        reqEncrypt: encrypt
      };

      return this.http.put<IResponse>( url, dataEncrypt, { headers } )
        .pipe(
          tap(
            res => {
              try {
                const decrypt = encryptAndDecrypt.decrypt( res.data as string );
                this.transferDataLocalService.dataUser.emit(decrypt);
              } catch (error) {
                alertSwal.messageError("A ocurrio un error al mostar los cambios")
              }
            }
          ),
          catchError( err => of(err.error) )
        )

    } catch (error: any) {
      return of(error);
    }

  }

  public updatePassword( changePassword: IChangePassword ): Observable<IResponse>{
    const url = `${this.baseUrl}/users/update-clave`;

    const headers = new HttpHeaders()
      .set('token', localStorage.getItem('token') || "");
    
    try {
      const encrypt = encryptAndDecrypt.encrypt( changePassword );
      const dataEncrypt: IRequestEncrypt = {
        reqEncrypt: encrypt
      };

      return this.http.put<IResponse>( url, dataEncrypt, { headers } )
        .pipe(
          catchError( err => of(err.error) )
        );
    } catch (error: any) {
      return of(error);
    }
  }

}
