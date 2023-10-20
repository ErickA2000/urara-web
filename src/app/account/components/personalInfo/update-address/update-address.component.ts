import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/account/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Idireccion } from 'src/app/interfaces/auth/user.interface';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { LocationsInColombiaService } from 'src/app/shared/services/locations-in-colombia.service';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';
import alertSwal from 'src/app/utils/alertSwal';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})
export class UpdateAddressComponent implements OnInit {

  public typesAddress: string[] = [ "casa", "trabajo", "otro" ];
  public typeAddressSelected: string = "";
  
  public typesStreet: string[] = [ "avenida", "avenida calle", "avenida carrera", "calle", "carrera", "circular", "circunvalar", 
  "diagonal", "manzana", "Transversal", "via" ];
  public typeStreetSelected: string = "calle";

  public countries: string[] = [ "colombia" ];
  public departments: string[] = [];
  public citiesOrMunicipalities: string[] = [];

  constructor( private sharedMethodsService: SharedMethodsService, private locationsColombia: LocationsInColombiaService, 
    private dialogsService: DialogsService, private fb: FormBuilder, private authService: AuthService, private userService: UserService ){}

  addressForm = this.fb.group({
    titulo: ['', [Validators.required]],
    tituloOtro: ['', [ Validators.minLength(3) ]],
    pais: ['', [ Validators.required ]],
    departamento: ['', [ Validators.required ]],
    ciudad: ['', [ Validators.required ]],
    barrio: ['', [ Validators.required ]],
    tipocalle: ['', [ Validators.required ]],
    callenumero: ['', [ Validators.required ]],
    numero1: ['', [ Validators.minLength(1) ]],
    numero2: ['', [ Validators.minLength(1) ]],
    especificacionOpcional: ['', [ Validators.minLength(5) ]],
    forInvoice: [ false ]
  });

  ngOnInit(): void {

      
  }

  save(){
    this.dialogsService.openSpinner();
    let tempDireccion: Idireccion = {
      titulo: '',
      pais: this.addressForm.get('pais')?.value!,
      departamento: this.addressForm.get('departamento')?.value!,
      ciudad: this.addressForm.get('ciudad')?.value!,
      barrio: this.addressForm.get('barrio')?.value!,
      tipocalle: this.addressForm.get('tipocalle')?.value!,
      callenumero: this.addressForm.get('callenumero')?.value!,
      numero1: this.addressForm.get('numero1')?.value!,
      numero2: this.addressForm.get('numero2')?.value!,
      especificacionOpcional: '',
      forInvoice: this.addressForm.get('forInvoice')?.value!
    };

    let direcciones = this.authService.user.direcciones;

    if( this.addressForm.get('titulo')?.value != "otro" ){
      tempDireccion.titulo = this.addressForm.get('titulo')?.value!;
    }else{
      tempDireccion.titulo = this.addressForm.get('tituloOtro')?.value!;
    }

    tempDireccion.especificacionOpcional = this.addressForm.get('especificacionOpcional')?.value!;

    direcciones.push(tempDireccion);

    this.userService.updateData( { direcciones } ).subscribe(
      res => {

        if( res.success ){
          this.dialogsService.close();
          alertSwal.messageSuccess( "Agregada dirección", "" );
          this.sharedMethodsService.changeRoute('/site/account/personal-info');

        }else{
          this.dialogsService.close();
          alertSwal.messageError( res.message || "" );
        }

      }
    )
  }

  searchDepartments( country: string ){
    this.dialogsService.openSpinner();
    this.departments = [];

    if( country.toLowerCase() === "colombia"){

      this.locationsColombia.getLocation().subscribe(
        res => {
          
          for( let depa of res ){
            if( !this.departments.includes(depa.departamento) ){
              this.departments.push(depa.departamento);
            }
          }
          this.departments = this.departments.sort( (a: string, b: string) => a.localeCompare(b) );
          this.dialogsService.close();

        }
      )
    }
  }

  searchCitiesOrMunicipalities( department: string ){
    this.dialogsService.openSpinner();
    this.citiesOrMunicipalities = [];

    this.locationsColombia.getInfoDepartment( department ).subscribe(
      res => {

        for( let depa of res ){
          if( !this.citiesOrMunicipalities.includes(depa.municipio) ){
            this.citiesOrMunicipalities.push( depa.municipio );
          }
        }
        this.citiesOrMunicipalities = this.citiesOrMunicipalities.sort( (a: string,b: string) => a.localeCompare(b) );
        this.dialogsService.close();

      }
    )
  }

  selectTypeAddress( typeAddress: string ){
    this.typeAddressSelected = typeAddress;
  }

  selectTypeStreet( typeStreet: string ){
    this.typeStreetSelected = typeStreet;
  }

  back(){
    this.sharedMethodsService.backRoute();
  }
}
