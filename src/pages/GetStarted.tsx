import { useParams } from "react-router-dom";

const VIDEOS: Record<string, string> = {
  Sell: "/videos/Sell.mp4",
  Trade: "/videos/Trade.mp4",
  Buy: "/videos/Buy.mp4",
};

export default function GetStarted() {
  const { videoName } = useParams<{ videoName: string }>();
  const src = videoName ? VIDEOS[videoName] : undefined;

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans bg-white">
      {src ? (
        <video
          key={src}
          className="w-full rounded-sm border border-[#a2a9b1]"
          src={src}
          controls
          autoPlay
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-sm text-[#72777d]">
          Video not found: "{videoName}"
        </p>
      )}
    </div>
  );
}
