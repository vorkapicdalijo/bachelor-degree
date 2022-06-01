import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';


const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})

export class ManageUsersComponent implements OnInit {

  loadedUsers: User[] = []
  displayedColumns = ['id', 'name', 'email'];

  dataSource: MatTableDataSource<User>;

  
  

  constructor(private authService: AuthService) { }

  @ViewChild(MatTable) table: MatTable<User>;

  ngOnInit(): void {
    this.authService.loadUsers();

    this.authService.loadedUsersSub.subscribe(users => {
      this.loadedUsers = users;
      this.dataSource = new MatTableDataSource(this.loadedUsers);
    })
  }

}
