// The Joi lib allows to create schemas in as straightforward way with a redable API.

// npm install --save joi
// npm install --save-dev @types/joi

// make validation pipe reusable like Generic 
// see controller part
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}

// and validator based on class-validator and class-transformer is possible.

// and could be used like :
// @Post()
// async create(
//  @Body( new ValidationPipe()) createCatDto: CreateCatDto, 

// and it can be global scoped like:
// async function bootstrap() {
// const app = await NestF~
// app.useGlobalPipes(new ValidationPipe());
// await app.listen(3000);
// } bootstrap();

// and to binding global pipe for DI, it can be done like:
// import { APP_PIPE } from '@nestjs/core';
// ~ provide: APP_PIPE, ~