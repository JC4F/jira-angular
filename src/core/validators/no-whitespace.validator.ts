import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): Record<string, unknown> | null => {
    let controlVal = control.value;
    if (typeof controlVal === 'number') {
      controlVal = `${controlVal}`;
    }
    const isWhitespace = (controlVal || '').trim().length === 0;
    const isValid = !isWhitespace;

    return isValid ? null : { whitespace: 'value is only whitespace' };
  };
}
