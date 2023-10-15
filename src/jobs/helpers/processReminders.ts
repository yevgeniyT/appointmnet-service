//Componetns imports
import { InternalServerError } from "../../helpers/apiError";
import sendCrmNotification from "../../services/bitrix24.service";
import sendSms from "../../services/sms.Service";
import { logger } from "../../utils/logger";
import {
    prepareMultipleCrmData,
    prepareMultipleSmsData,
    prepareSingleCrmData,
    prepareSingleSmsData,
} from "./../helpers/dataPreparation";
import {
    getMutipleAppointments,
    getSingleAppointment,
} from "./getAppointments";

type TemplateFunction = (
    time: Date,
    appointmentId: string,
    shortenUrl?: string
) => string;

const processMultipleReminders = async (
    type: string,
    template: TemplateFunction
) => {
    try {
        logger.info(`Start processing multiple ${type}  reminders`);
        // 1. Get array of filtered appointments
        const appointments = await getMutipleAppointments();

        // 2. Get array with objects to be send to SMS and CRM service
        const smsData = prepareMultipleSmsData(appointments, template);

        const crmData = prepareMultipleCrmData(appointments, template);

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

        logger.info(`Finish processing multiple ${type}  reminders`);
    } catch (error) {
        logger.error(`Failed to send multiple ${type} reminders: ${error}`, {
            error,
        });
        throw new InternalServerError(
            `Failed to send ${type} reminders: ${error}`,
            500,
            error
        );
    }
};

const processSingleReminder = async (
    type: string,
    template: TemplateFunction,
    appointmentId: string
) => {
    try {
        logger.info(`Start processing single ${type} reminder`);
        // 1. Get appontmnet
        const appointment = await getSingleAppointment(appointmentId);

        // 2. Prepare data for sirvices
        const smsData = prepareSingleSmsData(appointment, template);
        const crmData = prepareSingleCrmData(appointment, template);

        // 3. Send data to services
        await sendSms(await smsData);
        await sendCrmNotification(crmData);

        logger.info(`Finish processing ${type} single reminder`);
    } catch (error) {
        logger.error(`Failed to send single ${type} reminder: ${error}`, {
            error,
        });
        throw new InternalServerError(
            `Failed to send single ${type} reminder: ${error}`,
            500,
            error
        );
    }
};

export { processMultipleReminders, processSingleReminder };
