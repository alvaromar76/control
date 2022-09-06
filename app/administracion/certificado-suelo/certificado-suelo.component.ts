import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { UtilService } from '../../servicios/util.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-certificado-suelo',
  templateUrl: './certificado-suelo.component.html',
  styleUrls: ['./certificado-suelo.component.css']
})
export class CertificadoSueloComponent implements OnInit {

  form: FormGroup;
  spinL: boolean = false;

  constructor(private formBuilder: FormBuilder) {
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
  }

}//fin
