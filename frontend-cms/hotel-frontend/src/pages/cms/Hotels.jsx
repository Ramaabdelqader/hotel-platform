import { useEffect, useState } from "react";
import api from "../../api/client";

export default function Hotels(){
  const [items,setItems] = useState([]);
  useEffect(()=>{ (async()=>{ const {data} = await api.get("/hotels"); setItems(data.data); })(); },[]);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Hotels</h2>
      <div className="grid gap-3">
        {items.map(h=>(
          <div key={h.id} className="border rounded p-3">
            <div className="font-semibold">{h.name}</div>
            <div className="text-sm">{h.city}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
