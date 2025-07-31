import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Users, 
  Briefcase, 
  Award, 
  Mail, 
  Filter, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Star,
  CheckCircle,
  Globe,
  Clock,
  Target,
  Play,
  ExternalLink,
  Download,
  MessageCircle,
  Phone,
  MapPin,
  Building
} from 'lucide-react';
import TechEngineLogo from './TechEngineLogo';

interface LandingPageProps {
  onNavigateToLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);


  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDemoClick = () => {
    setShowDemoModal(true);
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:contact@tech-engine.com';
  };

  const handleDownloadBrochure = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'TECH-ENGINE-Brochure.pdf';
    link.click();
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeaturesClick = () => {
    handleScrollToSection('features');
  };

  const handlePricingClick = () => {
    // For now, show a modal or navigate to pricing section
    alert('Pricing information will be available soon!');
  };

  const handleAboutClick = () => {
    alert('About TECH-ENGINE: We are revolutionizing tech recruitment by connecting talented students with top companies through AI-powered matching and comprehensive skill assessments.');
  };

  const handleContactNavClick = () => {
    handleContactClick();
  };

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Job Matching",
      description: "Get matched with the perfect job opportunities based on your skills and preferences"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Skill Assessment Platform",
      description: "Showcase your technical skills through our comprehensive assessment system"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Direct Company Access",
      description: "Connect directly with top companies and HR professionals"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth Tracking",
      description: "Track your progress and get insights to improve your career prospects"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Instant Communication",
      description: "Chat directly with recruiters and get quick responses to your applications"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Profile Management",
      description: "Keep your personal information safe with enterprise-grade security"
    }
  ];

  const stats = [
    { number: "10K+", label: "Students Target" },
    { number: "500+", label: "Partner Companies" },
    { number: "95%", label: "Target Success Rate" },
    { number: "24/7", label: "Student Support" }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Career Advisor",
      company: "IIT Delhi",
      content: "We're excited to partner with TECH-ENGINE. Their innovative approach to skill assessment and job matching will revolutionize student placements.",
      rating: 5
    },
    {
      name: "Prof. Michael Chen",
      role: "Placement Head",
      company: "BITS Pilani",
      content: "TECH-ENGINE's platform addresses the core challenges in tech recruitment. We look forward to seeing our students benefit from this partnership.",
      rating: 5
    },
    {
      name: "Rahul Patel",
      role: "HR Director",
      company: "TechCorp Inc.",
      content: "We're eager to be among the first companies to leverage TECH-ENGINE's AI-powered recruitment platform for finding exceptional tech talent.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
             {/* Navigation */}
       <nav className={`${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'} border-b border-gray-200 sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <TechEngineLogo size="md" />
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">TECH-ENGINE</span>
            </div>

            {/* Desktop Navigation */}
                         <div className="hidden md:flex items-center space-x-8">
               <div className="relative group">
                 <button 
                   className="flex items-center text-gray-700 hover:text-[#805da3] transition-colors"
                   onMouseEnter={() => setActiveDropdown('solutions')}
                   onMouseLeave={() => setActiveDropdown(null)}
                 >
                   For Students
                   <ChevronDown className="ml-1 w-4 h-4" />
                 </button>
                                   {activeDropdown === 'solutions' && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <button 
                        onClick={handleFeaturesClick}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Job Opportunities
                      </button>
                      <button 
                        onClick={handleFeaturesClick}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Skill Assessments
                      </button>
                      <button 
                        onClick={handleFeaturesClick}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Career Guidance
                      </button>
                    </div>
                  )}
               </div>
               <div className="relative group">
                 <button 
                   className="flex items-center text-gray-700 hover:text-[#805da3] transition-colors"
                   onMouseEnter={() => setActiveDropdown('recruiters')}
                   onMouseLeave={() => setActiveDropdown(null)}
                 >
                   For Recruiters
                   <ChevronDown className="ml-1 w-4 h-4" />
                 </button>
                                   {activeDropdown === 'recruiters' && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <button 
                        onClick={handleFeaturesClick}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Find Talent
                      </button>
                      <button 
                        onClick={handleFeaturesClick}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Assessment Tools
                      </button>
                      <button 
                        onClick={handleFeaturesClick}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Hiring Solutions
                      </button>
                    </div>
                  )}
               </div>
                               <button 
                  onClick={handleFeaturesClick}
                  className="text-gray-700 hover:text-[#805da3] transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={handlePricingClick}
                  className="text-gray-700 hover:text-[#805da3] transition-colors"
                >
                  Pricing
                </button>
                                 <button 
                   onClick={handleAboutClick}
                   className="text-gray-700 hover:text-[#805da3] transition-colors"
                 >
                   About
                 </button>

             </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={onNavigateToLogin}
                className="text-[#805da3] hover:text-[#6d4d8c] font-medium transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onNavigateToLogin}
                className="bg-[#805da3] text-white px-4 py-2 rounded-lg hover:bg-[#6d4d8c] transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-[#805da3]"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

                     {/* Mobile Navigation */}
           {isMenuOpen && (
             <div className="md:hidden py-4 border-t border-gray-200">
               <div className="space-y-2">
                                   <div className="px-4 py-2 font-medium text-gray-900">For Students</div>
                  <button 
                    onClick={handleFeaturesClick}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 ml-4"
                  >
                    Job Opportunities
                  </button>
                  <button 
                    onClick={handleFeaturesClick}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 ml-4"
                  >
                    Skill Assessments
                  </button>
                  <button 
                    onClick={handleFeaturesClick}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 ml-4"
                  >
                    Career Guidance
                  </button>
                  <div className="px-4 py-2 font-medium text-gray-900">For Recruiters</div>
                  <button 
                    onClick={handleFeaturesClick}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 ml-4"
                  >
                    Find Talent
                  </button>
                  <button 
                    onClick={handleFeaturesClick}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 ml-4"
                  >
                    Assessment Tools
                  </button>
                  <button 
                    onClick={handleFeaturesClick}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 ml-4"
                  >
                    Hiring Solutions
                  </button>
                                   <div className="border-t border-gray-200 mt-4 pt-4">
                    <button 
                      onClick={handleFeaturesClick}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Features
                    </button>
                    <button 
                      onClick={handlePricingClick}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Pricing
                    </button>
                                         <button 
                       onClick={handleAboutClick}
                       className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                     >
                       About
                     </button>

                  </div>
                 <div className="pt-4 border-t border-gray-200">
                   <button 
                     onClick={onNavigateToLogin}
                     className="w-full text-left px-4 py-2 text-[#805da3] hover:bg-gray-50"
                   >
                     Sign In
                   </button>
                   <button 
                     onClick={onNavigateToLogin}
                     className="w-full mt-2 mx-4 bg-[#805da3] text-white px-4 py-2 rounded-lg hover:bg-[#6d4d8c]"
                   >
                     Get Started
                   </button>
                 </div>
               </div>
             </div>
           )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#805da3] via-[#6d4d8c] to-[#5a3d75] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Launch Your
                <span className="block text-yellow-300">Tech Career</span>
              </h1>
                               <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
                  Be among the first to experience our revolutionary AI-powered platform. 
                  Connect with top companies and showcase your skills through our comprehensive assessment and career guidance system.
                </p>
              <div className="flex flex-col sm:flex-row gap-4">
                                 <button 
                   onClick={onNavigateToLogin}
                   className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors flex items-center justify-center"
                 >
                   Start Your Journey
                   <ArrowRight className="ml-2 w-5 h-5" />
                 </button>

              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm">
                                 <div className="flex items-center">
                   <CheckCircle className="w-5 h-5 text-yellow-300 mr-2" />
                   <span>Early access available</span>
                 </div>
                 <div className="flex items-center">
                   <CheckCircle className="w-5 h-5 text-yellow-300 mr-2" />
                   <span>Founding member benefits</span>
                 </div>
              </div>
            </div>
                         <div className="relative">
               {/* Simple Professional Platform Preview */}
               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                 <div className="text-center mb-8">
                   <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                     <TrendingUp className="w-8 h-8 text-gray-900" />
                   </div>
                   <h3 className="text-white font-bold text-xl mb-2">Platform Overview</h3>
                   <p className="text-gray-200 text-sm">See how TECH-ENGINE works</p>
                 </div>
                 
                 {/* Key Features Grid */}
                 <div className="grid grid-cols-2 gap-6">
                   <div className="text-center">
                     <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                       <Search className="w-6 h-6 text-white" />
                     </div>
                     <h4 className="text-white font-semibold text-sm mb-1">Smart Matching</h4>
                     <p className="text-gray-300 text-xs">AI-powered job matching</p>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                       <Award className="w-6 h-6 text-white" />
                     </div>
                     <h4 className="text-white font-semibold text-sm mb-1">Skill Assessment</h4>
                     <p className="text-gray-300 text-xs">500+ assessment types</p>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-12 h-12 bg-purple-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                       <Building className="w-6 h-6 text-white" />
                     </div>
                     <h4 className="text-white font-semibold text-sm mb-1">Direct Access</h4>
                     <p className="text-gray-300 text-xs">500+ partner companies</p>
                   </div>
                   
                   <div className="text-center">
                     <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                       <CheckCircle className="w-6 h-6 text-white" />
                     </div>
                     <h4 className="text-white font-semibold text-sm mb-1">Success Rate</h4>
                     <p className="text-gray-300 text-xs">95% placement target</p>
                   </div>
                 </div>
                 
                 {/* Simple Stats */}
                 <div className="mt-8 pt-6 border-t border-white/20">
                   <div className="grid grid-cols-3 gap-4 text-center">
                     <div>
                       <div className="text-2xl font-bold text-yellow-400">10K+</div>
                       <div className="text-white text-xs">Students Target</div>
                     </div>
                     <div>
                       <div className="text-2xl font-bold text-yellow-400">500+</div>
                       <div className="text-white text-xs">Companies</div>
                     </div>
                     <div>
                       <div className="text-2xl font-bold text-yellow-400">95%</div>
                       <div className="text-white text-xs">Success Rate</div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

             {/* Stats Section */}
       <section className="py-16 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {stats.map((stat, index) => (
               <div key={index} className="text-center group">
                 <div className="text-3xl md:text-4xl font-bold text-[#805da3] mb-2 group-hover:scale-110 transition-transform duration-300">
                   {stat.number}
                 </div>
                 <div className="text-gray-600 group-hover:text-[#805da3] transition-colors duration-300">
                   {stat.label}
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>

       {/* Launch Phase Section */}
       <section className="py-20 bg-gradient-to-r from-[#805da3] to-[#6d4d8c] text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold mb-6">
               <Zap className="w-4 h-4 mr-2" />
               Platform Launch Phase
             </div>
             <h2 className="text-3xl md:text-4xl font-bold mb-4">
               Be Among the First to Experience TECH-ENGINE
             </h2>
             <p className="text-xl text-gray-100 max-w-3xl mx-auto">
               We're launching our revolutionary platform and offering exclusive early access benefits to founding members
             </p>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
               <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Target className="w-6 h-6 text-gray-900" />
               </div>
               <h3 className="text-xl font-semibold mb-3">Early Access</h3>
               <p className="text-gray-100">Get first access to our platform before the public launch</p>
             </div>
             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
               <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Award className="w-6 h-6 text-gray-900" />
               </div>
               <h3 className="text-xl font-semibold mb-3">Founding Member Benefits</h3>
               <p className="text-gray-100">Exclusive perks and priority support for early adopters</p>
             </div>
             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
               <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                 <TrendingUp className="w-6 h-6 text-gray-900" />
               </div>
               <h3 className="text-xl font-semibold mb-3">Shape the Future</h3>
               <p className="text-gray-100">Help us build the platform with your feedback and suggestions</p>
             </div>
           </div>
         </div>
       </section>

       {/* For Students & Recruiters Section */}
       <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               Perfect for Students & Recruiters
             </h2>
                           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our revolutionary platform will serve both sides of the hiring equation, creating a win-win ecosystem
              </p>
           </div>
           <div className="grid lg:grid-cols-2 gap-12">
             {/* For Students */}
             <div className="bg-gradient-to-br from-[#805da3] to-[#6d4d8c] text-white rounded-2xl p-8">
               <div className="text-center mb-8">
                 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Users className="w-8 h-8" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">For Students</h3>
                 <p className="text-gray-100">Launch your tech career with confidence</p>
               </div>
               <div className="space-y-4">
                                   <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                    <span>Access to 500+ target companies</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                    <span>Advanced skill assessments</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                    <span>Direct communication with recruiters</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                    <span>AI-powered career guidance</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                    <span>Target 95% success rate</span>
                  </div>
               </div>
             </div>
             
             {/* For Recruiters */}
             <div className="bg-gray-50 rounded-2xl p-8">
               <div className="text-center mb-8">
                 <div className="w-16 h-16 bg-[#805da3] rounded-full flex items-center justify-center mx-auto mb-4">
                   <Briefcase className="w-8 h-8 text-white" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 text-gray-900">For Recruiters</h3>
                 <p className="text-gray-600">Find exceptional tech talent efficiently</p>
               </div>
               <div className="space-y-4">
                                   <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#805da3] mt-0.5 flex-shrink-0" />
                    <span>Access to 10K+ target candidates</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#805da3] mt-0.5 flex-shrink-0" />
                    <span>AI-powered candidate matching</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#805da3] mt-0.5 flex-shrink-0" />
                    <span>Advanced skill assessments</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#805da3] mt-0.5 flex-shrink-0" />
                    <span>Streamlined hiring process</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#805da3] mt-0.5 flex-shrink-0" />
                    <span>Target 50% faster hiring</span>
                  </div>
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               Everything You Need to Succeed
             </h2>
                           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our revolutionary platform will provide all the tools you need to showcase your skills, 
                connect with top companies, and launch your dream tech career.
              </p>
           </div>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {features.map((feature, index) => (
               <div 
                 key={index} 
                 className={`bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                   activeFeature === index ? 'ring-2 ring-[#805da3] shadow-lg' : ''
                 }`}
                 onMouseEnter={() => setActiveFeature(index)}
               >
                 <div className={`text-[#805da3] mb-4 transition-transform duration-300 ${
                   activeFeature === index ? 'scale-110' : ''
                 }`}>
                   {feature.icon}
                 </div>
                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                 <p className="text-gray-600 leading-relaxed">{feature.description}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               How TECH-ENGINE Works
             </h2>
                           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple, efficient, and effective - our platform will make your career journey smooth
              </p>
           </div>
          <div className="grid md:grid-cols-3 gap-8">
                         <div className="text-center">
               <div className="w-16 h-16 bg-[#805da3] rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-white text-2xl font-bold">1</span>
               </div>
               <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Your Profile</h3>
               <p className="text-gray-600">Build a comprehensive profile showcasing your skills, projects, and career goals</p>
             </div>
             <div className="text-center">
               <div className="w-16 h-16 bg-[#805da3] rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-white text-2xl font-bold">2</span>
               </div>
               <h3 className="text-xl font-semibold text-gray-900 mb-3">Take Skill Assessments</h3>
               <p className="text-gray-600">Complete technical assessments to demonstrate your expertise to potential employers</p>
             </div>
             <div className="text-center">
               <div className="w-16 h-16 bg-[#805da3] rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-white text-2xl font-bold">3</span>
               </div>
               <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Placed</h3>
               <p className="text-gray-600">Connect with top companies and secure your dream job with confidence</p>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
                           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Partner Testimonials
              </h2>
              <p className="text-xl text-gray-600">
                See what our partners and industry experts say about TECH-ENGINE
              </p>
           </div>
                     <div className="grid md:grid-cols-3 gap-8">
             {testimonials.map((testimonial, index) => (
               <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                 <div className="flex items-center mb-4">
                   {[...Array(testimonial.rating)].map((_, i) => (
                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                   ))}
                 </div>
                 <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                 <div className="flex items-center justify-between">
                   <div>
                     <div className="font-semibold text-gray-900">{testimonial.name}</div>
                     <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                   </div>
                   <div className="w-12 h-12 bg-[#805da3] rounded-full flex items-center justify-center">
                     <span className="text-white font-semibold text-lg">
                       {testimonial.name.split(' ').map(n => n[0]).join('')}
                     </span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#805da3] to-[#6d4d8c] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                                 <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Launch Your Tech Career?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Be among the first to experience our revolutionary platform and secure your dream tech job
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <button 
                   onClick={onNavigateToLogin}
                   className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors"
                 >
                   Get Early Access
                 </button>
                         <button 
               onClick={handleContactClick}
               className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#805da3] transition-colors flex items-center justify-center"
             >
               <MessageCircle className="w-5 h-5 mr-2" />
               Contact Us
             </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <TechEngineLogo size="sm" />
                <span className="ml-2 text-xl font-bold">TECH-ENGINE</span>
              </div>
                             <p className="text-gray-400 mb-4">
                 Revolutionizing tech recruitment by empowering students to launch successful careers and helping companies find exceptional talent.
               </p>
                             <div className="flex space-x-4">
                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
                   <Globe className="w-5 h-5" />
                 </a>
                 <a href="mailto:contact@tech-engine.com" className="text-gray-400 hover:text-white transition-colors">
                   <Mail className="w-5 h-5" />
                 </a>
                 <button 
                   onClick={handleDownloadBrochure}
                   className="text-gray-400 hover:text-white transition-colors"
                 >
                   <Download className="w-5 h-5" />
                 </button>
               </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
                     <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
             <p>&copy; 2024 TECH-ENGINE. All rights reserved.</p>
           </div>
         </div>
       </footer>

       {/* Demo Modal */}
       {showDemoModal && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
             <div className="p-6 border-b border-gray-200 flex justify-between items-center">
               <h3 className="text-2xl font-bold text-gray-900">TECH-ENGINE Platform Demo</h3>
               <button 
                 onClick={() => setShowDemoModal(false)}
                 className="text-gray-400 hover:text-gray-600 transition-colors"
               >
                 <X className="w-6 h-6" />
               </button>
             </div>
             <div className="p-6">
               <div className="aspect-video bg-gradient-to-br from-[#805da3] to-[#6d4d8c] rounded-lg flex items-center justify-center">
                 <div className="text-center text-white">
                   <Play className="w-16 h-16 mx-auto mb-4" />
                   <p className="text-xl font-semibold">Demo Video Coming Soon</p>
                   <p className="text-gray-200 mt-2">Experience the full platform walkthrough</p>
                 </div>
               </div>
               <div className="mt-6 grid md:grid-cols-3 gap-4">
                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                   <Users className="w-8 h-8 text-[#805da3] mx-auto mb-2" />
                   <h4 className="font-semibold text-gray-900">Student Experience</h4>
                   <p className="text-sm text-gray-600">Profile creation & job matching</p>
                 </div>
                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                   <Briefcase className="w-8 h-8 text-[#805da3] mx-auto mb-2" />
                   <h4 className="font-semibold text-gray-900">Recruiter Tools</h4>
                   <p className="text-sm text-gray-600">Candidate search & assessment</p>
                 </div>
                 <div className="text-center p-4 bg-gray-50 rounded-lg">
                   <TrendingUp className="w-8 h-8 text-[#805da3] mx-auto mb-2" />
                   <h4 className="font-semibold text-gray-900">Analytics Dashboard</h4>
                   <p className="text-sm text-gray-600">Performance insights</p>
                 </div>
               </div>
             </div>
             <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
               <button 
                 onClick={() => setShowDemoModal(false)}
                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
               >
                 Close
               </button>
               <button 
                 onClick={onNavigateToLogin}
                 className="px-6 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c] transition-colors"
               >
                 Get Started
               </button>
             </div>
           </div>
         </div>
                )}

         {/* Floating Action Button */}
         <div className="fixed bottom-6 right-6 z-40">
           <div className="flex flex-col space-y-3">
             <button 
               onClick={handleContactClick}
               className="bg-[#805da3] text-white p-3 rounded-full shadow-lg hover:bg-[#6d4d8c] transition-all duration-300 hover:scale-110"
               title="Contact Us"
             >
               <MessageCircle className="w-6 h-6" />
             </button>
             <button 
               onClick={handleDemoClick}
               className="bg-yellow-400 text-gray-900 p-3 rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-110"
               title="Watch Demo"
             >
               <Play className="w-6 h-6" />
             </button>
             <button 
               onClick={onNavigateToLogin}
               className="bg-white text-[#805da3] p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 border-2 border-[#805da3]"
               title="Get Started"
             >
               <ArrowRight className="w-6 h-6" />
             </button>
           </div>
         </div>
       </div>
     );
   };
  
  export default LandingPage; 