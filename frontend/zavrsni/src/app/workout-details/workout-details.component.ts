import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

export interface Workout {
  name: string;
  id: number;
  duration: number;
  complexity: string;
}

const ELEMENT_DATA: Workout[] = [
  {id: 1, name: 'Hydrogen', duration: 5, complexity: 'H'},
  {id: 2, name: 'Helium', duration: 4.0026, complexity: 'He'},
  {id: 3, name: 'Lithium', duration: 6.941, complexity: 'Li'},
  {id: 4, name: 'Beryllium', duration: 9.0122, complexity: 'Be'},
  {id: 5, name: 'Boron', duration: 10.811, complexity: 'B'},
  {id: 6, name: 'Carbon', duration: 12.0107, complexity: 'C'},
  {id: 7, name: 'Nitrogen', duration: 14.0067, complexity: 'N'},
  {id: 8, name: 'Oxygen', duration: 15.9994, complexity: 'O'},
  {id: 9, name: 'Fluorine', duration: 18.9984, complexity: 'F'},
  {id: 10, name: 'Neon', duration: 20.1797, complexity: 'Ne'},
];

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'duration', 'complexity'];
  dataSource = ELEMENT_DATA;

  constructor(private titleService: Title) {
    this.titleService.setTitle("Workouts");
   }

  ngOnInit(): void {
  }



}
