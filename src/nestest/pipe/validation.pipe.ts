// Pipe is a class annotated with the @Injectable(), which implements the PipeTransform interface.
// and see the built-in Parse pipe in nestset.controller.ts

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // value is the currentlly processed method argument(before received by the route handling method)
        // metadata is the currently processed method  argument's metadata like:
        // export interface ArgumentMetadata {
        //  type: 'body' | 'query' | 'param' | 'custom';
        //  metatype?: Type<unknown>;
        // data?: string; }
        // above describe the currently processed argument.
        return value;
    }
}
// PipeTransform<T, R> is a generic interface that must be implemented by any pipe.
// T to indicate the type of the input value and R to indicate the return type of transform().
// every pipe must implement the transform().