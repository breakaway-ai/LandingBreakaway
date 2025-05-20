import mailchimp from '@mailchimp/mailchimp_marketing';

// Configure Mailchimp with the user's API key
mailchimp.setConfig({
  apiKey: '10e31a5d9a72a0073a8f634b280078e2-us15',
  server: 'us15'
});

async function getLists() {
  try {
    // Get all lists (audiences) in the account
    const response = await mailchimp.lists.getAllLists();
    
    console.log('Your Mailchimp Lists:');
    console.log('====================');
    
    if (response.lists && response.lists.length > 0) {
      response.lists.forEach(list => {
        console.log(`List Name: ${list.name}`);
        console.log(`List ID: ${list.id}`);
        console.log(`Member Count: ${list.stats.member_count}`);
        console.log('--------------------');
      });
    } else {
      console.log('No lists found in your account.');
      console.log('Please create a list (audience) in your Mailchimp account first.');
    }
  } catch (error) {
    console.error('Error fetching Mailchimp lists:', error);
    if (error.status === 401) {
      console.log('Authentication error: Please check your API key.');
    }
  }
}

// Run the function
getLists(); 