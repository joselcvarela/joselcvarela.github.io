import { Component } from '@angular/core';
import { OrderByPipe } from './orderby.pipe'
import 'node-vibrant'
declare var Vibrant: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ OrderByPipe ]
})
export class AppComponent {
  title = 'app';
  result = []

  constructor(private orderPipe: OrderByPipe) {

  }

  promiseVibrant = (image) => new Promise((resolve, reject) => {
    Vibrant.from(image).getPalette(function (err, palette) {
      if (err) {
        reject(err)
      } else {
        resolve(palette)
      }
    });
  })

  promiseFR = (file) => new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = async () => {
      let img$ = document.createElement("img")
      img$.setAttribute("src", fr.result)
      img$.dataset.filename = file.name
      let vibrant = await this.promiseVibrant(img$)
      resolve({
        element: img$,
        src: fr.result,
        filename: file.name,
        colors: Object.keys(vibrant).map(k => (vibrant[k] && vibrant[k].getHex() || '#000000'))
      })
    }
    fr.readAsDataURL(file)
  })

  handleFiles = async (e) => {
    const files = e.target && e.target.files
    const waitImages = []
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        let file = await this.promiseFR(files[i])
        //waitImages.push(file)
        this.result = this.result.concat([file])
      }
    }

    let xx = this.orderPipe.transform(this.result, 'colors')
    debugger
    //this.result = waitImages.concat();
  }
}
