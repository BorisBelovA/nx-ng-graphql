import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TweetComponent } from './tweet.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [TweetComponent],
  exports: [TweetComponent]
})
export class TweetModule {}
