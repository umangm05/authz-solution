import {
    OAuth2Api,
    IdentityApi,
    FrontendApi, 
    Configuration
} from '@ory/client';

const config = new Configuration({
    basePath: process.env.ORI_URL,
    accessToken: process.env.ORY_API_KEY,
    baseOptions: {
        withCredentials: true, // Important for CORS
        timeout: 30000, // 30 seconds
    },
})


const ory = {
    identity: new IdentityApi(config),
    frontend: new FrontendApi(config),
    oauth2: new OAuth2Api(config),
}

const flowResponse = await ory.frontend.createBrowserLoginFlow();
// createRegistrationFlowForBrowser();
const flow = flowResponse.data; // This contains the flow.id

await ory.frontend
    .updateRegistrationFlow({
        flow: flow.id,
        updateRegistrationFlowBody: {
            method: "password",
            password: "some-password",
            traits: { email: "some@email.com" },
        },
    })

module.exports = ory;
