<script setup lang="ts">
const imageFile = ref<File | null>(null);
const backgroundColor = ref<"black" | "white">("white");
const previewUrl = ref<string | null>(null);
const canvasDataUrl = ref<string | null>(null);
const imageMetadata = ref<{
  width: number;
  height: number;
  name: string;
} | null>(null);

const { plausible } = usePlausible();

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    imageFile.value = file;
    imageMetadata.value = { width: 0, height: 0, name: file.name };
  }
};

const handleBackgroundColorChange = (event: Event) => {
  const color = (event.target as HTMLInputElement).value as "black" | "white";
  backgroundColor.value = color;
};

const handleSaveImage = () => {
  if (!canvasDataUrl.value || !imageMetadata.value) {
    return;
  }
  const link = document.createElement("a");
  link.href = canvasDataUrl.value;
  const originalFileName = imageMetadata.value.name;
  const fileNameWithoutExtension =
    originalFileName.substring(0, originalFileName.lastIndexOf(".")) ||
    originalFileName;
  link.download = `${fileNameWithoutExtension}-squared.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

watch([imageFile, backgroundColor], ([imageFile, backgroundColor]) => {
  if (!imageFile) {
    resetData();
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const maxDim = Math.max(img.width, img.height);
      imageMetadata.value = {
        ...imageMetadata.value!,
        width: img.width,
        height: img.height,
      };

      const canvas = document.createElement("canvas");
      canvas.width = maxDim;
      canvas.height = maxDim;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const x = (maxDim - img.width) / 2;
      const y = (maxDim - img.height) / 2;
      ctx.drawImage(img, x, y);
      const dataUrl = canvas.toDataURL("image/png");
      canvasDataUrl.value = dataUrl;

      // Create a smaller canvas for the preview
      const previewCanvas = document.createElement("canvas");
      const previewSize = 200; // Set desired preview size
      previewCanvas.width = previewSize;
      previewCanvas.height = previewSize;
      const previewCtx = previewCanvas.getContext("2d");
      if (previewCtx) {
        previewCtx.drawImage(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          previewSize,
          previewSize
        );
        const previewDataUrl = previewCanvas.toDataURL("image/png");
        previewUrl.value = previewDataUrl;
      }
    };

    if (typeof reader.result === "string") {
      img.src = reader.result;
    }
  };
  reader.readAsDataURL(imageFile);
});

function resetDataWithImage() {
  imageFile.value = null;
  resetData();
}

function resetData() {
  previewUrl.value = null;
  canvasDataUrl.value = null;
  imageMetadata.value = null;
}
</script>

<template>
  <div v-if="!imageMetadata" class="flex flex-col p-4 gap-4">
    <p class="text-center">
      Create square images with custom backgrounds. Fast and free.
    </p>
    <div class="flex justify-center">
      <label
        class="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200 gap-2"
      >
        <span>Upload Image</span>
        <input
          type="file"
          @change="handleImageUpload"
          accept="image/*"
          class="hidden"
        />
      </label>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col p-4 gap-4 justify-center items-center text-2xl"
  >
    <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="mb-4" />
    <p>{{ imageMetadata.name }}</p>
    <p>
      Original size: {{ imageMetadata.width }}px x {{ imageMetadata.height }}px
    </p>
    <p>
      Square size: {{ Math.max(imageMetadata.width, imageMetadata.height) }}px x
      {{ Math.max(imageMetadata.width, imageMetadata.height) }}px
    </p>

    <div class="flex gap-2">
      <label class="inline-flex items-center">
        <input
          type="radio"
          value="white"
          :checked="backgroundColor === 'white'"
          @change="handleBackgroundColorChange"
          class="form-radio text-blue-600"
        />
        <span class="ml-2">White Background</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="radio"
          value="black"
          :checked="backgroundColor === 'black'"
          @change="handleBackgroundColorChange"
          class="form-radio text-blue-600"
        />
        <span class="ml-2">Black Background</span>
      </label>
    </div>

    <div class="flex gap-2">
      <button
        @click="
          () => {
            plausible('create-square-image');
            handleSaveImage();
          }
        "
        class="px-4 py-2 bg-green-700 text-sm text-white font-semibold rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
      >
        Save Image
      </button>
      <button
        @click="resetDataWithImage()"
        class="px-3 py-1 rounded-md text-sm font-medium bg-red-700 text-white hover:bg-red-800 transition-colors"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
