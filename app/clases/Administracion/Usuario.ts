export class Usuario {

  IdUsuario: number;
  IdCargo: number;
  NombreCompleto: string;
  Correo: string;
  Usuario: string;
  Clave: string;




  constructor(IdUsuario: number, IdCargo: number, NombreCompleto: string, Correo: string, Usuario: string, Clave: string) {
    this.IdUsuario = IdUsuario;
    this.IdCargo = IdCargo;
    this.NombreCompleto = NombreCompleto;
    this.Correo = Correo;
    this.Usuario = Usuario;
    this.Clave = Clave;
  }
}
