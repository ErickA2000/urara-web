import { HttpClientTestingModule } from "@angular/common/http/testing";
import { getTestBed } from "@angular/core/testing";
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
  } from '@angular/platform-browser-dynamic/testing';
  
import { NoopAnimationsModule } from "@angular/platform-browser/animations";


getTestBed().initTestEnvironment(
    [
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule
    ],
    platformBrowserDynamicTesting()
)