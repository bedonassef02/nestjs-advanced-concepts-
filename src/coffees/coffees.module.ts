import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

/*
  - To find Circular Dependency
    =  npx madge  dist/main.js --circular
    
  - To Make Image For this
    = npx madge dist/main.js --image graph.png
*/

export const COFFEES_DATA_SOURCE_KEY = Symbol('COFFEES_DATA_SOURCE');
@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService, {
    provide: COFFEES_DATA_SOURCE_KEY,
    useValue: []
  }],
})
export class CoffeesModule {}
