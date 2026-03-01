import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  phoneNumber = '+447969239497'; // Phone number without dashes for URLs
  phoneNumberFormatted = '+44 7969 239 497'; // Formatted for display

  get whatsappUrl(): string {
    // Remove all non-digit characters for WhatsApp URL
    const cleanNumber = this.phoneNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}`;
  }

  get phoneUrl(): string {
    return `tel:${this.phoneNumber}`;
  }
}
