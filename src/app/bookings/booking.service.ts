import { Booking } from './booking.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: 1,
      placeId: 1,
      placeTitle: 'Seoul',
      guestNumber: 5,
      userId: 1,
    },
    {
      id: 2,
      placeId: 2,
      placeTitle: 'ToKyo',
      guestNumber: 3,
      userId: 2,
    },
  ];

  get bookings() {
    return [...this._bookings];
  }

  delete(id: number): void {
    this._bookings = this._bookings.filter((x) => x.id !== id);
  }
}
