# Loops.so Form Integration Setup

This guide explains how to configure the zkVM Spreadsheet signup form with Loops.so.

## Quick Start

**The form is pre-configured and ready to use!** The Loops.so form ID is already hard-coded in the application (`cmeda826609gk0c0ijtguaff9`), so the integration should work out of the box.

## Prerequisites

1. A Loops.so account (sign up at https://loops.so if you don't have one)
2. Access to your Loops.so dashboard

## Configuration

### Custom Properties Setup

The form collects the following data:
- `firstName` - Contact's first name
- `lastName` - Contact's last name  
- `email` - Contact's email address (required)
- `companyName` - Contact's company name (custom property)

To add the `companyName` custom property in Loops.so:

1. Go to your Loops.so dashboard
2. Navigate to **Settings** → **API**
3. Add a new custom contact property:
   - Name: `Company Name`
   - API Name: `companyName`
   - Type: Text

### Optional: Using a Different Form ID

If you need to use a different Loops.so form endpoint:

1. Get your Form ID from Loops.so:
   - Log in to https://app.loops.so
   - Navigate to **Forms** → **Settings**
   - Copy the Form ID from the Form Endpoint URL

2. Create a `.env` file in the root of your project
3. Add your custom form ID:

```env
REACT_APP_LOOPS_FORM_ID=your_custom_form_id_here
```

4. Restart your development server

## Testing the Integration

1. Start your development server: `npm start` or `yarn start`
2. Navigate to the homepage
3. Click on "Get the Spreadsheet" button in the Current Focus section
4. Fill out the form and submit
5. Check your Loops.so dashboard to verify the contact was added

## Form Features

The integration includes:
- **User Groups**: Contacts are automatically tagged with "zkVM Spreadsheet Signups"
- **Source Tracking**: Form submissions are tagged with "zkVM Spreadsheet Modal" as the source
- **Error Handling**: User-friendly error messages if submission fails
- **Success Feedback**: Clear confirmation when form is submitted successfully
- **Rate Limiting**: Loops.so has built-in rate limiting to prevent abuse

## Troubleshooting

### Form Not Submitting
- Check browser console for error messages
- Verify the form endpoint is accessible
- Ensure you've restarted the development server if you added a custom form ID

### 429 Error (Too Many Requests)
- Loops.so rate limits form submissions
- Wait a few minutes before testing again
- This is normal protection against spam

### Contact Not Appearing in Loops
- Check that all required fields are being sent
- Verify custom properties are configured in Loops.so
- Check the Loops.so activity log for any errors

## Email Automation Setup

You can set up an automation in Loops.so to:
1. Send a welcome email with the spreadsheet link
2. Add contacts to a specific mailing list
3. Trigger a drip campaign

To set this up:
1. Go to Loops.so → Automations
2. Create a new automation triggered by "Contact created"
3. Add a filter for `userGroup` equals "zkVM Spreadsheet Signups"
4. Add your email actions

## Support

For issues with:
- The form component: Check this repository's issues
- Loops.so integration: Contact support@loops.so
- Form behavior: Review the Loops.so documentation at https://loops.so/docs 