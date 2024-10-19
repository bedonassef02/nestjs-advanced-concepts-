import { Inject, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { LazyModuleLoader } from '@nestjs/core';
import { RewardsService } from '../rewards/rewards.service';
import { COFFEES_DATA_SOURCE_KEY, CoffeesDataSource } from './utils';

@Injectable()
export class CoffeesService {
  constructor(
    @Inject(COFFEES_DATA_SOURCE_KEY) coffeesDataSource: CoffeesDataSource,
    private readonly lazyModuleLoader: LazyModuleLoader,
  ) {}
  async create(createCoffeeDto: CreateCoffeeDto) {
    console.time()
    const rewardsModuleRef = await this.lazyModuleLoader.load(() =>
      import('../rewards/rewards.module').then((m) => m.RewardsModule),
    );

    const { RewardsService } = await import('../rewards/rewards.service');
    const rewardsService = rewardsModuleRef.get<RewardsService>(RewardsService);
    console.timeEnd()
    rewardsService.grantTo();
    return 'This action adds a new coffee';
  }

  findAll() {
    return `This action returns all coffees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coffee`;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    return `This action updates a #${id} coffee`;
  }

  remove(id: number) {
    return `This action removes a #${id} coffee`;
  }
}
