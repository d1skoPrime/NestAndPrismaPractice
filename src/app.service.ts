import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  sayHi(){
    return 'Hello NestJS'
  }
}
