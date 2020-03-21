import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGood, Good } from 'app/shared/model/good.model';
import { GoodService } from './good.service';

@Component({
  selector: 'jhi-good-update',
  templateUrl: './good-update.component.html'
})
export class GoodUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected goodService: GoodService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ good }) => {
      this.updateForm(good);
    });
  }

  updateForm(good: IGood): void {
    this.editForm.patchValue({
      id: good.id,
      name: good.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const good = this.createFromForm();
    if (good.id !== undefined) {
      this.subscribeToSaveResponse(this.goodService.update(good));
    } else {
      this.subscribeToSaveResponse(this.goodService.create(good));
    }
  }

  private createFromForm(): IGood {
    return {
      ...new Good(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGood>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
