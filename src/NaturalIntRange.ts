
import Range from './Range'
import IntRange from './IntRange'
import { NaturalInt } from 'ts-number'
import ApplicationError from 'ts-applicatin-error'

interface NaturalIntRange extends Range<NaturalInt, NaturalInt> {
}

namespace NaturalIntRange {

  export const admits = (a: any): a is NaturalIntRange => {
    const { start, length } = a
    if (!NaturalInt.admits(start)) return false
    if (!NaturalInt.admits(length)) return false
    return true
  }

  export const from = <S extends NaturalInt, L extends NaturalInt>(start: S, length: L): NaturalIntRange => {
    const range = IntRange.from(start, length)
    if (admits(range)) return range
    throw new ApplicationError(`Failed to create a NaturalIntRange from with start: ${ start } and length ${ length }`)
  }
}

namespace NaturalIntRange {

  export const includes = (i: NaturalInt, range: NaturalIntRange): boolean => {
    return IntRange.includes(i, range)
  }
}

export default NaturalIntRange
