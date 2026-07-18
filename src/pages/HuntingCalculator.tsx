import { useMemo, useState } from "react";
import itemsData from "../data/hunting-items.json";
import {
  calculateChances,
  formatChances,
  formatProbability,
  type HuntingItem,
} from "../utils/calculateChances";

const CATEGORIES = ["Cosmetics", "Mounts", "Pets", "Gold"] as const;
type Category = (typeof CATEGORIES)[number];

const data = itemsData as Record<Category, HuntingItem[]>;

export default function HuntingCalculator() {
  const [category, setCategory] = useState<Category>("Mounts");
  const [itemId, setItemId] = useState<string>(data["Mounts"][0]?.id ?? "");
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const items = data[category] ?? [];
  const selectedItem = items.find((i) => i.id === itemId);

  const handleCategoryChange = (value: Category) => {
    setCategory(value);
    const firstItem = data[value]?.[0];
    setItemId(firstItem ? firstItem.id : "");
  };

  const result = useMemo(() => {
    if (!selectedItem) return null;
    return calculateChances(selectedItem, hours, minutes);
  }, [selectedItem, hours, minutes]);

  const committedTimeLabel =
    hours === 0 && minutes === 0
      ? "0 minutes"
      : `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m` : ""}`.trim();

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans text-[#202122] bg-white">
      <div className="border border-[#a2a9b1] rounded-sm">
        <div className="bg-[#eaecf0] border-b border-[#a2a9b1] px-3 py-2 font-bold text-sm">
          Committed Time Calculator
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select
              className="w-full border border-[#a2a9b1] rounded-sm px-2 py-1.5 bg-white text-sm focus:outline-none focus:border-[#36c] focus:ring-1 focus:ring-[#36c]"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as Category)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Item</label>
            <select
              className="w-full border border-[#a2a9b1] rounded-sm px-2 py-1.5 bg-white text-sm focus:outline-none focus:border-[#36c] focus:ring-1 focus:ring-[#36c] disabled:bg-[#f8f9fa] disabled:text-[#72777d]"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              disabled={items.length === 0}
            >
              {items.length === 0 ? (
                <option>No items available yet</option>
              ) : (
                items.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))
              )}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Hours</label>
              <input
                type="number"
                min={0}
                value={hours}
                onChange={(e) => setHours(Math.max(0, Number(e.target.value) || 0))}
                className="w-full border border-[#a2a9b1] rounded-sm px-2 py-1.5 bg-white text-sm focus:outline-none focus:border-[#36c] focus:ring-1 focus:ring-[#36c]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Minutes</label>
              <input
                type="number"
                min={0}
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Number(e.target.value) || 0))}
                className="w-full border border-[#a2a9b1] rounded-sm px-2 py-1.5 bg-white text-sm focus:outline-none focus:border-[#36c] focus:ring-1 focus:ring-[#36c]"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-2">Results</h3>
            {!selectedItem ? (
              <p className="text-sm text-[#72777d]">No item selected for this category yet.</p>
            ) : (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#eaecf0]">
                    <th className="border border-[#a2a9b1] px-2 py-1.5 text-left">Type</th>
                    <th className="border border-[#a2a9b1] px-2 py-1.5 text-left">Name</th>
                    <th className="border border-[#a2a9b1] px-2 py-1.5 text-left">Committed Time</th>
                    <th className="border border-[#a2a9b1] px-2 py-1.5 text-left">Chances</th>
                    <th className="border border-[#a2a9b1] px-2 py-1.5 text-left">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#a2a9b1] px-2 py-1.5">{selectedItem.type}</td>
                    <td className="border border-[#a2a9b1] px-2 py-1.5">{selectedItem.name}</td>
                    <td className="border border-[#a2a9b1] px-2 py-1.5">{committedTimeLabel}</td>
                    <td className="border border-[#a2a9b1] px-2 py-1.5">
                      {result
                        ? result.minChances === result.maxChances
                          ? formatChances(result.minChances)
                          : `${formatChances(result.minChances)} - ${formatChances(result.maxChances)}`
                        : "-"}
                    </td>
                    <td className="border border-[#a2a9b1] px-2 py-1.5">
                      {result
                        ? result.minProbability === result.maxProbability
                          ? formatProbability(result.minProbability)
                          : `${formatProbability(result.minProbability)} - ${formatProbability(result.maxProbability)}`
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
