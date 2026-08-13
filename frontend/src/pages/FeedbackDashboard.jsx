import React, { useState, useEffect } from 'react';
import { BarChart, TrendingUp, Users, MapPin, Star, MessageSquare, Brain, AlertTriangle, CheckCircle, Info, Smile, Frown, Meh } from 'lucide-react';
import { getFeedbackStats, getAllFeedback, getFeedbackByLocation } from '../api/api';

// Sentiment display component (copied from FeedbackForm)
const SentimentDisplay = ({ fieldName, analysis }) => {
  if (!analysis || analysis.error) return null;

  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return <Smile size={16} className="text-green-500" />;
      case 'negative': return <Frown size={16} className="text-red-500" />;
      case 'neutral': return <Meh size={16} className="text-yellow-500" />;
      default: return <Brain size={16} className="text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'bg-green-100 text-green-700 border-green-200';
      case 'negative': return 'bg-red-100 text-red-700 border-red-200';
      case 'neutral': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`mt-2 p-3 rounded-lg border ${getSentimentColor(analysis.sentiment)}`}>
      <div className="flex items-center gap-2 mb-2">
        {getSentimentIcon(analysis.sentiment)}
        <span className="text-sm font-medium capitalize">
          {analysis.sentiment} Sentiment
        </span>
        <span className="text-xs opacity-75">
          ({Math.round(analysis.confidence * 100)}% confident)
        </span>
      </div>
      {analysis.emotions && analysis.emotions.length > 0 && (
        <div className="text-xs mb-1">
          <span className="font-medium">Emotions detected:</span> {analysis.emotions.join(', ')}
        </div>
      )}
      {analysis.key_phrases && analysis.key_phrases.length > 0 && (
        <div className="text-xs">
          <span className="font-medium">Key phrases:</span> {analysis.key_phrases.join(', ')}
        </div>
      )}
      {analysis.reasoning && (
        <div className="text-xs mt-1 italic">
          {analysis.reasoning}
        </div>
      )}
    </div>
  );
};

