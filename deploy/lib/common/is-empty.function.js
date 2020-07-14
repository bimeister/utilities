import { isNullOrUndefined } from './is-null-or-undefined.function';
export function isEmpty(input) {
    if (isNullOrUndefined(input)) {
        return true;
    }
    if (isObject(input) && Array.isArray(input)) {
        return isEmptyArray(input);
    }
    if (isObject(input)) {
        return isEmptyObject(input);
    }
    if (isString(input)) {
        return isEmptyString(input);
    }
    return false;
}
const isEmptyArray = (input) => {
    return Array.isArray(input) && Object.is(input.length, 0);
};
const isEmptyObject = (input) => {
    return isEmptyArray(Object.keys(input));
};
const isEmptyString = (input) => {
    return Object.is(input.length, 0);
};
const isObject = (input) => {
    return typeof input === 'object';
};
const isString = (input) => {
    return typeof input === 'string';
};
