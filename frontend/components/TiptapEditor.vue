<template>
  <div v-if="editor" class="editor-container">
    <div class="toolbar">
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
      <button @click="editor.chain().focus().clearNodes().run()">
        Clear Nodes
      </button>
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        Paragraph
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
      <button @click="editor.chain().focus().undo().run()">Undo</button>
      <button @click="editor.chain().focus().redo().run()">Redo</button>
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
        <p>This is a simple text editor example.</p>
      `,
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
}

.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: #f9f9f9;
  cursor: pointer;
}

button.is-active {
  background: #007bff;
  color: white;
}

editor-content {
  min-height: 200px;
}
</style>
