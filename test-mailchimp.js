import mailchimp from '@mailchimp/mailchimp_marketing';

// Configure Mailchimp with the user's API key
mailchimp.setConfig({
  apiKey: '10e31a5d9a72a0073a8f634b280078e2-us15',
  server: 'us15'
});

const listId = 'b4e746a599';

async function addTestContact() {
  try {
    // Generate a random email to avoid duplicates
    const randomEmail = `test${Math.floor(Math.random() * 10000)}@breakaway.work`;
    
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: randomEmail,
      status: 'subscribed',
      merge_fields: {
        FNAME: 'Test',
        LNAME: 'User',
        COMPANY: 'Test Company',
        PHONE: '1234567890',
        MESSAGE: 'This is a test message from the API',
      },
    });
    
    console.log('Contact added successfully:');
    console.log(`ID: ${response.id}`);
    console.log(`Email: ${response.email_address}`);
    console.log(`Status: ${response.status}`);
  } catch (error) {
    console.error('Error adding contact:', error);
    if (error.response) {
      console.log('Error details:', error.response.body);
    }
  }
}

// Run the test
addTestContact(); 