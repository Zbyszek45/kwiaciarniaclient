import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/model/user';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/core/service/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  users: User[]
  dataSource = new MatTableDataSource<User>()
  displayedColumns: string[] = ['id', 'username', 'name', 'surname', 'phone', 'address']

  constructor(private userService: UserService,
    public dialog: MatDialog ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;


  ngOnInit(): void {
    this.userService.findAllUsers().subscribe(data => {
      this.users = data;
      this.dataSource.data = this.users;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
