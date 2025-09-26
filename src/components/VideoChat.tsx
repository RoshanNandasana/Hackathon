// ayur-suite-main/src/components/VideoChat.tsx
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

const socket = io("http://localhost:4000"); // Ensure this matches your signaling server URL

export default function VideoChat() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [myId, setMyId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((curr) => {
        setStream(curr);
        if (myVideo.current) myVideo.current.srcObject = curr;
      })
      .catch((err) => {
        console.error("Failed to access media devices:", err);
        alert("Unable to access camera or microphone. Please check permissions.");
      });

    socket.on("me", (id) => setMyId(id));

    socket.on("callUser", ({ from, signal }) => {
      if (!stream) {
        console.warn("Stream not available for incoming call");
        return;
      }
      const peer = new Peer({ initiator: false, trickle: false, stream });
      peer.on("signal", (sig) => socket.emit("answerCall", { signal: sig, to: from }));
      peer.on("stream", (remoteStream) => {
        if (userVideo.current) userVideo.current.srcObject = remoteStream;
      });
      peer.signal(signal);
      connectionRef.current = peer;
      setInCall(true);
      setRemoteId(from);
    });

    socket.on("callAccepted", (signal) => {
      if (connectionRef.current) {
        connectionRef.current.signal(signal);
        setInCall(true);
      }
    });

    socket.on("callEnded", () => {
      endCallCleanup();
    });

    return () => {
      socket.off("me");
      socket.off("callUser");
      socket.off("callAccepted");
      socket.off("callEnded");
      endCallCleanup();
    };
  }, []);

  const toggleMic = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks.forEach((track) => {
          track.enabled = !micOn;
        });
        setMicOn((prev) => !prev);
      }
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks.forEach((track) => {
          track.enabled = !videoOn;
        });
        setVideoOn((prev) => !prev);
      }
    }
  };

  const callUser = () => {
    if (!remoteId || !stream) {
      console.warn("Remote ID or stream not available");
      return;
    }
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (sig) =>
      socket.emit("callUser", { userToCall: remoteId, signalData: sig, from: myId })
    );
    peer.on("stream", (remoteStream) => {
      if (userVideo.current) userVideo.current.srcObject = remoteStream;
    });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    socket.emit("endCall", { to: remoteId });
    endCallCleanup();
  };

  const endCallCleanup = () => {
    if (connectionRef.current) {
      connectionRef.current.destroy();
      connectionRef.current = null;
    }
    setInCall(false);
    setRemoteId("");
    if (userVideo.current) userVideo.current.srcObject = null;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      if (myVideo.current) myVideo.current.srcObject = null;
    }
  };

  return (
    <div className="mt-6 space-y-4 border rounded-xl p-4 bg-muted/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          className="w-full h-64 rounded-lg object-cover bg-black"
        />
        {inCall && (
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className="w-full h-64 rounded-lg object-cover bg-black"
          />
        )}
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <input
          className="border rounded-md px-3 py-2 text-sm flex-1"
          placeholder="Enter remote user ID"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
        />
        {!inCall ? (
          <Button onClick={callUser}>Start Call</Button>
        ) : (
          <Button variant="destructive" onClick={leaveCall}>
            End Call
          </Button>
        )}
        <span className="text-xs text-muted-foreground">Your ID: {myId}</span>
      </div>
      <div className="flex gap-3 mt-2">
        <Button onClick={toggleMic} variant={micOn ? "outline" : "destructive"}>
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          <span className="ml-2">{micOn ? "Mute Mic" : "Unmute Mic"}</span>
        </Button>
        <Button onClick={toggleVideo} variant={videoOn ? "outline" : "destructive"}>
          {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          <span className="ml-2">{videoOn ? "Turn Off Video" : "Turn On Video"}</span>
        </Button>
      </div>
    </div>
  );
}