// Dependencies import
import axios from "axios";

// Components import
import { B24_ADMIN_ID, B24_AUTH_TOKEN } from "../config/secrets";
import { InternalServerError } from "../helpers/apiError";

const BASE_URL = "https://kiddydenta.bitrix24.eu/rest";

//Types
// interface SmsData {
//     recipients: string[];
//     text: string;
// }

const sendComment = async () => {
    try {
        // 1. Post request to API to send SMS
        const response = await axios.post(
            `${BASE_URL}/${B24_AUTH_TOKEN}/${B24_AUTH_TOKEN}/crm.timeline.comment.add`,
            {
                fields: {
                    ENTITY_ID: 9673,
                    ENTITY_TYPE: "contact",
                    COMMENT: "New comment was added",
                },
            }
        );

        console.log(response.data);

        return response;
    } catch (error) {
        throw new InternalServerError("Failed to send SMS", 500, error);
    }
};

export default sendComment;
