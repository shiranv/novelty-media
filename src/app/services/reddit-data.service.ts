import { Children } from './../models/children.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable()
export class RedditDataService {
  movieChildren: Children[];
  allMoviesData: Children[];
  subreddit;
  constructor(public HttpClient: HttpClient) { }


  public getMoviesData(limit, subreddit, beforOrAfter, name): Observable<Children[]> {
    this.subreddit = subreddit;
    console.log(this.subreddit);
    return this.HttpClient.get<Movie>('https://www.reddit.com/r/' + this.subreddit + '.json?limit=' + limit + '&' + beforOrAfter + '=' + name).pipe(
      map((res) => {
        this.movieChildren = res['data'].children;
        return this.movieChildren;
      }));;
  }


  public getAllMoviesData(): Observable<Children[]> {
    return this.HttpClient.get<Movie>('https://www.reddit.com/r/' + this.subreddit + '.json').pipe(
      map((res) => {
        this.allMoviesData = res['data'].children;
        return this.allMoviesData;
      }));;
  }



}
