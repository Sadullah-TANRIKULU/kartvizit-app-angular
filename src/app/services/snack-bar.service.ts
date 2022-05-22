import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'    // bu "root" service e koyduğum methodu her yerden kullanırım anlamına gelir, bunun için modulün cards modül içine değil app modüle konulması ve import edilmesi gerekir.
})
export class SnackBarService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }



  createSnackBar(type: string, message: string, duration: number = 4000): void {
    this._snackBar.open(message, '', { 
      duration,
      panelClass: type
    });
  }
}
