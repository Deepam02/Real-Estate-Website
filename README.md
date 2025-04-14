# Real Estate Project

A modern full-stack real estate application built with React, Node.js, and Prisma. This application allows users to browse, search, and manage real estate listings with a beautiful and intuitive user interface.

## 🚀 Features

- Modern and responsive UI built with React and Material-UI
- Interactive map integration using Leaflet
- Advanced search and filtering capabilities
- User authentication with Auth0
- Real-time property updates
- Property listing management
- Image gallery with Swiper
- Form validation with Formik and Yup
- RESTful API with Express.js
- Database management with Prisma

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Material-UI
- Mantine UI
- React Router DOM
- React Query
- Leaflet & React Leaflet
- Formik & Yup
- Framer Motion
- React Toastify
- Swiper

### Backend
- Node.js
- Express.js
- Prisma ORM
- Auth0
- Cookie Parser
- CORS

## 📦 Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd real-estate-project
```

2. Install dependencies for both client and server:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:

Create a `.env` file in the server directory with the following variables:
```env
DATABASE_URL="your-database-url"
AUTH0_AUDIENCE="your-auth0-audience"
AUTH0_ISSUER_BASE_URL="your-auth0-issuer-url"
```

Create a `.env` file in the client directory with:
```env
VITE_AUTH0_DOMAIN="your-auth0-domain"
VITE_AUTH0_CLIENT_ID="your-auth0-client-id"
VITE_API_URL="http://localhost:5000"
```

## 🚀 Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## 📝 API Documentation

The API endpoints are available at `http://localhost:5000/api`. Key endpoints include:

- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Auth0 for authentication
- Material-UI for the component library
- Leaflet for mapping functionality
- All other open-source libraries used in this project 