# OAuth2.0JWT_Salesforce

## OAuth 2.0 JWT Bearer flow for Server to Server Integration for Salesforce report data

- This document will walk you through the steps required to connect to Salesforce using OAuth 2.0 JWT Bearer token.
- This is server to server integration.
- In this process we Will send JSON WEB TOKEN to salesforce and will receive access token.
- This access token will be used with API endpoint to access the report data.

### Note

> Please note that there are many [OAuth authorization flows](https://help.salesforce.com/articleView?id=remoteaccess_oauth_flows.htm&type=5). 
> You need to decide which is suitable to your need. In my case, I wanted to authorize my server to access Salesforce data, this way I wanted to 
> avoid sending username and password everytime to salesforce. This approach is more secure and require prior approval of client app, 
> also both servers (salesforce server and our app server) need to share client secret and certificate. 

### For more details please refere to:
[Site Page](https://tushar1up1.github.io/OAuth2.0JWT_Salesforce/)

### Code implementation is given in salesforceCtrl.js file
[Code Implementation](https://github.com/tushar1up1/OAuth2.0JWT_Salesforce)
