import { Component, OnInit, Input } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Doctor } from "../Doctor";

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

  imageUrl(doctor: Doctor) {
    return './assets/doctor' + doctor.id + '.jpg';
  }
}