import { useEffect, useState } from "react";
import styles from "./chat-form.module.css";
import { run, extractBulletPointsAndHeaders } from "../../config/gemini.js";
import chatStore from "../../store/chatStore";

const ChatForm = () => {
  const [text, setText] = useState("");
  const updateListAnswer = chatStore((state) => state.updateListAnswer);
  const listAnswer = chatStore((state) => state.listAnswer);

  const resetListAnswer = chatStore((state) => state.resetListAnswer);

  const onSent = async (prompt) => {
    updateListAnswer([]);
    // setLoading(true);
    const answer = await run(prompt);
    // setLoading(false);
    updateListAnswer(extractBulletPointsAndHeaders(answer.response.text()));
  };

  // useEffect(() => {
  //   console.log("🚀 ~ ChatForm ~ listAnswer:", listAnswer);
  // }, [listAnswer]);

  const sendMessage = (e) => {
    e.preventDefault();
    onSent(
      `the person is a ${text} witch skills could he learn that helps in work life`
    );
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={sendMessage} className={styles.chatForm}>
      <label htmlFor="1">Identify Key Activities:</label>
      <input
        id="1"
        name="message"
        onChange={(e) => handleChange(e)}
        value={text}
        type="text"
      />
      <button type="submit" value="Send">
        Send
      </button>
    </form>
  );
};

export default ChatForm;
