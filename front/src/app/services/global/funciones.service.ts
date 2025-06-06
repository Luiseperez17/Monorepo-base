import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  [x: string]: any;

  login: any;
  isLoginPage: boolean = false;
  public env = environment;
  public urlApi     = this.env.urlApi;

  constructor(private http: HttpClient) { }

  // funcion alert de confirmacion
  confirmacion(titulo:any,mensaje:any,tipo:any,callback:any,callbackCancel:any=()=>{}){
    Swal.fire({
        title: titulo,
        html: mensaje,
        icon: tipo,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Continuar",
        reverseButtons: true
    })
    .then((resultado:any) => {
      if(resultado.value){
        return callback();
      }else{
        return callbackCancel();
      }
    });
  }

  //funcion que permite crear una alerta
  alerta(titulo:any,mensaje:any,tipo:any,callback:any) {
      Swal.fire({
          title: titulo,
          html: mensaje,
          icon: tipo,
          reverseButtons: true,
          confirmButtonText: 'Aceptar'
        })
        .then(() => {
          return callback();
      });
  }

  //valido si hay sesion
  haySesion(){
    this.login = sessionStorage['login'];
    if(this.login == 1 && this.login != undefined){
      return true;
    }else{
      return false;
    }
  }

  //validaciones  para donde mostrar la nav cuando no hay login
  setLoginPage(value: boolean): void {
    this.isLoginPage = value;
  }

  //validacion de emial
  validaEmail(mail:String){
      let salida  = false;
      const regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        // Se utiliza la funcion test() nativa de JavaScript
        if (regex.test(mail.trim())){
            salida  = false;
        }else{
            salida  = true;
        }
        return salida;
  }

  //funciones log
  log(message:any){
    let logs: any[] = [];

    // Verificar si existen logs almacenados en localStorage
    if (localStorage.getItem('log')) {
        logs = JSON.parse(localStorage.getItem('log') || '{}');
    }
    const mensaje = this.obtenerFechaHora()+": "+message
    // Agregar el nuevo mensaje al array de logs
    logs.push({ mensaje });

    // Guardar el array actualizado en localStorage
    localStorage.setItem('log', JSON.stringify(logs));
  }
  //obtener fecha y hora
  obtenerFechaHora() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Agrega un 0 al mes si es necesario
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  //formateo el numero
  formatNumberWithThousandsSeparator(number:any) {
    // Convierte el número a una cadena
    let numberString = number.toString();

    // Usa una expresión regular para agregar los puntos como separadores de miles
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  numberFormat(number:any, decimalPlaces = 2) {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    });
  }

  //verificador de conexion a internet
  verificarConexion(): Promise<boolean> {
    // Intenta hacer una solicitud HTTP a un recurso externo (puedes usar google.com o cualquier otro sitio confiable)
    return this.http.get('https://www.google.com/', { observe: 'response' })
      .toPromise()
      .then(response => {
        // Si la solicitud es exitosa y recibimos una respuesta 200
        return true;
      })
      .catch(error => {
        // Si ocurre un error o no recibimos una respuesta 200
        return false;
      });
  }



}
