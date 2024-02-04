import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  login: { name: string; password: string };
  isSearchOpen: boolean = false;
  searchQuery: string = '';

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.getLoginUser();
  }

  getLoginUser() {
    this.login = JSON.parse(sessionStorage.getItem('login') || '[]');
  }

  signout() {
    sessionStorage.clear();
    this.login = null;
    this.route.navigateByUrl('');
  }

  openSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  closeSearch() {
    this.isSearchOpen = false;
  }

  performSearch() {
    console.log('Performing search for:', this.searchQuery);
    this.closeSearch();
  }
}
