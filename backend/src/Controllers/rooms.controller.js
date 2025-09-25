import { Room, Media, SeasonalPrice } from "../models/index.js";

export async function listRooms(req,res,next){
  try{
    const where = {};
    if (req.query.hotelId) where.hotelId = req.query.hotelId;
    const rooms = await Room.findAll({ where, order:[["id","ASC"]] });
    res.json({ ok:true, data: rooms });
  }catch(e){ next(e); }
}

export async function createRoom(req,res,next){
  try{
    const room = await Room.create(req.body);
    res.locals.entityId = room.id;
    res.json({ ok:true, data: room });
  }catch(e){ next(e); }
}

export async function addRoomImage(req,res,next){
  try{
    if(!req.file) return res.status(400).json({ ok:false, error:{message:"No file"}});
    const roomId = req.params.id;
    const media = await Media.create({
      entityType: "room",
      entityId: roomId,
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype
    });
    res.locals.entityId = roomId;
    res.json({ ok:true, data: media });
  }catch(e){ next(e); }
}

export async function addSeasonalPrice(req,res,next){
  try{
    const { startDate, endDate, price } = req.body;
    const sp = await SeasonalPrice.create({ roomId: req.params.id, startDate, endDate, price });
    res.locals.entityId = sp.id;
    res.json({ ok:true, data: sp });
  }catch(e){ next(e); }
}
