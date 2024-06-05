import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrls: ['./switches-page.component.scss']
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = new FormGroup({});
  public person = {
    gender: 'M',
    wantNotifications: false
  }

  constructor(private _formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.initForm();
    this.myForm.reset(this.person);
  }

  initForm() {
    this.myForm = this._formBuilder.group({
      gender: ['M', Validators.required],
      wantNotifications: [true, Validators.required],
      termsAndConditions: [false, Validators.requiredTrue]
    })
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value

    this.person = newPerson
    console.log(this.person)
    console.log(this.myForm.value)
  }

}
