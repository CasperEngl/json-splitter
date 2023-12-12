import type { APIContext } from "astro";
import JSZip from "jszip";
import { splitJson } from "../split-json";

export async function POST(context: APIContext) {
  const formData = await context.request.formData();

  const json = formData.get("json") as string;
  const contextSize = Number(formData.get("contextSize"));
  let filename = formData.get("filename") as string;
  filename = filename.split(".")[0]!;
  console.log({ json, contextSize, filename });

  const chunks = splitJson({ jsonStr: json, contextSize });
  const zip = new JSZip();

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const title = `${i + 1}.json`;

    zip.file(title, JSON.stringify(chunk));
  }

  const content = await zip.generateAsync({ type: "nodebuffer" });

  const response = new Response(content);
  response.headers.set("Content-Type", "application/zip");
  response.headers.set(
    "Content-Disposition",
    `attachment; filename=${filename || "chunks"}.zip`,
  );

  return response;
}
