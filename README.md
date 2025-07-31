# TECH-ENGINE - HR Hiring Platform

A modern web application for connecting talented students with top companies through AI-powered matching and comprehensive skill assessments.

## Features

### For Students
- **Profile Management**: Complete profile setup with education, skills, and projects
- **Skill Assessment**: Practice coding questions and skill evaluations
- **Job Matching**: AI-powered job recommendations based on skills and preferences
- **Project Showcase**: Display portfolio projects with GitHub integration
- **Learning Resources**: Access to curated learning materials and courses

### For HR/Recruiters
- **Candidate Discovery**: Browse and filter student profiles
- **Assessment Tracking**: Monitor student performance and scores
- **Shortlisting**: Create and manage candidate shortlists
- **Communication**: Direct messaging and email integration
- **Analytics**: Performance metrics and candidate insights

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hr-hire
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

### Netlify Deployment

1. **Connect to Netlify**:
   - Push your code to GitHub/GitLab
   - Connect your repository to Netlify
   - Netlify will automatically detect the build settings

2. **Build Settings** (automatically configured):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Environment Variables** (if needed):
   - Add any environment variables in Netlify dashboard

4. **Custom Domain** (optional):
   - Configure custom domain in Netlify settings

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to your hosting provider

3. Configure your hosting provider to serve `index.html` for all routes (SPA routing)

## Demo Credentials

### Student Login
- Email: `student@demo.com`
- Password: `password123`

### HR Login
- Email: `hr@demo.com`
- Password: `password123`

## Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.tsx # Landing page component
│   ├── LoginPage.tsx   # Authentication page
│   ├── StudentDashboard.tsx # Student dashboard
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── types/              # TypeScript type definitions
├── services/           # API services
└── data/              # Mock data
```

## Key Features

### Authentication
- Mock authentication system
- User type differentiation (Student/HR)
- Persistent login state

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Responsive navigation and layouts

### Error Handling
- Error boundaries for React components
- Graceful localStorage fallbacks
- User-friendly error messages

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimizations

- Code splitting with Vite
- Optimized bundle size
- Lazy loading of components
- Efficient state management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository. 