import { Component, OnInit } from '@angular/core';
import { FuncionesService } from 'src/app/services/global/funciones.service';//archivo de funciones importante
import { environment } from 'src/environments/environment';//variables de entorno
import { EnBlancoService } from 'src/app/services/components/pages/enBlanco/en-blanco.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-enblanco',
  templateUrl: './enblanco.component.html',
  styleUrls: ['./enblanco.component.css']
})
export class EnblancoComponent implements OnInit{
  
  
  //funciones es un archivo importante y debe ir en todos los componentes que se creen, ya que allí están las funciones globales básicas.
  dataSesion: any;
  searchResults: any;

  //pipe's
  searchText: any;
  pageNumber = 1;
  pageSize =  10;//total de registros por pagina
  totalPages = 1;

 
  //si se desea crear un servicio para el componente se debe crear en la ruta src/services/components
  constructor(private funciones:FuncionesService,private enBlanco:EnBlancoService,public router:Router,){}

  dataBanco:any ={
    datos: "",
    estado:""
  }



  ngOnInit(): void {
    // valido si hay sesion
    if(this.funciones.haySesion()){
      this.dataSesion = JSON.parse(sessionStorage['dataUsuario']);
      this.funciones.setLoginPage(true);
    }else{
      this.router.navigate(['']);
    }  
  }

  buscarBlanco(searchText: string) {
    this.searchResults = this.dataBanco.filter((item: {[x: string]: { toString:() => string;};}) =>
      Object.keys(item).some(key => item[key].toString().toLowerCase().includes(searchText.toLowerCase()))
    );
    this.pageNumber = 1;
    this.calculateTotalPages();
  }




  //paginado
  changePage(page: number){this.pageNumber = Math.max(1, Math.min(page, this.totalPages));}
  
  nextPage(){this.changePage(this.pageNumber + 1);}
  previousPage(){this.changePage(this.pageNumber - 1);}
  
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.searchResults.length / this.pageSize);
    this.changePage(this.pageNumber);
  }
  //fin paginador


}