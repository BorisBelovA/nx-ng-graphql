import { Injectable } from '@nestjs/common';
import { Message } from '@angular-gql/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to my first nx + ng + nest + GQL project!' };
  }
}
