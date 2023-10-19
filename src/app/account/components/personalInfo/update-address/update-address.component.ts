import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { LocationsInColombiaService } from 'src/app/shared/services/locations-in-colombia.service';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})
export class UpdateAddressComponent implements OnInit {

  public typesAddress: string[] = [ "casa", "trabajo", "otro" ];
  public typeAddressSelected: string = "";

  public countries: string[] = [ "colombia" ];
  public departments: string[] = [];
  public citiesOrMunicipalities: string[] = [];

  constructor( private sharedMethodsService: SharedMethodsService, private locationsColombia: LocationsInColombiaService, 
    private dialogsService: DialogsService ){}

  ngOnInit(): void {

      
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
        this.dialogsService.close();

      }
    )
  }

  selectTypeAddress( typeAddress: string ){
    this.typeAddressSelected = typeAddress;
    
  }

  back(){
    this.sharedMethodsService.backRoute();
  }
}
