import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LinkService } from './service/link.service';
import ClipboardJS from 'clipboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  userInput = '';
  shortenLink = '';
  showResult = false;

  clipboard!: ClipboardJS;

  constructor(private linkService: LinkService) {}

  ngAfterViewInit(): void {
    this.clipboard = new ClipboardJS('#btn_copy');

    this.clipboard.on('success', (event: any) => {
      const button = event.trigger as HTMLElement;
      button.textContent = 'Copied'; 
      
      setTimeout(() => {
        button.textContent = 'Copy to Clipboard'; 
      }, 5000); 
    });

    this.clipboard.on('error', (event: any) => {
      console.error('Failed to copy text:', event);
    });
  }

  ngOnDestroy(): void {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }
  
  shortenUrl(): void {
    this.linkService.getShortenLink(this.userInput).subscribe((response) => {
      this.shortenLink = response.link;
      this.showResult = true;
    })
  }
}
