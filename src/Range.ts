import ApplicationError from 'ts-applicatin-error'
import { Real, Natural } from 'ts-number'

interface Range<S extends number, L extends Natural> {
  start: S
  length: L
}

namespace Range {

  export const admits = (a: any): a is Range<number, Natural> => {
    const { start, length } = a
    if (!Real.admits(start)) return false
    if (!Natural.admits(length)) return false
    return true
  }

  export const from = <S extends number, L extends Natural>(start: S, length: L): Range<S, L> => {
    const range = { start, length }
    if (admits(range)) return range
    throw new ApplicationError(`Failed to create a Range from start: ${ start }, length: ${ length }`)
  }

  export const between = <S extends number>(start: S, end: S): Range<S, Natural> | undefined => {
    const length = (end + 1) - start
    if (Natural.admits(length)) return from(start, length)
    return undefined
  }
}

namespace Range {

  export const endOf = ({ start, length }: Range<number, Natural>): number => {
    return start + length - 1
  }

  export const includes = (n: number, range: Range<number, Natural>): boolean => {
    if (n < range.start) return false
    if (endOf(range) < n) return false
    return true
  }
}

namespace Range {

  // export const emptyArrayFrom = ({ length }: Range<number, number>): any[] => {
  //   return Array(length).fill(undefined)
  // }

  // export const arrayFrom = (range: Range<number, number>): number[] => {
  //   return emptyArrayFrom(range)
  //           .fill(range.start)
  //           .map((v, i): number => v + i)
  // }
}

namespace Range {

  export const progressed = (count: number, range: Range<number, Natural>): Range<number, Natural> => {
    return from(range.start + count, range.length)
  }

  // const min = 0

  // const correctedLengthFor = (max: number, length: Natural, start: number): Natural | undefined => {
  //   // if (length < min) return min
  //   if ((start + length - 1) < max) return length
  //   const corrected = (max + 1) - start
  //   if (Natural.admits(corrected)) return corrected
  //   return undefined
  // }

  // export const withLengthwiseCorrectedFor =
  // (max: number, { start, length }: Range<number, Natural>): Range<number, Natural> | undefined => {
  //   const correctedLength = correctedLengthFor(max, length, start)
  //   if (correctedLength === undefined) return undefined
  //   return from(start, correctedLength)
  //   // if (!admits(corrected)) throw new Error('Failed to admit length')
  //   // return corrected
  // }

  export const clampedBetween =
    <S extends number, L extends Natural>(bottom: number, top: number, range: Range<S, L>): Range<number, Natural> => {

    const start = Real.clampedWithin(bottom, top, range.start)
    const end = Real.clampedWithin(bottom, top, endOf(range))
    const clamped = between(start, end)
    if (clamped !== undefined) return clamped
    throw new ApplicationError(`Failed to clamp range: ${ range } between bottom: ${ bottom } and top: ${ top }`)
  }

  export const clampedWithin =
    <S extends number, L extends Natural>(er: Range<S, L>, ee: Range<S, L>): Range<number, Natural> => {

    const bottom = er.start
    const top = endOf(er)
    return clampedBetween(bottom, top, ee)
  }

  export const overlapsWith = (a: Range<number, Natural>, b: Range<number, Natural>): boolean => {
    if (endOf(a) < b.start) return false
    if (endOf(b) < a.start) return false
    return true
  }
}

namespace Range {

  export const toString = ({ start, length }: Range<number, Natural>): string => {

    return `{
      start: ${ start }
      length: ${ length }
    }`
  }
}

export default Range
