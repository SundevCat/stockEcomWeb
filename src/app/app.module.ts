import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/controls/sidebar/sidebar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/pages/home/home.component';
import { TokenService } from './services/token.service';
import { ProductComponent } from './components/pages/product/product.component';
import { DataTablesModule } from 'angular-datatables';
import { NavbarComponent } from './components/controls/navbar/navbar.component';
import { AddproductComponent } from './components/pages/product/addproduct/addproduct.component';
import { AddfileproductComponent } from './components/pages/product/addfileproduct/addfileproduct.component';
import { UploadcheckComponent } from './components/pages/product/addfileproduct/uploadcheck/uploadcheck.component';
import { ScannerComponent } from './components/pages/home/scanner/scanner.component';
import { SummarizeComponent } from './components/pages/home/scanner/summarize/summarize.component';
import { StockfileComponent } from './components/pages/home/stockfile/stockfile.component';
import { UploadstockcheckComponent } from './components/pages/home/stockfile/uploadstockcheck/uploadstockcheck.component';
import { EditproductComponent } from './components/pages/product/editproduct/editproduct.component';
import { AccountsettingComponent } from './components/controls/navbar/accountsetting/accountsetting.component';
import { AddaccountComponent } from './components/auth/register/addaccount/addaccount.component';
import { HistoryComponent } from './components/pages/history/history.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    NavbarComponent,
    AddproductComponent,
    AddfileproductComponent,
    UploadcheckComponent,
    ScannerComponent,
    SummarizeComponent,
    StockfileComponent,
    UploadstockcheckComponent,
    EditproductComponent,
    AccountsettingComponent,
    AddaccountComponent,
    HistoryComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DataTablesModule, //ใช้งาน Datatable
    FormsModule, //ใช้งาน ngModel
    HttpClientModule, // ใช้งาน httpClient
    MatIconModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
