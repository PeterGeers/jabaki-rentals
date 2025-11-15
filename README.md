# JaBaKi Short Term Rentals

Airbnb-style booking platform for JaBaKi properties in Amsterdam area.

## Features

- Property listings with Google Drive images
- Event promotion (Keukenhof, F1, ADE, Mysteryland)
- Direct booking integration (Guesty ready)
- Platform links (Booking.com, Airbnb, VRBO)
- Responsive Airbnb-inspired design

## Quick Start

### Frontend
```bash
cd jabaki-app
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python server.py
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Chakra UI, Formik
- **Backend**: Flask, Python
- **Images**: Google Drive with lh3 URL generation
- **Routing**: React Router
- **Styling**: Airbnb-inspired theme

## API Endpoints

- `POST /api/generate-lh3` - Generate lh3 URL from Google Drive file ID
- `GET /api/google-image/{fileId}` - Get image URL for file ID

## Future Integrations

- AWS Cognito authentication
- Stripe payments
- Guesty/Tokeet channel manager
- Real property data