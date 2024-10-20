import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoffeesModule } from './coffees/coffees.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import { HttpClientModule } from './http-client/http-client.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    // SchedulerModule, CronModule,
    FibonacciModule,
    HttpClientModule.forRoot({ baseUrl: 'http://localhost:3000' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
