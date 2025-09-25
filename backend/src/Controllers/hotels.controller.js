import { Hotel, Media } from "../models/index.js";

export async function listHotels(req,res,next){
  try{
    const hotels = await Hotel.findAll({ order:[["id","ASC"]] });
    res.json({ ok:true, data: hotels });
  }catch(e){ next(e); }
}

export async function createHotel(req,res,next){
  try{
    const body = req.body;
    if (req.file) body.coverImage = `/uploads/${req.file.filename}`;
    if (body.amenities && typeof body.amenities === "string") body.amenities = JSON.parse(body.amenities);
    const hotel = await Hotel.create(body);
    res.locals.entityId = hotel.id; // for audit
    res.json({ ok:true, data: hotel });
  }catch(e){ next(e); }
}

export async function getHotel(req,res,next){
  try{
    const hotel = await Hotel.findByPk(req.params.id);
    if(!hotel) return res.status(404).json({ ok:false, error:{message:"Hotel not found"}});
    const media = await Media.findAll({ where:{ entityType:"hotel", entityId: hotel.id } });
    res.json({ ok:true, data: { ...hotel.toJSON(), media }});
  }catch(e){ next(e); }
}

export async function updateHotel(req,res,next){
  try{
    const hotel = await Hotel.findByPk(req.params.id);
    if(!hotel) return res.status(404).json({ ok:false, error:{message:"Hotel not found"}});
    const body = req.body;
    if (req.file) body.coverImage = `/uploads/${req.file.filename}`;
    if (body.amenities && typeof body.amenities === "string") body.amenities = JSON.parse(body.amenities);
    await hotel.update(body);
    res.locals.entityId = hotel.id;
    res.json({ ok:true, data: hotel });
  }catch(e){ next(e); }
}

export async function deleteHotel(req,res,next){
  try{
    const hotel = await Hotel.findByPk(req.params.id);
    if(!hotel) return res.status(404).json({ ok:false, error:{message:"Hotel not found"}});
    await hotel.destroy();
    res.locals.entityId = hotel.id;
    res.json({ ok:true, data: true });
  }catch(e){ next(e); }
}
