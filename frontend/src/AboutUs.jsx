import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const AboutUs = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Productivity enthusiast with 10+ years in task management solutions',
      avatar: '👨‍💼',
      funFact: 'Can solve a Rubik\'s cube in under 2 minutes'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Lead Developer',
      bio: 'Full-stack developer passionate about intuitive user experiences',
      avatar: '👩‍💻',
      funFact: 'Competitive chess player'
    },
    {
      id: 3,
      name: 'Miguel Rodriguez',
      role: 'UX Designer',
      bio: 'Specializes in creating frictionless productivity workflows',
      avatar: '🧑‍🎨',
      funFact: 'Collects vintage typewriters'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support Availability' },
    { value: '2020', label: 'Founded In' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-white to-[#FFEDED] py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-[#AC2898] to-[#421B41] bg-clip-text text-transparent">TaskTrail</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing task management with intuitive tools that help individuals and teams achieve more with less stress.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
              <div className="space-y-6 text-gray-700">
                <p>
                  TaskTrail began in 2020 when our founder, Alex, grew frustrated with existing task managers that either oversimplified or overcomplicated productivity. What started as a side project quickly grew into a mission to create the perfect balance of power and simplicity.
                </p>
                <p>
                  Today, we serve thousands of users worldwide, from solo entrepreneurs to teams at Fortune 500 companies. Our philosophy remains the same: productivity tools should adapt to you, not the other way around.
                </p>
                <div className="bg-[#FFEDED] p-6 rounded-lg border-l-4 border-[#AC2898]">
                  <p className="font-medium italic">
                    "We believe technology should solve problems, not create them. That's why every feature in TaskTrail is designed with intention."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gradient-to-r from-[#421B41] to-[#AC2898] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet The Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map(member => (
                <div key={member.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-[#AC2898] mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="bg-[#FFEDED] p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Fun fact:</span> {member.funFact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already achieving more with TaskTrail.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-gradient-to-r from-[#421B41] to-[#AC2898] text-white font-medium rounded-full hover:shadow-lg transition-all"
            >
              Get Started Free
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;