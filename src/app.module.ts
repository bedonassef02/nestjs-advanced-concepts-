import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoffeesModule } from './coffees/coffees.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [ConfigModule.forRoot(), CoffeesModule, SchedulerModule, CronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
