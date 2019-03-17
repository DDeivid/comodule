import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Module } from '../module';
import { DataService } from '../data.service';
import { Graphdata } from '../graphdata';
import * as CanvasJS from './../../assets/scripts/canvasjs.min.js';
import {MatTable} from '@angular/material';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {
  private modules: Array<Module>;
  public graphData: Array<Graphdata>;
  private dataPoints: Array<object>;
  private chart: any;
  private timer: any;
  public timeFrame: number;
  public isLoaded: boolean;
  public displayedColumns: Array<string>;

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private data: DataService) {
    this.isLoaded = false;
    this.graphData = [];
    this.dataPoints = [];
    this.timeFrame = 10;
    this.displayedColumns = ['date', 'uniqueCount', 'totalCount'];
  }

  ngOnInit() {
    this.setupGraph();
    this.chart.render();
    this.modules = this.data.getModulesData();
    this.timer = setInterval(() => {
      this.countData(this.modules);
      this.modules.length = 0;
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  setupGraph() {
    this.chart = new CanvasJS.Chart('chartContainer', {
      exportEnabled: false,
      backgroundColor: 'transparent',
      axisX: {
        labelFormatter: function (e) {
          return CanvasJS.formatDate( e.value, 'HH:mm:ss');
        }
      },
      axisY: {
        includeZero: false,
      },
      data: [{
        type: 'line',
        dataPoints: this.dataPoints,
      }]
    });
  }

  countData(modules: Array<Module>) {
    const dataPoint: Graphdata = {
      totalCount: modules.length,
      uniqueCount: this.countUniqueModules(modules),
      date: new Date()
    };

    this.graphData.push(dataPoint);
    this.dataPoints.push(this.formatDataPoint(dataPoint));

    if (this.dataPoints.length > this.timeFrame) {
      this.dataPoints.shift();
    }

    if (!this.isLoaded) {
      this.isLoaded = true;
    }
    this.chart.render();
    this.table.renderRows();
  }

  countUniqueModules(modules: Array<Module>) {
    const unique = Array.from(new Set(modules.map(module => module._id)));
    return unique.length;
  }

  formatDataPoint(point: Graphdata) {
    return {
      x: point.date,
      y: point.uniqueCount
    };
  }

  changeTimeframe(event: any) {
    this.timeFrame = event.value;
    this.changeGraph();
  }

  changeGraph() {
    const length = this.graphData.length;
    const temp = [];

    if (this.timeFrame < length) {
      this.graphData.slice(length - this.timeFrame).forEach(point => {
        temp.push(this.formatDataPoint(point));
      });

    }  else {
      this.graphData.forEach(point => {
        temp.push(this.formatDataPoint(point));
      });
    }

    this.dataPoints = temp;
    this.chart.options.data[0].dataPoints = this.dataPoints;
    this.chart.render();
  }
}
