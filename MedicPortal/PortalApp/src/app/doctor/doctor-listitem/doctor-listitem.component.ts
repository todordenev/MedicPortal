import { Component, OnInit, Input } from '@angular/core';
import { DoctorService } from '../../shared/doctor.service';
import { Doctor } from '../Doctor';

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

  get imageUrl() {
    return './assets/doctor_' + this.doctor.id + '.jpg';
  }
}
