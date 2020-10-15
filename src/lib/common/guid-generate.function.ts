function genGuid(count: number): string {
  // tslint:disable: no-bitwise
  let out: string = '';
  for (let i: number = 0; i < count; i++) {
    out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return out;
  // tslint:enable: no-bitwise
}

export function guidGenerate(): string {
  return [genGuid(2), genGuid(1), genGuid(1), genGuid(1), genGuid(3)].join('-');
}
