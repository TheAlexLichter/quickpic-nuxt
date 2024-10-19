<script setup lang="ts">
type Scale = 1 | 2 | 4 | 8 | 16 | 32 | 64;

const scale = ref<Scale>(1);

const { svgContent, imageMetadata, handleFileUpload, cancel } =
  useFileUploader();

const { convertToPng, canvasProps } = useSvgConverter({
  svgContent,
  scale,
  imageMetadata,
});


const { plausible } = usePlausible();

function useFileUploader() {
  const svgContent = ref<string>("");

  const imageMetadata = ref<{
    width: number;
    height: number;
    name: string;
  } | null>(null);

  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;

      // Extract width and height from SVG content
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(content, "image/svg+xml");
      const svgElement = svgDoc.documentElement;
      const width = parseInt(svgElement.getAttribute("width") || "300");
      const height = parseInt(svgElement.getAttribute("height") || "150");

      svgContent.value = content;
      imageMetadata.value = { width, height, name: file.name };
    };
    reader.readAsText(file);
  };

  const cancel = () => {
    svgContent.value = "";
    imageMetadata.value = null;
  };

  return { svgContent, imageMetadata, handleFileUpload, cancel };
}

function scaleSvg(svgContent: string, scale: Scale) {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
  const svgElement = svgDoc.documentElement;
  const width = parseInt(svgElement.getAttribute("width") || "300");
  const height = parseInt(svgElement.getAttribute("height") || "150");

  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  svgElement.setAttribute("width", scaledWidth.toString());
  svgElement.setAttribute("height", scaledHeight.toString());

  return new XMLSerializer().serializeToString(svgDoc);
}

function useSvgConverter(props: {
  svgContent: Ref<string>;
  scale: Ref<Scale>;
  fileName?: string;
  imageMetadata: Ref<{ width: number; height: number; name: string } | null>;
}) {
  const canvas = useTemplateRef("canvas");

  const scaledSvgData = computed(() => {
    const scaledSvg = scaleSvg(svgContent.value, scale.value);

    return {
      width: (imageMetadata.value?.width ?? 1) * scale.value,
      height: (imageMetadata.value?.height ?? 1) * scale.value,
      scaledSvg,
    };
  });

  const convertToPng = async () => {
    const ctx = canvas.value?.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    // Trigger a "save image" of the resulting canvas content
    const saveImage = () => {
      if (canvas.value) {
        const dataURL = canvas.value.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        const svgFileName = imageMetadata.value?.name ?? "svg_converted";

        // Remove the .svg extension
        link.download = `${svgFileName.replace(".svg", "")}-${
          props.scale.value
        }x.png`;
        link.click();
      }
    };

    const img = new Image();
    // Call saveImage after the image has been drawn
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      saveImage();
    };

    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      scaledSvgData.value.scaledSvg
    )}`;
  };

  return {
    convertToPng,
    canvasProps: computed(() => ({
      width: scaledSvgData.value.width,
      height: scaledSvgData.value.height,
    })),
  };
}
</script>

<template>
  <div v-if="!imageMetadata" class="flex flex-col p-4 gap-4">
    <p class="text-center">
      Make SVGs into PNGs. Also makes them bigger. (100% free btw.)
    </p>
    <div class="flex justify-center">
      <label
        class="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200 gap-2"
      >
        <span>Upload SVG</span>
        <input
          type="file"
          @change="handleFileUpload"
          accept=".svg"
          class="hidden"
        />
      </label>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col p-4 gap-4 justify-center items-center text-2xl"
  >
    <SvgRenderer :svgContent />
    <p>{{ imageMetadata.name }}</p>
    <p>
      Original size: {{ imageMetadata.width }}px x {{ imageMetadata.height }}px
    </p>
    <p>
      Scaled size: {{ imageMetadata.width * scale }}px x
      {{ imageMetadata.height * scale }}px
    </p>
    <div class="flex gap-2">
      <button
        v-for="value in [1, 2, 4, 8, 16, 32, 64] as Scale[]"
        :key="value"
        @click="scale = value"
        class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
        :class="
          scale === value
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        "
      >
        {{ value }}x
      </button>
    </div>
    <div class="flex gap-2">
      <div>
        <canvas ref="canvas" v-bind="canvasProps" hidden />
        <button
          @click="
            () => {
              plausible('convert-svg-to-png');
              convertToPng();
            }
          "
          class="px-4 py-2 bg-green-700 text-sm text-white font-semibold rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
        >
          Save as PNG
        </button>
      </div>
      <button
        @click="cancel"
        class="px-3 py-1 rounded-md text-sm font-medium bg-red-700 text-white hover:bg-red-800 transition-colors"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
