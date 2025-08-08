import type { Nullable } from '@bimeister/utilities.types';
import { isNil } from './is-nil.function';

/**
 * Декоратор, предотвращающий вызов сеттера, если присвоенное значение равно `null`.
 *
 * Используется для игнорирования `null`-значений при установке свойства.
 * Полезно для опциональных или патч-обновлений, где `null` не должен перезаписывать значение.
 *
 * @example
 ** class MyClass {
 **   private _value: string = '';
 **
 **   @Input() @SkipNull()
 **   set value(val: string | null) {
 **     this._value = val;
 **   }
 ** }
 *
 * const obj = new MyClass();
 * obj.value = 'Hello'; // ✅ setter вызван
 * obj.value = null;    // ❌ setter пропущен
 */
export function SkipNull(): MethodDecorator {
  return function (_target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalSetter: Nullable<(value: any) => void> = descriptor.set;

    if (isNil(originalSetter)) {
      throw new Error(`@SkipNull can only be used on a 'set' accessor for property '${propertyKey.toString()}'.`);
    }

    descriptor.set = function (value: any): void {
      if (value !== null) {
        originalSetter.call(this, value);
      }
    };

    return descriptor;
  };
}
