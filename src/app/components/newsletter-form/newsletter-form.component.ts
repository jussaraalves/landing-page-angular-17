import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    ReactiveFormsModule
  ],
  providers: [

  ],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss'
})
export class NewsletterFormComponent {
  newletterForm!: FormGroup;
  loading = signal(false);

  constructor(private service : NewsletterService){
    this.newletterForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  submit(){
    this.loading.set(true);
    if(this.newletterForm.valid){
      this.service.sendData(this.newletterForm.value.name, this.newletterForm.value.email).subscribe({
        next: () => {
          this.newletterForm.reset();
          this.loading.set(false);
        }
      })
    }
  }
}
