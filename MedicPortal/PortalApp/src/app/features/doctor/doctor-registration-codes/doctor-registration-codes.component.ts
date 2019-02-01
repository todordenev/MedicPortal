import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-registration-codes',
  templateUrl: './doctor-registration-codes.component.html',
  styleUrls: ['./doctor-registration-codes.component.css']
})
export class DoctorRegistrationCodesComponent implements OnInit {

  codesCount = 1;

  constructor() { }

  ngOnInit() {
  }

}
