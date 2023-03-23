import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  [x: string]: any;

  persona: persona = null;

  constructor(public personaService: PersonaService, private tokenService: TokenService) { }
  IsLogged = false;

  ngOnInit(): void {
    this.cargarPersona();
    if(this.tokenService.getToken()){
      this.IsLogged = true;
    } else{
      this.IsLogged = false;
    }
   }

   cargarPersona(){
    this.personaService.detail(2).subscribe(
      data => {this.persona = data}
    )
   }

}
