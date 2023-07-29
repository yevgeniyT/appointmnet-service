// Dependencies import
import axios from "axios";

// Components import
import { B24_ADMIN_ID, B24_AUTH_TOKEN } from "../config/secrets";
import { InternalServerError } from "../helpers/apiError";

const BASE_URL = "https://kiddydenta.bitrix24.eu/rest/1";

// Types
interface CrmData {
    customerId: string;
    text: string;
}

const sendCrmNotification = async (crmData: CrmData) => {
    try {
        // 1. Post request to API to send SMS
        const response = await axios.post(
            `${BASE_URL}/${B24_AUTH_TOKEN}/crm.timeline.comment.add`,
            {
                fields: {
                    ENTITY_ID: crmData.customerId,
                    ENTITY_TYPE: "contact",
                    COMMENT: crmData.text,
                },
            }
        );

        return response;
    } catch (error) {
        throw new InternalServerError("Failed to send SMS", 500, error);
    }
};

export default sendCrmNotification;
