// Using 'axios' as package for performing GET request (You can use any other library if you want...)
import axios from "axios";
import fs from "fs";
import config from "../config";
import { ServerError } from "../utils/erros/errorTypes";

// Path for saving the ospike public key locally
const pathForSavingOSpikePublicKey = "./publickey.pem";

// Function for saving OSpike Public Key locally
export default async function saveOSpikePublicKey() {
  const response = await axios.get(
    `${config.endpoints.OSpike.baseURL}/.well-known/publickey.pem`
  );

  // Checking if the response is ok
  if (response.status != 200) {
    throw new ServerError("cant get publickey file");
  }

  // Saving the public key locally
  fs.mkdirSync(pathForSavingOSpikePublicKey, response.data);
}
