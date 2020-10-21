## OAuth 2.0 JWT Bearer flow for Server to Server Integration for Salesforce report data



**This document will walk you through the steps required to connect to Salesforce using OAuth 2.0 JWT Bearer token. This would be server to server integration. In this process we Will send JSON WEB TOKEN to salesforce and will receive access token, this access token will be used with API endpoint to access the report data**

** Please note that there are many OAuth authorization flows (Ref:https://help.salesforce.com/articleView?id=remoteaccess_oauth_flows.htm&type=5). You need to decide which is suitable to your need. In my case, I want to authorize my server to access Salesforce data, this way I wanted to avoid sending username and password everytime to salesforce. This approach is more secure and require prior approval of client app, also it both server (salesforce server and our app server) will share client secret and certificate **
