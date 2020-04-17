import React from "react";

export const scrollToRef = (ref: React.RefObject<HTMLElement>) =>
  ref.current !== null ? window.scrollTo(0, ref.current.offsetTop) : false;

export const disableScroll = () =>
  (document.ontouchmove = function (e) {
    e.preventDefault();
  });

export const enableScroll = () =>
  (document.ontouchmove = function (e) {
    return true;
  });
