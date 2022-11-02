import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class SBDService {
  getSBD(): string {
    return 'Squat Benchpress Deadlift!';
  }
}
