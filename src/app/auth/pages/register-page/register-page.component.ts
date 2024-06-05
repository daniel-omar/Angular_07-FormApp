import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from 'src/app/shared/validators/validators';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/service/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public myForm: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder,
    private _validatorsService: ValidatorsService,
    private _emailValidatorService: EmailValidatorService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this._validatorsService.firstNameAndLastNamePattern)]],
      email: ['', [Validators.required, Validators.pattern(this._validatorsService.emailPattern)], [new EmailValidatorService]],
      username: ['', [Validators.required, this._validatorsService.canBeStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required]
    }, {
      //Se peude acceder a todos los campso del formulario
      validators: [
        this._validatorsService.isFieldOneEqualsFieldTwo('password', 'passwordConfirmation')
      ]
    })
  }

  isValidField(field: string) {
    return this._validatorsService.isValidField(this.myForm, field);
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }

  getFieldError(field: string) {
    return this._validatorsService.getFieldError(this.myForm, field);
  }
}
