import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx5000 = {
  name: 'RTX 5000',
  price: 3500,
  inStorage: 25
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.scss']
})
export class BasicPageComponent implements OnInit {

  // public myForm:FormGroup=new FormGroup({
  //   name:new FormControl('',[]),
  //   price:new FormControl('',[]),
  //   inStorage:new FormControl('',[]),
  // })

  public myForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.myForm.reset(rtx5000);
  }

  onSave() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return false;
    }

    this.myForm.reset()
    return true;
  }

  isValidField(field: string, validator: string): boolean {
    return this.myForm.controls[field].getError(validator) && this.myForm.controls[field].touched
  }

  isValidFieldV2(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    let mensaje: string = '';

    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required': mensaje = 'El campo es requerido'; break;
        case 'minlength': mensaje = `Se requiere minimo ${errors["minlength"].requiredLength} caracteresx `; break;
      }
    }
    return mensaje
  }


}
