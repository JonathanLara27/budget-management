
import { Injectable, computed } from '@angular/core';
import { TRANSACTIONS_HISTORY_TITLE } from './transactions-history.constants';

@Injectable()
export class TransactionsHistoryService {

  public title = computed(() => TRANSACTIONS_HISTORY_TITLE);

  constructor() { }

}
