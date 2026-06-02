import { ConfigService } from '@nestjs/config';
import { UploadClient } from '@uploadcare/upload-client';

export const UploadCareConfig = {
  provide: 'UploadCare',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const PUBLIC_KEY = configService.get<string>('UPLOADCARE_PUBLIC_KEY');

    if (!PUBLIC_KEY) {
      throw new Error(
        'UploadCare public key must be provided in the environment variables.',
      );
    }

    const client = new UploadClient({
      publicKey: PUBLIC_KEY,
    });

    return client;
  },
};
