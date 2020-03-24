import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public loading: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  constructor() {
  }
  setLoading(boolean: Boolean){
    this.loading.next(boolean);
  }

}
