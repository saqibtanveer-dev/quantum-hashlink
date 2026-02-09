export const mernStackCourse = {
  id: "mern-stack",
  title: "Web Development with MERN Stack",
  syllabus: [
    {
      week: 1,
      topics: [
        "Introduction to ME(RN) stack: overview of MongoDB, Express, React, Node",
        "Setting up Node.js and npm, project scaffolding",
        "MongoDB basics: databases, collections, CRUD operations",
      ],
    },
    { week: 2, topics: ["Express.js fundamentals: routing, middleware, and request handling", "Building a simple REST API: GET and POST endpoints", "Connecting Node to MongoDB using Mongoose"] },
    { week: 3, topics: ["Defining Mongoose schemas and models", "Data validation and relationships (references vs. embedding)", "Implementing CRUD endpoints: PUT and DELETE"] },
    { week: 4, topics: ["Introduction to React: components, JSX, and props", "Managing state with hooks (`useState`, `useEffect`)", "Creating a basic React app with Create React App"] },
    { week: 5, topics: ["React Router: setting up client\u2011side routing", "Nested routes and dynamic route parameters", "Building navigation and linking between pages"] },
    { week: 6, topics: ["Connecting React frontend to Express API: `fetch`/`axios`", "Displaying data from backend, handling loading and errors", "Basic form handling in React"] },
    { week: 7, topics: ["User authentication: JSON Web Tokens (JWT) overview", "Implementing login and registration endpoints in Express", "Protecting routes and storing tokens securely on client"] },
    { week: 8, topics: ["State management with Context API", "Avoiding prop drilling, using `useContext` and custom hooks", "Building protected routes in React"] },
    { week: 9, topics: ["Advanced Mongoose: indexing, aggregation pipelines", "Pagination and filtering results in API", "Error handling and centralized middleware"] },
    { week: 10, topics: ["Styling React apps: CSS modules, Tailwind CSS, or styled-components", "Responsive design and layout best practices", "Deploying React frontend separately (Netlify/Vercel)"] },
    { week: 11, topics: ["Final project planning: full-stack design, data schema, API routes", "Integrating front and backend, setting up environment variables", "Testing with Jest (backend) and React Testing Library"] },
    { week: 12, topics: ["Deployment: hosting backend (Heroku/DigitalOcean) and frontend (Netlify/Vercel)", "Monitoring and logging basics (Morgan, CloudWatch, or similar)", "Wrap-up, performance tuning, and next steps (GraphQL, microservices)"] },
  ],
};
