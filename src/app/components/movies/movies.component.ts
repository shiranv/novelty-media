import { Data } from './../../models/data.models';
import { Children } from './../../models/children.model';
import { Component, OnInit } from '@angular/core';

import { RedditDataService } from '../../services/reddit-data.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  constructor(public redditDataService: RedditDataService) { }
  movies: Children[];
  allMovies: Children[];
  showResultsFrom = 0;
  showResultsTo = 5;
  resultsPerPage = 5;
  createdDateArr: any;
  currentPage = 1;
  lastPage = 1;
  countNext = 0;
  subreddit = 'movies';
  limit = 5;
  name = '';
  beforOrAfter = 'after';
  loadingGraphData = false;


  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'votes'
    },
  ];

  ngOnInit() {
    this.getDataFromMoviesReddit(this.subreddit);
  }

  changeSubreddit() {
    this.countNext = 0;
    this.beforOrAfter = 'after';
    this.name = '';

    this.subreddit = this.subreddit.trim();

    this.getDataFromMoviesReddit(this.subreddit);

  }

  /** get partial data from reddit api */
  getDataFromMoviesReddit(subreddit) {
    this.redditDataService.getMoviesData(this.limit, subreddit, this.beforOrAfter, this.name).subscribe(res => {

      this.movies = res;
    });
  }


  /** The function get the page that the user want paginate to*/
  paginate(paginateToPage) {
    this.currentPage = paginateToPage;
    this.showResultsFrom = (paginateToPage * this.resultsPerPage) - (this.resultsPerPage);
    this.showResultsTo = paginateToPage * this.resultsPerPage;
  }

  /** The function get timestamp and returns time in hh:mm format */
  convertTimestamp(createdUps) {
    let date = new Date(createdUps * 1000);
    // Hours part from the timestamp
    let hours: any = date.getHours();
    if (hours < 10) {
      hours = '0' + date.getHours();
    }
    // Minutes part from the timestamp
    let minutes = '0' + date.getMinutes();

    // Display time in hh:mm format
    let formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  }

  /**
   *get next page data
   */
  changePage(prevOrNext) {
    this.beforOrAfter = prevOrNext;
    if (this.beforOrAfter == 'after') {
      this.countNext++ ; 
      this.name = this.movies[this.limit - 1].data.name;
    }
    else {
      this.countNext --; 
      this.name = this.movies[0].data.name;
    }
    this.getDataFromMoviesReddit(this.subreddit);
  }

  /**set graph data*/
  showGraph() {
    this.loadingGraphData = true;
    // get all data from reddit api 
    this.redditDataService.getAllMoviesData().subscribe(res => {
      this.allMovies = res;
      // set graph data
      this.createdDateArr = this.allMovies.map(item => this.convertTimestamp(item.data.created_utc));
      this.barChartLabels = this.createdDateArr;
      this.barChartData[0].data = this.allMovies.map(item => item.data.ups);
      this.loadingGraphData = false;
    });

  }


}

