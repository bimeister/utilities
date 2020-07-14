export declare function isEmpty(input: null | undefined): true;
export declare function isEmpty(input: NonNullable<number | boolean | symbol>): false;
export declare function isEmpty(input: string): input is '';
export declare function isEmpty<T>(input: T[]): input is [];
export declare function isEmpty(input: object): input is {};
