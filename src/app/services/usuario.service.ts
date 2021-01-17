
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable, resolveForwardRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { auth, Usuario } from '../interfaces/interfaces';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

//Servicio de autenticacion del usuario

const URL = environment.url
var id;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API = environment.url
  isLoggedIn = false;
  token: string = null;
  private LoggeIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private storage: Storage) { 
      this.checkToken();
  }

  getUsuario(id) {
    const url = `${this.API}/${id}`;
    return this.http.get(url).pipe(
      tap(_ => this.log(`fetched usuario id=${id}`)),
      catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
    );
  }
  log(arg0: string): void {
    throw new Error('Method not implemented.');
  }
  handleError<T>(arg0: string): (err: any, caught: Observable<Usuario>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }

  get isLogged():Observable<boolean>{
    // return this.isLoggedIn;
    return this.LoggeIn.asObservable();
  }

  async guardarTokens(token: string) {
    this.token = token;
    await this.storage.set('token', token);

  }

  loadToken(){
     return this.storage.get('token');
}

  login(email: string, contrasena: string) {
    const data = { email, contrasena };

    return new Promise(resolve => {
      
      this.http.post(`${URL}/auth/login`, data)
      .subscribe(res => {
        // console.log(res);
        id = res['id'];
        if (res['success']) {
          this.guardarTokens(res['token']);
          this.LoggeIn.next(true);
          this.isLoggedIn = true;
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    
    });
  }

  loginP(email: string, pin: string) {
    const data = { email, pin };

    return new Promise(resolve => {
      
      this.http.post(`${URL}/auth/loginPin`, data)
      .subscribe(res => {
        // console.log(res);
        id = res['id'];
        if (res['success']) {
          this.guardarTokens(res['token']);
          this.LoggeIn.next(true);
          this.isLoggedIn = true;
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    
    });
  }

  reestablecer() {
    const data =  1 ;

    return new Promise(resolve => {
      
      this.http.post(`${URL}/auth/cambio-contrasena`, data)
      .subscribe(res => {
        // console.log(res);
        id = res['id'];
        if (res['success']) {
          this.guardarTokens(res['token']);
          this.LoggeIn.next(true);
          this.isLoggedIn = true;
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    
    });
  }


  /*loginpin(auth: auth) {

    return new Promise(resolve => {
      
      this.http.post(`${URL}/auth/loginpin`, auth)
      .subscribe(res => {
        console.log(res);
        if (res['success']) {
          this.guardarTokens(res['token']);
          this.isLoggedIn = true;
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    
    });
  }*/

  private checkToken(): void {

    const UsuarioToken = this.storage.get("token");
    UsuarioToken.then((val) => {
      //console.log(val);
      const isExpired = helper.isTokenExpired(val);
      console.log('isExpired', isExpired);
      if(isExpired){
        this.logout();
      }else {
        this.isLoggedIn = true;
        this.LoggeIn.next(true);
      }
    })
  }

  register(usuario: Usuario){
    return new Promise(resolve =>{
      this.http.post(`${URL}/auth/register`, usuario)
      .subscribe(res =>{
        id = res['id'];
        if(res['success']){
          console.log('Registrado exitosamente');
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  }

  getRemoteData(){
    if (this.token==null) {
      console.log('esta vacio');
      console.log(this.token)
      this.loadToken();
    }
    
    const headers = { 'auth': this.token };

    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headers), 
    };

    return this.http.get(`${URL}/users/${id}`, requestOptions)
    

  }

  logout() {
    this.storage.remove('token');
    this.isLoggedIn = false;
    this.LoggeIn.next(false);

    //return this.http.get(`${URL}/auth/login`);
  }
  // logout() {
  //   const headers = new HttpHeaders({
  //     'Authorization': this.token["token_type"]+" "+this.token["access_token"]
  //   });
  //   return this.http.get(`${URL}/auth/logout`, { headers: headers })
  //   .pipe(
  //     tap(data => {
  //       this.storage.remove("token");
  //       this.isLoggedIn = false;
  //       delete this.token;
  //       return data;
  //     })
  //   )
  // }

  


}