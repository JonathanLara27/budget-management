import { Injectable, computed } from '@angular/core';
import { PROFILE_TITLE } from './profile.constants';

@Injectable()
export class ProfileService {

  public title = computed(() => PROFILE_TITLE);

  constructor() { }

}
