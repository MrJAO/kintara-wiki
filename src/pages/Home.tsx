import { Link } from "react-router-dom";

const calculators = [
  { path: "/hunting-calculator", name: "Hunting Calculator" },
];

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-4 font-sans text-[#202122] bg-white">
      <h1 className="text-lg font-bold mb-3">Kintara Wiki Calculators</h1>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {calculators.map((c) => (
          <li key={c.path}>
            <Link className="text-[#36c] hover:underline" to={c.path}>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
