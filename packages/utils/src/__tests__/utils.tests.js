// @flow
import { Prelude } from '../../../prelude'
import utilsFactory from '../utils'

const mockExports = {
  memory: new Uint8Array(16),
  alloc: jest.fn(() => 0),
  dealloc: jest.fn(),
  dealloc_str: jest.fn()
}

const prelude = new Prelude()
prelude.withExports(mockExports)

beforeEach(() => {
  mockExports.alloc.mockClear()
  mockExports.dealloc.mockClear()
  mockExports.dealloc_str.mockClear()
})

describe('utils factory', () => {
  it('should return an object with the js_log function', () => {
    const env = {
      ...utilsFactory(prelude)
    }
    expect(env.js_log).toBeDefined()
  })
})
