import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Ecommerce')
  .setDescription('The Ecom API description')
  .setVersion('1.0')
  .addApiKey({
    
    name: 'x-access-token',
    type: "apiKey",
    in: "header"
  }, 'x-access-token')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  await app.listen(3000);
}
bootstrap();
