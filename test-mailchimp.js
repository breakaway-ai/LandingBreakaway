import mailchimp from '@mailchimp/mailchimp_marketing';
import dotenv from 'dotenv';

dotenv.config();

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX || 'us15'
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