export interface Usuario {
  idusuario: number;
  nombres: string;
  apellidos: string;
  email: string;
  contrasena: string;
  celular: string;
  pin: string;
  fechanacimiento: Date;
  sexo: string;
  descripcion: string;
  paisresidencia: string;
  ciudadresidencia: string;
  imagen: string;


}

export interface auth{
  email:string;
  pin: string;
}