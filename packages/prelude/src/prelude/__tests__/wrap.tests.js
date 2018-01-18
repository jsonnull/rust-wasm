import 'text-encoding'
import Prelude from '../index'
import types from '../../types'

const mockExports = {
  memory: new Uint8Array(16),
  alloc: jest.fn(() => 0),
  dealloc: jest.fn(),
  dealloc_str: jest.fn()
}

const wrappedFn = jest.fn()

const prelude = new Prelude()
prelude.withExports(mockExports)

beforeEach(() => {
  mockExports.alloc.mockClear()
  mockExports.dealloc.mockClear()
  mockExports.dealloc_str.mockClear()
  wrappedFn.mockClear()
})

describe('function wrapper generator', () => {
  it('should fail with less than 2 arguments', () => {
    const wrapZero = () => prelude.wrap()
    const wrapOne = () => prelude.wrap(types.string)
    expect(wrapZero).toThrowErrorMatchingSnapshot()
    expect(wrapOne).toThrowErrorMatchingSnapshot()
  })

  it('should fail with more than 3 arguments', () => {
    const wrapFour = () =>
      prelude.wrap(types.string, types.string, wrappedFn, types.string)
    expect(wrapFour).toThrowErrorMatchingSnapshot()
  })

  it('should allow input as array or single type', () => {
    const single = prelude.wrap(types.string, wrappedFn)
    const arr = prelude.wrap([types.string], wrappedFn)
    expect(single).toBeDefined()
    expect(arr).toBeDefined()
  })

  it('should call alloc/dealloc when passed string input', () => {
    const wrapped = prelude.wrap(types.string, wrappedFn)
    wrapped('test')
    expect(mockExports.alloc).toHaveBeenCalledTimes(1)
    expect(mockExports.dealloc).toHaveBeenCalledTimes(1)
  })

  it('should call alloc/dealloc multiple times with multiple inputs', () => {
    const wrapped = prelude.wrap([types.string, types.string], wrappedFn)
    wrapped('one', 'two')
    expect(mockExports.alloc).toHaveBeenCalledTimes(2)
    expect(mockExports.dealloc).toHaveBeenCalledTimes(2)
  })

  it('should pass non-strings by value', () => {
    const wrapped = prelude.wrap([types.string, types.number], wrappedFn)
    wrapped('one', 3)
    expect(wrappedFn).toHaveBeenCalledWith(0, 3)
  })
})
