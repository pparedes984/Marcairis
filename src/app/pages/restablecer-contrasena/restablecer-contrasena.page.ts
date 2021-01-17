import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ContrasenaPage } from 'src/app/pages/contrasena/contrasena.page';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage implements OnInit {

  loginUser = {
    email: "",
    pin: ""
  };
  constructor(
    private UsuarioService: UsuarioService,
    private navCtrl: NavController,
    private UiService: UiServiceService,          
    private modalController: ModalController
    ) { }

  ngOnInit() {
  }

  async presentModal() {
    
  }

  async reestablecer( fReestablecer : NgForm){

    if ( fReestablecer.invalid) {return;}

    const valido = await this.UsuarioService.loginP(this.loginUser.email, this.loginUser.pin);

    if(valido){
      //ir a homre
      const modal = await this.modalController.create({
        component: ContrasenaPage,
        cssClass: 'my-custom-class',
      });
      return await modal.present();
    } else{
      // alerta
      this.UiService.alertaInformativa('Usuario o contrasena incorrecta');
    }
    
  }

}
