import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtenteService } from '../../services/utente-service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeletePersona } from '../../dialogs/delete-persona/delete-persona';

@Component({
  selector: 'app-update-utente',
  standalone: false,
  templateUrl: './update-utente.html',
  styleUrl: './update-utente.css',
})
export class UpdateUtente implements OnInit {
  id: number;
  persona: any;
  isCreate: boolean = false;

  stato = signal({
    msg: null as string | null,
    isError: 0,
    colore: null as string | null,
    title: null as string | null
  })

  readonly dialog = inject(MatDialog);

  utenteForm: FormGroup = new FormGroup({
    userName: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    pwd: new FormControl(null, Validators.required)
  });

  constructor(private service: UtenteService,
    private route: ActivatedRoute,
    private routing: Router
  ) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get("id");
      if (this.id == 0)
        this.onCreate()
      else
        this.getUtente();
    })
  }

  getUtente() {
    this.service.getUtente(this.id)
      .subscribe({
        next: ((resp: any) => {
          this.persona = resp;
          //console.log(this.persona)
          this.utenteForm.patchValue({     // patchValue set valore dentro la form
            userName: resp.username,
            role: resp.role,
            pwd: resp.pwd
          }
          )
          this.isCreate = false;
          
          this.stato.set({
            msg: null,
            isError: 0,
            colore: null,
            title: 'Update/Delete'
          })
        }),
        error: ((resp: any) => {
          console.log("error :" + resp.error)
        })
      }
      )

  }



  onSubmit() {
    if (this.isCreate) {
      this.createAction();
    } else {
      this.onUpdate();
    }
  }

  onUpdate() {

    const updateBody: any = { id: this.id };
    if (this.utenteForm.controls['userName'].touched) {
      updateBody.username = this.utenteForm.value.userName
    }
    if (this.utenteForm.controls['role'].touched) {
      updateBody.role = this.utenteForm.value.role
    }
    if (this.utenteForm.controls['pwd'].touched) {
      updateBody.pwd = this.utenteForm.value.pwd
    }

    this.service.update(updateBody)
      .subscribe({
        next: ((resp: any) => {
          console.log(resp);
          this.stato.set({
            msg: null,
            isError: 0,
            colore: null,
            title: 'Update/Delete'
          }
          )
          this.onAnnull();
        }),
        error: ((resp: any) => {
          console.log(resp.error);
          this.stato.set({
            msg: resp.error,
            isError: 1,
            colore: 'red',
            title: 'Update/Delete'
          })
        })
      }
      )
  }

  onCreate() {
    this.utenteForm.reset();
    this.isCreate = true;
    this.stato.set({
      msg: null,
      isError: 0,
      colore: null,
      title: 'Creazione'
    })
  }

  createAction() {
    this.service.create({
      username: this.utenteForm.value.userName,
      pwd: this.utenteForm.value.pwd,
      role: this.utenteForm.value.role
    }).subscribe({
      next: ((resp: any) => {
        this.stato.set({
          msg: resp,
          isError: 2,
          colore: 'green',
          title: 'Creazione'
        })
        this.utenteForm.reset();
      }),
      error: ((resp: any) => {
        this.stato.set({
          msg: resp.error,
          isError: 1,
          colore: 'red',
          title: 'Creazione'
        })
      })
    })


  }
  onAnnull() {
    this.routing.navigate(['utente']);
  }

  onDelete() {
    console.log("onDelete")

    const enterAnimationDuration: string = '500ms';
    const exitAnimationDuration: string = '500ms';
    const dialodRef = this.dialog.open(DeletePersona, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        persona: this.persona.username
      }
    })
    dialodRef.afterClosed()
      .subscribe(resp => {
        if (resp == 'si')
          this.deleteAction();
      })


  }
  deleteAction() {
    console.log("Delete action")
    this.service.remove(this.persona.id)
      .subscribe({
        next: ((resp: any) => {
          this.onAnnull();
        }),
        error: ((resp: any) => {
          console.log(resp.error);
          this.stato.set({
            msg: resp.error,
            isError: 1,
            colore: 'red',
            title: 'Update/Delete'
          })
        })
      }

      )
  }


}
