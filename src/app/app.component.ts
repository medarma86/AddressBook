import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Address } from './models/Address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  addressList: Address[];
  model: Address;
  isAdd: boolean;
  selectedAddress: Address;
  displayModal: boolean; 
  index: number;

  cols = [
    { field: 'firstName', header: 'First Name', sort: true },
    { field: 'lastName', header: 'Last Name', sort: true },
    { field: 'phoneNumber', header: 'Phone Number', sort: true },
    { field: 'address', header: 'Address', sort: true }
  ];
 
  @ViewChild('saveForm') saveForm: NgForm;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private _confirmation: ConfirmationService) {
     this.model = new Address();
        this.addressList = []; 
     }

  ngOnInit() {
     this.getAddressList();     
  }

  ShowAddForm = () => {
    this.isAdd = true;
    this.resetForm();   
    this.displayModal = true; 
  }

  submitForm = () => {  
    if (this.isAdd) { 
      this.addressList?.push(this.model); 
      localStorage.setItem('address', JSON.stringify(this.addressList));     
    }
  else{    
     this.updateForm();
  }
  this.displayModal = false;   
  this.getAddressList(); 
}

getAddressList = () =>{  
  if(localStorage.getItem('address')){
  this.addressList = JSON.parse(localStorage.getItem('address')); 
   this.getSortedList(this.addressList);  
  }
}

getSortedList = arrayList => {
  arrayList=arrayList?.sort((a,b) => 
  (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))
}

resetForm = () => {
  if (this.isAdd) {
    this.model = new Address();
     this.saveForm.reset(); 
     this.removeImage();
  } 
  else{
    this.saveForm.reset(this.selectedAddress);   
   }
}

showEditForm= (index) => {  
  this.isAdd = false;
  this.displayModal = true;
  this.index=index;
  this.selectedAddress = this.addressList[index];
  this.model = { ...this.selectedAddress };   
  }

  updateForm = () =>{
    this.selectedAddress= {...this.model}   
    this.addressList[this.index] = {...this.selectedAddress}  
    localStorage.setItem('address', JSON.stringify(this.addressList));
  }

  deleteAddress(index) {
      this._confirmation.confirm({
      message: 'Are you sure that you want to delete this Address?',
      accept: () => { 
        if(this.addressList.length){
        this.addressList.splice(index,1);
        localStorage.setItem("address",JSON.stringify(this.addressList));
      }
          error => {
             console.log(`error => Failed to delete address ${error}`);
          }
        }
    });
    this.getAddressList();
  }

onUploadChange= (e) => {
  let totalData= this;
  if(e.target.files.length){
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    totalData.model.file =reader.result;    
  };
  reader.onerror = function (error) {   
    totalData.model.file =error;
  };
}
}

removeImage = () => {
  this.model.file = null; 
  this.clearInputFile();
}

clearInputFile = () => this.fileInput.nativeElement.value = ""; 

//can use the below method incase if we want to download all the presented fields which are in model.
downloadFile = () => {
  this.exportExcel(); 
}

exportExcel= () => {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.addressList);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "AddressData");
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
   });
 }
}