import { Module } from '@nestjs/common';
import { SBDController } from './nestest.controller';
import { SBDService } from './nestest.service';

@Module({
    controllers: [ SBDController ],
    providers: [ SBDService ]
})
export class SBDModule{}