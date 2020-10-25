import { FormControl, ValidationErrors } from '@angular/forms';

export class MyValidators {

    static spaceCheck(control: FormControl): ValidationErrors {

        if ((control.value != null) && (control.value.trim().length === 0)) {

            return { 'spaceCheck': true};
        }

        else {
            return null;
        }
    }
}
