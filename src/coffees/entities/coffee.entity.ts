import { WidthUuid } from 'src/common/mixins/width-uuid.mixin';

export class Coffee {
  constructor(public name: string) {}
}

const CoffeeWithUuidCls = WidthUuid(Coffee);
const coffee = new CoffeeWithUuidCls('buddy');
coffee.name