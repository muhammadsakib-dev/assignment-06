import Link from "next/link";

type Tab = "plan" | "saved";

interface PlanTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const PlanTabs = ({
  activeTab,
  onTabChange,
}: PlanTabsProps) => {
  return (
    <div className="flex rounded-lg border border-[#252930] bg-[#15181E] p-1">
      <button
        type="button"
        onClick={() => onTabChange("plan")}
        className={`rounded-md px-4 py-1.5 text-[11px] font-medium ${
          activeTab === "plan"
            ? "bg-[#252A31] text-white"
            : "text-[#757C87]"
        }`}
      >
        Today&apos;s Plan
      </button>

      <button
        type="button"
        onClick={() => onTabChange("saved")}
        className={`rounded-md px-4 py-1.5 text-[11px] font-medium ${
          activeTab === "saved"
            ? "bg-[#252A31] text-white"
            : "text-[#757C87]"
        }`}
      >
        Saved
      </button>
    </div>
  );
};

export default PlanTabs;