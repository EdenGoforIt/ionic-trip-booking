import { AuthService } from './../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Booking } from './booking.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService) { }

  get bookings() {
    return this._bookings.asObservable();
  }


  delete(id: number): void {
    // this._bookings = this._bookings.filter((x) => x.id !== id);
  }
  add(
    placeId: number,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newBooking = new Booking(Math.random(), placeId, this.authService._userId, placeTitle,
      guestNumber, placeImage, firstName, lastName, dateFrom, dateTo);
  }
}
