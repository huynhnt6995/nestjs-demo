import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filter/AllExceptionsFilter';
import { AuthGuard } from './shared/guard/auth.guard';
import { ResponseInterceptor } from './shared/intercepter/ResponseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalGuards(new AuthGuard());
  await app.listen(process.env.PORT);
}
bootstrap();
