import { Module } from '@nestjs/common';
import { UploadCareConfig } from './upload-care.config';

@Module({
  providers: [UploadCareConfig],
  exports: [UploadCareConfig],
})
export class UploadCareModule {}
