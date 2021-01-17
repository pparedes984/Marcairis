import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  cambiarPassword = {
    password: ""
  };
  verificacion: "";

  constructor(private UsuarioService: UsuarioService,
              private navCtrl: NavController,
              private UiService: UiServiceService,
              private alertController: AlertController,
              private modalController: ModalController
              //private faio: FingerprintAIO
              ) { }

  ngOnInit() {
  }

  /*async reestablecer(){
    

    const valido = await this.UsuarioService.reestablecer();

    if(valido){
      //ir a homre
      this.navCtrl.navigateRoot('home', {animated: true});
    } else{
      // alerta
      this.UiService.alertaInformativa('Ingrese una contraseña adecuada');
    }
    
  }*/

  async cerrar(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async cambiar(fCambiar : NgForm) {

    if(this.cambiarPassword.password == this.verificacion){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Las contraseñsa no coinciden',
      buttons: ['OK']
    });
    await alert.present();
    }
    else{
      console.log("2");
    }
  }

}
