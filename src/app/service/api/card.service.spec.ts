import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('CardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
          HttpClientModule
      ],
      // providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: CardService = TestBed.get(CardService);
    expect(service).toBeTruthy();
  });
});
