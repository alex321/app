import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {CardsService} from '../shared';

@Component({
  selector: 'my-about',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss']
})
export class CardEditComponent implements OnInit {
  @ViewChild('image') private _imageElement;
  private _reader = new FileReader();
  mode: 'edit'|'new';

  form: FormGroup;

  constructor(
      private _service: CardsService, private _fb: FormBuilder,
      private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.form = _fb.group({
      character: '',
      age: '',
      status: 'alive',
      image: '',
      titles: _fb.array([])
    });
  }

  ngOnInit() {
    this._initReader();
    this.mode =
        this._activatedRoute.snapshot.params['character'] ? 'edit' : 'new';

    if (this.mode === 'edit') {
      this._initEditMode();
    }
  }

  onAdd(title: string) {
    (<FormArray>this.form.controls['titles']).push(this._fb.control(title));
  }

  onImageSelection(event: any) {
    if (event.target.files[0]) {
      this._reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSave() {
    let result = this.mode === 'edit' ?
        this._service.updateCard(this.form.getRawValue()) :
        this._service.addCard(this.form.getRawValue());

    if (result) {
      this._router.navigate(['/']);
    }
  }

  onTitleDelete(index: number) {
    (<FormArray>this.form.controls['titles']).removeAt(index);
  }

  private _initReader() {
    this._reader.onload = (e: any) => {
      let src = e.target.result;
      this._imageElement.nativeElement.src = src;
      this.form.controls['image'].setValue(src);
    };
  }

  private _initEditMode() {
    this.form.controls['character'].disable();
    this._service.getCard(this._activatedRoute.snapshot.params['character'])
        .then(card => {
          this.form.patchValue(card);
          this.form.setControl('titles', this._fb.array(card.titles));
        });
  }
}
