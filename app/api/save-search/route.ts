import { NextRequest, NextResponse } from "next/server";
import { saveFields } from "../utils/save";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data } = body;
  try {
    await saveFields(data);
    return NextResponse.json({ message: "Registro salvo com sucesso" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao salvar o registro" }, { status: 500 });
  }
};
