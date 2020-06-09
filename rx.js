'use strict';

const data = [1,2,3];

class Observable {
  constructor(source) {
    this.source = source;
    this.result = this.source;
  }

  subscribe(next) {
    for (let item of this.result) {
      next(item);
    }
  }

  filter(predicate) {
    this.result = this.result.filter(predicate);
    return this;
  }

  map(callback) {
    this.result = this.result.map(callback);
    return this;
  }
}

const firstStream = new Observable(data);
firstStream.subscribe((item) => console.log(item));