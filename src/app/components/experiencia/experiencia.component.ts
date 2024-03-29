import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  expe: Experiencia[] = [];

  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService) { }

  IsLogged = false; 

  ngOnInit(): void {
    this.cargarExperiencia();
    if(this.tokenService.getToken()){
      this.IsLogged = true;
    }else {
      this.IsLogged = false;
    }
  }
  cargarExperiencia():void{
    this.sExperiencia.lista().subscribe(data => {this.expe = data;})
  }

  delete(id?: number){
    if(id != undefined){
      this.sExperiencia.delete(id).subscribe({
        next: data => {
          this.cargarExperiencia();
        }, error: err => {
          alert("No se pudo eliminar experiencia");
        }
      }
      )     
    }
  }
}


