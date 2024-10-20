import { Controller, Get, Query } from '@nestjs/common';
import { FibonacciWorkerHost } from './fibonacci-worker.host';
import Piscina from 'piscina';
import { resolve } from 'path';
@Controller('fibonacci')
export class FibonacciController {
  fibonacciWorker = new Piscina({
    filename: resolve(__dirname, 'fibonacci.worker.js'),
  });

  constructor(private fibonacciWorkerHost: FibonacciWorkerHost) {}

  @Get()
  fibonacci(@Query('n') n: number = 10) {
    return this.fibonacciWorker.run(n);
  }

  @Get('v2')
  fibonacciV2(@Query('n') n: number = 10) {
    return this.fibonacciWorkerHost.run(n);
  }
}
