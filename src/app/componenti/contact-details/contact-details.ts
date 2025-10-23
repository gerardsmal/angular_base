import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersoneService } from '../../services/persone-service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePersona } from '../../dialogs/delete-persona/delete-persona';

@Component({
  selector: 'app-contact-details',
  standalone: false,
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.css'
})
export class ContactDetails implements OnInit {

  id: number;
  persona: any;

  stato = signal({
     msg : null as string | null,
     isError : 0 
  })

  readonly dialog= inject(MatDialog);

  updateform: FormGroup = new FormGroup({
    nome: new FormControl(null),
    cognome: new FormControl(null),
    email: new FormControl(null),
    colore: new FormControl(null)
  });

  constructor(private service: PersoneService,
    private route: ActivatedRoute,
    private routing: Router) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = + params.get('id');
      this.service.getPersona(this.id)
        .subscribe({
          next: ((resp: any) => {
            console.log(resp);
            this.persona = resp;
            this.updateform = new FormGroup({
              nome: new FormControl(resp.nome, Validators.required),
              cognome: new FormControl(resp.cognome, Validators.required),
              email: new FormControl(resp.email, [Validators.required, Validators.email]),
              colore: new FormControl(resp.colore)
            })
            this.stato.set({
                msg: null,
                isError: 0
            })
          }),
          error: ((resp: any) => {
            this.stato.set({
                msg: resp.error,
                isError: 1
            })
          })
        })
    })
  }

  onSubmit() {
    const updateBody: any = { id: this.id };
    if (this.updateform.controls['nome'].touched) {
      updateBody.nome = this.updateform.value.nome
    }
    if (this.updateform.controls['cognome'].touched) {
      updateBody.cognome = this.updateform.value.cognome
    }
    if (this.updateform.controls['email'].touched) {
      updateBody.email = this.updateform.value.email
    }
    if (this.updateform.controls['colore'].touched) {
      updateBody.colore = this.updateform.value.colore
    }

    console.log(updateBody);
    this.service.updatePersona(updateBody)
      .subscribe({
        next: ((resp: any) => {
          console.log(resp);
          this.routing.navigate(["/contact"])
            .then(() => {
              window.location.reload();
            })
        }),
        error: ((resp: any) => {
            this.stato.set({
                msg: resp.error,
                isError: 2
            })
          })

      }
      )

  }
  onAnnull() {
    this.routing.navigate(["/contact"])
      .then(() => {
        window.location.reload();
      })
  }

  onDelete(){
    console.log("onDelete :" + this.persona.nome + " " + this.persona.cognome);
    const enterAnimationDuration:string = '1000ms';
    const exitAnimationDuration:string  = '1000ms';
    const dialodRef = this.dialog.open(DeletePersona , {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        persona: this.persona
      }
    })
    dialodRef.afterClosed()
      .subscribe(resp => {
        if (resp == 'si')
          this.deleteAction();
      })
  }
  deleteAction(){
    console.log("delete action")
    this.service.removePersona(this.persona.id)
    .subscribe(resp => {
      console.log(resp);
    })
  }
}
