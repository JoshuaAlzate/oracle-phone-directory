import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';

interface Contact {
  name: string;
  mobile: string;
  email: string;
}

@Component({
  selector: 'app-phone-directory',
  templateUrl: './phone-directory.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, CdkTableModule],
})
export class PhoneDirectoryComponent {
  private formBuilder = inject(FormBuilder);

  contactForm: FormGroup = this.formBuilder.group(
    {
      name: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.maxLength(20),
        ],
      }),
      mobile: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.maxLength(10),
        ],
      }),
      email: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z][a-zA-Z0-9.]{1,10}@[a-zA-Z]{2,20}\.[a-zA-Z]{2,10}$/
          ),
        ],
      }),
    },
    {
      updateOn: 'blur',
    }
  );

  contacts = signal<Contact[]>([]);
  contacts$ = new BehaviorSubject<Contact[]>([]);
  displayedColumns: string[] = ['name', 'mobile', 'email'];

  errors = signal<{[key: string]: string}>({});

  constructor() {
    this.formChanges().forEach((a) => a.pipe(takeUntilDestroyed()).subscribe());
  }

  private formChanges() {
    return this.displayedColumns.map((controlName: string) => {
      const control = this.contactForm.get(controlName)!;

      return control.valueChanges.pipe(
        tap((_) => {
          const errors = control.errors;
          if (control.dirty && errors) {
            let error = '';
            if (errors['required']) {
              error = 'The field is required';
            } else if (errors['pattern']) {
              if (controlName === 'name') {
                error = 'It should contain only Alphabets and Space';
              } else if (controlName === 'mobile') {
                error = 'It should contain only Numbers';
              } else if (controlName === 'email') {
                error = `A valid email address should have the following rules...
                Eg: john.doe3@gmail.com is a valid email address.`;
              }
            } else if (errors['maxlength']) {
              error = `It should be less than or equal to ${errors['maxlength'].requiredLength} characters in length`;
            }
            this.errors.update((item) => {
              item[`${controlName}Error`] = error;
              return item;
            });
          } else {
            this.errors.update((item) => {
              delete item[`${controlName}Error`];
              return item;
            });
          }
        })
      );
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.contacts$.next([...this.contacts$.value, this.contactForm.value]);
      this.contactForm.reset();
    }
  }
}
