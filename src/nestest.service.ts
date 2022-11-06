import { Injectable } from '@nestjs/common';
import { SBD } from './interfaces/nestest.interface';

@Injectable()
export class SBDService {
    private readonly sbds: SBD[] = [];

    create(sbd: SBD) : string{
        this.sbds.push(sbd)
        return 'new sbd'
    }

    findAll(): SBD[] {
        return this.sbds;
    }
}
