import { createHeadlessForm as createHeadlessForm$1, ValidationResult as ValidationResult$1, modify as modify$1, FormErrors as FormErrors$1, CreateHeadlessFormOptions } from '@remoteoss/json-schema-form';
import { createHeadlessForm as createHeadlessForm$2, modify as modify$2 } from '@remoteoss/json-schema-form-v0-deprecated';

type FormSchemaNext = Parameters<typeof createHeadlessForm$1>[0];
type FormSchemaLegacy = Parameters<typeof createHeadlessForm$2>[0];
type FormSchema = FormSchemaNext | FormSchemaLegacy;
type ValidationResultLegacy = ReturnType<typeof createHeadlessForm$2>['handleValidation'];
interface FormErrorsLegacy {
    formErrors?: any;
    yupError?: any;
}
interface JsfOptions extends CreateHeadlessFormOptions {
    nextVersion?: boolean;
    [key: string]: any;
}
type FormResult = ReturnType<typeof createHeadlessForm$1> | ReturnType<typeof createHeadlessForm$2>;
type ValidationResult = ValidationResult$1 | ValidationResultLegacy;
type ModifyResult = ReturnType<typeof modify$1> | ReturnType<typeof modify$2>;
type ModifyConfig = Parameters<typeof modify$1>[1] | Parameters<typeof modify$2>[1];
type FormErrors = FormErrors$1 | FormErrorsLegacy;
declare function createHeadlessForm(formSchema: FormSchema, jsfOptions?: JsfOptions): FormResult;
declare function modify(formSchema: FormSchema, options?: ModifyConfig): ModifyResult;

export { type FormErrors, type FormResult, type ModifyConfig, type ModifyResult, type ValidationResult, createHeadlessForm, modify };
