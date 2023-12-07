import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'asyncAwait';
  studentForm: FormGroup;
  studentDetails: Array<any> = [];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      age: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  save = () => {
    if (this.studentForm.valid) {
      this.studentDetails.push(this.studentForm.value);
      this.studentForm.reset();
    }
  };

  delete = async (index: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          this.studentDetails.splice(index, 1);
          resolve();
        }, 1000);
      });

      Swal.fire({
        title: 'Deleted!',
        text: 'Your record has been deleted.',
        icon: 'success'
      });
    }
  };
}