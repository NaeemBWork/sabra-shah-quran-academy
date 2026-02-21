import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    // Auto-play video when component loads
    if (this.videoElementRef?.nativeElement) {
      this.videoElementRef.nativeElement.play().catch(() => {
        // Autoplay was prevented, user interaction required
      });
    }
  }

  ngOnDestroy() {
    if (this.videoElementRef?.nativeElement) {
      this.videoElementRef.nativeElement.pause();
    }
  }
}
