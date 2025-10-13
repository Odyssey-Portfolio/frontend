import { User, Heart } from "lucide-react"; // lightweight icon set
export interface SidebarProps {
  onSelectSection: (section: string) => void;
  selectedSection: string;
}
export function Sidebar({ onSelectSection, selectedSection }: SidebarProps) {
  const sidebarContainerClassname =
    "w-full bg-white shadow-md rounded-2xl p-4 space-y-2";
  const sectionButtonClassname =
    "flex items-center gap-3 w-full px-3 py-2 text-gray-700 rounded-xl cursor-pointer transition-all";
  const activeSectionClassname = "bg-blue-100 text-blue-700 font-semibold";

  const sections = [
    { key: "profile", label: "My Profile", icon: <User size={18} /> },
    { key: "liked", label: "Liked Comments", icon: <Heart size={18} /> },
  ];

  return (
    <aside className={sidebarContainerClassname}>
      {sections.map((section) => {
        const isActive = selectedSection === section.key;
        return (
          <div
            key={section.key}
            className={`${sectionButtonClassname} ${
              isActive ? activeSectionClassname : "hover:bg-gray-100"
            }`}
            onClick={() => onSelectSection(section.key)}
          >
            {section.icon}
            <span>{section.label}</span>
          </div>
        );
      })}
    </aside>
  );
}
