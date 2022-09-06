import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { UtilService } from '../../servicios/util.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MisTramitesService } from '../../servicios/Publico/mis-tramites.service';
import { HistorialTramites } from '../../clases/Publico/HistorialTramites';
import { HistorialCerNomenclatura } from 'src/app/clases/Administracion/HistorialCerNomenclatura';



@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  @Output() notifySolicitud: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() notifyObjeto: EventEmitter<HistorialTramites> = new EventEmitter<HistorialTramites>();
  @Output() notifySalir: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() notifyImprime: EventEmitter<HistorialTramites> = new EventEmitter<HistorialTramites>();
  @Input() IdSolicitudinput: number;
  
  spinH: boolean = false; 
  listaHistorialTramites: HistorialTramites[];
  objHistorialTramites: HistorialTramites;
  titulo: string = ''; titulo2: string = '';
  busqueda: boolean = false;
  NombreBuscar: string = null;


  constructor(private servicioMisTra: MisTramitesService) {
    this.objHistorialTramites = new HistorialTramites(0,0,0,'','',0,0,'','','','','');
  }

  ngOnInit() {
    this.CargarHistorial(1,'todos');
  }

  public Volver() {
    this.notifySolicitud.emit(false);
  }

  //metodo para buscar a medida que se escribe
  public KeyUpNombreBuscar() {
    if (this.NombreBuscar.length > 3) { //empiezamos a escribir
      if (!this.busqueda) { //boton apagado
        this.CargarHistorial(1, this.NombreBuscar);
      }
      else {
        this.CargarHistorial(-1, this.NombreBuscar);
      }
    } else { //empezamos a borrar lo escrito
      if (!this.busqueda) { //boton apagado
        this.CargarHistorial(1, 'todos');
      } else { //boton encendido
        this.CargarHistorial(-1, 'todos');
      }
    }
  }

  //metodo para pintar celdas de tablas y listas
  private PintarCeldas() {
    //pintamos los insumos sin candidad disponible
    for (let w = 0; w < this.listaHistorialTramites.length; w++) {
      if (this.listaHistorialTramites[w].IdEstado == 4) { // reclamar en oficina
        this.listaHistorialTramites[w].css = "table-success";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-success list-group-item-action";
        
      }
      if (this.listaHistorialTramites[w].IdEstado == 8) { // incompleto
        this.listaHistorialTramites[w].css = "table-danger";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-danger list-group-item-action";
        
      }

      if (this.listaHistorialTramites[w].IdEstado == 3) { // en proceso
        this.listaHistorialTramites[w].css = "table-warning";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-warning list-group-item-action";
        
      }

      if (this.listaHistorialTramites[w].IdEstado == 1) { // radicado
        this.listaHistorialTramites[w].css = "table-light";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-light list-group-item-action";
        
      }

      if (this.listaHistorialTramites[w].IdEstado == 0) { // anulado
        this.listaHistorialTramites[w].css = "table-dark";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-dark list-group-item-action";
        
      }

      if (this.listaHistorialTramites[w].IdEstado == 7) { // entregado
        this.listaHistorialTramites[w].css = "table-success";
        this.listaHistorialTramites[w].css2 = "list-group-item list-group-item-success list-group-item-action";
        
      }
    }
  }



  //cargar lista de solicitudes
  public CargarHistorial(IdEstado: number, Nombre: string) {
    this.listaHistorialTramites = []; this.spinH = true;
    this.servicioMisTra.getTramitesFiltro(IdEstado,this.IdSolicitudinput,Nombre)
      .subscribe(list => {
        if (list.length > 0) {
          this.listaHistorialTramites = list;
          this.spinH = false;
          this.PintarCeldas();
          if (this.IdSolicitudinput == 2) { this.titulo = 'Certificados de nomenclatura'; }
          if (this.IdSolicitudinput == 3) { this.titulo = 'Certificados de distancia'; }
        } else {
          if (this.IdSolicitudinput == 2) { this.titulo = 'Certificados de nomenclatura'; } this.spinH = false;
          if (this.IdSolicitudinput == 2) { this.titulo = 'Certificados de distancia'; } this.spinH = false;
        }
      })
  }


  //buscar todos los certificados para todos los estados y nombres
  public BuscarTodos() {
    if (!this.busqueda) {
      this.CargarHistorial(-1, 'todos');
    } else this.CargarHistorial(1, 'todos');
  }

  //seleccion de objeto seleccionado
  public Seleccion(obj: HistorialTramites) {
    this.objHistorialTramites = obj;
    
  }

  private ActivarSpin(obj: HistorialTramites) {
    for (let i = 0; i < this.listaHistorialTramites.length;i++) {
      if (this.listaHistorialTramites[i].IdTramite == obj.IdTramite) {
        this.listaHistorialTramites[i].spin = 'spinner-border spinner-border-sm';
      } else this.listaHistorialTramites[i].spin = null;
    }
  }

 

  //envio de objeto seleccionado
  public Enviar() {
    this.notifyObjeto.emit(this.objHistorialTramites);
    this.notifySolicitud.emit(false);
  }

  

  //mensaje para salir
  public Salir() {
    this.notifySalir.emit(true);
  }


  public Nuevo() {
    this.notifySolicitud.emit(false);
  }

  //imprimir
  public Imprimir() {
    this.notifyImprime.emit(this.objHistorialTramites);
    this.ActivarSpin(this.objHistorialTramites);
    
  }

  



}//fin
