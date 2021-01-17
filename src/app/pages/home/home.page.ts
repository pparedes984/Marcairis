import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';


// const Perfil: Usuario;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  value = 0;
  dataUsuario : any[] = [];
  usuarios: Usuario[];
  constructor(private dataService: UsuarioService, private navCtrl: NavController,) {
    
    // Perfil.Nombres = 'HOla';
  }
  
  ngOnInit() {
    // Called after the constructor and called  after the first ngOnChanges() 
    
  }

  CargarDatos(idusuario) {
    //this.dataService.getRemoteData()
    this.dataService.getUsuario(idusuario).subscribe((data)=>{
      this.usuarios = data;
    },(error)=>{
      alert('Ocurrio un error');
    });
      //console.log(data);
      //return 
      
      console.log("Datos de Usuario");
      //console.log(data);
      // console.log(data);
      //JSON.parse(<string>data);
      //this.dataUsuario = JSON.stringify(data);
    }
  

  onLogout(): void {
    this.dataService.logout();
    this.navCtrl.navigateRoot('landing-page', {animated: true});
  }

}
