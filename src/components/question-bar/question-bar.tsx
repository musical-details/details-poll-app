import React from "react";
import { motion } from "framer-motion";
import "./question-bar.scss";

type QuestionProps = {
  question: string;
};

function QuestionBar(props: QuestionProps) {
  return (
    <div className="question-bar">
      <div>
        <motion.span
          animate={{ y: 0 }}
          initial={{ y: 100 }}
          transition={{ ease: "easeOut", duration: 1.4 }}
        >
          {props.question}
        </motion.span>
      </div>
    </div>
  );
}

export default QuestionBar;
