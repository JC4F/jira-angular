import { ProjectConst } from '@/constants';
import { NoWhitespaceValidator } from '@/core/validators/no-whitespace.validator';
import { BreadcrumbsComponent } from '@/shared/components/breadcrumbs/breadcrumbs.component';
import { HlmButtonDirective } from '@/shared/components/ui-button-helm/src';
import { HlmInputDirective } from '@/shared/components/ui-input-helm/src';
import { HlmToasterComponent } from '@/shared/components/ui-sonner-helm/src';
import { AutofocusDirective } from '@/shared/directives/autofocus.directive';
import { ProjectActions } from '@/stores/project/projects.actions';
import { RootState } from '@/stores/root-store';
import { ProjectCategory, ProjectSchema } from '@/types';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { toast } from 'ngx-sonner';

@Component({
  standalone: true,
  templateUrl: './settings.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HlmToasterComponent,
    HlmButtonDirective,
    BreadcrumbsComponent,
    HlmInputDirective,
    AutofocusDirective,
  ],
})
@UntilDestroy()
export class SettingsComponent implements OnInit {
  project: ProjectSchema;
  projectForm: FormGroup;
  categories: ProjectCategory[];
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Settings'];
  }

  constructor(
    private _store: Store<RootState>,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.categories = [
      ProjectCategory.BUSINESS,
      ProjectCategory.MARKETING,
      ProjectCategory.SOFTWARE,
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this._store
      .select(state => state.project)
      .pipe(untilDestroyed(this))
      .subscribe(project => {
        this.project = project;
        this.updateForm(project);
      });
  }

  initForm() {
    this.projectForm = this._fb.group({
      name: ['', NoWhitespaceValidator()],
      url: [''],
      description: [''],
      category: [ProjectCategory.SOFTWARE],
    });
  }

  updateForm(project: ProjectSchema) {
    this.projectForm.patchValue({
      name: project.name,
      url: project.url,
      description: project.description,
      category: project.category,
    });
  }

  submitForm() {
    const formValue: Partial<ProjectSchema> = this.projectForm.getRawValue();
    this._store.dispatch(ProjectActions.updateProject(formValue));
    toast('Changes have been saved successfully.');
  }

  cancel() {
    this._router.navigate(['/']);
  }
}
