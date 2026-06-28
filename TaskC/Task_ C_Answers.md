**Task C: Xero API Integration Answers
---------------------------------------------------------------------------------------------**



**## C1. How would you prove that our Xero API connection is working before checking invoices?**



**\*\*Answer:\*\***

**Make a `GET` request to the `/connections` or `/Organisations` endpoint. If the API returns a `200 OK` status code along with a list of connected tenants or organization details, it proves that the authentication, authorization, and overall API connection are working correctly.**



**---------------------------------------------------------------------------------------------**



**## C2. If /connections works but GET /Invoices fails, what would you check?**



**\*\*Answer:\*\***

**I would check the following areas to diagnose the issue:**



**1. \*\*HTTP Status Code \& Error Message:\*\* Identify the specific error code (e.g., `401 Unauthorized`, `403 Forbidden`, `400 Bad Request`) to understand the root cause.**

**2. \*\*Tenant ID Header:\*\* Ensure the `Xero-tenant-id` header is explicitly included in the request. While `/connections` lists available tenants, Accounting API endpoints require you to specify which tenant you are actively querying.**

**3. \*\*Scopes \& Permissions:\*\* Verify that the OAuth 2.0 access token granted the necessary scopes (e.g., `accounting.transactions.read`) required to retrieve invoice data.**

**4. \*\*Query Parameters:\*\* Check for any malformed syntax or invalid filters in the request URL that might be causing a bad request.**



**---------------------------------------------------------------------------------------------**



**## C3. What endpoint would you call to check invoices?**



**\*\*Answer:\*\***

**I would call the following endpoint:**

**`GET /api.xro/2.0/Invoices`**



**---------------------------------------------------------------------------------------------**



**## C4. How would you check one specific invoice?**



**\*\*Answer:\*\***

**There are two primary methods depending on the identifier available:**



**1. \*\*By Invoice ID (Primary method):\*\* Call the GET Invoices endpoint and append the specific invoice's unique GUID as a path parameter:**

&#x20;  **`GET /api.xro/2.0/Invoices/{InvoiceID}`**

**2. \*\*By Invoice Number:\*\* If searching by the human-readable invoice number, use a query parameter:**

&#x20;  **`GET /api.xro/2.0/Invoices?InvoiceNumber={InvoiceNumber}`**



**---------------------------------------------------------------------------------------------**





**## C5. If the invoice API returns 429, how should the backend handle it?**



**\*\*Answer:\*\***

**A `429` status code indicates "Too Many Requests," meaning the application has hit Xero's API rate limits. The backend should implement the following strategy:**



**1. \*\*Read the `Retry-After` header:\*\* Extract the exact wait time (in seconds) required from the 429 response header.**

**2. \*\*Pause outgoing requests:\*\* Temporarily halt all outgoing requests to the Xero API for the specified duration to prevent further rejections.**

**3. \*\*Implement exponential backoff and queuing:\*\* Place the failed request into a queue and automatically retry it once the cooldown period expires. This ensures no data is lost and smoothly handles future rate limit boundaries.**



