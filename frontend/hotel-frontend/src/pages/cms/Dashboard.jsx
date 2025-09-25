import { useEffect, useState } from "react";
import api from "../../api/client";

export default function Dashboard(){
  const [summary,setSummary] = useState(null);
  useEffect(()=>{ (async()=>{
    const occ = await api.get("/reports/occupancy", { params:{ start:"2025-10-01", end:"2025-10-31" }});
    const rev = await api.get("/reports/revenue", { params:{ start:"2025-10-01", end:"2025-10-31" }});
    setSummary({ occupancy: occ.data.data, revenue: rev.data.data });
  })(); },[]);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {summary && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded p-4">Occupancy: {summary.occupancy.occupancyPercent}%</div>
          <div className="border rounded p-4">Revenue: ${summary.revenue.revenue}</div>
        </div>
      )}
    </div>
  );
}
