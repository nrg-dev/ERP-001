import { Component, OnInit,ViewChild,HostListener } from '@angular/core';
import { MenuItem } from '../menuItem.model';
import { SubMenuItem } from '../subMenuItem.model';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule, Routes, Router ,ActivatedRoute} from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort, MatCalendar } from '@angular/material';
import { Moment } from 'moment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
 
  searchText:any;
  heroes = [
    { id: 11, name: 'CHanaka Nice', country: 'India' },
    { id: 12, name: 'MNarco' , country: 'USA'},

  ];
menuItems: MenuItem[];
menuItemsIcons:MenuItem[];
model:any ={};

displayedColumns: string[] = ['invoicenumber','client','date','status'];
dataSource: MatTableDataSource<any>;
allproductlist : any= {};

@ViewChild('sidenav',{ read: true, static: false }) sidenav: MatSidenav;
@ViewChild(MatPaginator,{ static: false }) paginator: MatPaginator;
@ViewChild(MatSort,{ static: false }) sort: MatSort;
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
@ViewChild('calendar',{ read: true, static: false }) calendar: MatCalendar<Moment>;
selectedDate: Moment;

showToggle: string;
  mode: string;
  openSidenav:boolean;
  private screenWidth$ = new BehaviorSubject<number>
    (window.innerWidth);

  public menu1 = false;
  public notSelected=true;
  //private count=0;
  static showParent: any;
  constructor( private router: Router , public route: ActivatedRoute) { 
    //this.count=route.firstChild.children.length;
    
    route.url.subscribe(() => {
      console.log("test 1 -->"+route.firstChild.children.length);
      console.log("test 2 -->"+route.children.length);

     });


    this.dataSource = new MatTableDataSource(this.allproductlist);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  ngOnInit() {
    this.getScreenWidth().subscribe(width => {
      if (width < 640) {
       this.showToggle = 'show';
       this.mode = 'over';
       this.openSidenav = false;
     }
     else if (width > 640) {
       this.showToggle = 'hide';
       this.mode = 'side';
       this.openSidenav = true;
     }
   });

   

    this.menuItems = [
      new MenuItem("DashBoard","/landingpage"),
      new MenuItem("Vendor & Customer","vendoradd"),
    ]


    this.menuItemsIcons = [
      new MenuItem("./assets/images/dashboard.png","/landingpage"),
      new MenuItem("./assets/images/vendor-customer.png", "Customervendoradd"),


    ]

  }

  showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  dateChanged(date) {
   // alert(`Selected: ${date}`);
    this.model.date = date;
  }
 
 


}
