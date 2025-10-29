import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UtenteService } from '../../services/utente-service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-update-utente',
  standalone: false,
  templateUrl: './update-utente.html',
  styleUrl: './update-utente.css'
})
export class UpdateUtente implements OnInit {
  id: number;
  persona: any;

  utenteForm: FormGroup = new FormGroup({
    userName: new FormControl(),
    role: new FormControl()
  });

  constructor(private service: UtenteService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get("id");
      this.service.getUtente(this.id)
        .subscribe({
          next: ((resp: any) => {
            this.persona = resp;
            console.log(this.persona)
            this.utenteForm = new FormGroup({
              userName: new FormControl(resp.username, Validators.required),
              role: new FormControl(resp.role, Validators.required)
            }
            )
            this.cdr.detectChanges();
          }),
          error: ((resp: any) => {
            console.log("error :" + resp.error)
          })
        }
        )

    })
  }


  onSubmit() {
 
    const updateBody: any = { id: this.id };
     if (this.utenteForm.controls['userName'].touched) {
      updateBody.username = this.utenteForm.value.userName
    }
    if (this.utenteForm.controls['role'].touched) {
      updateBody.role = this.utenteForm.value.role
    }
    console.log(updateBody);

    this.service.update(updateBody)
      .subscribe({
        next:((resp:any) => {
          console.log(resp);
        }),
        error:((resp:any) => {
          console.log(resp.error);
        })
      }
  

      )

  }

  onDelete() {
    console.log("onDelete")
  }

}
