import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import {
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabBarModule,
  MdcTextFieldModule,
  MdcTopAppBarModule,
  MdcTypographyModule,
} from '@angular-mdc/web';

import {DomSanitizer} from '@angular/platform-browser';

@NgModule({
  exports: [
    MatIconModule,
    MdcButtonModule,
    MdcCardModule,
    MdcCheckboxModule,
    MdcDialogModule,
    MdcDrawerModule,
    MdcElevationModule,
    MdcFabModule,
    MdcFormFieldModule,
    MdcIconModule,
    MdcLinearProgressModule,
    MdcListModule,
    MdcMenuModule,
    MdcRadioModule,
    MdcRippleModule,
    MdcSelectModule,
    MdcSliderModule,
    MdcSnackbarModule,
    MdcSwitchModule,
    MdcTabBarModule,
    MdcTextFieldModule,
    MdcTopAppBarModule,
    MdcTypographyModule,

    /*
        // MdcAppBarModule,
        // MdcTabIndicatorModule,
        // MdcTabBarModule,
        // MdcTabScrollerModule,
        // MdcIconButtonModule,
        MdcButtonModule,
        MdcCardModule,
        MdcCheckboxModule,
        MdcDialogModule,
        MdcDrawerModule,
        MdcElevationModule,
        MdcFabModule,
        MdcFormFieldModule,
        MdcIconModule,
        MdcLinearProgressModule,
        MdcListModule,
        MdcMenuModule,
        MdcRadioModule,
        MdcRippleModule,
        MdcSelectModule,
        MdcSliderModule,
        MdcSnackbarModule,
        MdcSwitchModule,
        MdcTabModule,
        MdcTextFieldModule,
        MdcThemeModule,
        MdcTypographyModule,
    */
  ]
})

export class AppMaterialModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}
