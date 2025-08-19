# Gemini AI Setup Guide

This guide will help you set up Google Gemini AI for the chat feature.

## Prerequisites

1. **Google Account**: You need a Google account to access Gemini AI
2. **Gemini API Access**: Ensure you have access to Gemini AI (currently in limited access)

## Getting Your API Key

### Step 1: Visit Google AI Studio
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Accept the terms of service if prompted

### Step 2: Create API Key
1. Click on "Create API Key" button
2. Choose "Create API Key in existing project" or create a new project
3. Copy the generated API key (it starts with "AIzaSy...")

### Step 3: Configure Environment Variables

Create a `.env` file in your project root:

```bash
# .env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Important**: Replace `your_actual_api_key_here` with your actual API key.

### Step 4: Restart Development Server

After adding the environment variable, restart your development server:

```bash
npm run dev
```

## Security Notes

⚠️ **Never commit your API key to version control!**

- The `.env` file should be in your `.gitignore`
- The current API key in the code is for development only
- Use environment variables for production deployments

## Testing the Integration

1. Start your development server
2. Navigate to `/chat` in your application
3. Send a message to test the AI response
4. Check the browser console for any error messages

## Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Ensure your `.env` file is in the project root
   - Check that the variable name is exactly `VITE_GEMINI_API_KEY`
   - Restart your development server

2. **"Authentication failed" error**
   - Verify your API key is correct
   - Check if your Gemini API access is active
   - Ensure you haven't exceeded your quota

3. **"Rate limit exceeded" error**
   - Wait a few minutes before trying again
   - Check your API usage in Google AI Studio
   - Consider upgrading your plan if needed

### API Quotas

- **Free Tier**: Limited requests per minute
- **Paid Plans**: Higher limits available
- **Monitoring**: Check usage in Google AI Studio dashboard

## Production Deployment

For production, ensure you:

1. Set the environment variable on your hosting platform
2. Use a production-ready API key
3. Monitor API usage and costs
4. Implement proper rate limiting if needed

## Support

If you encounter issues:

1. Check the [Google AI Studio documentation](https://ai.google.dev/docs)
2. Review the [Gemini API reference](https://ai.google.dev/api/gemini-api)
3. Check your API key status in the Google AI Studio dashboard

## Example Environment File

```bash
# .env
VITE_GEMINI_API_KEY=AIzaSyDNHmmsmvod1_WQfIAjh5Tq7lu4NyLfo7Q

# Other environment variables
NODE_ENV=development
VITE_APP_NAME=Ekvyapaar Chat
```

Remember to replace the API key with your own! 