import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  public request(config): any {
    if (!config.method) {
      return Promise.reject('no method');
    }
    return new Promise((res, rej) => {
      this.http[config.method](config.url, config.data)
        .subscribe(data => {
          res(data);
        }, err => {
          rej(err);
        });
    });
  }
}
