// ayur-suite-main/src/components/practitioner/DoctorMessaging.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, User, Clock } from 'lucide-react';
import React from 'react';
const VideoChat = React.lazy(() => import("@/components/VideoChat"));

export const DoctorMessaging = () => {
  const patients = [
    {
      id: 1,
      name: 'Anita Sharma',
      condition: 'Chronic Stress',
      unread: 2,
      lastMessage: "Feeling much better after the last session, thank you!",
      time: '2 hours ago',
      online: true,
    },
    {
      id: 2,
      name: 'Ravi Patel',
      condition: 'Insomnia',
      unread: 0,
      lastMessage: 'Appointment confirmed for tomorrow at 3 PM',
      time: '1 day ago',
      online: false,
    },
    {
      id: 3,
      name: 'Priya Singh',
      condition: 'Digestive Issues',
      unread: 0,
      lastMessage: 'Started the herbal supplements as prescribed',
      time: '3 days ago',
      online: false,
    },
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Anita Sharma',
      message: "Good morning, Doctor! Feeling much better after yesterday's session.",
      time: '10:30 AM',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      message: "That's great to hear, Anita! Any specific improvements or concerns?",
      time: '10:35 AM',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'Anita Sharma',
      message: "Slept better and felt more relaxed. No concerns for now!",
      time: '10:40 AM',
      isOwn: false,
    },
    {
      id: 4,
      sender: 'You',
      message: "Excellent! Let's continue with the plan. See you at the next session.",
      time: '10:42 AM',
      isOwn: true,
    },
  ]);

  const [messageInput, setMessageInput] = useState('');
  const [videoDate, setVideoDate] = useState('');
  const [videoTime, setVideoTime] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(patients[0]?.name || '');
  const [showChat, setShowChat] = useState(false);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      message: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    setMessages([...messages, newMsg]);
    setMessageInput('');
  };

  const handleScheduleVideoCall = () => {
    if (!videoDate || !videoTime || !selectedPatient) {
      alert('Please select patient, date, and time to schedule a video call.');
      return;
    }
    alert(`Video call scheduled with ${selectedPatient} on ${videoDate} at ${videoTime}`);
    setVideoDate('');
    setVideoTime('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Patient Messaging</h1>
          <p className="text-muted-foreground">Communicate with your patients</p>
        </div>
      </div>

      {/* Messaging panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient list */}
        <Card className="medical-card lg:col-span-1">
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Your active patient conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedPatient(patient.name)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      {patient.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{patient.name}</p>
                        {patient.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {patient.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{patient.condition}</p>
                      <p className="text-sm text-muted-foreground truncate mt-1">{patient.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{patient.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat window */}
        <Card className="medical-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <CardTitle>{selectedPatient}</CardTitle>
                <CardDescription>Patient • {patients.find(p => p.name === selectedPatient)?.condition} • {patients.find(p => p.name === selectedPatient)?.online ? 'Online' : 'Offline'}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-96">
            {/* Messages */}
            <div className="flex-1 overflow-auto space-y-4 mb-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs lg:max-w-md rounded-lg p-2 ${
                      msg.isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4 opacity-70" />
                      <span className="text-xs opacity-70">{msg.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-grow"
              />
              <Button size="icon" className="medical-gradient" onClick={handleSendMessage}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video call scheduling */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Schedule Video Call</CardTitle>
          <CardDescription>Select patient, date, and time to arrange a video consultation</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleScheduleVideoCall();
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div>
              <label htmlFor="patientSelect" className="block text-sm font-medium text-gray-700 mb-1">
                Select Patient
              </label>
              <select
                id="patientSelect"
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:ring focus:ring-primary/50"
                required
              >
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.name}>
                    {patient.name} - {patient.condition}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dateInput" className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                id="dateInput"
                value={videoDate}
                onChange={(e) => setVideoDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:ring focus:ring-primary/50"
                required
              />
            </div>
            <div>
              <label htmlFor="timeInput" className="block text-sm font-medium text-gray-700 mb-1">
                Select Time
              </label>
              <input
                type="time"
                id="timeInput"
                value={videoTime}
                onChange={(e) => setVideoTime(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:ring focus:ring-primary/50"
                required
              />
            </div>

            <div className="md:col-span-3 flex justify-end">
              <Button type="submit" disabled={!selectedPatient || !videoDate || !videoTime}>
                Schedule Video Call
              </Button>
            </div>
          </form>
          <div className="mt-8">
            <Button onClick={() => setShowChat(true)} className="mb-6">
              Start Video Consultation
            </Button>
            {showChat && (
              <React.Suspense fallback={<div>Loading video chat...</div>}>
                <VideoChat />
              </React.Suspense>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};