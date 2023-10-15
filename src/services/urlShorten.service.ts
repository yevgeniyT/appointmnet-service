//Dependencies import

//Components imports
import generateShortCode from "../helpers/shortCode";
import UrlModel from "../models/shortUrlMode";
import { CLIENT_URL } from "../config/secrets";

const shortenUrl = async (originalUrl: string): Promise<string> => {
    const shortCode = generateShortCode();
    const shortUrl = `${CLIENT_URL}/${shortCode}`;

    const urlData = new UrlModel({
        originalUrl,
        shortCode,
    });

    await urlData.save();

    return shortUrl;
};

export default shortenUrl;
