import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../configs/typeorm.config';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig)],
  exports: [TypeOrmModule],
})
export class DBModule {}
