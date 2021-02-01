import type { RegExpPatternName } from './../../internal/types/reg-exp-pattern-name.type';

const patternByName: Map<RegExpPatternName, RegExp> = new Map<RegExpPatternName, RegExp>([
  ['email', new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)],
  [
    'url',
    new RegExp(
      '^' +
        '(http://www.|https://www.|http://|https://)?' + // protocol
        '[a-z0-9]+([-.]{1}[a-z0-9]+)*' +
        '.' +
        '[a-z]{2,5}' + // 1st level domain
        '(:[0-9]{1,5})?' + // port
        '(/.*)?' + // path
        '$'
    )
  ],
  ['uuid', new RegExp(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/)]
]);

export function getRegExpPattern(name: RegExpPatternName): RegExp {
  return patternByName.get(name);
}
