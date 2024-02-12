<script lang="ts">
  import OpenAI from "openai";

  const API = import.meta.env.VITE_OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: API, dangerouslyAllowBrowser: true });

  let totalTokens = 0;
  let completionTime = 0;
  let chatLog = "";
  let chatLock = false;
  let input: string = "";
  let model = "gpt-4-0125-preview";
  let prompt: string = "";
  let mode = "";
  let chatHistory = "";

  function processMessage(input: any, isBot: boolean) {
    let counter = 0;
    let _input = input;

    if (isBot) {
      _input = input.choices[0].message.content;
    }

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
      chatHistory += " " + _input;
      return (
        "<div class='chat chat-start text-left flex flex-col space-y-0'><div class='chat-bubble'>" +
        _input +
        "</div><div class='text-[11px] italic'>(Completion time: " +
        completionTime +
        "; Tokens: " +
        input.usage.completion_tokens +
        "+" +
        input.usage.prompt_tokens +
        "; Model: " +
        input.model +
        ")</div></div>"
      );
    } else {
      chatHistory += " " + _input;
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
        let startTime = Date.now();
        completion = await openai.chat.completions.create({
          model: model,
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: chatHistory },
          ],
        });
        let endTime = Date.now();
        completionTime = (endTime - startTime) / 1000;
        chatLock = false;
        chatLog += processMessage(completion, true);
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
  <select class="bg-base-100" bind:value={model}>
    <option value="gpt-4-0125-preview">GPT-4 Turbo</option>
    <option value="gpt-4">GPT-4</option>
    <option value="gpt-3.5-turbo">GPT-3.5</option>
  </select>
</label>
<br />

<!--GPT prompt select-->
<label>
  <select
    class="bg-base-100"
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

{#if !chatLock}
  <button class="btn btn-secondary" on:click={handleMessage}> Send</button>
{:else}
  <button disabled={true} class="btn btn-secondary" on:click={handleMessage}>
    <span class="loading loading-spinner"></span></button
  >
{/if}
