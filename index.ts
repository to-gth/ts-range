import _Range from './src/Range'
import _IntRange from './src/IntRange'
import _NaturalIntRange from './src/NaturalIntRange'

import { Natural } from 'ts-number'


export interface Range<S extends number, L extends Natural> extends _Range<S, L> {}
export const Range = _Range

export interface IntRange extends _IntRange {}
export const IntRange = _IntRange

export interface NaturalIntRange extends _NaturalIntRange {}
export const NaturalIntRange = _NaturalIntRange
