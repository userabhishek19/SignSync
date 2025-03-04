import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { TranslatorView } from './views/TranslatorView';
import { LearningView } from './views/LearningView';
import { ChatView } from './views/ChatView';
import { ProfileView } from './views/ProfileView';

function App() {
  const [currentView, setCurrentView] = useState<'translator' | 'learning' | 'chat' | 'profile'>('translator');

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === 'translator' && <TranslatorView />}
      {currentView === 'learning' && <LearningView />}
      {currentView === 'chat' && <ChatView />}
      {currentView === 'profile' && <ProfileView />}
    </Layout>
  );
}

export default App;