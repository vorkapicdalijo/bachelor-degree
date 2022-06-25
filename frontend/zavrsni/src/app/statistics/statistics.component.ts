import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexPlotOptions, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { Workout } from '../models/workout';
import { AppService } from '../services/app.service';


export interface SchDataType  {
  Subject: string;
  StartTime: string;
  EndTime: string;
  Id: number;
}

export interface ProgDataType {
  name:string;
  weight:string;
  sets:string;
  reps:string;
  date:string;
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
  grid: ApexGrid |any;
  dataLabels: ApexDataLabels | any;
  title: ApexTitleSubtitle | any;
  colors: string[] | any;
  legend: ApexLegend | any;
};

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  $sub1: Subscription;
  $sub2: Subscription;

  userWorkouts: Workout[] = [];
  userWorkoutsCount: number;
  averageDuration: number;

  isLoading: boolean = false;

  workoutsScheduleData: SchDataType[] = []
  dates : any[] = []
  workouts: any[] = []
  weeks: any[] = []
  showGraphBool: boolean = false;

  progressesData: ProgDataType[] = []
  workoutCount: any[] = []

  selectedExercise: string;
  exerciseNames: string[] = []
  exerciseDates: any[] = []
  exerciseSets: any [] = []
  exerciseReps: any[] = []
  exerciseWeight: any[] = []

  @ViewChild("barChart") barChart: ChartComponent;
  public barChartOptions: Partial<ChartOptions>;

  @ViewChild("lineChart") lineChart: ChartComponent;
  public lineChartOptions: Partial<ChartOptions>;

  @ViewChild("gaugeChart") chart: ChartComponent;
  public gaugeChartOptions: Partial<ChartOptions>;

  constructor(private titleService: Title, private appService: AppService) {
    this.titleService.setTitle("Statistics");

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
    this.isLoading = true;

    this.$sub1 = this.appService.getScheduledWorkouts().subscribe(workouts => {
      this.workoutsScheduleData = workouts;

      this.manageArrivalData(this.workoutsScheduleData);
    })


    this.appService.getWorkoutsByUserId();
    this.$sub2 = this.appService.loadedUserWorkoutsSub.subscribe(userWorkouts => {
      this.userWorkouts = userWorkouts;

      this.manageAverageWorkoutTime(this.userWorkouts);
    })


    this.$sub2 = this.appService.getProgresses().subscribe(progresses => {
      this.progressesData = progresses;

      this.progressesData.sort(function(a,b) { return new Date(a.date).valueOf() - new Date(b.date).valueOf() });

      this.manageProgressesData(this.progressesData);

      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.$sub1.unsubscribe();
    this.$sub2.unsubscribe();
  }

  onChange(event:any) {
    this.selectedExercise = event.value
  }

  manageAverageWorkoutTime(workouts: Workout[]) {
    this.userWorkoutsCount = workouts.length;
    let sum: number = 0;

    workouts.forEach(workout => {
      sum = sum + workout.duration
    })

    this.averageDuration = sum / this.userWorkoutsCount;
    let durationArray:number[] = []
    durationArray.push(this.averageDuration)

    this.gaugeChartOptions = {
      series: durationArray,
      chart: {
        height: 350,
        type: "radialBar",
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function(val:any) {
                return val + " minutes !";
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ["From "+ this.userWorkoutsCount.toString() +" workouts"]
    };
  }

  showGraph() {
    this.exerciseDates = []
    this.exerciseWeight = []
    this.exerciseSets = []
    this.exerciseReps = []
    
    for (let el of this.progressesData) {
      if (el.name == this.selectedExercise) {
        this.exerciseDates.push(el.date)
        this.exerciseSets.push(el.sets)
        this.exerciseReps.push(el.reps)
        if(el.weight == 'bodyweight')
          this.exerciseWeight.push(0)
        else
          this.exerciseWeight.push(el.weight)
      }
    }

    this.showGraphBool = true;

    this.lineChartOptions = {
      series: [
        {
          name: "Weight",
          data: this.exerciseWeight
        },
        {
          name: "Sets",
          data: this.exerciseSets
        },
        {
          name: "Reps",
          data: this.exerciseReps
        }
        
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      colors: ["#545454", "#e33e9c", "#698f00"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Progress",
        align: "left"
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.exerciseDates
      },
      yaxis: {
        labels: {
          formatter: function(y: any) {
            return y.toFixed(0);
        }}
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y: any) {
              return y.toFixed(0);
            
          }
        }
      }
    };
  }

  manageProgressesData(data: ProgDataType[]) {
    this.exerciseNames = []

    for (let el of data) {
      if (!this.exerciseNames.includes(el.name)) 
        this.exerciseNames.push(el.name)
    }
  }

  manageArrivalData(data:SchDataType[]) {
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
      this.dates.push(date.toLocaleDateString())
    })
    this.weeks.sort(function(a,b) { return new Date(a).valueOf() - new Date(b).valueOf() });

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

    this.barChartOptions = {
      series: [
        {
          name: "Arrivals",
          type: "column",
          data: this.workoutCount
        },
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
        },
        labels: {
          formatter: function(y: any) {
            return y.toFixed(0);
        }}
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y: any) {
              return y.toFixed(0);
            
          }
        }
      }
    };
  }

}
