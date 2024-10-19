import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { INTERVAL_HOST_KEY } from './decorators/interval-host.decorator';
import { INTERVAL_KEY } from './decorators/interval.decorator';

@Injectable()
export class IntervalScheduler
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly intervals: NodeJS.Timer[] = [];
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onApplicationBootstrap() {
    const providers = this.discoveryService.getProviders();

    providers.forEach((wrapper) => {
      const { instance } = wrapper;

      if (!instance) {
        return;
      }

      // Ensure that the instance is an interval host
      const isIntervalHost =
        this.reflector.get(INTERVAL_HOST_KEY, instance.constructor) ?? false;

      if (!isIntervalHost) {
        return;
      }

      console.log(wrapper.token);

      // Get the prototype of the instance to scan its methods
      const prototype = Object.getPrototypeOf(instance);
      const methodKeys = this.metadataScanner.getAllMethodNames(prototype);

      methodKeys.forEach((methodKey) => {
        // Get the interval metadata for the method
        const interval = this.reflector.get(INTERVAL_KEY, prototype[methodKey]);

        if (!interval) {
          return;
        }

        const intervalRef = setInterval(() => instance[methodKey](), interval);

        this.intervals.push(intervalRef);
      });
    });
  }
  onApplicationShutdown(signal?: string) {
    this.intervals.forEach((intervalRef) => clearInterval(intervalRef as NodeJS.Timeout));
  }
}
