import { describe, expect, it } from '@jest/globals'
import { hello } from '../src/index'

describe('hello', () => {
  it('should greet with name', () => {
    expect(hello('World')).toBe('Hello, World!')
  })
})
