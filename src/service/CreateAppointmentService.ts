import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointments';
import AppointmentsRepositories from '../repositories/AppointmentsRepositories';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepositories: AppointmentsRepositories;

    constructor(appointmentsRepositories: AppointmentsRepositories) {
        this.appointmentsRepositories = appointmentsRepositories;
    }

    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepositories.findByDate(
            appointmentDate
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }
        const appointment = this.appointmentsRepositories.create({
            provider,
            date: appointmentDate,
        });
        return appointment;
    }
}
export default CreateAppointmentService;
