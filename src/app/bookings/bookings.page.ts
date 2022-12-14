import { takeUntil } from 'rxjs/operators';
import { IonItemSliding, LoadingController } from '@ionic/angular';
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
  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}
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
  onCancelBooking(bookingId: number, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    this.loadingCtrl.create({ message: 'Cancelling' }).then((loadingEl) => {
      loadingEl.present();
      this.bookingService
        .delete(bookingId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          loadingEl.dismiss();
        });
    });
  }
}
