import React from "react";

interface VideoPlayerProps {
  url: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden bg-black shadow">
      <iframe
        src={url}
        title={title || "Video Materi"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
};

export default VideoPlayer;
