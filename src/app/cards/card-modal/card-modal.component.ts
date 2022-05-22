import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';


@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(25)],
      title: [this.data?.title || '', [Validators.required, Validators.maxLength(25)]],  // boş bırakılırsa ikaz eder, 15 karakterlik uzunluğu geçerse ikaz eder.
      phone: [this.data?.phone || '', Validators.required],
      email: [this.data?.email || '', Validators.email],  // email tipinde yani @ kullanarak girmezse ikaz edecek.
      address: [this.data?.address || '', Validators.maxLength(250)],  // data? varsa al yoksa '' demektir.
    })
  }

  addCard(): void {
    this.showSpinner = true;
    console.log(this.cardForm.value);  // yeni kartvizit ekleme bilgisini form alıyor mu
    this.cardService.addCard(this.cardForm.value)
    .subscribe((res: any) => {
      console.log(res);  // api yeni kart vizit eklemeye cevap veriyor mu
      this.getSuccess(res || 'Kartvizit başarıyla eklenmiştir.')  
    }, (err: any) => {
      console.log(err);
      this.getError(err || 'Kartvizit eklenirken hata oluştu.');
  });
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardForm.value, this.data.id)
    .subscribe(res => {
      console.log(res);
      this.getSuccess(res || 'Kartvizit başarıyla güncellenmiştir.')
    }, (err: any) => {
      console.log(err);
      this.getError(err || 'Kartvizit güncellenirken hata oluştu.');
  });
  }


  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id)
    .subscribe(res => {
      console.log(res);
      this.getSuccess(res || 'Kartvizit başarıyla silinmiştir.');
      
    }, (err: any) => {
      console.log(err);
      this.getError(err || 'Kartvizit silinirken hata oluştu.');
  });
  }

  getSuccess(message: string): void {
    this.snackBarService.createSnackBar('success', message);
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();     // diyalog penceresini kapatıyoruz
  }

  getError(message: string): void {
    this.snackBarService.createSnackBar('error', message);
    this.showSpinner = false;
  }
}
