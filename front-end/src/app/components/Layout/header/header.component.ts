import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isScreenSmall: boolean = false;
  isMenuOpen: boolean = false;
  menu: any;

  constructor(private breakpointObserver: BreakpointObserver,
    public authService: AuthenticationService) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
  }
}