let queue = Promise.resolve();

export default function exportFile(options: {
  content: string;
  title: string;
}) {
  queue = queue
    .then<void>(() => {
      const url = URL.createObjectURL(
        new Blob([options.content], { type: "text/plain" }),
      );
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = options.title;
      anchor.click();
      URL.revokeObjectURL(url);
      return new Promise((resolve) => setTimeout(resolve, 100));
    })
    .catch<void>(() => {});
}
