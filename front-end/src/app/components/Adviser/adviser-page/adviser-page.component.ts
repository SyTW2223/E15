import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adviser-page',
  templateUrl: './adviser-page.component.html',
  styleUrls: ['./adviser-page.component.css']
})

export class AdviserPageComponent implements OnInit{ 
  form: FormGroup = this.formBuilder.group({
    categoriaAsesoramiento: ['', Validators.required],
    problema: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) {
   
  }

   ngOnInit() {
     this.form = this.formBuilder.group({
       categoriaAsesoramiento: ['', Validators.required],
       problema: ['', Validators.required]
     });
   }
}