const FeedbackDashboard = () => {
  const [stats, setStats] = useState(null);
  const [allFeedback, setAllFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isReprocessing, setIsReprocessing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const reprocessSentiment = async () => {
    try {
      setIsReprocessing(true);
      console.log('🔄 Starting sentiment reprocessing...');
      
      const response = await fetch('http://localhost:3000/api/feedback/reprocess-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Sentiment reprocessing completed:', result);
        alert(`Sentiment analysis updated for ${result.updatedCount} feedback entries!`);
        // Reload dashboard data to show updated sentiment
        await loadDashboardData();
      } else {
        console.error('❌ Sentiment reprocessing failed:', result);
        alert('Failed to reprocess sentiment analysis');
      }
    } catch (error) {
      console.error('💥 Error reprocessing sentiment:', error);
      alert('Error occurred while reprocessing sentiment analysis');
    } finally {
      setIsReprocessing(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('🔄 Loading dashboard data...');
      
      const [statsData, feedbackData] = await Promise.all([
        getFeedbackStats().catch(err => {
          console.error('Stats API error:', err);
          return { success: false, error: err.message };
        }),
        getAllFeedback().catch(err => {
          console.error('Feedback API error:', err);
          return { success: false, error: err.message };
        })
      ]);
      
      console.log('📊 Stats data received:', statsData);
      console.log('📋 Feedback data received:', feedbackData);
      
      if (statsData.success) {
        console.log('✅ Stats data loaded successfully:', {
          total: statsData.stats.total,
          sentimentDistribution: statsData.stats.sentimentDistribution,
          averageRatings: statsData.stats.averageRatings
        });
        setStats(statsData.stats);
      } else {
        console.error('❌ Failed to load stats:', statsData);
        // Set default stats if API fails
        setStats({
          total: 0,
          averageRatings: {
            cleanliness: '0.0',
            staffBehavior: '0.0',
            information: '0.0',
            signage: '0.0',
            safety: '0.0',
            overall: '0.0'
          },
          sentimentDistribution: {
            positive: 0,
            negative: 0,
            neutral: 0
          },
          byLocation: {},
          priorityDistribution: {
            high: 0,
            medium: 0,
            low: 0
          }
        });
      }
      
      if (feedbackData.success) {
        console.log('✅ Feedback data loaded successfully:', {
          count: feedbackData.feedback?.length || 0,
          sampleSentiment: feedbackData.feedback?.[0]?.sentimentAnalysis?.combinedAnalysis?.sentiment || 'none'
        });
        setAllFeedback(feedbackData.feedback || []);
      } else {
        console.error('❌ Failed to load feedback:', feedbackData);
        setAllFeedback([]);
      }
    } catch (err) {
      console.error('💥 Error loading dashboard data:', err);
      setError(`Failed to load dashboard data: ${err.message}`);
      // Set default empty data
      setStats({
        total: 0,
        averageRatings: { overall: '0.0' },
        sentimentDistribution: { positive: 0, negative: 0, neutral: 0 },
        byLocation: {},
        priorityDistribution: { high: 0, medium: 0, low: 0 }
      });
      setAllFeedback([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationFilter = async (location) => {
    if (location === selectedLocation) {
      setSelectedLocation('');
      loadDashboardData(); // Load all feedback
      return;
    }

    try {
      setSelectedLocation(location);
      const locationData = await getFeedbackByLocation(location);
      if (locationData.success) {
        setAllFeedback(locationData.feedback);
      }
    } catch (err) {
      console.error('Error filtering by location:', err);
      setError('Failed to filter feedback');
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Very Good': return 'text-blue-600 bg-blue-100';
      case 'Average': return 'text-yellow-600 bg-yellow-100';
      case 'Poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentColor = (sentiment) => {
    if (!sentiment) return 'text-gray-600 bg-gray-100';
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'warning':
      case 'urgent':
      case 'concern':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'positive':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'improvement':
      case 'info':
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };

  const getInsightColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <MessageSquare size={48} className="mx-auto" />
          </div>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <div className="mb-4 bg-orange-100 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-orange-600" />
            <span className="text-orange-800 font-medium">Admin Dashboard</span>
            <span className="text-orange-600">•</span>
            <span className="text-orange-700 text-sm">Restricted Access</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <BarChart size={32} className="text-orange-500" />
                Feedback Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Jharkhand Tourism Visitor Feedback Analytics</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={reprocessSentiment}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                disabled={isReprocessing}
              >
                <Brain size={16} />
                {isReprocessing ? 'Processing...' : 'Fix Sentiment Data'}
              </button>
              <button
                onClick={loadDashboardData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                <TrendingUp size={16} />
                {loading ? 'Refreshing...' : 'Refresh Data'}
              </button>
              {stats && (
                <div className="text-sm text-gray-600">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>

        

        {/* Statistics Cards */}
        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Feedback</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                  </div>
                  <Users className="text-orange-500" size={32} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Locations</p>
                    <p className="text-2xl font-bold text-gray-800">{Object.keys(stats.byLocation).length}</p>
                  </div>
                  <MapPin className="text-orange-500" size={32} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.averageRatings.overall}/4</p>
                  </div>
                  <Star className="text-orange-500" size={32} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Positive Sentiment</p>
                    <p className="text-2xl font-bold text-green-600">{stats.sentimentDistribution.positive}</p>
                    <p className="text-xs text-gray-500">
                      {stats.total > 0 ? Math.round((stats.sentimentDistribution.positive / stats.total) * 100) : 0}% of total
                    </p>
                  </div>
                  <Smile className="text-green-500" size={32} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Recommendation Score</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.recommendationScore}%</p>
                  </div>
                  <Brain className="text-blue-500" size={32} />
                </div>
              </div>
            </div>

            {/* Enhanced Sentiment Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Smile className="text-green-600" size={24} />
                    <h3 className="text-lg font-semibold text-green-800">Positive Feedback</h3>
                  </div>
                  <span className="text-3xl font-bold text-green-600">{stats.sentimentDistribution.positive}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Percentage</span>
                    <span className="font-medium text-green-800">
                      {stats.total > 0 ? Math.round((stats.sentimentDistribution.positive / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${stats.total > 0 ? (stats.sentimentDistribution.positive / stats.total) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-md border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Meh className="text-yellow-600" size={24} />
                    <h3 className="text-lg font-semibold text-yellow-800">Neutral Feedback</h3>
                  </div>
                  <span className="text-3xl font-bold text-yellow-600">{stats.sentimentDistribution.neutral}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-700">Percentage</span>
                    <span className="font-medium text-yellow-800">
                      {stats.total > 0 ? Math.round((stats.sentimentDistribution.neutral / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-yellow-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${stats.total > 0 ? (stats.sentimentDistribution.neutral / stats.total) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-md border border-red-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Frown className="text-red-600" size={24} />
                    <h3 className="text-lg font-semibold text-red-800">Negative Feedback</h3>
                  </div>
                  <span className="text-3xl font-bold text-red-600">{stats.sentimentDistribution.negative}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-700">Percentage</span>
                    <span className="font-medium text-red-800">
                      {stats.total > 0 ? Math.round((stats.sentimentDistribution.negative / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-red-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${stats.total > 0 ? (stats.sentimentDistribution.negative / stats.total) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            {stats.insights && stats.insights.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="text-blue-500" size={20} />
                  AI-Powered Insights
                </h2>
                <div className="space-y-3">
                  {stats.insights.map((insight, index) => (
                    <div key={index} className={`p-3 rounded border ${getInsightColor(insight.priority)}`}>
                      <div className="flex items-start gap-2">
                        {getInsightIcon(insight.type)}
                        <p className="text-sm">{insight.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Sentiment & Emotion Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="text-blue-500" size={20} />
                  Sentiment Distribution Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smile className="text-green-500" size={16} />
                      <span className="text-green-600 font-medium">Positive</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full transition-all duration-700" 
                          style={{ 
                            width: `${stats.total > 0 ? (stats.sentimentDistribution.positive / stats.total) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                      <span className="font-bold text-green-600 w-12 text-right">{stats.sentimentDistribution.positive}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Meh className="text-yellow-500" size={16} />
                      <span className="text-yellow-600 font-medium">Neutral</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-yellow-500 h-3 rounded-full transition-all duration-700" 
                          style={{ 
                            width: `${stats.total > 0 ? (stats.sentimentDistribution.neutral / stats.total) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                      <span className="font-bold text-yellow-600 w-12 text-right">{stats.sentimentDistribution.neutral}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Frown className="text-red-500" size={16} />
                      <span className="text-red-600 font-medium">Negative</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-red-500 h-3 rounded-full transition-all duration-700" 
                          style={{ 
                            width: `${stats.total > 0 ? (stats.sentimentDistribution.negative / stats.total) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                      <span className="font-bold text-red-600 w-12 text-right">{stats.sentimentDistribution.negative}</span>
                    </div>
                  </div>
                </div>
                
                {/* Overall Sentiment Health Score */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-800 font-medium">Overall Sentiment Health</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {stats.total > 0 ? Math.round(((stats.sentimentDistribution.positive * 100) + (stats.sentimentDistribution.neutral * 50)) / stats.total) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ 
                        width: `${stats.total > 0 ? ((stats.sentimentDistribution.positive * 100) + (stats.sentimentDistribution.neutral * 50)) / stats.total : 0}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Based on positive (100%) + neutral (50%) sentiment scores
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="text-purple-500" size={20} />
                  Top Emotions Detected
                </h3>
                {stats.emotionalInsights && stats.emotionalInsights.topEmotions && stats.emotionalInsights.topEmotions.length > 0 ? (
                  <div className="space-y-3">
                    {stats.emotionalInsights.topEmotions.slice(0, 8).map((emotion, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                          <span className="capitalize font-medium text-gray-700">{emotion.item}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" 
                              style={{ 
                                width: `${(emotion.count / Math.max(...stats.emotionalInsights.topEmotions.map(e => e.count))) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-gray-600 text-sm font-medium w-8 text-right">{emotion.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto mb-3 text-gray-300" size={48} />
                    <p className="text-gray-500 text-sm">No emotion data available</p>
                    <p className="text-gray-400 text-xs mt-1">Submit more feedback to see emotion analysis</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Location Filter */}
        {stats && Object.keys(stats.byLocation).length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">Filter by Location</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.byLocation).map(([location, count]) => (
                <button
                  key={location}
                  onClick={() => handleLocationFilter(location)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    selectedLocation === location
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {location} ({count})
                </button>
              ))}
              {selectedLocation && (
                <button
                  onClick={() => handleLocationFilter('')}
                  className="px-4 py-2 rounded-full text-sm bg-red-500 text-white hover:bg-red-600"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        )}

        {/* Feedback List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">
              Recent Feedback {selectedLocation && `- ${selectedLocation}`}
            </h2>
            <p className="text-gray-600 text-sm">
              {allFeedback.length} feedback entries
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {allFeedback.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No feedback available</p>
              </div>
            ) : (
              allFeedback.map((feedback) => (
                <div key={feedback.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{feedback.personalInfo.name}</h3>
                      <p className="text-gray-600 text-sm">{feedback.personalInfo.email}</p>
                      <p className="text-gray-600 text-sm">📍 {feedback.visitInfo.locationVisited}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm">
                        {new Date(feedback.timestamp).toLocaleDateString()}
                      </p>
                      {/* Enhanced Sentiment Badge */}
                      {feedback.sentimentAnalysis && feedback.sentimentAnalysis.combinedAnalysis && (
                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium mt-2 ${getSentimentColor(feedback.sentimentAnalysis.combinedAnalysis.sentiment)}`}>
                          {feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'positive' && <Smile size={16} />}
                          {feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'neutral' && <Meh size={16} />}
                          {feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'negative' && <Frown size={16} />}
                          <span className="capitalize">{feedback.sentimentAnalysis.combinedAnalysis.sentiment}</span>
                          <span className="text-xs opacity-75">
                            {Math.round(feedback.sentimentAnalysis.combinedAnalysis.confidence * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    {Object.entries(feedback.ratings).map(([category, rating]) => (
                      <div key={category} className="text-center">
                        <p className="text-xs text-gray-500 capitalize">{category}</p>
                        <span className={`px-2 py-1 rounded text-xs ${getRatingColor(rating)}`}>
                          {rating}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Overall Experience</h4>
                      <p className="text-gray-700 text-sm mb-3">{feedback.feedback.overallExperience}</p>
                      
                      {/* Enhanced Sentiment Analysis Display */}
                      {feedback.sentimentAnalysis && feedback.sentimentAnalysis.combinedAnalysis && (
                        <div className={`p-4 rounded-lg border-2 ${
                          feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'positive' 
                            ? 'bg-green-50 border-green-200' 
                            : feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'negative'
                            ? 'bg-red-50 border-red-200'
                            : 'bg-yellow-50 border-yellow-200'
                        }`}>
                          <div className="flex items-center gap-2 mb-3">
                            <Brain size={18} className="text-blue-600" />
                            <span className="text-sm font-semibold text-gray-800">AI Sentiment Analysis</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Sentiment Score */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                {feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'positive' && <Smile size={16} className="text-green-600" />}
                                {feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'neutral' && <Meh size={16} className="text-yellow-600" />}
                                {feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'negative' && <Frown size={16} className="text-red-600" />}
                                <span className={`text-sm font-medium capitalize ${
                                  feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'positive' 
                                    ? 'text-green-700' 
                                    : feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'negative'
                                    ? 'text-red-700'
                                    : 'text-yellow-700'
                                }`}>
                                  {feedback.sentimentAnalysis.combinedAnalysis.sentiment} Sentiment
                                </span>
                                <span className="text-xs text-gray-600">
                                  ({Math.round(feedback.sentimentAnalysis.combinedAnalysis.confidence * 100)}% confidence)
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${
                                    feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'positive' 
                                      ? 'bg-green-500' 
                                      : feedback.sentimentAnalysis.combinedAnalysis.sentiment === 'negative'
                                      ? 'bg-red-500'
                                      : 'bg-yellow-500'
                                  }`}
                                  style={{ width: `${feedback.sentimentAnalysis.combinedAnalysis.confidence * 100}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Emotions */}
                            {feedback.sentimentAnalysis.combinedAnalysis.emotions && feedback.sentimentAnalysis.combinedAnalysis.emotions.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-gray-700 mb-1">Detected Emotions</p>
                                <div className="flex flex-wrap gap-1">
                                  {feedback.sentimentAnalysis.combinedAnalysis.emotions.slice(0, 4).map((emotion, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                      {emotion}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Key Phrases */}
                          {feedback.sentimentAnalysis.combinedAnalysis.key_phrases && feedback.sentimentAnalysis.combinedAnalysis.key_phrases.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-700 mb-1">Key Phrases</p>
                              <div className="flex flex-wrap gap-1">
                                {feedback.sentimentAnalysis.combinedAnalysis.key_phrases.slice(0, 6).map((phrase, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                    "{phrase}"
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* AI Reasoning */}
                          {feedback.sentimentAnalysis.combinedAnalysis.reasoning && (
                            <div className="mt-3 p-2 bg-white rounded border-l-4 border-blue-400">
                              <p className="text-xs text-gray-600 italic">
                                <span className="font-medium">AI Insight:</span> {feedback.sentimentAnalysis.combinedAnalysis.reasoning}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {feedback.feedback.suggestions && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Suggestions</h4>
                        <p className="text-gray-600 text-sm">{feedback.feedback.suggestions}</p>
                      </div>
                    )}
                    
                    {feedback.analytics && (
                      <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-500">
                        <span>📊 Recommendation Score: {feedback.analytics.recommendationScore}%</span>
                        <span>📝 Words: {feedback.analytics.totalWords}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
