import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  edu: Educacion[] = [];

  constructor(private educacionS: EducacionService, private tokenService: TokenService) { }
  IsLogged = false;

  ngOnInit(): void {
    this.cargarEducacion();
    if(this.tokenService.getToken()){
      this.IsLogged = true;
    } else{
      this.IsLogged = false;
    }
  }

  cargarEducacion(): void{
    this.educacionS.lista().subscribe(data => {this.edu = data;})
  }

  delete(id?: number){
    if(id != undefined){
      this.educacionS.delete(id).subscribe({
        next: data => {
          this.cargarEducacion();
        }, error: err => {
          alert("No se pudo eliminar");
        }
      }
      )
    }
  }

}
