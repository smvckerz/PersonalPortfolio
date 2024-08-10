import React, { useState } from 'react';
import Home from './Home';
import About from './About';
import Projects from './Projects';

function Tabs() {
    const [activeTab, setActiveTab] = useState('home');

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <Home />;
            case 'about':
                return <About />;
            case 'projects':
                return <Projects />;
            default:
                return <Home />;
        }
    };

    return (
        <div>
            <div className="tabs">
                <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'active' : ''}>
                    Home
                </button>
                <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>
                    About
                </button>
                <button onClick={() => setActiveTab('projects')} className={activeTab === 'projects' ? 'active' : ''}>
                    Projects
                </button>
            </div>
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Tabs;
