import { Pipe } from "@angular/core";

@Pipe({
  name: "orderby"
})
export class OrderByPipe {
  transform(array: Array<string>, key: string): Array<string> {
    array.sort((_a: any, _b: any) => {
      const a = _a[key].toString()
      const b = _b[key].toString()
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}