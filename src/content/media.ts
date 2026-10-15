import kids from "@/assets/4kids.jpg";
import kidsMobile from "@/assets/4kids-m.jpg";
import weather from "@/assets/weather.jpg";
import vocab from "@/assets/vocab-bridge.jpg";
import taskflow from "@/assets/taskflow.jpg";
import rps from "@/assets/rock-paper-scissors.jpg";

export const shots: Record<string, { src: string; mobile?: string }> = {
  "4kids": { src: kids, mobile: kidsMobile },
  weather: { src: weather },
  "vocab-bridge": { src: vocab },
  taskflow: { src: taskflow },
  "rock-paper-scissors": { src: rps },
};
