import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Shield, 
  Clock,
  Star,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  RotateCcw,
  Calculator,
  Plug,
  MessageCircle,
  Settings,
  Activity
} from 'lucide-react';

// Import interactive components
import WorkflowBuilder from '../components/WorkflowBuilder';
import LiveChatWidget from '../components/LiveChatWidget';
import ROICalculator from '../components/ROICalculator';
import IntegrationChecker from '../components/IntegrationChecker';
import WorkflowSimulator from '../components/WorkflowSimulator';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(2); // Start at position 2 (first real slide)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Demo state
  const [currentDemo, setCurrentDemo] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize(); // Set initial values
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const workflows = [
    {
      id: 1,
      title: "E-commerce Order Processing",
      deployments: "45+",
      description: "Automatically process orders, send confirmations, and update inventory.",
      price: "$49",
      badge: "Popular",
      badgeColor: "bg-yellow-100 text-yellow-800",
      gradient: "from-slate-50 to-teal-50",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      priceColor: "text-teal-600"
    },
    {
      id: 2,
      title: "Social Media Scheduler",
      deployments: "32+",
      description: "Schedule and publish content across multiple social platforms.",
      price: "$29",
      badge: "Trending",
      badgeColor: "bg-green-100 text-green-800",
      gradient: "from-slate-50 to-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      priceColor: "text-blue-600"
    },
    {
      id: 3,
      title: "Lead Nurturing Emails",
      deployments: "28+",
      description: "Automated email sequences based on user behavior and interests.",
      price: "$39",
      badge: "Featured",
      badgeColor: "bg-blue-100 text-blue-800",
      gradient: "from-slate-50 to-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      priceColor: "text-purple-600"
    },
    {
      id: 4,
      title: "Inventory Alerts",
      deployments: "22+",
      description: "Monitor stock levels and send alerts when inventory runs low.",
      price: "$25",
      badge: "New",
      badgeColor: "bg-slate-100 text-slate-800",
      gradient: "from-slate-50 to-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      priceColor: "text-green-600"
    }
  ];

  // Create extended workflows array for infinite loop
  const extendedWorkflows = [
    ...workflows.slice(-2), // Last 2 slides at the beginning
    ...workflows,           // Original slides
    ...workflows.slice(0, 2) // First 2 slides at the end
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 4000); // Auto-advance every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle infinite loop transitions
  useEffect(() => {
    const maxIndex = workflows.length + 1; // +2 for cloned slides at end, -1 for 0-based index
    const minIndex = 2; // Starting position (after cloned slides at beginning)

    if (currentSlide > maxIndex) {
      // Reset to beginning (after cloned slides)
      setTimeout(() => {
        setCurrentSlide(2);
      }, 500); // Wait for transition to complete
    } else if (currentSlide < minIndex && currentSlide !== 2) {
      // Reset to end (before cloned slides)
      setTimeout(() => {
        setCurrentSlide(workflows.length + 1);
      }, 500); // Wait for transition to complete
    }
  }, [currentSlide, workflows.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false); // Stop auto-play when user interacts
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false); // Stop auto-play when user interacts
    setCurrentSlide((prev) => prev - 1);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false); // Stop auto-play when user interacts
    setCurrentSlide(index + 2); // +2 to account for cloned slides at beginning
  };

  // Demo data for different workflow types
  const demoData = [
    {
      title: "E-commerce Order Processing",
      description: "Transform your manual order handling into a seamless automated system",
      timeSaved: "20hrs/week",
      before: [
        "Manual order entry and verification",
        "Separate inventory updates",
        "Individual customer emails",
        "Manual shipping label creation"
      ],
      after: [
        "Automatic order processing",
        "Real-time inventory sync",
        "Instant customer notifications",
        "Automated shipping workflows"
      ],
      steps: [
        { title: "Order Received", description: "New order triggers workflow" },
        { title: "Inventory Check", description: "Verify product availability" },
        { title: "Payment Processing", description: "Secure payment validation" },
        { title: "Customer Notification", description: "Send confirmation email" },
        { title: "Shipping Label", description: "Generate and print label" }
      ]
    },
    {
      title: "Marketing Campaign Automation",
      description: "Streamline your marketing efforts with intelligent automation",
      timeSaved: "15hrs/week",
      before: [
        "Manual social media posting",
        "Individual email campaigns",
        "Separate analytics tracking",
        "Manual lead qualification"
      ],
      after: [
        "Scheduled multi-platform posts",
        "Automated email sequences",
        "Unified analytics dashboard",
        "Smart lead scoring system"
      ],
      steps: [
        { title: "Content Creation", description: "Prepare marketing content" },
        { title: "Multi-Platform Post", description: "Publish across channels" },
        { title: "Lead Capture", description: "Collect prospect information" },
        { title: "Email Sequence", description: "Send nurturing emails" },
        { title: "Analytics Update", description: "Track performance metrics" }
      ]
    },
    {
      title: "CRM Data Synchronization",
      description: "Keep your customer data perfectly synchronized across all platforms",
      timeSaved: "12hrs/week",
      before: [
        "Manual data entry across systems",
        "Inconsistent customer records",
        "Delayed follow-up actions",
        "Scattered contact information"
      ],
      after: [
        "Automatic data synchronization",
        "Unified customer profiles",
        "Instant follow-up triggers",
        "Centralized contact management"
      ],
      steps: [
        { title: "Data Collection", description: "Gather customer information" },
        { title: "Data Validation", description: "Verify and clean data" },
        { title: "CRM Update", description: "Sync to primary CRM" },
        { title: "Cross-Platform Sync", description: "Update all connected tools" },
        { title: "Trigger Actions", description: "Activate follow-up workflows" }
      ]
    }
  ];

  // Demo control functions
  const playDemo = () => {
    setIsPlaying(true);
  };

  const pauseDemo = () => {
    setIsPlaying(false);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setActiveStep(0);
  };

  // Auto-advance demo steps
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const maxSteps = demoData[currentDemo].steps.length;
        if (prev >= maxSteps - 1) {
          setIsPlaying(false);
          return maxSteps - 1;
        }
        return prev + 1;
      });
    }, 2000); // Advance every 2 seconds

    return () => clearInterval(interval);
  }, [isPlaying, currentDemo, demoData]);

  // Reset demo when switching demo types
  useEffect(() => {
    setActiveStep(0);
    setIsPlaying(false);
  }, [currentDemo]);

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Ready-Made Workflows",
      description: "Browse our library of pre-built n8n automation workflows for instant deployment"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Custom Solutions",
      description: "Request tailored automation workflows designed specifically for your business needs"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Quick Deployment",
      description: "Get your automation workflows up and running quickly with our streamlined process"
    }
  ];



  const stats = [
    { number: "150+", label: "Ready-Made Workflows" },
    { number: "500+", label: "Custom Automations Built" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "n8n Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile Optimized */}
      <section className="bg-gradient-to-br from-slate-50 to-teal-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 md:p-4 rounded-2xl">
                <Zap className="h-8 w-8 md:h-12 md:w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight">
              Smart Automation Solutions
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500 block mt-2">
                Powered by n8n
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Your central hub for ready-made automation workflows and custom solutions. 
              From marketing automation to data syncing, streamline your business with powerful n8n workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
              <Button 
                asChild 
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
              >
                <Link to="/custom-request">
                  Request Custom Workflow
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
              >
                <Link to="/workflows">Browse Ready-Made Workflows</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Workflows Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Mobile-first header layout */}
          <div className="text-center md:flex md:items-center md:justify-between mb-8">
            <div className="mb-6 md:mb-0 md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 md:mb-4">
                Popular Workflows
              </h2>
              <p className="text-base md:text-lg text-slate-600">
                Discover our most deployed n8n automation workflows
              </p>
            </div>
            <Button 
              asChild 
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 md:px-8 w-full md:w-auto"
            >
              <Link to="/workflows">
                Browse All Workflows
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Workflows Slider */}
          <div className="relative">
            {/* Left Arrow - Mobile Optimized */}
            <button
              onClick={prevSlide}
              className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-2 md:p-4 hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:shadow-2xl touch-manipulation"
              aria-label="Previous workflow"
            >
              <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-slate-700" />
            </button>

            {/* Right Arrow - Mobile Optimized */}
            <button
              onClick={nextSlide}
              className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-2 md:p-4 hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:shadow-2xl touch-manipulation"
              aria-label="Next workflow"
            >
              <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-slate-700" />
            </button>

            {/* Slider Container - Mobile Optimized */}
            <div className="overflow-hidden mx-6 md:mx-0">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (isMobile ? 100 : isTablet ? 50 : 100/3)}%)` 
                }}
              >
                {extendedWorkflows.map((workflow, index) => (
                  <div key={`${workflow.id}-${index}`} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-1 md:px-4">
                    <div className={`bg-gradient-to-br ${workflow.gradient} rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full mx-2 md:mx-0`}>
                      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
                        <div className={`${workflow.iconBg} p-2 md:p-3 rounded-lg md:rounded-xl shadow-sm flex-shrink-0`}>
                          <Zap className={`h-5 w-5 md:h-8 md:w-8 ${workflow.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base md:text-xl font-bold text-slate-900 mb-1 md:mb-2 leading-tight">{workflow.title}</h3>
                          <p className="text-xs md:text-sm text-slate-600 font-medium">{workflow.deployments} deployments</p>
                        </div>
                        <Badge className={`${workflow.badgeColor} px-2 md:px-3 py-1 text-xs font-semibold flex-shrink-0`}>{workflow.badge}</Badge>
                      </div>
                      <p className="text-sm md:text-base text-slate-700 mb-4 md:mb-6 leading-relaxed">
                        {workflow.description}
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <span className={`text-lg md:text-2xl font-bold ${workflow.priceColor} flex-shrink-0`}>{workflow.price}</span>
                        <Button 
                          size="sm" 
                          className="bg-white/80 hover:bg-white text-slate-700 border border-slate-300 hover:border-slate-400 transition-all duration-200 text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 flex-shrink-0"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {workflows.map((_, index) => {
                // Calculate the active indicator based on current slide position
                const isActive = (currentSlide - 2) % workflows.length === index || 
                                (currentSlide === index + 2);
                
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-600 shadow-lg' 
                        : 'bg-slate-300 hover:bg-slate-400 hover:scale-110'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple process to get your automation workflows deployed and running
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white">
                <CardHeader>
                  <div className="mx-auto mb-4 bg-teal-100 text-teal-600 p-3 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg"
              className="bg-slate-800 hover:bg-slate-900 text-white px-8"
            >
              <Link to="/custom-request">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>



      {/* Live Workflow Demo Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              See Automation in Action
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Watch how our n8n workflows transform manual processes into automated powerhouses
            </p>
          </div>

          {/* Demo Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {['E-commerce', 'Marketing', 'CRM'].map((demo, index) => (
                <button
                  key={demo}
                  onClick={() => setCurrentDemo(index)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                    currentDemo === index
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {demo} Demo
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Workflow Diagram */}
          <div className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-2xl p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Before/After Comparison */}
              <div className="space-y-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                    {demoData[currentDemo].title}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {demoData[currentDemo].description}
                  </p>
                </div>

                {/* Before */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <X className="h-4 w-4 mr-2" />
                    Before Automation
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {demoData[currentDemo].before.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    After Automation
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {demoData[currentDemo].after.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Animated Workflow Diagram */}
              <div className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4 text-center">
                    Workflow Steps
                  </h4>
                  
                  {/* Workflow Steps */}
                  <div className="space-y-4">
                    {demoData[currentDemo].steps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                          activeStep >= index 
                            ? 'bg-teal-600 text-white scale-110' 
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-medium transition-colors duration-300 ${
                            activeStep >= index ? 'text-slate-900' : 'text-slate-500'
                          }`}>
                            {step.title}
                          </div>
                          <div className={`text-xs transition-colors duration-300 ${
                            activeStep >= index ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            {step.description}
                          </div>
                        </div>
                        <div className={`transition-all duration-300 ${
                          activeStep >= index ? 'text-green-500 scale-110' : 'text-slate-300'
                        }`}>
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-teal-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${((activeStep + 1) / demoData[currentDemo].steps.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-2 text-xs text-slate-500">
                      Step {activeStep + 1} of {demoData[currentDemo].steps.length}
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg">
                  <div className="text-xs font-medium">Time Saved</div>
                  <div className="text-lg font-bold">{demoData[currentDemo].timeSaved}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Controls */}
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-4">
              <Button
                onClick={resetDemo}
                variant="outline"
                size="sm"
                className="border-slate-300"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Demo
              </Button>
              <Button
                onClick={isPlaying ? pauseDemo : playDemo}
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Play Demo
                  </>
                )}
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Link to="/workflows">
                  Try This Workflow
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-slate-300"
              >
                <Link to="/custom-request">
                  Request Custom Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <TrendingUp className="h-12 w-12 text-teal-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to automate your business?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that have streamlined their operations with our powerful n8n automation workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg"
            >
              <Link to="/custom-request">Request Custom Workflow</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 text-lg"
            >
              <Link to="/workflows">Browse Workflows</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;