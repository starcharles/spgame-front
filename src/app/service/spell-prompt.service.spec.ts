import { TestBed } from '@angular/core/testing';

import { SpellPromptService } from './spell-prompt.service';

describe('SpellPromptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpellPromptService = TestBed.get(SpellPromptService);
    expect(service).toBeTruthy();
  });
});
