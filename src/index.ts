import {
  createHeadlessForm as createHeadlessFormNext,
  type CreateHeadlessFormOptions,
  type FormErrors as FormErrorsNext,
  modify as modifyNext,
  type ValidationResult as ValidationResultNext,
} from '@remoteoss/json-schema-form'
import {
  createHeadlessForm as createHeadlessFormV0,
  modify as modifyV0,
} from '@remoteoss/json-schema-form-v0-deprecated'
import { operators } from './json-logic-operators'

type FormSchemaNext = Parameters<typeof createHeadlessFormNext>[0]
type FormSchemaLegacy = Parameters<typeof createHeadlessFormV0>[0]
type FormSchema = FormSchemaNext | FormSchemaLegacy
type ValidationResultLegacy = ReturnType<typeof createHeadlessFormV0>['handleValidation']
interface FormErrorsLegacy {
  formErrors?: any
  yupError?: any
}

interface JsfOptions extends CreateHeadlessFormOptions {
  nextVersion?: boolean
  [key: string]: any
}

// Re-export return types for DTS generation
export type FormResult = ReturnType<typeof createHeadlessFormNext> | ReturnType<typeof createHeadlessFormV0>
export type ValidationResult = ValidationResultNext | ValidationResultLegacy
export type ModifyResult = ReturnType<typeof modifyNext> | ReturnType<typeof modifyV0>
export type ModifyConfig = Parameters<typeof modifyNext>[1] | Parameters<typeof modifyV0>[1]
export type FormErrors = FormErrorsNext | FormErrorsLegacy

function isNextVersion(formSchema: FormSchema, { nextVersion }: { nextVersion?: boolean, [key: string]: any } = { nextVersion: false }) {
  return formSchema?.['x-rmt-meta']?.jsfVersion === '1' || nextVersion
}

export function createHeadlessForm(formSchema: FormSchema, jsfOptions: JsfOptions = {}): FormResult {
  const { initialValues, strictInputType } = jsfOptions

  const nextVersion = isNextVersion(formSchema, jsfOptions)

  if (nextVersion) {
    return createHeadlessFormNext(formSchema as FormSchemaNext, {
      initialValues,
      strictInputType,
      legacyOptions: { treatNullAsUndefined: true, allowForbiddenValues: true },
      customJsonLogicOps: operators,
      ...jsfOptions,
    })
  }

  return createHeadlessFormV0(formSchema as FormSchemaLegacy, {
    initialValues,
    strictInputType,
    ...jsfOptions,
  } as any)
}

export function modify(formSchema: FormSchema, options: ModifyConfig = {}): ModifyResult {
  const nextVersion = isNextVersion(formSchema, options)

  if (nextVersion) {
    return modifyNext(formSchema, options)
  }

  return modifyV0(formSchema, options)
}
