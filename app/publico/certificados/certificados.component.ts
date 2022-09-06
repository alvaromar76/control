import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { CertificadosService } from '../../servicios/Publico/certificados.service';
import { Radicado } from '../../clases/Radicado/Radicado';
import { Tramite } from '../../clases/Publico/Tramite';
import { UtilService } from '../../servicios/util.service';
import { formatDate } from '@angular/common';
import { ListaRadicado } from '../../clases/Radicado/ListaRadicado';
import { InicioService } from '../../servicios/Publico/inicio.service';
import { Solicitud } from '../../clases/Publico/Solicitud';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime, debounce } from 'rxjs/operators';

//import { } from '../inicio/'

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {
  @Output() Notificacion: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() Titulo: string = '';
  @ViewChild('content') content: any;
  objTramite: Tramite;
  objSolicitud: Solicitud;
  listaSolicitud: Solicitud[];
  miTitulo: string = 'Certificados';
  bandera: boolean;
  spinG: boolean = false; spinR: boolean = false;
  mostrar: boolean = true;
  objRadicado: Radicado;
  today = new Date();
  jstoday = '';
  jstoday2 = '';
  fecha: string = '';
  FechaInicial: string;
  FechaFinal: string;
  E_catastro: boolean = false;
  solicitudes: boolean = false;
  spinS: boolean = false;
  Cedula: string = '';
  nombre: string = '';
  num: string = '';
  form: FormGroup;
  //listaCertificados = ['Certificado Uso de suelo','Certificado Distancia','Certificado Nomenclatura'];
  myPattern = "[0-9]";
  pattern = "/^\d[0,9]$/";
  
  

  constructor(private ServicioCertificados: CertificadosService, private util: UtilService, private servicioInicio: InicioService, private formBuilder: FormBuilder) {
    this.mostrar = true;
    this.objSolicitud = new Solicitud(0, '');
    this.objTramite = new Tramite(0, 0, 0, '', '', null, null, '', '','');
    this.CargarFecha();
    this.CargarSolicitudes();
    this.buildForm();
  }

  ngOnInit() {  
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      IdSolicitud: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', []],
      catastral: ['54172', [Validators.required, Validators.minLength(20), Validators.maxLength(30)]],
    });

    //this.form.valueChanges
    //  .pipe(
    //    debounceTime(500)
    //  )
    //  .subscribe(value => {
    //    console.log(value);
    //  });
  }

  //cargar lista de solicitudes
  private CargarSolicitudes() {
    this.listaSolicitud = []; this.spinS = true;
    this.ServicioCertificados.getListaSolicitudes()
      .subscribe(list => {
        if (list.length > 0) {
          this.listaSolicitud = list;
          this.spinS = false;
        } else this.util.mensaje('Conexion fallida :(', 'warning');
      })
  }


  //enviar mensaje para ocultar
  public Volver() {
    this.Notificacion.emit(true);
  }

  public cargarForma(id: number) {
    for (let i = 0; i < this.listaSolicitud.length; i++) {
      if (id==this.listaSolicitud[i].IdSolicitud) {
        this.miTitulo = this.listaSolicitud[i].NombreSolicitud;
      }
    }
  }

  

  //cargar fecha
  private CargarFecha() {
    this.jstoday = formatDate(this.today, 'yyyy-MM-ddTHH:mm', 'en-US');
    //this.jstoday2 = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
    this.fecha = this.jstoday;
  }

  //limpiar
  private limpiarCampos() {
    this.objTramite = new Tramite(0, 0, 0, '', '', null, null, '', '', '');
    this.form.reset();
    this.CargarFecha();
  }

  //codigo inicial para chinacota
  public Codigo() {
    //this.form.get('catastral').setValue() = '54172';
    //this.form.getRawValue('catastral') = '54172';
  }

  

  //bucar lista de radicados
  //public BuscarListaRadicado() {
  //  if (this.Cedula.length > 0) {
  //    this.spinR = true;
  //    this.listaRadicado = [];
  //    this.ServicioRadicado.getListaRadicados(this.FechaInicial, this.FechaFinal, this.Cedula)
  //      .subscribe(list => {
  //        if (list.length > 0) {
  //          this.listaRadicado = list; this.spinR = false;
  //          this.nombre = this.listaRadicado[0].NombreCompleto;
  //        } else { alert('El numero de cedula ingresado no tiene tramites radicados..'); this.spinR = false; }
  //      })
  //  } else { alert('Ingresar cedula del solicitante');}
  //}

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.objTramite = new Tramite(0, value.IdSolicitud, 1, value.nombre, value.direccion, value.telefono, value.cedula, value.catastral,this.fecha,value.correo);
      this.spinG = true;
      
      this.ServicioCertificados.InsertTramite(this.objTramite)
        .subscribe(resp => {
          if (resp == 'ok') {
            this.spinG = false;
            this.limpiarCampos();
            this.mostrar = false;
          } else { alert(resp); this.spinG = false; }
        });
    }
  }

  //guardar datos
  //public Guardar() {
  //  if (this.objTramite.Nombre.length> 0) {
  //    if (this.objTramite.Cedula > 0) {
  //      if (this.objTramite.Direccion.length > 0) {
  //        if (this.objTramite.Telefono > 0) {
  //          if ((this.objTramite.NumPredial).length == 20 || (this.objTramite.NumPredial).length == 30) {
  //            this.objTramite.Fecha = this.fecha;
  //            this.objTramite.IdSolicitud = this.objSolicitud.IdSolicitud;
  //            this.objTramite.IdEstado = 1;
              
  //            this.spinG = true;
              
  //              this.ServicioCertificados.InsertTramite(this.objTramite)
  //                .subscribe(resp => {
                    
  //                  if (resp == 'ok') {
  //                    this.spinG = false;
  //                    this.limpiarCampos();
  //                    this.mostrar = false;
  //                  } else { alert(resp); this.spinG = false; } 
  //                });
              
  //          } else alert('Ingresar numero Predial');
  //        } else alert('Ingresar telefono');
  //      } else alert('Ingresar direccion del predio');
  //    } else alert('Ingresar numero de cedula');
  //  } else alert('Ingresar nombre del solicitante');
  //}



}
