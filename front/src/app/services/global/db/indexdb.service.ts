import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { openDB } from 'idb';
import { FuncionesService } from '../funciones.service';


@Injectable({
  providedIn: 'root'
})
export class IndexdbService {

  private db: IDBDatabase | undefined;
  public dbName:any = (environment.demo) ? environment.dbNameDemo : environment.dbName;
  public dbVersion:any = (environment.demo) ? environment.dbVersionDemo : environment.dbVersion;

  constructor(private funciones:FuncionesService) {
    this.openDB();
  }

  private async openDB(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let request:any;
      //conexion a la base de datos
      request = indexedDB.open(this.dbName,this.dbVersion);
      request.onerror = (event:any) => {
        console.error("Error opening IndexedDB:", event.target.error);
        reject();
      };

      request.onsuccess = (event:any) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        //console.log("IndexedDB opened successfully.");
        resolve();
      };

      request.onupgradeneeded = (event:any) => {
        
        const db = (event.target as IDBOpenDBRequest).result;

        //tabla de usuarios
        const objectStoreU = db.createObjectStore('app_usuarios', { autoIncrement: true });

        objectStoreU.createIndex('id_cod_usua','id_cod_usua',{unique:false});
        objectStoreU.createIndex('id_usuario','id_usuario',{unique:false});
        objectStoreU.createIndex('tx_usuario','tx_usuario',{unique:false});
        objectStoreU.createIndex('tx_nombre','tx_nombre',{unique:false});
        objectStoreU.createIndex('tx_clave','tx_clave',{unique:false});
        objectStoreU.createIndex('in_perfil','in_perfil',{unique:false});
        objectStoreU.createIndex('in_estado','in_estado',{unique:false});


        //tabla e las retenciones locales

        // const objectRetenciones = db.createObjectStore('app_retenciones', { autoIncrement: true });
        // objectRetenciones.createIndex("CardCode","CardCode",{unique:false});
        // objectRetenciones.createIndex("WTCode","WTCode",{unique:false});
        // objectRetenciones.createIndex("BaseType","BaseType",{unique:false});
        // objectRetenciones.createIndex("U_BP_Base_Mi","U_BP_Base_Mi",{unique:false});
        // objectRetenciones.createIndex("PrctBsAmnt","PrctBsAmnt",{unique:false});

        //siguiente tabla
        
      }
      
    });
  }
}
