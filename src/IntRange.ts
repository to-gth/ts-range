
import { Int, NaturalInt } from 'ts-number'
import Range from './Range'

// interface IntRange {
//   start: Int
//   length: Int
//   // includes: IntRange.Includes
// }

// interface IntRange<S extends Int, L extends NaturalInt> extends Range<S, L> {
// }
interface IntRange extends Range<Int, NaturalInt> {
}

namespace IntRange {

  export const admits = (a: any): a is IntRange => {
    const { start, length } = a
    if (!Int.admits(start)) return false
    if (!NaturalInt.admits(length)) return false
    return true
  }

  export const from = <S extends Int, L extends NaturalInt>(start: S, length: L): IntRange => {
    return Range.from(start, length)
  }
}

namespace IntRange {

  export const endOf = (range: IntRange): Int => {
    return Int.from(Range.endOf(range))
  }

  export const includes = (i: Int, range: IntRange): boolean => {
    return Range.includes(i, range)
  }
}

// namespace IntRange {

//   export const sStartingAt = (starts: Range.Starts<any>, anies: any[]): Array<Range<Int, NaturalInt>> => {
//     const ranges = Range.sStartingAt(starts, anies)
//     return ranges as Array<Range<Int, NaturalInt>>
//   }
// }

namespace IntRange {

  export type Starts<T> = (prev: T, current: T) => boolean

  export const startIndiceOf = <T>(ts: T[], starts: Starts<any>): Int[] => {
    const indice: Int[] = [Int.from(0)]
    ts.reduce((prev: T, current: T, i: number): T => {
      if (starts(prev, current)) indice.push(Int.from(i))
      return current
    })
    return indice
  }

  export const sStartingAt = (starts: Starts<any>, anies: any[]): IntRange[] => {
    const startIndice = startIndiceOf(anies, starts)
    const ranges = startIndice.map((startIndex: Int, i: number, indice: Int[]): IntRange => {
      const nextStartIndex = indice[i + 1] || anies.length
      const length = NaturalInt.from(nextStartIndex - startIndex)
      return from(startIndex, length)
    })
    return ranges
  }
}

export default IntRange
