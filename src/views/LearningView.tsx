import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Search,
  Star,
  StarHalf,
  CheckCircle,
  Award,
  BarChart
} from 'lucide-react';

export const LearningView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'dictionary'>('learn');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for lessons
  const lessons = [
    { 
      id: 1, 
      title: 'Basic Greetings', 
      level: 'Beginner', 
      duration: '10 min',
      progress: 100,
      image: 'https://images.unsplash.com/photo-1516239482977-b550ba7253f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 2, 
      title: 'Numbers 1-10', 
      level: 'Beginner', 
      duration: '15 min',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 3, 
      title: 'Common Questions', 
      level: 'Beginner', 
      duration: '20 min',
      progress: 30,
      image: 'https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 4, 
      title: 'Family Members', 
      level: 'Intermediate', 
      duration: '25 min',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 5, 
      title: 'Everyday Objects', 
      level: 'Intermediate', 
      duration: '30 min',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
  ];
  
  // Mock data for practice exercises
  const practiceExercises = [
    { id: 1, title: 'Greetings Quiz', difficulty: 'Easy', questions: 10, bestScore: '9/10' },
    { id: 2, title: 'Numbers Recognition', difficulty: 'Easy', questions: 15, bestScore: '12/15' },
    { id: 3, title: 'Conversation Practice', difficulty: 'Medium', questions: 20, bestScore: 'Not attempted' },
    { id: 4, title: 'Finger Spelling', difficulty: 'Hard', questions: 25, bestScore: 'Not attempted' },
  ];
  
  // Mock data for dictionary
  const dictionaryItems = [
    { word: 'Hello', category: 'Greetings' },
    { word: 'Thank you', category: 'Greetings' },
    { word: 'Please', category: 'Common Phrases' },
    { word: 'Yes', category: 'Common Phrases' },
    { word: 'No', category: 'Common Phrases' },
    { word: 'Help', category: 'Emergency' },
    { word: 'Water', category: 'Food & Drink' },
    { word: 'Food', category: 'Food & Drink' },
    { word: 'Family', category: 'Relationships' },
    { word: 'Friend', category: 'Relationships' },
    { word: 'Work', category: 'Activities' },
    { word: 'School', category: 'Activities' },
  ];
  
  const filteredDictionary = dictionaryItems.filter(item => 
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('learn')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'learn' 
              ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Learn
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'practice' 
              ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Practice
        </button>
        <button
          onClick={() => setActiveTab('dictionary')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'dictionary' 
              ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Dictionary
        </button>
      </div>
      
      {/* Learn Tab */}
      {activeTab === 'learn' && (
        <div className="space-y-6">
          {/* User Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Your Learning Journey</h2>
                <p className="text-gray-600 dark:text-gray-400">Continue where you left off</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Lessons<br/>Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">42%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Overall<br/>Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">5</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Day<br/>Streak</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured Lesson */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Featured Lesson" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="mb-2">
                <span className="px-2 py-1 bg-blue-600 rounded-full text-xs font-medium">Recommended</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Conversational ASL: Everyday Phrases</h3>
              <p className="mb-4">Master common phrases used in everyday conversations</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 w-fit">
                <Play size={16} />
                <span>Start Learning</span>
              </button>
            </div>
          </div>
          
          {/* Lessons List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Continue Learning</h3>
              <div className="flex space-x-2">
                <button className="p-1 rounded-full border border-gray-200 dark:border-gray-700">
                  <ChevronLeft size={18} />
                </button>
                <button className="p-1 rounded-full border border-gray-200 dark:border-gray-700">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lessons.map(lesson => (
                <div key={lesson.id} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                  <div className="relative h-40">
                    <img 
                      src={lesson.image} 
                      alt={lesson.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      {lesson.duration}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{lesson.title}</h4>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                        {lesson.level}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${lesson.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>{lesson.progress}% complete</span>
                        {lesson.progress === 100 && <span>✓ Completed</span>}
                      </div>
                    </div>
                    
                    <button className="w-full py-2 bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg font-medium flex items-center justify-center space-x-1">
                      <Play size={16} />
                      <span>{lesson.progress > 0 ? 'Continue' : 'Start'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Practice Tab */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Practice Your Skills</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Test your knowledge with interactive exercises and quizzes
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {practiceExercises.map(exercise => (
                <div 
                  key={exercise.id} 
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">{exercise.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      exercise.difficulty === 'Easy' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                        : exercise.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{exercise.questions} questions</span>
                    <span className="mx-2">•</span>
                    <span>Best score: {exercise.bestScore}</span>
                  </div>
                  
                  <button className="w-full py-2 bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg font-medium">
                    Start Practice
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-6 flex-1">
                <h3 className="text-xl font-bold mb-2">Ready for a Challenge?</h3>
                <p className="mb-4">
                  Test your skills with our weekly challenge. Complete it to earn special badges and track your progress.
                </p>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium">
                  Take Weekly Challenge
                </button>
              </div>
              
              <div className="flex-shrink-0 flex items-center justify-center w-32 h-32 bg-white/20 rounded-full">
                <Award size={64} className="text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Your Progress Stats</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">87%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Average Accuracy</div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">12</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Exercises Completed</div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">5</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Badges Earned</div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button className="text-blue-600 dark:text-blue-400 flex items-center space-x-1">
                <BarChart size={16} />
                <span>View Detailed Statistics</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Dictionary Tab */}
      {activeTab === 'dictionary' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Sign Language Dictionary</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Search for words and phrases to see how they are signed
            </p>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for a word or phrase..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDictionary.map((item, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{item.word}</h4>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-center my-4">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <BookOpen size={32} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <button className="w-full py-2 bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg font-medium">
                    View Sign
                  </button>
                </div>
              ))}
            </div>
            
            {filteredDictionary.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Search size={48} className="mx-auto mb-4 opacity-50" />
                <p>No results found for "{searchTerm}"</p>
                <p className="text-sm mt-2">Try a different search term or browse the categories</p>
              </div>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Greetings', 'Numbers', 'Colors', 'Family', 'Food & Drink', 'Weather', 'Time', 'Emergency'].map((category, index) => (
                <button 
                  key={index}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl text-center hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};