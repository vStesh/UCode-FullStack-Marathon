'use strict'

class Building {
    hasElevator;
    arcCapacity;
    height;

    constructor(floors, material, address) {
        this.floors = floors;
        this.material = material;
        this.address = address;
    }

    getFloorHeight() {

        return this.height / this.floors;
    }
    toString() {

        return '';
    }

}

class Tower extends Building {

    constructor(floors, material, address) {
        super(floors, material, address);
    }

    toString() {
        let result = '';
        result += 'Floors: ' + this.floors + '\n';
        result += 'Material: ' + this.material + '\n';
        result += 'Address: ' + this.address + '\n';
        result += 'Elevator: ' + (this.hasElevator ? '+' : '-') + '\n';
        result += 'Arc reactor capacity: ' + this.arcCapacity + '\n';
        result += 'Height: ' + this.height + '\n';
        result += 'Floor height: ' + this.getFloorHeight() + '\n';
        return result;
    }

}


/*Task name: Tower*/
const starkTower= new Tower(93, 'Different', 'Manhattan, NY');
starkTower.hasElevator= true;
starkTower.arcCapacity= 70;
starkTower.height= 1130;
console.log(starkTower.toString());
/*
Floors: 93
Material: Different
Address: Manhattan, NY
Elevator: +
Arc reactor capacity: 70
Height: 1130
Floor height: 12.150537634408602
*/
