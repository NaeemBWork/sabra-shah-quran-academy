import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('videoElement', { static: false }) videoElementRef?: ElementRef<HTMLVideoElement>;
  private hasUserInteracted = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Listen for any user interaction to enable video playback
    const enableVideoOnInteraction = () => {
      if (!this.hasUserInteracted) {
        this.hasUserInteracted = true;
        this.attemptVideoPlay();
        // Remove listeners after first interaction
        document.removeEventListener('click', enableVideoOnInteraction);
        document.removeEventListener('touchstart', enableVideoOnInteraction);
        document.removeEventListener('keydown', enableVideoOnInteraction);
      }
    };

    document.addEventListener('click', enableVideoOnInteraction, { once: true });
    document.addEventListener('touchstart', enableVideoOnInteraction, { once: true });
    document.addEventListener('keydown', enableVideoOnInteraction, { once: true });
  }

  ngAfterViewInit() {
    // Try to play immediately (may fail due to browser policy)
    this.attemptVideoPlay();
  }

  attemptVideoPlay() {
    if (this.videoElementRef?.nativeElement) {
      this.videoElementRef.nativeElement.play().catch((error) => {
        console.log('Autoplay attempt failed:', error);
      });
    }
  }

  ngOnDestroy() {
    if (this.videoElementRef?.nativeElement) {
      this.videoElementRef.nativeElement.pause();
    }
  }
}
