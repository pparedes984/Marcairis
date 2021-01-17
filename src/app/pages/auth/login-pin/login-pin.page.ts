import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { UiServiceService } from '../../../services/ui-service.service';


@Component({
  selector: 'app-login-pin',
  templateUrl: './login-pin.page.html',
  styleUrls: ['./login-pin.page.scss'],
})
export class LoginPinPage implements OnInit {
  loginUser = {
    email: "",
    pin: ""
  };

  /*get email(){
    return this.loginPinForm.get('email');
  }
  get pin(){
    return this.loginPinForm.get('pin');
  }
  public errorMesagges = {
    email: [
      {type: 'required', message: 'Correo electrónico es requerido'},
      {type: 'pattern', message: 'Porfavor proporcione un correo electrónico válido'}
    ],
    pin: [
      {type: 'required', message: 'Contraseña es requerido'},
      {type: 'pattern', message: 'Ingrese cuatro dígitos numéricos'}
    ],
  }

  loginPinForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
    pin:['', [Validators.required, Validators.pattern("[0-9]{4}")]]
  });*/

  constructor(
    private UsuarioService: UsuarioService,
    private navCtrl: NavController,
    private UiService: UiServiceService,
   
  ) { }

  ngOnInit() {
  }

  async login( fLogin: NgForm){
    if ( fLogin.invalid) {return;}

    const valido = await this.UsuarioService.loginP(this.loginUser.email, this.loginUser.pin);

    if(valido){
      //ir a homre
      this.navCtrl.navigateRoot('home', {animated: true});
    } else{
      // alerta
      this.UiService.alertaInformativa('Usuario o pin incorrectos');
    }
    
  }
}
