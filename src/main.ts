import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/exception/http-exception';
import { HttpResponseInterceptor } from './shared/interceptor/http-response-interceptor';
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet';
// import * as compression from 'compression'; 


async function bootstrap() {
const app = await NestFactory.create(AppModule);

// exception filters
const { httpAdapter } = app.get(HttpAdapterHost);
app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
app.useGlobalInterceptors(new HttpResponseInterceptor());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.enableCors({
origin: '*',
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true,

});
app.setGlobalPrefix('api');
// app.use(compression());

const config = new DocumentBuilder()
.setTitle('Fleet Management')
.setDescription('The Fleet Management API description')
.setVersion('0.1')
.addBearerAuth()
.build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup("api/docs", app, document, {
customSiteTitle: "Api Docs",
customfavIcon: "https://avatars.githubusercontent.com/u/6936373?s=200&v=4",
customJs: [
"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
],
customCssUrl: [
"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
],
swaggerOptions: {
persistAuthorization: true,
},

});
// app.use(helmet())
app.getHttpAdapter().get('/api', (_, res) => {
  res.redirect('/api/docs');
});


await app.listen(4000);
}

bootstrap();

