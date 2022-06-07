import { Component, OnInit } from '@angular/core';


import { company } from '../companyName';
import { invoice } from '../invoiceInfo';
import { bill } from '../billItem';
import { profile} from '../profiles';

@Component({
  
	selector: 'app-invoice',
  
	templateUrl: './invoice.component.html',
  
	styleUrls: ['./invoice.component.css']
	
})


export class InvoiceComponent implements OnInit {

 
	allProfiles: profile[] = [
    		{text:'USD', value: 'USD'},
    		{text: 'INR', value: 'INR'},
    		{text: 'GBP', value: 'GBP'}
	];
	settings = {
        	bigBanner: false,
        	timePicker: false,
        	format: 'dd-MM-yyyy',
        	defaultOpen: false
    	};
	dated: Date = new Date;

	address: company = {
	name: 'My Company Name',
	address: '23 North St., Ahmedabad, Gujarat',
	email: 'tested@tester.com',
	contact: 1234567890,
	privileged: false
	};
	client: company = {
	name: 'Global Client',
	address: '456 North St., Ahmedabad, Gujarat 380001',
	contact: 9004567890,
	email: 'tested@client.com',
	privileged: true
	};

	invoiceInfo: invoice = {
	number: 4653,
	date: this.dated,
	dueDate: this.dated,
	currency: 'INR'
	};

	billItems: bill[] =  [
            {
                item: "Microsoft Office",
                task: "Microsoft Office suite installation",
                hours: 2,
                rate: 120
            },
            {
                item: "Oracle SQL developer",
                task: "SQL developer installation",
                hours: 1,
                rate: 140
            }
        ];
  billitemArray: any;
	

	total: number = 0;
	calculatedTotal: number=0;
	discount: number = 7;
	taxes: number = 18;
	deposit: number = 400;
	tempItem: string | undefined;
	tempTask: string | undefined;
	tempHours: number | undefined;
	tempRate: number | undefined;

	
	privChange(e: any) {
    if(e.target.checked){
      this.discount = 7;
    }
    else {
      this.discount = 2;
    }
        // add 5% discount if you have privileged
        // subtract 5% discount if you have not privileged
	}
  getAmount(hour: any, rate: any){
    return hour * rate;
  }

	onSelect(i: any) {
    this.billItems.forEach((element,index)=>{
      if(index==i) this.billItems.splice(index,1);
   });
    
	}
    
	getSubTotal() : number {
        // Calculate rounded Subtotal
        this.total=0;
        if((this.billItems)){
          for(let item of this.billItems){
            this.total  += this.getAmount(item.hours,item.rate);
        }
        } else {
          this.total = 0;
        }
        
        return this.total;
    }

	getTotal(): number {
        // Calculate rounded Total
        let subDiscount = ((this.total * this.discount) / 100);
        let sunTax = ((this.total * this.taxes) / 100);
        this.calculatedTotal = this.total  - (subDiscount) + (sunTax) - this.deposit;
        let subCalculatedTotal = Math.ceil(this.calculatedTotal);
        if(subCalculatedTotal == -244) {
          subCalculatedTotal -= 1 
        }
        return subCalculatedTotal;
	}
	
    mouseEnterAddItem(){
        // display addItem division
        this.changeText = true;
    }

    mouseLeaveAddItem(){
        // don't display addItem division
        this.changeText = false;
    }
	
	addItem() {
        // add an item into billItems array
        this.billItems.push({item: this.tempItem,
        task: this.tempTask,
        hours: this.tempHours,
        rate: this.tempRate});
  	}
    

    changeText: boolean;

	constructor() { 
    this.changeText = false;
  }

	ngOnInit() {
  
		}

	}

