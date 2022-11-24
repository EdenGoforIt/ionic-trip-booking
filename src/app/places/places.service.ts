import { AuthService } from './../auth/auth.service';
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      1,
      'Seoul',
      'beautiful place',
      'https://media.cntraveler.com/photos/5fc6818f3cfe1de2cab79372/master/w_1920%2Cc_limit/Amsterdam-GettyImages-840603854.jpg',
      662,
      new Date('2019-01-01'),
      new Date('2019-03-01'),
      'x1'
    ),
    new Place(
      2,
      'Tokyo',
      'beautiful place',
      'https://media.cntraveler.com/photos/62cde46e21a63704d1627e08/master/w_1600,c_limit/Four%20Seasons%20Otemachi_OTE_379.jpg',
      432,
      new Date('2020-01-01'),
      new Date('2020-04-01'),
      'x1'
    ),
    new Place(
      3,
      'Christchurch',
      'beautiful place',
      'https://media.cntraveler.com/photos/62cde49f21a63704d1627e0a/master/w_1600,c_limit/Park%20Hyatt%20Niseko%20Hanazono-PRINT%20(1).jpg',
      432,
      new Date('2019-03-04'),
      new Date('2019-06-01'),
      'x1'
    ),
    new Place(
      4,
      'England',
      'Plain Food',
      'https://media.cntraveler.com/photos/62cde49f21a63704d1627e0a/master/w_1600,c_limit/Park%20Hyatt%20Niseko%20Hanazono-PRINT%20(1).jpg',
      432,
      new Date('2019-01-01'),
      new Date('2019-03-01'),
      'x1'
    ),
    new Place(
      5,
      'Auckland',
      'Plain Food',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Tourist_Destinations_%28252026181%29.jpeg/800px-Tourist_Destinations_%28252026181%29.jpeg',
      432,
      new Date('2019-01-01'),
      new Date('2019-03-01'),
      'x1'
    ),
  ]);

  constructor(private authService: AuthService) {}

  get places(): Observable<Place[]> {
    return this._places.asObservable();
  }

  getPlace(id: number): Observable<Place> {
    return this._places.pipe(
      take(1),
      map((places) =>
        Object.assign(
          {},
          places.find((x) => x.id === id)
        )
      )
    );
  }

  addPlace(
    title: string,
    description: string,
    imageUrl: string,
    price: number,
    availableFrom: Date,
    availableTo: Date
  ) {
    const newPlace = new Place(
      Math.random(),
      title,
      description,
      imageUrl,
      price,
      availableFrom,
      availableTo,
      this.authService.userId
    );

    this.places.pipe(take(1)).subscribe((places) => {
      this._places.next(places.concat(newPlace));
    });
  }
}
