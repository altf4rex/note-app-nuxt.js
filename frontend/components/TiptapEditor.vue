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

        // Меню появляется только после выделения
        if (!range || range.width === 0) {
          this.showMenu = false
          return
        }

        // Расположение меню
        this.showMenu = true
        this.menuStyle = {
          display: 'block',
          position: 'absolute',
          top: `${range.top + window.scrollY - 350}px`, // Немного выше выделенного текста
          left: `${range.left + window.scrollX - 120}px`,
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
  padding: 1rem;
  position: relative;
}

.floating-menu {
  display: flex;
  gap: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 10;
  background-color: #2a2a2a;  /* Общий стиль фона кнопок */
  border-radius: 8px;  /* Стиль кнопок */
}

button {
  background-color: #2a2a2a;
  color: #fff;
  font-size: 14px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s, box-shadow 0.2s;
}

button:hover {
  background-color: #444;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
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