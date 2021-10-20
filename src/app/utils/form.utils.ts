import { AbstractControl, FormGroup, FormArray } from '@angular/forms';

export function MarkFormGroupTouched(
    FormControls: { [key: string]: AbstractControl } | AbstractControl[]
): void {
    const MarkFormGroupTouchedRecursive = (
        controls: { [key: string]: AbstractControl } | AbstractControl[]
    ): void => {
        Object.entries(controls).forEach(([controlKey, c]) => {
            if (c instanceof FormGroup || c instanceof FormArray) {
                MarkFormGroupTouchedRecursive(c.controls);
            } else {
                c.markAsTouched();
            }
        });
    };
    MarkFormGroupTouchedRecursive(FormControls);
}

export function MarkFormGroupUntouched(
    FormControls: { [key: string]: AbstractControl } | AbstractControl[]
): void {
    const MarkFormGroupTouchedRecursive = (
        controls: { [key: string]: AbstractControl } | AbstractControl[]
    ): void => {
        Object.entries(controls).forEach(([controlKey, c]) => {
            if (c instanceof FormGroup || c instanceof FormArray) {
                MarkFormGroupTouchedRecursive(c.controls);
            } else {
                c.markAsUntouched();
            }
        });
    };
    MarkFormGroupTouchedRecursive(FormControls);
}
