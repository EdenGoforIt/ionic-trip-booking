import { takeUntil } from 'rxjs/operators';
import { IonItemSliding } from '@ionic/angular';
import { Booking } from './booking.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  bookings: Booking[];
  readonly destroy$ = new Subject<any>();
  constructor(private bookingService: BookingService) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.bookingService.bookings
      .pipe(takeUntil(this.destroy$))
      .subscribe((bookings) => {
        this.bookings = bookings;
      });
  }
  onDelete(bookingId: number, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    this.bookingService.delete(bookingId);
    // this.bookings = this.bookingService.bookings;
  }
}
