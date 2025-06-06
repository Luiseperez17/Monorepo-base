import { Injectable } from '@angular/core';
import { IndexdbService } from 'src/app/services/global/db/indexdb.service';
import { openDB } from 'idb';
import { FuncionesService } from 'src/app/services/global/funciones.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginDbService {


  // private db: IDBDatabase | undefined;
  public dbName:any = environment.dbName;
  public dbVersion:any = environment.dbVersion;

  constructor() { }



  async addData(data: any,tabla:any): Promise<void> {
    const db = await openDB(this.dbName, this.dbVersion);
    const transaction = db.transaction(tabla, 'readwrite');
    const store = transaction.objectStore(tabla);

    try {
      const insertSuccess = store.add(data);
    } catch (error) {
      console.error('Error al insertar datos:', error);
    }

  }

  async borrarUsuarios(){
    const db = await openDB(this.dbName, this.dbVersion);
    const transaction = db.transaction('app_usuarios', 'readwrite');
    const store = transaction.objectStore('app_usuarios');
    // Borrar todos los registros de la tabla
    store.clear()
      .then(() => {
        //console.log('Se han borrado todos los usuarios.');
      })
      .catch((error:any) => {
        console.error('Error al borrar registros:', error);
      });
  }



  // async borrarRetenciones(){
  //   const db = await openDB(this.dbName, this.dbVersion);
  //   const transaction = db.transaction('app_retenciones', 'readwrite');
  //   const store = transaction.objectStore('app_retenciones');
  //   // Borrar todos los registros de la tabla
  //   store.clear()
  //     .then(() => {
  //       //console.log('Se han borrado todos los usuarios.');
  //     })
  //     .catch((error:any) => {
  //       console.error('Error al borrar registros:', error);
  //     });
  // }
}
