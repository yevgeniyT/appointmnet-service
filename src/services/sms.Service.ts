// Dependencies import
import axios from "axios";

// Components import
import { SMS_AUTH_TOKEN, SMS_BASE_URL, SMS_SENDER } from "../config/secrets";
import { InternalServerError } from "../helpers/apiError";
import {
    FailedSmsSendError,
    InactiveUserError,
    InvalidAuthError,
    InvalidMessageSenderError,
    InvalidRequestError,
    InvalidTokenError,
    RequiredBalanceError,
    RequiredContentError,
    RequiredTokenError,
} from "../helpers/smsError";

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
    } catch (error: any) {
        if (error.response) {
            switch (error.response.response_code) {
                case 103:
                    throw new RequiredTokenError();
                case 104:
                    throw new RequiredContentError();
                case 105:
                    throw new InvalidAuthError();
                case 106:
                    throw new InactiveUserError();
                case 203:
                    throw new RequiredBalanceError();
                case 300:
                    throw new InvalidRequestError();
                case 301:
                    throw new InvalidTokenError();
                case 302:
                    throw new InvalidMessageSenderError();
                case 503:
                    throw new FailedSmsSendError();
                default:
                    throw new InternalServerError(
                        "Failed to send SMS",
                        500,
                        error
                    );
            }
        } else {
            throw new InternalServerError("Failed to send SMS", 500, error);
        }
    }
};

export default sendSms;
