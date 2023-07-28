// Dependencies import
import axios from "axios";

// Components import
import { SMS_AUTH_TOKEN, SMS_BASE_URL, SMS_SENDER } from "../config/secrets";
import { InternalServerError } from "../helpers/apiError";

//Types
interface SmsData {
    recipients: string[];
    text: string;
}

const sendSms = async (smsData: SmsData) => {
    try {
        // 1. Post request to API to send SMS
        const response = await axios.post(
            `${SMS_BASE_URL}/message/send.json`,
            {
                recipients: smsData.recipients,
                sms: {
                    sender: SMS_SENDER,
                    text: smsData.text,
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${SMS_AUTH_TOKEN}`,
                },
            }
        );

        return response;
    } catch (error) {
        throw new InternalServerError("Failed to send SMS", 500, error);
    }
};

export default sendSms;
