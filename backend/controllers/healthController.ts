import { Request, Response } from "express";
import HealthRecord from "../models/HealthRecord";
import Migrant from "../models/Migrant";
import { summarizeText } from "../utils/ai";

export async function createHealthRecord(req: Request, res: Response) {
  try {
    const { migrantId, title, content } = req.body;
    if (!migrantId || !title || !content)
      return res.status(400).json({ message: "missing fields" });

    const m = await Migrant.findOne({ uniqueId: migrantId });
    if (!m) return res.status(404).json({ message: "migrant not found" });

    const hr = new HealthRecord({
      migrantId,
      title,
      content,
      createdBy: (req as any).user?.id,
    });
    await hr.save();
    return res.json({ record: hr });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
}

export async function getHealthRecords(req: Request, res: Response) {
  try {
    const migrantId = req.params.migrantId;
    const records = await HealthRecord.find({ migrantId }).sort({
      createdAt: -1,
    });
    return res.json({ records });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
}

export async function aiSummary(req: Request, res: Response) {
  try {
    const migrantId = req.params.migrantId;
    const records = await HealthRecord.find({ migrantId })
      .sort({ createdAt: -1 })
      .limit(10);
    const combined = records
      .map((r) => `${r.title}: ${r.content}`)
      .join("\n\n");
    const summary = await summarizeText(combined || "No records");
    return res.json({ summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
}
