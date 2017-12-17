import { Component } from '@angular/core';
import { OrderByPipe } from './orderby.pipe'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
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
  result: Array<any> = [];
  orderKey: Number = 0

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
      let vibrantSorted = []
      Object.keys(vibrant).forEach(v => {
        if (vibrant[v]) vibrantSorted.push(vibrant[v])
      })
      vibrantSorted.sort((a, b) => b.getPopulation() - a.getPopulation())
      resolve({
        element: img$,
        src: fr.result,
        filename: file.name,
        colors: vibrantSorted.map(v => v.getHex()),
        vibrantSorted,
        hsl: vibrantSorted.map(v => v.getHsl()),
      })
    }
    fr.readAsDataURL(file)
  })

  handleFiles = async (e) => {
    const files = e.target && e.target.files
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        let file = await this.promiseFR(files[i])
        this.result = this.result.concat([file])
      }
    }
  }

  download = () => {
    if(!this.result || !this.result.length) return
    const zip = new JSZip();
    for (let i = 0; i < this.result.length; i++) {
        const prefix = `${i}`.padStart(4, '0')
        const newName = `${prefix}_${this.result[i].filename}`
        const b64 = this.result[i].src.substr(this.result[i].src.indexOf(',')+1)
        zip.file(newName, b64, { base64: true });
    }
    zip.generateAsync({ type: "blob" })
      .then(content => {
        const now = new Date()
        FileSaver.saveAs(content, `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}.zip`)
      });
  }

  clear = () => {
    this.result = []
  }
}
