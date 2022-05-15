import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(10)],
      title: [this.data?.title || '', [Validators.required, Validators.maxLength(15)]],  // boş bırakılırsa ikaz eder, 15 karakterlik uzunluğu geçerse ikaz eder.
      phone: [this.data?.phone || '', Validators.required],
      email: [this.data?.email || '', Validators.email],  // email tipinde yani @ kullanarak girmezse ikaz edecek.
      address: [this.data?.address || '', Validators.maxLength(250)],  // data? varsa al yoksa '' demektir.
    })
  }

  addCard(): void {
    console.log(this.cardForm.value);  // yeni kartvizit ekleme bilgisini form alıyor mu
    this.cardService.addCard(this.cardForm.value)
    .subscribe((res: any) => {
      console.log(res);  // api yeni kart vizit eklemeye cevap veriyor mu
      this._snackBar.open(res || 'Kartvizit başarıyla eklenmiştir.', '', { duration: 4000,
      });
      this.cardService.getCards();
      this.dialogRef.close();
    })
  }

  updateCard(): void {
    this.cardService.updateCard(this.cardForm.value, this.data.id)
    .subscribe(res => {
      console.log(res);
      this._snackBar.open(res || 'Kartvizit başarıyla güncellenmiştir.', '', { duration: 4000,
      });
      this.cardService.getCards();
      this.dialogRef.close();
    });
  }


  deleteCard() {
    this.cardService.deleteCard(this.data.id)
    .subscribe(res => {
      console.log(res);
      this._snackBar.open(res || 'Kartvizit başarıyla silinmiştir.', '', { duration: 4000,
      });
      this.cardService.getCards();
      this.dialogRef.close();
    });
  }
}
