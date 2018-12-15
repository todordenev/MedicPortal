import { Component, OnInit, Input } from '@angular/core';
import { Doctor, Workday } from '@app/core/entities';
import { GetWorkdays } from '@app/core/entities/helpers';


@Component({
  selector: 'app-doctor-listitem',
  templateUrl: './doctor-listitem.component.html',
  styleUrls: ['./doctor-listitem.component.css']
})
export class DoctorListitemComponent implements OnInit {
  @Input()
  doctor: Doctor;
  constructor() { }

  ngOnInit(): void {
  }

  test() {
    alert(this.doctor.workdays);
  }
  get imageUrl() {
    return './assets/doctor_' + this.doctor.id + '.jpg';
  }
}
