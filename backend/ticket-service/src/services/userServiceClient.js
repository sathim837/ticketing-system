import axios from "axios";

 const userServiceClient = axios.create({

    baseURL : "http://localhost:3000",
    timeout : 5000,
    headers : {
        "x-service-key" : process.env.INTERNAL_SERVICE_KEY
    }
}); 

export default userServiceClient;