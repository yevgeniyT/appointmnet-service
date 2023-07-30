//Componetns imports
import { InternalServerError } from "../../helpers/apiError";
import sendCrmNotification from "../../services/bitrix24.service";
import sendSms from "../../services/sms.Service";
import logger from "../../utils/logger";
import { prepareCrmData, prepareSmsData } from "./../helpers/dataPreparation";
import getAppointments from "./../helpers/getAppointments";

type TemplateFunction = (time: Date, appointmentId: string) => string;

const processReminder = async (type: string, template: TemplateFunction) => {
    try {
        logger.info(`Start processing ${type} reminder`);
        // 1. Get array of filtered appointments
        const appointments = await getAppointments();

        // 2. Get array with objects to be send to SMS and CRM service
        const smsData = prepareSmsData(appointments, template);

        const crmData = prepareCrmData(appointments, template);

        // 3. Send SMS to each appointment
        for (let data of smsData) {
            try {
                await sendSms(data);
                logger.debug(
                    `SMS sent to ${data.recipients} with message: ${data.text}`
                );
            } catch (error) {
                logger.error(`Failed to send ${type} reminders: ${error}`, {
                    error,
                });
                throw new InternalServerError(
                    `Failed to send ${type} reminders: ${error}`,
                    500,
                    error
                );
            }
        }

        // 4. Send CRM notification to each appointment
        for (let data of crmData) {
            try {
                sendCrmNotification(data);
                logger.debug(
                    `CRM notification sent to ${data.customerId} with message: ${data.text}`
                );
            } catch (error) {
                logger.error(`Failed to send CRM notification: ${error}`, {
                    error,
                });
                throw new InternalServerError(
                    `Failed to send CRM notification: ${error}`,
                    500,
                    error
                );
            }
        }

        logger.info(`Finish processing ${type} reminder`);
    } catch (error) {
        logger.error(`Failed to send ${type} reminders: ${error}`, { error });
        throw new InternalServerError(
            `Failed to send ${type} reminders: ${error}`,
            500,
            error
        );
    }
};

export default processReminder;
