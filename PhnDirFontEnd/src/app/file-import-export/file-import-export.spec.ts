import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileImportExport } from './file-import-export';

describe('FileImportExport', () => {
  let component: FileImportExport;
  let fixture: ComponentFixture<FileImportExport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileImportExport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileImportExport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
