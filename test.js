class GrandFather {
  constructor(grandSon) {
    this.name = 'GrandFather';
    this.age = 26;
    this.grandSon = grandSon;
  }

  printGrandSon() {
    console.log(
      '>>Name of GrandSon in GrandFather Class<<<<<<<<<<: ',
      this.grandSon,
    );
  }
}

class Father extends GrandFather {
  constructor(sonName) {
    super(sonName);
    this.name = 'Father';
    this.age = 27;
    this.sonName = sonName;
  }

  printFather = function printFather() {
    console.log('>>Name of Father in Father Class<<<<<<<<<<: ', this.name);
    console.log('>>Name of Son in Father Class<<<<<<<<<<: ', this.sonName);
  };
}

class Son extends Father {
  constructor(sonName) {
    super(sonName);
    this.name = 'Son';
    this.age = 28;
  }
}

const son = new Son('Iqbal');

son.printGrandSon();
