import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardsService {
  grantTo() {
    console.log('Hello From Lazy Loaded RewardsService');
  }
}
