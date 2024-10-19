import { SetMetadata } from '@nestjs/common';

export const INTERVAL_KEY = Symbol('INTERVAL_KEY');

export const Interval = (ms: number) => SetMetadata(INTERVAL_KEY, ms);
