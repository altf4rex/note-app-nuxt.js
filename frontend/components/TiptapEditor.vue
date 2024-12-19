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
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'

export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
      showMenu: false,
      menuStyle: {
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'none',
      },
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextStyle,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
      ],
      content: `
        <h2>Welcome to Tiptap!</h2>
        <p>Select some text to see the floating menu.</p>
      `,
      onSelectionUpdate: ({ editor }) => {
        const selection = window.getSelection()
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0).getBoundingClientRect() : null

        if (!editor.isActive('paragraph') || !range || range.width === 0) {
          this.showMenu = false
          return
        }

        this.showMenu = true
        this.menuStyle = {
          display: 'block',
          position: 'absolute',
          top: `${range.top + window.scrollY - 40}px`,
          left: `${range.left + window.scrollX}px`,
        }
      },
    })
  },
  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style scoped>
.editor-container {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  position: relative;
}

.floating-menu {
  display: flex;
  gap: 8px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 10;
}

button {
  padding: 0.5rem;
  border: none;
  background: #f1f1f1;
  border-radius: 4px;
  cursor: pointer;
}

button.is-active {
  background: #007bff;
  color: white;
}

editor-content {
  min-height: 200px;
  margin-top: 1rem;
}
</style>
