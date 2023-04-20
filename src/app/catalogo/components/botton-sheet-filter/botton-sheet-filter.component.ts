import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-botton-sheet-filter',
  templateUrl: './botton-sheet-filter.component.html',
  styleUrls: ['./botton-sheet-filter.component.scss']
})
export class BottonSheetFilterComponent {
  constructor(private _bottomSheet: MatBottomSheet){}

  close(){
    this._bottomSheet.dismiss()
  }

}
