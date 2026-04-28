"use client";

import { useState } from "react";
import { 
  TrendingUp,
  User,
  MapPin,
  Globe,
  Share2,
  Check
} from "lucide-react";

interface ProfileTaskbarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  profileData?: {
    title: string;
    category?: string;
    location?: string;
    website?: string;
    description?: string;
    memberSince?: string;
    logo?: string;
  };
}

export function ProfileTaskbar({ activeSection = "overview", onSectionChange, profileData }: ProfileTaskbarProps) {
  const [activeTab, setActiveTab] = useState(activeSection);
  const [copied, setCopied] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onSectionChange?.(tab);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const mainTabs = [
    { id: "overview", label: "Overview", icon: User },
  ];


  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      {profileData && (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-6 flex-1">
              {/* Logo */}
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                {profileData.logo ? (
                  <img src={profileData.logo} alt={profileData.title} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white text-3xl font-bold">{profileData.title.charAt(0)}</span>
                )}
              </div>
              
              {/* Company Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-1">{profileData.title}</h1>
                {profileData.category && <p className="text-sm text-slate-600 mb-3">{profileData.category}</p>}
                
                <div className="space-y-2 text-sm text-slate-600">
                  {profileData.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.location}</span>
                    </div>
                  )}
                  {profileData.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <a href={profileData.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{profileData.website}</a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button 
                onClick={handleCopyLink}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  copied 
                    ? 'bg-green-50 border-green-200 text-green-600' 
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
                title={copied ? 'Link copied!' : 'Copy link'}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Share</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 border-b border-slate-200">
            <nav className="flex space-x-8">
              {mainTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                      flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200
                      ${isActive 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Activity Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          Activity
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Points this month</span>
            <span className="text-lg font-semibold text-blue-600">1,234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total points</span>
            <span className="text-lg font-semibold text-gray-900">15,678</span>
          </div>
        </div>
      </div>


      {/* Full Biography */}
      {profileData?.description && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Full Biography</h3>
          <div 
            className="text-sm text-gray-600 leading-relaxed prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: profileData.description }}
          />
        </div>
      )}

    </div>
  );
}
