import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IdataUser } from 'src/app/interfaces/auth/user.interface';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  constructor( private authService: AuthService ){}

  public dataUser?: IdataUser;

  ngOnInit(): void {
    this.dataUser = this.authService.user;
  }

}
