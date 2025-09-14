## Assistants Probelm

```mermaid
sequenceDiagram
    participant IDE as IDE (VS Code)
    actor Dev
    participant ChatGPT as AI Assistant (ChatGPT)
    loop Refine
    Dev<<->>IDE: Copy Code and Paste Code
    Dev<<->>ChatGPT: Copy Code and Paste Code
    end
```

<strong v-click class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] text-red-600 text-6xl rotate-45">
  Still a lot of Copy and Paste and Window Switching
</strong>
