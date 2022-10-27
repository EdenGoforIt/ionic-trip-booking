import { IonItemSliding } from '@ionic/angular';
import { Booking } from './booking.model';
import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[];
  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookings = this.bookingService.bookings;
  }
  onDelete(bookingId: number, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    this.bookingService.delete(bookingId);
    this.bookings = this.bookingService.bookings;
  }
}
