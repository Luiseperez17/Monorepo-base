import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public env = environment;
  public urlApi     = (this.env.demo) ? this.env.urlApiDemo : this.env.urlApi;

  constructor(private http:HttpClient,){}

  getUsuarios():any{
    return this.http.get(this.urlApi+"usuarios");
  }



}
