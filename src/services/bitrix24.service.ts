// Dependencies import
import axios from "axios";

// Components import
import { B24_ADMIN_ID, B24_AUTH_TOKEN } from "../config/secrets";
import { InternalServerError } from "../helpers/apiError";
import { logger } from "../utils/logger";

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
        // Log the successful crm notification sending operation
        logger.info(
            `CRM notification sent successfully crm ID: ${crmData.customerId}`
        );
        return response;
    } catch (error) {
        throw new InternalServerError(
            "Failed to send CRM notification in bitrix24.service component",
            500,
            error
        );
    }
};

export default sendCrmNotification;
