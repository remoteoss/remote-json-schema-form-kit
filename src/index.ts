import {
  createHeadlessForm as createHeadlessFormNext,
  type CreateHeadlessFormOptions,
  modify as modifyNext,
} from '@remoteoss/json-schema-form'
import {
  createHeadlessForm as createHeadlessFormV0,
  modify as modifyV0,
} from '@remoteoss/json-schema-form-v0-deprecated'
import { operators } from './json-logic-operators'

type FormSchemaNext = Parameters<typeof createHeadlessFormNext>[0]
type FormSchemaLegacy = Parameters<typeof createHeadlessFormV0>[0]
type FormSchema = FormSchemaNext | FormSchemaLegacy

interface JsfOptions extends CreateHeadlessFormOptions {
  nextVersion?: boolean
  [key: string]: any
}

export function createHeadlessForm(formSchema: FormSchema, jsfOptions: JsfOptions = {}) {
  const { nextVersion: configNextVersion = false, initialValues, strictInputType } = jsfOptions

  const schemaJsfVersion = formSchema?.schema?.['x-rmt-meta']?.jsfVersion

  const nextVersion = schemaJsfVersion === '1' || configNextVersion

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

export function getModifyFn(nextVersion: boolean) {
  return nextVersion ? modifyNext : modifyV0
}
