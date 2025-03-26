import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuState = new BehaviorSubject<boolean>(false); // `false` indica que el menú está cerrado inicialmente
  menuState$ = this.menuState.asObservable();


  public enviroment = environment;
  public urlApi     = this.enviroment.urlApi;

  constructor(private http:HttpClient) { }

  getMenu(idUsuario:any):any{
    return this.http.get(this.urlApi+"items/"+idUsuario);
  }


}
