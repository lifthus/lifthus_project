import { HttpException, HttpStatus } from "@nestjs/common";

// custom exceptions
export class ForbiddenException extends HttpException {
    // it's good practice to create own exceptions hierarchy, where custom exceptions inherit from 
    // the base HttpException
    constructor() {
        super('Forbidden', HttpStatus.FORBIDDEN)
    }
}

// and there are many built-in exceptions