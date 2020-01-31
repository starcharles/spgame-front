import { TestBed } from '@angular/core/testing';

import { BattleService } from './battle.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('BattleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
          HttpClientModule
      ]
  }));

  it('should be created', () => {
    const service: BattleService = TestBed.get(BattleService);
    expect(service).toBeTruthy();
  });
});
