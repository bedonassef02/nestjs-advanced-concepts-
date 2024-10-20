import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';

export function EntityExistsPipe(entityCls: Type): Type<PipeTransform> {
  @Injectable()
  class EntityExistsPipeCls implements PipeTransform {
    constructor(
      @Inject(entityCls)
      private readonly entityRepository: {
        exists(condition: unknown): Promise<boolean>;
      },
    ) {}
    async transform(value: any, metadata: ArgumentMetadata) {
      await this.entityRepository.exists({ where: { id: value } }); // throws error if entity not exists
      return value;
    }
  }

  return EntityExistsPipeCls;
}
