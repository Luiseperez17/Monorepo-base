import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnBlancoService {
  public enviroment = environment;
  public urlApi     = this.enviroment.urlApi;

  constructor() { }

  getdata(parametro:any):any{
    //return this.http.get(this.urlApi+"items/"+parametro);
  }

}
