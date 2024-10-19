import { SetMetadata } from '@nestjs/common';

export const INTERVAL_HOST_KEY = Symbol('INTERVAL_HOST_KEY');

export const IntervalHost: ClassDecorator = SetMetadata(
  INTERVAL_HOST_KEY,
  true,
);
