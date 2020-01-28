import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Purchase, User } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'viewInvoice',
  styleUrls: ['./viewInvoice.css'],
  templateUrl: './viewInvoice.html', 
})
export class ViewInvoice {
  model: any ={};
  purchase: Purchase;
  public purchaseViewList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private alertService: AlertService,

    public dialogRef: MatDialogRef<ViewInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {  
      console.log("Invoice -->"+this.data)
      //const purchasedata = require("../../purchasedata.json");
      //this.purchaseViewList=purchasedata;
      let totalCommission = 0.0;
      this.purchaseService.get(this.data)
      .subscribe(
        data => {
          this.purchaseViewList = data;
          for(let i=0; i<this.purchaseViewList.length; i++){
            this.model.invoiceNumber = this.purchaseViewList[0].invoicenumber;
            this.model.poDate = this.purchaseViewList[0].poDate;
            this.model.vendorname = this.purchaseViewList[0].vendorname;
            totalCommission +=  this.purchaseViewList[i].subtotal;
            this.model.subTotal = totalCommission;
          }
          
          this.vendorDetails(this.model.vendorname);

        },
        error => {
            alert('Error !!!!');
        }
      ); 
  }
  ngOnInit() {

  }

  vendorDetails(vendorname: string){
    this.purchaseService.getVendorDetails(vendorname)
          .subscribe(
            data => {
              this.purchase = data;
              console.log("Vendor Name -->"+this.purchase.vendorName);
            },
            error => {
                alert('Error !!!!');
            }
          ); 
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}

@Component({
  selector: 'editinvoice',
  styleUrls: ['./editinvoice.css'],
  templateUrl: './editinvoice.html', 
})
export class EditInvoice {
  model: any ={};
  public purchaseEditList : any;
  public productList : any;
  public categoryList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private alertService: AlertService,

    public dialogRef: MatDialogRef<EditInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {  
    this.model.invoiceNumber = this.data.invoiceNumber;
    this.productList = ['Mobile', 'Computer', 'Cloths', 'TV'];
    this.categoryList = ['Electronic', 'Manufactorning', 'Institue', 'Mining'];
    const purchasedata = require("../../purchasedata.json");
    this.purchaseEditList=purchasedata;
    /* this.purchaseService.get(this.data)
    .subscribe(
      data => {
        this.model = data;
        console.log("Purchase InvoiceNumber -->"+this.model.invoiceNumber);
      },
      error => {
          alert('Error !!!!');
      }
    ); */
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  public deletePurchaseInvoice(){
    this.alertService.success("Successfully Deleted.");
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
    /*this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(DeleteDialog,{
      panelClass: 'delete',
      data: "invoiceNumber",
      height: '80%'
    }).afterClosed().subscribe(result => {
      // this.refresh();
    }); */
  }

  saveInvoice(){
    this.alertService.success("Successfully Saved.");
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
  }

  cancelInvoice(){
    alert("-- Cancel Invoice --");
  }

}

@Component({
  selector: 'deleteDialog',
  styleUrls: ['./deleteDialog.css'],
  templateUrl: './deleteDialog.html', 
})
export class DeleteDialog {
  model: any ={};
  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private alertService: AlertService,

    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {  
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'filter',
  styleUrls: ['./filter.css'],
  templateUrl: './filter.html', 
})
export class Filter {
  model: any = {};
  constructor(
    public dialogRef: MatDialogRef<Filter>,
    ) {
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  apply(){

  }
}
@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.css']
})
export class PurchaseInvoiceComponent implements OnInit {
  purchse:Purchase;
  model: any ={};
  public purchaseList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  //displayedColumns: string[] = ['Date','Invoice Number','ProductName','name','quantity','deliveryCost','netAmount','status','Action'];
  displayedColumns: string[] = ['invoicenumber','status','invoicedate','vendorname','Action'];


  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  
  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private purchaseservice: PurchaseService,
  ) { 
   // const purchasedata = require("../../purchasedata.json");

   // this.purchaseList=purchasedata;

    //console.log("data3 -->"+this.purchaseList[2].addedDate);

      this.purchaseservice.load().subscribe(res => { 
      this.purchaseList = res;
      this.dataSource = new MatTableDataSource(this.purchaseList);

      console.log("Size ---->"+this.purchaseList.length);
  
        },
        error => {
            alert('Error !!!!');
        }
      );
 

    this.dataSource = new MatTableDataSource(this.purchaseList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  public polist: string [];

  ngOnInit() {
   
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  openfilter(): void {
   
    const dialogRef = this.dialog.open(Filter, {
    width: '60%',
    //  data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public viewinvoice(invoiceNumber:string){
    console.log("Invoice Number  --->"+invoiceNumber);
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(ViewInvoice,{
      panelClass: 'viewInvoice',
      data: invoiceNumber,
      height: '80%'
    }).afterClosed().subscribe(result => {
      // this.refresh();
    });
  }
  
  public editinvoice(invoiceNumber:string){
    console.log("Invoice Number  --->"+invoiceNumber);
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(EditInvoice,{
      panelClass: 'editInvoice',
      data: invoiceNumber,
      height: '80%'
    }).afterClosed().subscribe(result => {
      // this.refresh();
    });
  }

  getAllPODetails(){
    this.purchaseservice.load().subscribe(res => { 
      this.purchaseList = res;
      this.dataSource = new MatTableDataSource(this.purchaseList);  
      },
      error => {
          alert('Error !!!!');
      }
    );
  }

  public deletePurchase(invoiceNumber:string){
    console.log("Invoice Number  --->"+invoiceNumber);
    this.purchaseservice.remove(invoiceNumber)
    .subscribe(
      data => {
        this.model = data;
        if(this.model.status == "Success"){
          this.alertService.success("Deleted Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
          this.getAllPODetails();
        }else{
          this.alertService.error("Not Deleted..");
        }
        
      },
      error => {
        this.alertService.success("Server Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 1500);
      }
      ); 
    this.alertService.success("Deleted Successfully");
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
  }

}
