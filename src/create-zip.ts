import JSZip from "jszip";

export async function createZip(options: {
  content: string;
  title: string;
}): Promise<NodeJS.ReadableStream> {
  const zip = new JSZip();

  zip.file(options.title, options.content);

  const content = zip.generateNodeStream({
    type: "nodebuffer",
    streamFiles: true,
  });

  return content;
}
