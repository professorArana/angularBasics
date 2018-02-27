import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private gettyApikey = environment.gettyKey;
  private gettySecret = environment.gettySecret;
  private gettyToken: string;
  private myResult: GettyResult;
  gettyUri: string;
  
  constructor(protected httpClient: HttpClient) { }

  ngOnInit() {
    this.getGetty();
  }

  getGetty() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Api-Key': this.gettyApikey
      })
    };
    const newUrl2 = 'https://api.gettyimages.com/v3/search/images?phrase=kittens';
    const imageSelect = Math.floor((Math.random() * 30));
    this.httpClient.get<GettyResult>(newUrl2, httpOptions).subscribe(
      data => {

        this.myResult = data;
        console.log('uri ' + this.myResult.images[imageSelect].display_sizes[0].uri);
        this.gettyUri = this.myResult.images[imageSelect].display_sizes[0].uri;
      }
    );

  }
  
}

interface GettyResult {
  result_count: number;
  images: Image[];
}

interface Image {
  id: string;
  display_sizes: DisplaySize[];
}

interface DisplaySize {
  uri: string;
}

