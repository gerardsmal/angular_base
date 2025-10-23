import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-persona',
  standalone: false,
  templateUrl: './delete-persona.html',
  styleUrls: ['./delete-persona.css']
})
export class DeletePersona {
  persona: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeletePersona>
  ){
    if (data) {
      this.persona = data.persona;
    }
  }

  optionSelected(opt:string){
    this.dialogRef.close(opt);
  }

}
