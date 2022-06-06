import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApexAxisChartSeries, ApexChart, ApexFill, ApexMarkers, ApexPlotOptions, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { AppService } from '../services/app.service';


export interface DataType  {
  Subject: string;
  StartTime: string;
  EndTime: string;
  Id: number;
}

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | ApexYAxis[] | any;
  labels: string[] | any;
  stroke: any; // ApexStroke;
  markers: ApexMarkers | any;
  plotOptions: ApexPlotOptions | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
};

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  data: any[] = []
  dates : any[] = []
  workouts: any[] = []
  weeks: any[] = []

  workoutCount: any[] = []

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private titleService: Title, private appService: AppService) {
    this.titleService.setTitle("Statistics");

    this.chartOptions = {
      series: [
        {
          name: "Arrivals",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
        title: {
          text: "Weeks"
        }
      },
      yaxis: {
        title: {
          text: "Arrivals"
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          }
        }
      }
    };
  }

  public generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

  ngOnInit(): void {
    this.appService.getScheduledWorkouts().subscribe(workouts => {
      this.data = workouts;

      this.manageData(this.data);
    })
  }

  manageData(data:DataType[]) {
    this.workouts = []
    this.dates = []
    this.weeks = []
    this.workoutCount = []

    data.forEach(dat => {
      this.workouts.push(dat.Subject)
      let date = new Date(dat.StartTime.split("T")[0])
      
      let diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      let startOfWeek = new Date(date.setDate(diff)).toLocaleDateString();

      if (!this.weeks.includes(startOfWeek))
        this.weeks.push(startOfWeek);
      //this.dates.push(startOfWeek);
      this.dates.push(date.toLocaleDateString())
    })
    this.weeks.sort();

    for (let week of this.weeks) {
      let count = 0;
      for (let workout of data) {
        let date = new Date(workout.StartTime.split("T")[0])
        let diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        let startOfWeek = new Date(date.setDate(diff)).toLocaleDateString();

        if (startOfWeek == week)
          count++;
      }
      this.workoutCount.push(count);

    }

    this.chartOptions = {
      series: [
        {
          name: "Arrivals",
          type: "column",
          data: this.workoutCount
        },
        // {
        //   name: "Arrivals",
        //   type: "",
        //   data: this.workoutCount
        // }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },

      fill: {
        opacity: [1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: this.weeks,
        title: {
          text: "Weeks"
        }
      },
      yaxis: {
        title: {
          text: "Arrivals"
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          }
        }
      }
    };
  }

}
