import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestiaSwaggerComposer } from '@nestia/sdk';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function main() {
  const app = await NestFactory.create(AppModule);

  const document = await NestiaSwaggerComposer.document(app, {
    info: {
      title: 'Test API 문서',
      version: '1.0.0',
    },
    openapi: '3.1',
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Localhost',
      },
    ],
  });
  SwaggerModule.setup('api', app, document as any);

  await app.listen(process.env.PORT ?? 3000);
}
main();
