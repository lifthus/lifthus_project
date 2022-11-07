import { Inject, Injectable , Optional } from '@nestjs/common';
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

// optional ( like default configuration )
@Injectable() 
export class HttpService<T> {
    // constructor-based injection indicating a dependency through a class in the constructor
    constructor (@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
// for very specific cases, there are property-based injection
// to avoiding calling super() in sub-classes from the constructor cause it may be tedious.
@Injectable()
export class HttpService2<T> {
    @Inject('HTTP_OPTIONS')
    private readonly httpClient: T;
}
// but if the class doesn't extend another provider, should prefer using const-based inj.
