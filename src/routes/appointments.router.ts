import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepositories from '../repositories/AppointmentsRepositories';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepositories = new AppointmentsRepositories();

appointmentsRouter.get('/', (request, response) => {
    const appointment = appointmentsRepositories.all();
    return response.json(appointment);
});

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentsRepositories
        );
        const appointment = createAppointment.execute({
            date: parsedDate,
            provider,
        });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json([{ error: err.message }]);
    }
});

export default appointmentsRouter;

// Soc
