<script lang="ts">
  import OpenAI from "openai";

  const API = import.meta.env.VITE_OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: API, dangerouslyAllowBrowser: true });

  let chatLog = "";
  let chatLock = false;
  let input: string = "";
  let model = "gpt-4-1106-preview";
  let prompt: string = "";
  let mode = "";
  let chatHistory = "";

  function processMessage(input: string, isBot: boolean) {
    let counter = 0;
    let _input = input;

    _input = _input.replace(/\n/g, "<br>");
    _input = _input.replace(/```/g, () => {
      counter += 1;
      if (counter > 1) {
        counter = 0;
      }
      if (counter === 1) {
        return "<div class='mockup-code'><pre data-prefix='$'><code>";
      } else {
        return "</code></pre></div>";
      }
    });
    if (isBot) {
      chatHistory += "you said: " + _input;
      return (
        "<div class='chat chat-start'><div class='chat-bubble text-left'>" +
        _input +
        "</div></div>"
      );
    } else {
      chatHistory += "the user said: " + _input;
      return (
        "<div class='chat chat-end'><div class='chat-bubble text-right'>" +
        _input +
        "</div></div>"
      );
    }
  }

  const handleMessage = async () => {
    if (chatLock === false && input != "") {
      chatLock = true;
      chatLog += processMessage(input, false);
      console.log(input);
      input = "";
      let completion: any;
      try {
        completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: chatHistory },
          ],
        });
        chatLock = false;
        chatLog += processMessage(completion.choices[0].message.content, true);
        console.log(completion.choices[0].message.content);
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
        chatLock = false;
      }
    }
  };

  const handlePromptChange = () => {
    if (mode === "coding") {
      prompt = "You are a coding assistant";
    }
    if (mode === "") {
      prompt = "You are a helpful chatbot";
    }
    if (mode === "custom") {
      prompt = "";
    }
  };
</script>

<!--GPT model select-->
<label>
  Model{" "}
  <select bind:value={model}>
    <option value="gpt-4-1106-preview">GPT-4 Turbo</option>
    <option value="gpt-4">GPT-4</option>
    <option value="gpt-3.5-turbo">GPT-3.5</option>
    <option value="babbage-002">Babbage</option>
    <option value="davinci-002">Davinci</option>
  </select>
</label>
<br />

<!--GPT prompt select-->
<label>
  Prompt{" "}
  <select
    bind:value={mode}
    on:change={() => {
      handlePromptChange();
    }}
  >
    <option value="">No prompt</option>
    <option value="coding">Coding</option>
    <option value="custom">Custom</option>
  </select>
</label>
{#if mode === "coding"}
  <p>This is an experimental coding assistant</p>
{/if}
{#if mode === "custom"}
  <div>
    <input bind:value={prompt} />
  </div>
{/if}
<br />
<div class="h-96 p-6 w-full overflow-y-auto border p-2 rounded-lg g-c">
  <ul class="space-y-2">
    {@html chatLog}
  </ul>
</div>

<textarea
  bind:value={input}
  on:keydown={(e) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      input += "\n";
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleMessage();
    }
  }}
  placeholder="Write a message..."
  style="width: 100%;"
/>

<button class="btn" on:click={handleMessage}
  >{chatLock ? "Waiting..." : "Send"}</button
>

<style>
  .g-c {
    background-color: #1d232a;
  }
</style>
