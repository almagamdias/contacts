import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  data: any;
  str: any;
  constructor(private route: ActivatedRoute, private nav: NavController) {
    this.data = this.route.snapshot.params['data'];
    this.str = JSON.parse(this.data);
  }

  ngOnInit() {
  }

  goBack() {
    this.nav.navigateBack('home');
  }
}
