'use strict'

function HouseBuilder (address, description, owner, size, roomCount) {

    this.address = address;
    this.description = description;
    this.owner = owner;
    this.size = size;
    this.roomCount = roomCount;
    this.date = new Date();
    this.__proto__ = houseBlueprint;
}
