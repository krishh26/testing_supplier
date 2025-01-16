import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData!: any;
  skills: any[] = [
    {
      id: 1,
      name: "Organization"
    },
    {
      id: 2,
      name: "Creativity"
    },
    {
      id: 3,
      name: "Leadership"
    },
    {
      id: 4,
      name: "Team Building"
    },
    {
      id: 5,
      name: "SEO"
    },
    {
      id: 6,
      name: "Social Media"
    },
    {
      id: 7,
      name: "Content Management"
    },
    {
      id: 8,
      name: "Data Analysis"
    }
  ]
  managesData: any[] = [
    {
      id: 1,
      name: "Graphic designers"
    },
    {
      id: 2,
      name: "Copy Writers"
    },
    {
      id: 3,
      name: "social media marketing manager"
    },
  ]
  reportToData: any[] = [
    {
      id: 1,
      name: "User 1"
    },
    {
      id: 2,
      name: "User 2"
    },
    {
      id: 3,
      name: "User 3"
    },
  ]

  userDataForm = {
    name: new FormControl(""),
    companyAddress: new FormControl(""),
    email: new FormControl(""),
    customerSupportContact: new FormControl(""),
    jobTitle: new FormControl(""),
    professionalSkill: new FormControl(""),
    reportTo: new FormControl(""),
    manages: new FormControl(""),
    VATOrGSTNumber: new FormControl(""),
    complianceCertifications: new FormControl(""),
    employeeCount: new FormControl(""),
    typeOfCompany: new FormControl(""),
    website: new FormControl(""),
    technologyStack: new FormControl(""),
  };

  userForm = new FormGroup(this.userDataForm, []);

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.authService.getUserData().subscribe((response: any) => {
      if (response?.status) {
        this.userData = response.data;
        console.log('response.data', response.data);
        this.userForm.controls['email'].setValue(response?.data?.email || "");
        this.userForm.controls['name'].setValue(response?.data?.name || "");
        this.userForm.controls['companyAddress'].setValue(response?.data?.companyAddress || "");
        this.userForm.controls['customerSupportContact'].setValue(response?.data?.customerSupportContact || "");
        this.userForm.controls['VATOrGSTNumber'].setValue(response?.data?.VATOrGSTNumber || "");
        this.userForm.controls['complianceCertifications'].setValue(response?.data?.complianceCertifications || "");
        this.userForm.controls['employeeCount'].setValue(response?.data?.employeeCount || "");
        this.userForm.controls['typeOfCompany'].setValue(response?.data?.typeOfCompany || "");
        this.userForm.controls['website'].setValue(response?.data?.website || "");
        this.userForm.controls['website'].setValue(response?.data?.technologyStack || "");
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Error');
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return
    }
    this.authService.updateUser(this.userData._id, this.userForm.value).subscribe((response: any) => {
      if (response?.status) {
        this.notificationService.showSuccess(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Error');
    });
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
