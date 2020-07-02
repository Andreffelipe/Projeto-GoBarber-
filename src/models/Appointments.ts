import { uuid } from 'uuidv4';

/* interface AppointmentConstructor {
    provider: string;
    date: Date;
}
constructor({provider, date}:Omit<AppointmentConstructor, 'id'> ) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
} */

class Appointment {
    id: string;

    provider: string;

    date: Date;

    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;
