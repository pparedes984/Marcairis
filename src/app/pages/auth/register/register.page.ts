import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  imgURL = '/assets/profile.png'


  get nombres(){
    return this.registrationForm.get('nombres');
  }

  get apellidos(){
    return this.registrationForm.get('apellidos');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get celular(){
    return this.registrationForm.get('celular');
  }

  get contrasena(){
    return this.registrationForm.get('contrasena');
  }

  get pin(){
    return this.registrationForm.get('pin');
  }

  get fechanacimiento(){
    return this.registrationForm.get('fechanacimiento');
  }

  get paisresidencia(){
    return this.registrationForm.get('paisresidencia');
  }

  get ciudadresidencia(){
    return this.registrationForm.get('ciudadresidencia');
  }

  get descripcion(){
    return this.registrationForm.get('descripcion');
  }

  get imagen(){
    return this.registrationForm.get('imagen');
  }

  get sexo(){
    return this.registrationForm.get('sexo');
  }


  public errorMesagges = {
    nombres: [
      {type: 'required', message: 'Nombres es requerido'},
      {type: 'maxlength', message: 'Nombres no puede contener mas de 100 caracteres'}
    ],
    apellidos: [
      {type: 'required', message: 'Apellidos es requerido'},
      {type: 'maxlength', message: 'Apellidos no puede contener mas de 100 caracteres'}
    ],
    email: [
      {type: 'required', message: 'Correo electrónico es requerido'},
      {type: 'pattern', message: 'Porfavor proporcione un correo electrónico válido'}
    ],
    celular: [
      {type: 'required', message: 'Celular es requerido'},
      {type: 'pattern', message: 'Porfavor proporcione un número de celular válido'}
    ],
    contrasena: [
      {type: 'required', message: 'Contraseña es requerido'},
      {type: 'minlength', message: 'Contraseña débil'}
    ],
    pin: [
      {type: 'required', message: 'Contraseña es requerido'},
      {type: 'pattern', message: 'Ingrese cuatro dígitos numéricos'}
    ],
    fechanacimiento: [
      {type: 'required', message: 'Fecha de Nacimiento es requerido'}
    ],
    paisresidencia: [
      {type: 'required', message: 'Pais de Residencia es requerido'}
    ],
    ciudadresidencia: [
      {type: 'required', message: 'Ciudad de Residencia es requerida'}
    ],
    sexo: [
      {type: 'required', message: 'Sexo es requerido'}
    ], 
    descripcion: [

    ],
    imagen: [

    ]
  }

  registrationForm = this.formBuilder.group({
    nombres:['',[Validators.required, Validators.maxLength(100)]],
    apellidos:['',[Validators.required, Validators.maxLength(100)]],
    email: ['',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
    contrasena: ['',[Validators.required, Validators.minLength(5)]],
    celular:['', [Validators.required, Validators.pattern("[0-9]{10}")]],
    pin:['', [Validators.required, Validators.pattern("[0-9]{4}")]],
    fechanacimiento:['', [Validators.required]],
    paisresidencia:['', [Validators.required]],
    ciudadresidencia:['', [Validators.required]],
    sexo:['', [Validators.required]],
    descripcion: ['', []],
    imagen: ['', []]
  });

  constructor(
    private formBuilder: FormBuilder,
    private UsuarioService: UsuarioService,
    private navCtrl: NavController,
    private UiService: UiServiceService,
    private camera: Camera) { }
 
  ngOnInit() {
    
  }


  async register(){

    const valido = await this.UsuarioService.register(this.registrationForm.value);
    
    if(valido){
      //Podria ir a home pero no tengo token, asi que va a la pagina de login
      this.UiService.mensajeInformativo('Registro exitoso!');
      this.navCtrl.navigateRoot('login', {animated: true});
      
    } else{
      // alerta
      this.UiService.alertaInformativa('Ese correo ya existe');
    }
    
    
  }

  getCamera(){

    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI
    }).then((res)=>{
      this.imgURL = res;
    }).catch(e =>{
      console.log(e);
    })
  }


  getGalery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((res)=>{
      this.imgURL = 'data:image/jpeg;base64,' +  res;
    }).catch(e =>{
      console.log(e);
    })
  }
}
