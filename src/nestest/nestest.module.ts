import { Module, Global, DynamicModule } from '@nestjs/common';
import { SBDController } from './nestest.controller';
import { SBDService } from './nestest.service';

// with @Global(), can make the class as glolbal but not suggested.
@Module({
    controllers: [ SBDController ],
    providers: [ SBDService ],
    exports: [ SBDService ]
})
export class SBDModule{
    // and also  a module class can inject providers. (for config purpose)
    constructor( private sbdService: SBDService){}
    // but module itself can't be injected as provider due to 
}

@Module({
    providers:[/* Conn */],
})
export class DyMdTestModule {
    static forRoot(entities=[], options?): DynamicModule {
        const providers = {/* createblahProviders(options, entities); */}
        return {
            //global: True,
            module: DyMdTestModule,
            //providers: providers,
           //exports:providers
        }; // foRoot method may return a dynamic module either synchronously or async(via a Promise)
    }
}
// this module defines the Conn by default but depending on entities and options,
// it exposes a colleciton of them.
// Note that properties returned by the dynamic module 'extend' the base module.
// and it can be imported later like impoorts: [DyMdTestModule.forRoot([User])],
// it want to re-export it, can omit the forRoot() like
// exports:[DyMdTestModule],