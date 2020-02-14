import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const regExpShort: RegExp = /^(.{6,})$/;
    const regExpLong: RegExp = /^(.{41,})$/;
    const regExpChar: RegExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
    let isValidShort = false;
    let isValidLong = false;
    let isValidChar = false;
    let password = false;

    if (control.value) {
      isValidShort = regExpShort.test(control.value);
      isValidLong = !regExpLong.test(control.value);
      isValidChar = regExpChar.test(control.value);
      password = isValidShort && isValidLong && isValidChar;
    } else {
      password = true;
    }

    if ((isValidShort && isValidLong && isValidChar) && control.value) {
      return null;
    } else {
      return {
        isValidShort,
        isValidLong,
        isValidChar,
        password
      };
    }

  };
}


