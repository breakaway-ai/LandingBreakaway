import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error('RESEND_API_KEY is not set. Add it to your .env file.');
  process.exit(1);
}

const resend = new Resend(apiKey);

async function getSegments() {
  try {
    const { data, error } = await resend.segments.list();

    if (error) {
      console.error('Error fetching segments:', error);
      if (error.statusCode === 401) {
        console.log('Authentication error: Please check your API key.');
      }
      return;
    }

    console.log('Your Resend Segments:');
    console.log('=====================');

    const segments = data?.data ?? [];

    if (segments.length > 0) {
      segments.forEach((segment) => {
        console.log(`Segment Name: ${segment.name}`);
        console.log(`Segment ID: ${segment.id}`);
        console.log('--------------------');
      });
    } else {
      console.log('No segments found in your account.');
      console.log('Create a segment in the Resend dashboard to organize contacts.');
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

getSegments();
