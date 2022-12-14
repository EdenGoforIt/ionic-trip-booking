import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Place } from '../../places.model';
import { PlacesService } from './../../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  place: Place;
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
    // this.route.paramMap.subscribe((paramMap) => {
    //   console.log(paramMap.has('placeId'));
    //   if (!paramMap.has('placeId')) {
    //     this.navCtrl.navigateBack('/places/tabs/offers');
    //   }
    //   const id = paramMap.get('placeId');
    //   this.place = this.placesService.places.find((x) => x.id === +id);
    // });
  }

  onCreateOffer() {

    this.loadingCtrl.create({
      message: 'Creating Place ...'
    }).then(element => {
      element.present();
    });
    this.placesService.addPlace(
      this.form.value.title,
      this.form.value.description,
      'https://picsum.photos/seed/picsum/200/300',
      this.form.value.price,
      this.form.value.availableFrom,
      this.form.value.availableTo
    ).subscribe(() => {
      this.loadingCtrl.dismiss();
      this.form.reset();
      this.router.navigate(['/places/tabs/offers']);
    }
    );
  }
}
