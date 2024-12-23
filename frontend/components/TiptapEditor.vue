<template>
  <div v-if="editor" class="editor-container">
    <div
      v-show="showMenu"
      :style="menuStyle"
      class="floating-menu"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        Bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        Italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        Strike
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Bullet List
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        Ordered List
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        Blockquote
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        Clear
      </button>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import { usePagesStore } from "../store/pagesStore";

export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
      showMenu: false,
      menuStyle: {
        position: "absolute",
        top: "0",
        left: "0",
        display: "none",
      },
    };
  },
  mounted() {
    const pagesStore = usePagesStore();

    // Устанавливаем начальное содержимое из currentPage
    const initialContent = pagesStore.currentPage?.content || "";

    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextStyle,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
      ],
      content: initialContent,
      onUpdate: ({ editor }) => {
        const updatedContent = editor.getHTML();
        pagesStore.currentPage.content = updatedContent; // Обновляем store
      },
      onSelectionUpdate: ({ editor }) => {
        const selection = window.getSelection();
        const range =
          selection.rangeCount > 0
            ? selection.getRangeAt(0).getBoundingClientRect()
            : null;

        if (!range || range.width === 0) {
          this.showMenu = false;
          return;
        }

        this.showMenu = true;
        this.menuStyle = {
          display: "block",
          position: "absolute",
          top: `${range.top + window.scrollY - 350}px`,
          left: `${range.left + window.scrollX - 120}px`,
        };
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
