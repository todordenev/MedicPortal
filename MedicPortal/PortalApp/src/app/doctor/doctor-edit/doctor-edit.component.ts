import { Component, OnInit } from '@angular/core';
import { Doctor } from '../Doctor';
import { DoctorService } from '../../shared/doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

  doctor: Doctor;
  constructor(private doctorService: DoctorService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.doctorService.getDoctor(id).subscribe((doc: Doctor) => this.doctor = doc);
    } else {
      this.doctor = new Doctor();
    }
  }
  imageUrl(doctor: Doctor) {
    return './assets/doctor' + doctor.id + '.jpg';
  }

}
