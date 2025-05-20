import mailchimp from '@mailchimp/mailchimp_marketing';

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY || '10e31a5d9a72a0073a8f634b280078e2-us15',
  server: process.env.MAILCHIMP_SERVER_PREFIX || 'us15'
});

export const handler = async (event, context) => {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS request (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { name, email, company, phone, message } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Email is required' }),
      };
    }

    // Add member to list
    const listId = process.env.MAILCHIMP_LIST_ID || 'b4e746a599';
    
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name.split(' ')[0] || '',
        LNAME: name.split(' ').slice(1).join(' ') || '',
        COMPANY: company || '',
        PHONE: phone || '',
        MESSAGE: message || '',
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Contact form submitted successfully!',
        memberId: response.id,
      }),
    };
  } catch (error) {
    console.error('Mailchimp error:', error);
    
    return {
      statusCode: error.status || 500,
      headers,
      body: JSON.stringify({
        message: error.message || 'Error submitting the form',
        error: error.response ? error.response.text : 'Unknown error',
      }),
    };
  }
}; 