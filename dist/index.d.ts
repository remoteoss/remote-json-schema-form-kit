import { createHeadlessForm as createHeadlessForm$1, modify as modify$1, CreateHeadlessFormOptions } from '@remoteoss/json-schema-form';
import { createHeadlessForm as createHeadlessForm$2, modify as modify$2 } from '@remoteoss/json-schema-form-v0-deprecated';

type FormSchemaNext = Parameters<typeof createHeadlessForm$1>[0];
type FormSchemaLegacy = Parameters<typeof createHeadlessForm$2>[0];
type FormSchema = FormSchemaNext | FormSchemaLegacy;
interface JsfOptions extends CreateHeadlessFormOptions {
    nextVersion?: boolean;
    [key: string]: any;
}
type FormResult = ReturnType<typeof createHeadlessForm$1> | ReturnType<typeof createHeadlessForm$2>;
type ModifyResult = ReturnType<typeof modify$1> | ReturnType<typeof modify$2>;
declare function createHeadlessForm(formSchema: FormSchema, jsfOptions?: JsfOptions): FormResult;
declare function modify(formSchema: FormSchema, options?: {}): ModifyResult;

export { type FormResult, type ModifyResult, createHeadlessForm, modify };
