import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}
}
