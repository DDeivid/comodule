import { Injectable } from '@angular/core';
import { Module } from './module';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private moduleRef: any;
  private modules: Array<Module>;

  constructor() {
    firebase.initializeApp(environment.firebase);
    this.moduleRef = firebase.database().ref('module');
    this.modules = [];
    this.gatherData();
  }

  gatherData() {
    // Start listening to child_changed events in the module list
    this.moduleRef.on('child_changed', snapshot => {
      const data = {
        _id: snapshot.ref.key,
        date: new Date()
      };
      this.modules.push(data);
    });
  }

  getModulesData() {
    return this.modules;
  }
}
