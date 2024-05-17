"use client";

import React from "react";
import ReactPlayer from "react-player";

interface YouTubePlayerProps {
  url: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ url }) => {
  return <ReactPlayer url={url} />;
};

export default YouTubePlayer;
