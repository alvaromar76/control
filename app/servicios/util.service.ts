import { Injectable, Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(public snackBar: MatSnackBar) {
  }

  // 1. envio de mensajes a mostrar por pantalla
  mensaje(mensaje: string, color: string) {
    this.snackBar.open(mensaje, null, {
      duration: 2000,
      panelClass: ['danger'],
      //verticalPosition: 'top'
    });
  }

  //2. icono de spinner
  public icono(tipo: string, estado: boolean): string {

    if (estado) return 'spinner-border spinner-border-sm text-light';
    else if (tipo == 'ok') return 'fas fa-check';
    else if (tipo == 'cancelar') return 'fas fa-times';
  }

  success() {
    this.snackBar.open("Datos guardados correctamente", null, {
      duration: 2000,
      panelClass: ['success']

    });
  }





}//fin
