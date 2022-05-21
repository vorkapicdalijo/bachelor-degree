import { Directive, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Exercise } from '../models/exercise';
import { AppService } from '../services/app.service';

export function nameValidator(existingName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => 

      control.value == existingName ? {nameExists: control.value} : null

  
}


@Directive({
  selector: '[nameValidator]',
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: NameValidatorDirective,
    multi: true
}]
})
export class NameValidatorDirective implements Validator {
  @Input('nameValidator') exerciseNames: string[]

  validate(control: AbstractControl) {
    let value: string = control.value ? control.value: ""
    const nameExists = this.exerciseNames.indexOf(value.toLowerCase()) > -1;

    return nameExists ? {nameExists: true} : null;
  }
}
