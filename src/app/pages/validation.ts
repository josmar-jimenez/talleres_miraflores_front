import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidationConfimPass {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      let control = controls.get(controlName);
      let checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors.matching) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }

    };
  }
}

export class ValidationSpaceWhite {
  static cannotContainSpace(controlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      let control = controls.get(controlName);

      if (control?.errors && !control.errors.cannotContainSpace) {
        return null;
      }

      if(control?.value.indexOf(' ') >= 0){  
        controls.get(controlName)?.setErrors({ cannotContainSpace: true });
        return {cannotContainSpace: true}  
      }else{
        return null;
      }  
    };   
  }
}  