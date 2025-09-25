import { Media } from "../models/index.js";

export async function uploadToEntity(req,res,next){
  try{
    if(!req.file) return res.status(400).json({ ok:false, error:{message:"No file"}});
    const { entityType, entityId } = req.body;
    const media = await Media.create({
      entityType, entityId,
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype
    });
    res.locals.entityId = entityId;
    res.json({ ok:true, data: media });
  }catch(e){ next(e); }
}

export async function removeMedia(req,res,next){
  try{
    const id = req.params.id;
    const m = await Media.findByPk(id);
    if(!m) return res.status(404).json({ ok:false, error:{message:"Not found"}});
    await m.destroy();
    res.locals.entityId = id;
    res.json({ ok:true, data: true });
  }catch(e){ next(e); }
}
