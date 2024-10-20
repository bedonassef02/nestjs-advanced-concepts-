import { Type } from '@nestjs/common';
import { randomUUID } from 'crypto';

export function WidthUuid<TBase extends Type>(Base: TBase) {
  return class extends Base {
    uuid = randomUUID();

    regerateUuid() {
      this.uuid = randomUUID();
    }
  };
}
