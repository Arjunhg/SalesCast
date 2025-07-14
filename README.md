# SalesCast - AI-Powered Customer Experience Platform

SalesCast is a comprehensive platform that transforms customer engagement through AI-powered voice agents, live streaming, and intelligent conversion tracking. Built with Next.js 15, it combines real-time analytics with personalized customer experiences to maximize conversion rates.

## Features

### 🎥 Live Streaming & Webinars
- **High-quality live streaming** with Stream.io integration
- **Real-time chat** with message moderation and engagement tracking
- **Dynamic CTA triggers** that appear based on customer behavior
- **Live analytics dashboard** with viewer count and engagement metrics
- **OBS integration** for professional broadcasting

### 🤖 AI-Powered Voice Agents
- **Custom AI assistant creation** with Vapi.ai integration
- **Voice-first interactions** with natural speech recognition and synthesis
- **Dynamic conversation flow** that adapts to customer responses
- **Emotional intelligence** with human-like conversation patterns
- **Automated call management** with scheduling and duration tracking

### 📊 Customer Journey Tracking
- **Multi-stage conversion pipeline**: Registered → Attended → Follow-up → Breakout Room → Converted
- **Real-time status updates** as customers progress through the sales funnel
- **Behavioral analytics** to monitor engagement patterns
- **Predictive scoring** based on customer behavior and interactions
- **Visual sales funnel** with drag-and-drop interface

### 🎯 Hyper-Personalized Experience
- **Real-time personalization** based on customer behavior
- **Contextual recommendations** powered by AI
- **Intelligent CTAs** triggered by engagement levels
- **Personalized pricing** with dynamic offers and coupon codes
- **A/B testing framework** for continuous optimization

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Live Streaming**: Stream.io Video SDK
- **Voice AI**: Vapi.ai
- **State Management**: Zustand
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Clerk account for authentication
- Stream.io account for live streaming
- Vapi.ai account for voice AI

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Arjunhg/SalesCast.git
cd SalesCast
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:

```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/callback
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/callback

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Live Streaming (Stream.io)
NEXT_PUBLIC_STREAM_USER_ID=your_stream_user_id
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET=your_stream_secret
STREAM_TOKEN=your_stream_token
STREAM_CALL_ID=your_stream_call_id
RMTP_URL=your_rtmp_url

# Voice AI (Vapi.ai)
VAPI_PRIVATE_KEY=your_vapi_private_key
VAPI_ORG_ID=your_vapi_org_id
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key

# Database
DATABASE_URL=your_postgresql_connection_string
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## OBS Setup for Live Streaming

### Prerequisites
- OBS Studio installed
- Active webinar session in SalesCast

### Configuration Steps

1. **Get OBS Credentials**
   - Start a webinar in SalesCast
   - Click "Get OBS Creds" button
   - Copy the RTMP URL and Stream Key

2. **Configure OBS Stream Settings**
   - Open OBS Studio
   - Go to Settings → Stream
   - Select "Custom" as the service
   - Enter the RTMP URL in the Server field
   - Enter the Stream Key in the Stream Key field

3. **Recommended OBS Settings**
   - **Output Mode**: Advanced
   - **Encoder**: x264 (software) or NVENC (NVIDIA GPU)
   - **Rate Control**: CBR
   - **Bitrate**: 2500-4000 Kbps
   - **Keyframe Interval**: 2 seconds
   - **Preset**: Very Fast (x264) or Quality (NVENC)
   - **Profile**: Main
   - **Tune**: None

4. **Audio Settings**
   - **Sample Rate**: 44.1 kHz
   - **Channels**: Stereo
   - **Audio Bitrate**: 128 Kbps

5. **Start Streaming**
   - Click "Start Streaming" in OBS
   - Your stream will appear in the SalesCast webinar interface

## Usage

### Creating a Webinar
1. Navigate to the Webinars section
2. Click "Create Webinar"
3. Fill in basic information (title, description, date/time)
4. Configure CTA settings and AI agent
5. Set additional options (coupon codes, chat settings)
6. Publish the webinar

### Setting up AI Agents
1. Go to the AI Agents section
2. Click "Create Assistant"
3. Configure the agent's personality and knowledge base
4. Set up conversation flows and objection handling
5. Test the agent before using in webinars

### Managing Customer Pipeline
1. Access the Pipeline view for any webinar
2. Monitor customers as they move through conversion stages
3. Use tags to categorize and segment customers
4. Analyze conversion rates and optimize strategies


## Live Demo

Visit [sales-cast.vercel.app](https://sales-cast.vercel.app) to see the platform in action.

---

Built with ❤️ by [Arjun Sharma](https://github.com/Arjunhg) and [Anushka Chaudhary](https://github.com/Anu19-10)
