import { ComponentFixture,TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ConfirmationService, ConfirmDialogModule, TableModule } from 'primeng';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let firstName: HTMLInputElement;
  let lastName: HTMLInputElement;
  let address: HTMLInputElement;
  let phoneNumber: HTMLInputElement;  
  let saveBtn: HTMLButtonElement;  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [        
        FormsModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        TableModule    
      ],
      providers: [ConfirmationService],
    }).compileComponents();

  fixture = TestBed.createComponent(AppComponent);  
  firstName = fixture.debugElement.nativeElement.querySelector('#firstName')
  lastName = fixture.debugElement.nativeElement.querySelector('#lastName')
  address = fixture.debugElement.nativeElement.querySelector('#address')
  phoneNumber = fixture.debugElement.nativeElement.querySelector('#phoneNumber') 
  saveBtn = fixture.debugElement.nativeElement.querySelector('#saveBtn')
  
  }));
  
  it('should check initial firstName', () => {
      expect(firstName.value).toBe('')
  });

  it('should check initial lastName', () => {
    expect(lastName.value).toBe('')
  });

  it('should check initial address', () => {
    expect(address.value).toBe('')
  });

   it('should check save button is disabled initially', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        debugger;
        fixture.detectChanges();
        expect(saveBtn.disabled).toBe(true)
       })
    }));


    it('should check save button is disabled with empty firstName', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // firstName.value='Madhu'
        lastName.value='m'
        address.value='Hyderabad'
        fixture.detectChanges();
        expect(saveBtn.disabled).toBe(true)
      });
    }));

    it('should check save button is disabled with empty lastName', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        firstName.value='Madhu'
        // lastName.value='m'
        address.value='Hyderabad'
        fixture.detectChanges();
        expect(saveBtn.disabled).toBe(true)
      });
    }));

    it('should check save button is disabled with empty address', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        firstName.value='Madhu'
        lastName.value='m'
        // address.value='Hyderabad'
        fixture.detectChanges();
        expect(saveBtn.disabled).toBe(true)
      });
    }));

    it('should check save button is disabled with invalid phoneNumber', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        firstName.value='Madhu'
        lastName.value='m'
        address.value='Hyderabad'
        phoneNumber.value='876'
        fixture.detectChanges();
        expect(saveBtn.disabled).toBe(true)
      });
    }));

    it('should check save button is disabled with invalid phoneNumber', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        firstName.value='Madhu'
        lastName.value='m'
        address.value='Hyderabad'
        phoneNumber.value='876'
        fixture.detectChanges();
        expect(saveBtn.disabled).toBe(true)
      });
    }));

    it('should check save button is enabled after required inputs check out', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        firstName.value='Madhu'
        lastName.value='m'
        address.value='Hyderabad'
        expect(saveBtn.disabled).toBe(false)
      });
    })); 


//Negative tests - below tests should get failed
    it('should check save button is disabled initially - negative test ', async(() => {
       fixture.detectChanges();
       fixture.whenStable().then(() => {
       debugger;
       fixture.detectChanges();
       expect(saveBtn.disabled).toBe(false)
      })
    }));


    it('should check save button is disabled with invalid phoneNumber - negative test', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        firstName.value='Madhu'
        lastName.value='m'
        address.value='Hyderabad'
        phoneNumber.value='876'
        fixture.detectChanges();
        expect(saveBtn.disabled).toBe(false)
      });
    }));

});
