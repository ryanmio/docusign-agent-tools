import { DocuSignToolkit, listEnvelopes, getEnvelopeDetails } from '@docusign-agent-tools/tools';

async function demo() {
  // Create toolkit instance
  const toolkit = new DocuSignToolkit({
    clientId: process.env.DOCUSIGN_CLIENT_ID!,
    apiBasePath: 'https://demo.docusign.net/restapi'  // or your production URL
  });

  // Set credentials (from your auth flow)
  toolkit.setCredentials({
    accessToken: process.env.DOCUSIGN_ACCESS_TOKEN!,
    accountId: process.env.DOCUSIGN_ACCOUNT_ID!
  });

  try {
    // List recent envelopes
    console.log('Listing recent envelopes...');
    const envelopes = await listEnvelopes(toolkit);
    console.log(`Found ${envelopes.length} envelopes`);

    if (envelopes.length > 0) {
      // Get details of first envelope
      console.log('\nGetting details of first envelope...');
      const details = await getEnvelopeDetails(toolkit, { 
        envelopeId: envelopes[0].id 
      });
      console.log('Envelope details:', JSON.stringify(details, null, 2));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

demo(); 