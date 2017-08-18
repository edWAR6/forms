import { AbstractControl, FormGroup } from '@angular/forms';
export class PasswordValidator {

  static MatchPassword(group: FormGroup) {
   let password = group.controls["passwordControl"].value;
   let confirmPassword = group.controls["confirmPasswordControl"].value;
    if(password != confirmPassword) {
      group.controls["confirmPasswordControl"].setErrors( { differentPassword: true } )
    } else {
      return null
    }
  }
}
