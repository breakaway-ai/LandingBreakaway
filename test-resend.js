import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error('RESEND_API_KEY is not set. Add it to your .env file.');
  process.exit(1);
}

const resend = new Resend(apiKey);

async function addTestContact() {
  try {
    const randomEmail = `test${Math.floor(Math.random() * 10000)}@breakaway.work`;

    const contactPayload = {
      email: randomEmail,
      firstName: 'Test',
      lastName: 'User',
      unsubscribed: false,
      properties: {
        company: 'Test Company',
        phone: '1234567890',
        message: 'This is a test message from the API',
      },
    };

    if (process.env.RESEND_SEGMENT_ID) {
      contactPayload.segments = [{ id: process.env.RESEND_SEGMENT_ID }];
    }

    const { data, error } = await resend.contacts.create(contactPayload);

    if (error) {
      console.error('Error adding contact:', error);
      return;
    }

    console.log('Contact added successfully:');
    console.log(`ID: ${data.id}`);
    console.log(`Email: ${randomEmail}`);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

addTestContact();
