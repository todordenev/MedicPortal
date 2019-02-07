import { Component, OnInit } from '@angular/core';
import { Doctor, DoctorService } from '@app/core';
import { RegistrationCodesService } from '@app/core/services/registration-codes.service';

@Component({
  selector: 'app-doctor-registration-codes',
  templateUrl: './doctor-registration-codes.component.html',
  styleUrls: ['./doctor-registration-codes.component.css']
})
export class DoctorRegistrationCodesComponent implements OnInit {
  selectedDoctor: Doctor;
  codesCount = '1';
  codes: string[];
  private _myDoctors: Doctor[];
  get myDoctors(): Doctor[] {
    return this._myDoctors;
  }
  set myDoctors(doctors: Doctor[]) {
    this._myDoctors = doctors;
    if (this._myDoctors && this._myDoctors.length > 0) {
      this.selectedDoctor = this.myDoctors[0];
    }
  }

  constructor(
    private doctorService: DoctorService,
    private registrationCodesService: RegistrationCodesService) {
  }

  ngOnInit() {
    this.doctorService.getMyDoctors().subscribe(doctors => this.myDoctors = doctors);
  }

  generate(doctorId) {
    this.registrationCodesService.getRegistrationCodes(doctorId, Number(this.codesCount)).subscribe(codes => this.codes = codes);
  }

}
