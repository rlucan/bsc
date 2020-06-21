import {Component, Inject, Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

interface MessageBoxButton {
  id: string;
  text?: string;
}

@Component({
  selector: 'app-message-box-modal',
  template: `
    <h1 mat-dialog-title>{{ title }}</h1>
    <div mat-dialog-content>
      <div [innerHTML]="message"></div>
      <pre *ngIf="errorMessage" [innerHTML]="errorMessage"></pre>
      <pre *ngIf="errorDetail" [innerHTML]="errorDetail"></pre>
    </div>

    <div mat-dialog-actions>
      <button mat-button *ngFor="let b of buttons" (click)="close(b.id)">{{ 'msgbox.' + (b.text ? b.text : b.id) | translate }}</button>
    </div>
  `
})
export class MessageBoxModalComponent {

  message;
  errorMessage;
  errorDetail;
  buttons: MessageBoxButton[] = [];
  title: string;

  constructor(public dialogRef: MatDialogRef<MessageBoxModalComponent>,
              private translate: TranslateService,
              public sanitizer: DomSanitizer,
              @Inject(MAT_DIALOG_DATA) private data: any) {

    this.message = this.sanitizer.bypassSecurityTrustHtml(data.message);

    if (this.data.options.errorMessage) {
      this.errorMessage = this.sanitizer.bypassSecurityTrustHtml(data.options.errorMessage);
    }
    if (this.data.options.errorDetail) {
      this.errorDetail = this.sanitizer.bypassSecurityTrustHtml(data.options.errorDetail);
    }

    this.buttons = data.options.buttons ? data.options.buttons : [{id: 'close'}];
    this.title = data.options.title;
  }

  close(result = null): void {
    this.dialogRef.close(result);
  }
}


@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  constructor(private dialog: MatDialog) {
  }

  confirm(message, options: {
    buttons?: MessageBoxButton[],
    title?: string,
    errorMessage?: string,
    errorDetail?: string
  } = {}) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    // config.minWidth = '300px';
    config.maxWidth = '450px';
    config.width = '90vw';
    config.data = {message, options};

    return this.dialog.open(MessageBoxModalComponent, config).afterClosed();
  }
}
