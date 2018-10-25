import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../shared/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../Doctor';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctor: Doctor;
  constructor(private doctorService: DoctorService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.doctorService.getDoctor(id).subscribe((doc: Doctor) => this.doctor = doc);
  }
  imageUrl(doctor: Doctor) {
    return './assets/doctor_' + doctor.id + '.jpg';
  }
}
