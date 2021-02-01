/**
 * @internal
 * */
import type { AbstractObject } from '../interfaces/abstract-object.interface';

export const REGEXP_PATTERNS: AbstractObject<RegExp> = {
  uuid: new RegExp(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/)
};
