import {MatDialog, MatDialogConfig} from "@angular/material";
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';



// addnewcategory start
@Component({
  selector: 'addnewcategory',
  styleUrls: ['./addnewcategory.css'],
  templateUrl: './addnewcategory.html', 
})
export class AddnewcategoryComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(

    ) {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
  }
}
// addnewcategory end

// add promostion start
@Component({
  selector: 'addpromotion',
  styleUrls: ['../addpromotion.css'],
  templateUrl: '../addpromotion.html', 
})
export class AddpromotionComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(

    ) {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
  }
}
// add promostion end

// categoryeditdelete start
@Component({
  selector: 'categoryeditdelete',
  styleUrls: ['../categoryeditdelete.css'],
  templateUrl: '../categoryeditdelete.html', 
})
export class CategoryeditdeleteComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(

    ) {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
  }
}
// categoryeditdelete end

//discountedit start
@Component({
  selector: 'discountedit',
  styleUrls: ['../discountedit.css'],
  templateUrl: '../discountedit.html', 
})
export class DiscounteditComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor() {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
  }
}
//discountedit end

//discountdelete start
@Component({
  selector: 'discountdelete',
  styleUrls: ['../discountdelete.css'],
  templateUrl: '../discountdelete.html', 
})
export class DiscountdeleteComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(

    ) {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
  }
}
//discountdelete end

// Main compoent
@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css']
})
export class CategoryaddComponent implements OnInit {
  
  displayedColumns: string[] = ['Productcode', 'ProductName','Discount','DiscountTime','Qty','Price','editdelete'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
 

  tempid=null;
  public leftdetails=false;
  public discountdetails=false;
  public editdeletediv=false;

  successdialog = 'none';

  categorylist: any =[
  {
    number:'01',
    allproduct:'All Product',
  },
  {
    number:'02',
    discount:'Discount',
  },
  {
    number:'03',
    freegifts:'Free Gifts',
  },
  {
    number:'04',
    fiber:'Fiber',
  },
  {
    number:'05',
    pigmen:'Pigmen',
  },
  {
    number:'06',
    brush:'Brush',
  },
  {
    number:'07',
    sandpaper:'Sandpaper',
  },
  {
    number:'08',
    hardware:'Hardware',
  },
  {
    number:'09',
    accesories:'Accesories'
  }
];


//dataDiscountList : any = [];
 discountdata = require("../../discountdata.json");
dataDiscountList=this.discountdata;

  constructor(    private dialog: MatDialog,
    //private dialog: MatDialog,
    ) { 


      this.dataSource = new MatTableDataSource(this.dataDiscountList);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

      // Assign the data to the data source for the table to render
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  ngOnInit() {
    this.leftdetails=true;
  }
   
categorydetails(number: string){
  if(this.tempid!==null){
    document.getElementById(this.tempid).style.backgroundColor='#272E34';
  }
  this.tempid=number;
  document.getElementById(this.tempid).style.backgroundColor='#5B6065';
  this.leftdetails=true;

  if(number=='01'){
    this.leftdetails=true;
    this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='02'){
    this.discountdetails=true;
    this.editdeletediv=false;
  }
  if(number=='03'){
    this.leftdetails=true;
    this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='04'){
    this.leftdetails=true;
    this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='05'){
    this.leftdetails=true;
    this.discountdetails=false;
    this.editdeletediv=false;
  }
  }
  editdelete(){
    this.editdeletediv=true;
    this.discountdetails=false;
  }
  dialogConfig = new MatDialogConfig();

  addNewCategory(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(AddnewcategoryComponent,{
      panelClass: 'addnewcategory'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
    });
  }

  addpromotion(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(AddpromotionComponent,{
      panelClass: 'addpromotion'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
    });
      
  }

  


  categoryEditDelete(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(CategoryeditdeleteComponent,{

      panelClass: 'categoryeditdelete'

    })
    .afterClosed().subscribe(result => {
     // this.refresh();
    });
  }

  discountEdit(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(DiscounteditComponent,{
      panelClass: 'discountedit'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
    });
      
  }

  discountDelete(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(DiscountdeleteComponent,{ 
      panelClass: 'discountdelete'
    })
    .afterClosed().subscribe(result => {
    });
      
  }

  }
