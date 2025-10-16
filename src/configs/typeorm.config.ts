import { TypeOrmModuleOptions } from '@nestjs/typeorm';
//공개
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: parseInt('5432'),
  username: 'postgres',
  password: '1234',
  database: 'nestia_blog_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
