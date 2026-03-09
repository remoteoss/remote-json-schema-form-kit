import * as jsfNext from '@remoteoss/json-schema-form'

import * as jsfV0 from '@remoteoss/json-schema-form-v0-deprecated'

import { createHeadlessForm, modify } from './index'
import { operators } from './json-logic-operators'

const legacySchema = {
  'type': 'object',
  'properties': {
    name: {
      'type': 'string',
      'title': 'Name',
      'x-jsf-presentation': { inputType: 'text' },
    },
  },
  'required': ['name'],
  'x-jsf-order': ['name'],
}

const nextSchema = {
  'x-rmt-meta': { jsfVersion: '1' },
  'type': 'object',
  'properties': {
    name: {
      'type': 'string',
      'title': 'Name',
      'x-jsf-presentation': { inputType: 'text' },
    },
  },
  'required': ['name'],
  'x-jsf-order': ['name'],
}

const nextSchemaWithCustomOperators = {
  'x-rmt-meta': { jsfVersion: '1' },
  'type': 'object',
  'properties': {
    name: {
      'type': 'string',
      'title': 'Name',
      'x-jsf-presentation': { inputType: 'text' },
    },
    date_difference_in_weeks: {
      'type': 'number',
      'title': 'Date difference in weeks',
      'x-jsf-presentation': { inputType: 'number' },
      'x-jsf-logic-computedAttrs': {
        const: 'computed_date_difference_in_weeks',
        default: 'computed_date_difference_in_weeks',
      },
    },
  },
  'required': ['name', 'date_difference_in_weeks'],
  'x-jsf-order': ['name'],
  'x-jsf-logic': {
    computedValues: {
      computed_date_difference_in_weeks: {
        rule: {
          date_difference_in_weeks: ['2026-03-06', '2026-01-13'],
        },
      },
    },
  },
}

jest.spyOn(jsfNext, 'createHeadlessForm')
jest.spyOn(jsfV0, 'createHeadlessForm')
jest.spyOn(jsfNext, 'modify')
jest.spyOn(jsfV0, 'modify')

describe('createHeadlessForm', () => {
  describe('version detection', () => {
    it('uses legacy version when x-rmt-meta is absent', () => {
      const result = createHeadlessForm(legacySchema)

      expect(result).toHaveProperty('fields')
      expect(result).toHaveProperty('handleValidation')
      expect(jsfV0.createHeadlessForm).toHaveBeenCalledWith(legacySchema, {
        initialValues: undefined,
        strictInputType: undefined,
      })
    })

    it('uses next version when x-rmt-meta.jsfVersion is "1"', () => {
      const result = createHeadlessForm(nextSchema)

      expect(result).toHaveProperty('fields')
      expect(result).toHaveProperty('handleValidation')
      expect(jsfNext.createHeadlessForm).toHaveBeenCalledWith(
        nextSchema,
        expect.objectContaining({ customJsonLogicOps: expect.objectContaining({ ...operators }) }),
      )
    })

    it('uses next version when nextVersion option is true', () => {
      const schemaWithoutMeta = {
        'type': 'object',
        'properties': {
          name: {
            'type': 'string',
            'title': 'Name',
            'x-jsf-presentation': { inputType: 'text' },
          },
        },
        'required': ['name'],
        'x-jsf-order': ['name'],
      }

      const result = createHeadlessForm(schemaWithoutMeta, {
        nextVersion: true,
      })

      expect(result).toHaveProperty('fields')
      expect(result).toHaveProperty('handleValidation')
    })

    it('uses operators when they are provided in the schema with v1', () => {
      const { handleValidation } = createHeadlessForm(nextSchemaWithCustomOperators)

      const result = handleValidation({ name: 'John', date_difference_in_weeks: 10 })

      expect(result.formErrors).toEqual({
        date_difference_in_weeks: 'The only accepted value is 7.',
      })
    })
  })

  describe('fields', () => {
    it('returns fields from legacy schema', () => {
      const { fields } = createHeadlessForm(legacySchema)

      expect(fields).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'name' })]))
    })

    it('returns fields from next schema', () => {
      const { fields } = createHeadlessForm(nextSchema)

      expect(fields).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'name' })]))
    })
  })

  describe('handleValidation', () => {
    it('returns errors for missing required fields in legacy schema', () => {
      const { handleValidation } = createHeadlessForm(legacySchema)
      const result = handleValidation({})

      expect(result.formErrors).toEqual({ name: 'Required field' })
    })

    it('returns no errors when required fields are provided in legacy schema', () => {
      const { handleValidation } = createHeadlessForm(legacySchema)
      const result = handleValidation({ name: 'John' })

      expect(result.formErrors).toBeUndefined()
    })

    it('returns errors for missing required fields in next schema', () => {
      const { handleValidation } = createHeadlessForm(nextSchema)
      const result = handleValidation({})

      expect(result.formErrors).toEqual({ name: 'Required field' })
    })

    it('returns no errors when required fields are provided in next schema', () => {
      const { handleValidation } = createHeadlessForm(nextSchema)
      const result = handleValidation({ name: 'John' })

      expect(result.formErrors).toBeUndefined()
    })
  })

  describe('error handling', () => {
    it('returns error property for invalid legacy schema', () => {
      const result = createHeadlessForm({})

      expect(result.error).not.toBeNull()
      expect(result.isError).toBe(true)
    })

    it('handles invalid schema in next version', () => {
      const result = createHeadlessForm({}, { nextVersion: true })

      expect(result.error).toBeNull()
      expect(result.isError).toBe(false)
    })
  })
})

describe('modify', () => {
  it('modifies a legacy schema', () => {
    const result = modify(legacySchema, { muteLogging: true })

    expect(result).toHaveProperty('schema')
  })

  it('modifies a next schema', () => {
    const result = modify(nextSchema, { muteLogging: true })

    expect(result).toHaveProperty('schema')
  })
})
