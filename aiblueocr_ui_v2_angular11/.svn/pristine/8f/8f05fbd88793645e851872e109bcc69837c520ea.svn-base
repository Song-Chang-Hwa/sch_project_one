import { NgModule } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }
    transform(value: string) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@NgModule({
    declarations: [SafeHtmlPipe, SafePipe ]
    , exports: [SafeHtmlPipe, SafePipe ]
})
export class SafeHtmlModule { }
