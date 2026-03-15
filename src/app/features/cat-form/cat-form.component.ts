import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CatStore } from '../../core/store/cat.store';
import { CatCreateDto } from '../../core/models/cat.model';

@Component({
  selector: 'app-cat-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './cat-form.component.html',
  styleUrl: './cat-form.component.scss'
})
export class CatFormComponent implements OnInit {
  public store = inject(CatStore);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public location = inject(Location);

  isEditMode = false;
  catId: string | null = null;
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      age: ['', [Validators.required, Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });


    effect(() => {
      const cat = this.store.currentCat();
      if (this.isEditMode && cat) {
        this.form.patchValue({
          name: cat.name,
          age: cat.age.toString(),
          description: cat.description
        });
      }
    });
  }

  ngOnInit(): void {
    this.catId = this.route.snapshot.paramMap.get('id');
    if (this.catId) {
      this.isEditMode = true;
      this.store.loadCat(this.catId);
    } else {
      this.isEditMode = false;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const dto: CatCreateDto = this.form.value;

    if (this.isEditMode && this.catId) {
      this.store.updateCat(this.catId, dto);
    } else {
      this.store.createCat(dto);
    }
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.location.back();
  }
}
