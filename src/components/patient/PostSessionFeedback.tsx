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


  const previousFeedback = [
    {
      date: '15 नवम्बर, 2024',
      session: 'अभ्यंग मालिश',
      rating: 5,
      feedback: 'उत्कृष्ट सत्र! बहुत आराम मिला और ऊर्जा महसूस हुई।',
      practitioner: 'डॉ. सुरेश कुमार'
    },
    {
      date: '12 नवम्बर, 2024',
      session: 'शिरोधारा',
      rating: 4,
      feedback: 'अच्छा अनुभव, हालाँकि शुरुआत में कमरे में ठंडक थी।',
      practitioner: 'डॉ. रेखा शर्मा'
    },
    {
      date: '10 नवम्बर, 2024',
      session: 'उद्वर्तना',
      rating: 5,
      feedback: 'अद्भुत डिटॉक्स अनुभव। अवश्य सिफारिश करूंगा।',
      practitioner: 'डॉ. सुरेश कुमार'
    }
  ];


  const upcomingSession = {
    therapy: 'शिरोधारा',
    date: 'कल, शाम 2:00 बजे',
    practitioner: 'डॉ. सुरेश कुमार'
  };


  const feedbackStats = {
    averageRating: 4.7,
    totalSessions: 8,
    completedFeedbacks: 6
  };


  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <Star 
          key={index}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            starValue <= currentRating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-muted-foreground'
          }`}
          onClick={interactive ? () => setRating(starValue) : undefined}
        />
      );
    });
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">सेशन के बाद प्रतिक्रिया दें</h1>
          <p className="text-muted-foreground">अपना थेरेपी अनुभव साझा करें</p>
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
                <p className="text-sm text-muted-foreground">औसत रेटिंग</p>
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
                <p className="text-sm text-muted-foreground">कुल सत्र</p>
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
                <p className="text-sm text-muted-foreground">प्रतिक्रिया दर</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* New Feedback Form */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>अपने अगले सत्र को रेट करें</CardTitle>
          <CardDescription>
            {upcomingSession.therapy} {upcomingSession.practitioner} के साथ - {upcomingSession.date}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>इस सत्र को आप कैसे रेट करेंगे?</Label>
            <div className="flex gap-2">
              {renderStars(rating, true)}
            </div>
          </div>


          <div className="space-y-3">
            <Label htmlFor="feedback">अपना अनुभव साझा करें</Label>
            <Textarea
              id="feedback"
              placeholder="हमें अपने थेरेपी सत्र के बारे में बताएं - उपचार के दौरान और बाद में कैसा महसूस हुआ?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>


          <div className="flex gap-3">
            <Button className="gap-2" disabled={rating === 0}>
              <Send className="w-4 h-4" />
              प्रतिक्रिया सबमिट करें
            </Button>
            <Button variant="outline">
              ड्राफ्ट के रूप में सहेजें
            </Button>
          </div>
        </CardContent>
      </Card>


      {/* Previous Feedback */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>आपकी पूर्व प्रतिक्रियाएँ</CardTitle>
          <CardDescription>अपने थेरेपी सत्र के अनुभव देखें</CardDescription>
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
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(item.rating)}
                    </div>
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
          <CardTitle>प्रतिक्रिया पूर्णता</CardTitle>
          <CardDescription>बेहतर सेवा के लिए अपने अनुभव साझा करें</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>पूरा हुआ प्रतिक्रिया: {feedbackStats.completedFeedbacks} में से {feedbackStats.totalSessions}</span>
              <span>{Math.round((feedbackStats.completedFeedbacks / feedbackStats.totalSessions) * 100)}%</span>
            </div>
            <Progress value={(feedbackStats.completedFeedbacks / feedbackStats.totalSessions) * 100} className="progress-glow" />
            <p className="text-sm text-muted-foreground">
              आपकी प्रतिक्रिया हमें बेहतर देखभाल और सेवाओं में सुधार करने में मदद करती है।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
