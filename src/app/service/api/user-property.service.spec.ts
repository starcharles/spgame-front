import { TestBed } from '@angular/core/testing';

import { UserPropertyService } from './user-property.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('UserPropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
          HttpClientModule
      ]
  }));

  it('should be created', () => {
    const service: UserPropertyService = TestBed.get(UserPropertyService);
    expect(service).toBeTruthy();
  });
});
