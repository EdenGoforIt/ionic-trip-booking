import { Capacitor } from '@capacitor/core';
import { Component, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { EventEmitter } from 'stream';
@Component({
  selector: 'app-image-picker',
  templateUrl: 'image-picker.component.html',
})
export class ImagePickerComponent {
  @Output() imagePick = new EventEmitter();
  selectedImage: string;

  onPickImage(): void {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }

    Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64,
    })
      .then((image) => {
        this.selectedImage = image.base64String;
        this.imagePick.emit(image.base64String);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}
