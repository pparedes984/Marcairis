import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { UiServiceService } from '../../../services/ui-service.service';
//import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    email: "",
    contrasena: ""
  };

  constructor(private UsuarioService: UsuarioService,
              private navCtrl: NavController,
              private UiService: UiServiceService,
              //private faio: FingerprintAIO
              ) { }

  ngOnInit() {

    
  }
  async login( fLogin : NgForm){

    if ( fLogin.invalid) {return;}

    const valido = await this.UsuarioService.login(this.loginUser.email, this.loginUser.contrasena);

    if(valido){
      //ir a homre
      this.navCtrl.navigateRoot('home', {animated: true});
    } else{
      // alerta
      this.UiService.alertaInformativa('Usuario o contrasena incorrecta');
    }
    
  }

  loginFingerprint(){
    //this.faio.show({
    //  clientId: 'Thisisatest',
    //  clientSecret: 'secret'
    //}).then( r =>{
    //  this.navCtrl.navigateRoot('home', {animated: true});
    //}).catch(err =>{
    //  console.log('Err: ', err);
    //})
  }
}
