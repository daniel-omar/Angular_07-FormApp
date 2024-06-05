import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent {

  public myForm: FormGroup = new FormGroup({});
  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private _formBuilder: FormBuilder) {

    this.initForm();

  }

  initForm() {
    this.myForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      favoriteGames: this._formBuilder.array([
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required]
      ])
    })
  }

  validField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getValidatorError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required': return 'El campo es requerido'; break;
        case 'minlength': return `Se requiere minimo ${errors["minlength"].requiredLength} caracteres`; break;
      }
    }

    return null;
  }

  validFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  removeFieldInArray(formArray: FormArray, index: number) {
    formArray.removeAt(index);
  }

  addToFieldFavorite(): void {
    if (this.newFavorite.invalid) return;
    const newFavoriteGame = this.newFavorite.value;

    this.favoriteGames.push(this._formBuilder.control(newFavoriteGame, Validators.required));
    this.newFavorite.reset();
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls["favoriteGames"] as FormArray) = this._formBuilder.array([]);
    this.myForm.reset();

  }

  get favoriteGames(): FormArray {
    return this.myForm.get("favoriteGames") as FormArray;
  }

}
