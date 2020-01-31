import { TestBed } from '@angular/core/testing';

import { SpellBattleService } from './spell-battle.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('SpellBattleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: SpellBattleService = TestBed.get(SpellBattleService);
    expect(service).toBeTruthy();
  });
});
