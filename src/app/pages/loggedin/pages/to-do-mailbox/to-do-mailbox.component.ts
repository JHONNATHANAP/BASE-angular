import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { View } from '@app/models/frontend';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../store';
import * as fromLoggedin from '../../store/loggedin';

@Component({
  selector: 'app-to-do-mailbox',
  templateUrl: './to-do-mailbox.component.html',
  styleUrls: ['./to-do-mailbox.component.scss']
})
export class ToDoMailboxComponent implements OnInit {
  form !: FormGroup;
  loading$ !: Observable<boolean | null>;
  view: View = {
    title: "Buzón de tareas pendientes",
    icon: { class: "material-icons-outlined icons md-36", name: "drafts" }
  };
  constructor(private store: Store<fromRoot.State>,
    private fb: FormBuilder,) { }

  options = [
    { id: 1, title: "Jefe de unidad administradora" },
    { id: 2, title: "Jefe Dept. Informática" },
    { id: 3, title: "Usuario Abastecimiento" },
  ]

  ngOnInit(): void {
    //this.loading$ = this.store.pipe(select(fromUser.getLoading));

    this.form = this.fb.group({
      email: [null, {
        updateOn: 'change',
         validators: [
          Validators.required,
          Validators.maxLength(128)
        ]
      }],
      password: [null, {
        updateOn: 'change',
         validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      }],
      area: [null, {
        updateOn: 'change',
         validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      }],
    })
    const loggedin: fromLoggedin.Loggedin = {
      view: this.view
    }
    this.store.dispatch(new fromLoggedin.Change(loggedin));
  }
  onSubmit(){

  }


}