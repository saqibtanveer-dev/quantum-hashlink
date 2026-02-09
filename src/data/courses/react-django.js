export const reactDjangoCourse = {
  id: "react-django",
  title: "Web Dev: React + Django",
  syllabus: [
    { week: 1, topics: ["Course overview: full-stack architecture with React frontend and Django REST backend", "Setting up Python environment, Django project scaffolding", "Introduction to Django ORM, models, and migrations"] },
    { week: 2, topics: ["Building Django REST API: installing Django REST framework", "Creating serializers and viewsets for basic models", "Configuring URL routing and testing with Postman"] },
    { week: 3, topics: ["User authentication in Django: built-in User model and token authentication", "Custom user model basics", "Protecting API endpoints with permissions"] },
    { week: 4, topics: ["Introduction to React: components, JSX, and props", "Creating a React app with Create React App", "Basic state management with `useState` and `useEffect`"] },
    { week: 5, topics: ["Styling in React: CSS modules or styled-components overview", "Building reusable UI components (buttons, forms, cards)", "Implementing navigation with React Router"] },
    { week: 6, topics: ["Connecting React to Django API: `fetch`/`axios` setup", "Handling async requests, showing loading spinners and error messages", "Displaying list data from API in React components"] },
    { week: 7, topics: ["State management with Context API and custom hooks", "Avoiding prop drilling for user/auth state", "Creating protected routes and redirects based on auth status"] },
    { week: 8, topics: ["File uploads: handling media in Django (ImageField/FileField)", "Uploading files from React (using FormData)", "Serving static/media files in production"] },
    { week: 9, topics: ["Advanced DRF topics: pagination, filtering, and search", "Throttling and rate limiting API requests", "Versioning your REST API"] },
    { week: 10, topics: ["Testing Django APIs: `pytest-django` or built-in `TestCase`", "Testing React components with React Testing Library", "End-to-end testing overview (Cypress or Selenium)"] },
    { week: 11, topics: ["Optimizing performance: Django query optimization (select_related, prefetch_related)", "React performance tuning: memoization with `React.memo`, `useMemo`, and `useCallback`", "Caching strategies (Redis or Django's cache framework)"] },
    { week: 12, topics: ["Deployment: setting up production-ready Django (Gunicorn, Nginx) and React (build and serve)", "Environment variables, secrets management", "Course wrap-up, final project demo, and next steps"] },
  ],
};
