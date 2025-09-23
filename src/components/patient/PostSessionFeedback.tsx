import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, Star, TrendingUp, Calendar, Send } from 'lucide-react';
import { useState } from 'react';

export const PostSessionFeedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState(null);

  const previousFeedback = [
    {
      date: '15 November, 2024',
      session: 'Abhyanga Massage',
      rating: 5,
      feedback: 'Excellent session! Felt very relaxed and energized.',
      practitioner: 'Dr. Suresh Kumar'
    },
    {
      date: '12 November, 2024',
      session: 'Shirodhara',
      rating: 4,
      feedback: 'Good experience, though room was cold initially.',
      practitioner: 'Dr. Rekha Sharma'
    },
    {
      date: '10 November, 2024',
      session: 'Udvartana',
      rating: 5,
      feedback: 'Amazing detox experience. Would definitely recommend.',
      practitioner: 'Dr. Suresh Kumar'
    }
  ];

  const upcomingSession = {
    therapy: 'Shirodhara',
    date: 'Tomorrow, 2:00 PM',
    practitioner: 'Dr. Suresh Kumar'
  };

  const feedbackStats = {
    averageRating: 4.7,
    totalSessions: 8,
    completedFeedbacks: 6
  };

  const renderStars = (currentRating, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={index}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            starValue <= currentRating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
          }`}
          onClick={interactive ? () => setRating(starValue) : undefined}
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          aria-label={`${starValue} star`}
        />
      );
    });
  };

  async function submitFeedback() {
    if (rating === 0) return;
    setIsSubmitting(true);

    // Simulate submitting feedback to backend + ML model training
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Save new feedback locally for demo (replace with actual backend call)
    const newFeedback = {
      date: new Date().toLocaleDateString(),
      session: upcomingSession.therapy,
      rating,
      feedback,
      practitioner: upcomingSession.practitioner,
    };

    setSubmittedFeedback(newFeedback);
    setRating(0);
    setFeedback('');
    setIsSubmitting(false);

    // Optional: trigger ML model training update here with new feedback
    console.log('Feedback submitted:', newFeedback);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Post-Session Feedback</h1>
          <p className="text-muted-foreground">Share your therapy experience</p>
        </div>
      </div>

      {/* Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{feedbackStats.averageRating}</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="healing-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{feedbackStats.totalSessions}</p>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-primary to-primary-glow w-12 h-12 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round((feedbackStats.completedFeedbacks / feedbackStats.totalSessions) * 100)}%</p>
                <p className="text-sm text-muted-foreground">Feedback Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Feedback Form */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Rate Your Session</CardTitle>
          <CardDescription>
            {upcomingSession.therapy} with {upcomingSession.practitioner} - {upcomingSession.date}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>How would you rate this session?</Label>
            <div className="flex gap-2" aria-label="Star rating">
              {renderStars(rating, true)}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="feedback">Share Your Experience</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us about your therapy session — how you felt during and after treatment?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              aria-live="polite"
            />
          </div>

          <div className="flex gap-3">
            <Button className="gap-2" disabled={rating === 0 || isSubmitting} onClick={submitFeedback}>
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
            <Button variant="outline" disabled={isSubmitting} onClick={() => { setFeedback(''); setRating(0); }}>
              Save as Draft
            </Button>
          </div>

          {submittedFeedback && (
            <div className="mt-4 p-4 bg-green-100 rounded text-green-700">
              Thank you for your feedback!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Previous Feedback */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Your Previous Feedback</CardTitle>
          <CardDescription>View your therapy session experiences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {previousFeedback.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{item.session}</h3>
                    <p className="text-sm text-muted-foreground">{item.date} • {item.practitioner}</p>
                  </div>
                  <div className="flex items-center gap-2" aria-label={`Rating: ${item.rating} stars`}>
                    <div className="flex">{renderStars(item.rating)}</div>
                  </div>
                </div>
                <p className="text-sm bg-muted/50 p-3 rounded">{item.feedback}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Progress */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Feedback Completion</CardTitle>
          <CardDescription>Share your experience for better service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Feedback completed: {feedbackStats.completedFeedbacks} of {feedbackStats.totalSessions}</span>
              <span>{Math.round((feedbackStats.completedFeedbacks / feedbackStats.totalSessions) * 100)}%</span>
            </div>
            <Progress value={(feedbackStats.completedFeedbacks / feedbackStats.totalSessions) * 100} className="progress-glow" />
            <p className="text-sm text-muted-foreground">
              Your feedback helps us improve care and services.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
