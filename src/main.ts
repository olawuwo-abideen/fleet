import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
   
async function bootstrap() {
const app = await NestFactory.create(AppModule);

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
const config = new DocumentBuilder()
.setTitle('Median')
.setDescription('The Fleet Management API description')
.setVersion('0.1')
.addBearerAuth()
.build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, 
    },
  });
  app.getHttpAdapter().get('/', (_, res) => {
    res.redirect('/api');
  });
await app.listen(3000);
}
bootstrap();  
