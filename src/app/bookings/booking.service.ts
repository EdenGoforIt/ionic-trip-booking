import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService) {}

  get bookings() {
    return this._bookings.asObservable();
  }

  delete(id: number): Observable<any> {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings) => {
        const newBookings = bookings.filter((x) => x.id !== id);
        this._bookings.next(bookings.concat(newBookings));
      })
    );
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
    const newBooking = new Booking(
      Math.random(),
      placeId,
      this.authService._userId,
      placeTitle,
      guestNumber,
      placeImage,
      firstName,
      lastName,
      dateFrom,
      dateTo
    );

    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings) => {
        this._bookings.next(bookings.concat(newBooking));
      })
    );
  }
}
