import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";

  constructor(private storage: Storage) { }

  ngOnInit(){
    this.getImages();
  }

  public uploadImage($event: any){
    const file = $event.target.files[0];
    console.log(file);
    const imgRef = ref(this.storage, `imagen/${file.name}`);
    
    uploadBytes(imgRef, file)
    .then(response => {this.getImages()})
    .catch(error => console.log(error));
  }

  getImages(){
    const imagesRef = ref(this.storage, 'imagen');
    list(imagesRef)
    .then(async response =>{
      for(let item of response.items){
        this.url = await getDownloadURL(item);
        console.log("La URL es: " + this.url);
      }
    })
    .catch(error => console.log(error));
  }
}
