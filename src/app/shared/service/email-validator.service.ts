import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {

  constructor(
    // private _http: HttpClient
  ) { }
  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log(email)
  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay(2000)
  //   )
  // }
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors | null>(suscriber => {
      if (email == 'omar@gmail.com') {
        suscriber.next({ emailTaken: true });
        suscriber.complete();
        return;
      }

      suscriber.next(null)
      suscriber.complete();

    }).pipe(
      delay(1000)
    )

    return httpCallObservable;
  }


}
