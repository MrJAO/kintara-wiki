import { useParams } from "react-router-dom";

const VIDEOS: Record<string, string> = {
  DedicatedServers: "/videos/DedicatedServers.mp4",
  PriorityAccess: "/videos/PriorityAccess.mp4",
};

export default function KintaraClub() {
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
