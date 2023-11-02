import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  str: any;
  y: any;
  phones: any;
  email: any;
  constructor(private route: ActivatedRoute, private nav: NavController) {
    this.str = JSON.parse(this.route.snapshot.params['data']);
    this.phones = this.str['phones'];
    this.y = this.str['name'];
    this.email = this.str['emails'];
  }

  ngOnInit() {
  }

  goBack() {
    this.nav.navigateBack('home');
  }
}
