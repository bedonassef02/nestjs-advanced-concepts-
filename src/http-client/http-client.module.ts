import { Inject, Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  HTTP_MODULE_OPTIONS,
} from './http-client.module-defintion';

@Module({})
export class HttpClientModule extends ConfigurableModuleClass {

  constructor(@Inject(HTTP_MODULE_OPTIONS) private options) {
    console.log(options);
    super();
  }
}
