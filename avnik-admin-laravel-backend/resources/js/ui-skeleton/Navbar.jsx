import React from 'react';

export default function Navbar({ currentUser, onToggleSidebar, onSearch }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <button aria-label="Toggle menu" onClick={onToggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <a href="/" className="font-semibold text-lg">Avnik</a>
          </div>

          <div className="flex-1 px-4">
            <input
              aria-label="Search"
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none"
              placeholder="Search events, locations..."
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm px-3 py-2 rounded-md hover:bg-gray-100">Create</button>
            <div className="flex items-center gap-2">
              <img src={currentUser?.avatarUrl || '/assets/images/default-avatar.png'} alt="avatar" className="w-8 h-8 rounded-full" />
              <span className="text-sm hidden sm:block">{currentUser?.name || 'Guest'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
