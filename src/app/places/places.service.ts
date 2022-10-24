import { Injectable } from '@angular/core';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      1,
      'Seoul',
      'beautiful place',
      'https://media.cntraveler.com/photos/5fc6818f3cfe1de2cab79372/master/w_1920%2Cc_limit/Amsterdam-GettyImages-840603854.jpg',
      662
    ),
    new Place(
      2,
      'Tokyo',
      'beautiful place',
      'https://media.cntraveler.com/photos/62cde46e21a63704d1627e08/master/w_1600,c_limit/Four%20Seasons%20Otemachi_OTE_379.jpg',
      432
    ),
    new Place(
      3,
      'Christchurch',
      'beautiful place',
      'https://media.cntraveler.com/photos/62cde49f21a63704d1627e0a/master/w_1600,c_limit/Park%20Hyatt%20Niseko%20Hanazono-PRINT%20(1).jpg',
      432
    ),
  ];

  constructor() {}

  get places(): Place[] {
    return [...this._places];
  }

  getPlace(id: number): Place {
    return { ...this.places.find((x) => x.id === id) };
  }
}
