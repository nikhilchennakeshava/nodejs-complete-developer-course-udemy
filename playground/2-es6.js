// const square = x => x * x

// console.log(square(3))

const event = {
    name: 'Birthday',
    guests: ['Nikhil', 'Nik'],
    printGuests() {
        console.log('Guests for', this.name)
        this.guests.forEach(guest => console.log(guest, 'is attending', this.name))
    }
}

event.printGuests()