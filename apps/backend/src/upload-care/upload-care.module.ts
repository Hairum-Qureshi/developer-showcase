import { Module } from '@nestjs/common';
import { UploadCareService } from './upload-care.service';

@Module({
  providers: [UploadCareService]
})
export class UploadCareModule {}
