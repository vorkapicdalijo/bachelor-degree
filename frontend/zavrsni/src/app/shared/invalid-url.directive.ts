import { Directive, Input } from "@angular/core";
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
    selector: '[appInvalidUrl]',
    providers: [{provide: NG_VALIDATORS, useClass: InvalidUrlDirective, multi: true}]
})
export class InvalidUrlDirective implements Validator {
    validator: ValidatorFn;
    constructor() {
        this.validator = this.invalidUrlValidator();
    }


    validate (control: AbstractControl): ValidationErrors | null  {
        return this.validator(control); 
    }

    invalidUrlValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const invalid = !(/\.(jpg|jpeg|png|webp|avif|gif|svg).*$/.test(control.value));
            if (invalid) {
                return {
                    invalidUrlValidator: {valid: false}
                };
            }
            else {
                return null;
            }
        };
    }
}