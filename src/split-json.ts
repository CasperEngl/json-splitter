export function splitJson(options: { jsonStr: string; contextSize: number }) {
  // Parse JSON string into object
  let jsonObj = JSON.parse(options.jsonStr);

  // Get selected context size
  let contextSize = options.contextSize;

  let tokenCount = 0;
  let chunk = {} as any;
  let chunks = [];

  for (let key in jsonObj) {
    let itemTokenCount = key.length + jsonObj[key].length;

    if (tokenCount + itemTokenCount > contextSize) {
      chunks.push(chunk);
      chunk = {};
      tokenCount = 0;
    }
    chunk[key] = jsonObj[key];
    tokenCount += itemTokenCount;
  }

  if (Object.keys(chunk).length > 0) {
    chunks.push(chunk);
  }

  return chunks as Record<string, string>[];
}
