// components/skills/SkillIcon.tsx
import { PiFileCodeFill } from "react-icons/pi";
import { SKILL_ICON_MAPPING } from "@/lib/skills-icone"; // مسیر درست رو تنظیم کن

interface SkillIconProps {
  iconKey: string;
  size?: number;
  className?: string;
}

export function SkillIcon({ iconKey, size = 48, className = "" }: SkillIconProps) {
  // اگر دقیقاً "tools" بود → آیکون محلی زیبا
  if (iconKey === "tools") {
    return <PiFileCodeFill className={`w-${size/4} h-${size/4} ${className}`} style={{ width: size, height: size }} />;
  }

  // در غیر این صورت از skillicons.dev با مپینگ امن
  const realIcon = SKILL_ICON_MAPPING[iconKey as keyof typeof SKILL_ICON_MAPPING] || "react";
  
  return (
    <img
      src={`https://skillicons.dev/icons?i=${realIcon}&theme=dark`}
      alt={iconKey}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      onError={(e) => {
        // اگر لود نشد → fallback به react
        e.currentTarget.src = "https://skillicons.dev/icons?i=react&theme=dark";
      }}
    />
  );
}