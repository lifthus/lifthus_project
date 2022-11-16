import { 
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete
   } from '@nestjs/common';
import { RecordWeekly } from 'src/dto/RecordWeekly';
import { SBD } from 'src/dto/sbd.dto';
import { PredService } from './services/pred.service';

  @Controller('api')
  export class ApiController {
    constructor(
      private readonly predService: PredService,
      ) {}
  
    /**
     * API which suggests best 3 methods based on training records.
     * @param records Training records for 24 weeks
     * @returns Best 3 methods and the results
     */
    @Post('pred') // POST /api/pred
    getPred(@Body() records: RecordWeekly[]): SBD {
      return this.predService.getPred(records);
    } 
  }
  