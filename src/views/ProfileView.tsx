import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Award,
  BarChart,
  Calendar,
  Clock,
  Edit,
  Camera
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'settings'>('profile');
  
  // Mock user data
  const userData = {
    name: 'Abhi ',
    email: 'Abhi.jha@example.com',
    joinDate: 'feb 15, 2025',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    level: 'Intermediate',
    streak: 15,
    totalPracticeTime: '32h 45m',
    badges: [
      { id: 1, name: 'Early Adopter', icon: 'Award', date: 'fev 15, 2025' },
      { id: 2, name: '7-Day Streak', icon: 'Award', date: 'feb 22, 2025' },
      { id: 3, name: 'Quiz Master', icon: 'Award', date: 'feb 5, 2025' },
      { id: 4, name: 'Conversation Pro', icon: 'Award', date: 'feb 18, 2025' },
    ],
    stats: {
      accuracy: 87,
      lessonsCompleted: 24,
      practiceSessionsCompleted: 42,
      wordsLearned: 156,
      weeklyActivity: [65, 80, 90, 75, 85, 95, 70],
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 text-center border-b border-gray-100 dark:border-gray-700">
          <div className="relative inline-block">
            <img 
              src={userData.avatar} 
              alt={userData.name} 
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full">
              <Camera size={14} />
            </button>
          </div>
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{userData.email}</p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
            {userData.level}
          </div>
        </div>
        
        <div className="p-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
              activeTab === 'profile' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          
          <button
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
              activeTab === 'stats' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BarChart size={18} />
            <span>Statistics</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
              activeTab === 'settings' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
          
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Information</h2>
                <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name</div>
                  <div>{userData.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</div>
                  <div>{userData.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Member Since</div>
                  <div>{userData.joinDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Level</div>
                  <div>{userData.level}</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                  <Calendar size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userData.streak}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Day Streak</div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                  <Clock size={24} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userData.totalPracticeTime}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Practice Time</div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                  <Award size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userData.badges.length}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Badges Earned</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Badges & Achievements</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userData.badges.map(badge => (
                  <div key={badge.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="font-medium mb-1">{badge.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{badge.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Learning Statistics</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {userData.stats.accuracy}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Average Accuracy</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {userData.stats.lessonsCompleted}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Lessons Completed</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {userData.stats.practiceSessionsCompleted}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Practice Sessions</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                    {userData.stats.wordsLearned}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Words Learned</div>
                </div>
              </div>
              
              <h3 className="font-semibold mb-4">Weekly Activity</h3>
              <div className="h-40 flex items-end justify-between">
                {userData.stats.weeklyActivity.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-blue-500 dark:bg-blue-600 rounded-t-md" 
                      style={{ height: `${value}%` }}
                    ></div>
                    <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Learning Progress</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">American Sign Language (ASL)</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">British Sign Language (BSL)</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Finger Spelling</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Notifications</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="emailNotifications" 
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      defaultChecked
                    />
                    <label htmlFor="emailNotifications" className="ml-2 text-sm">
                      Receive email notifications for important updates
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Learning Reminders</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="learningReminders" 
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      defaultChecked
                    />
                    <label htmlFor="learningReminders" className="ml-2 text-sm">
                      Send daily reminders to practice
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Japanese</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Default Sign Language</label>
                  <select className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                    <option>American Sign Language (ASL)</option>
                    <option>British Sign Language (BSL)</option>
                    <option>Auslan</option>
                    <option>Indian Sign Language (ISL)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">App Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="lightTheme" 
                        name="theme" 
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <label htmlFor="lightTheme" className="ml-2 text-sm">Light</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="darkTheme" 
                        name="theme" 
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="darkTheme" className="ml-2 text-sm">Dark</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="systemTheme" 
                        name="theme" 
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="systemTheme" className="ml-2 text-sm">System</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Camera Access</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="cameraAccess" 
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      defaultChecked
                    />
                    <label htmlFor="cameraAccess" className="ml-2 text-sm">
                      Allow camera access for sign language detection
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Microphone Access</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="microphoneAccess" 
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      defaultChecked
                    />
                    <label htmlFor="microphoneAccess" className="ml-2 text-sm">
                      Allow microphone access for voice commands
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Data Usage</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="dataUsage" 
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      defaultChecked
                    />
                    <label htmlFor="dataUsage" className="ml-2 text-sm">
                      Help improve the app by sharing anonymous usage data
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Help & Support</h2>
              
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center">
                    <HelpCircle size={18} className="mr-3 text-blue-600 dark:text-blue-400" />
                    <span>FAQs & Tutorials</span>
                  </div>
                  <span>→</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center">
                    <Bell size={18} className="mr-3 text-blue-600 dark:text-blue-400" />
                    <span>Contact Support</span>
                  </div>
                  <span>→</span>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center">
                    <Shield size={18} className="mr-3 text-blue-600 dark:text-blue-400" />
                    <span>Privacy Policy</span>
                  </div>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};