import React from "react";
import "./search-input.scss";

export type SearchInputValue = {
  className?: {};
  color?: string;
  backgroundColor?: string;
  name: string;
};

type SearchInputProps = {
  inputId: number;
  icon?: string;
  placeholder?: string;
  className?: string;
  style?: {};
  values?: Array<SearchInputValue>;
  inputRef?: React.RefObject<HTMLDivElement>;
  onClick?: () => void;
};

type SearchInputState = {};

class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {
      className,
      style,
      icon,
      placeholder,
      values,
      children,
      inputRef,
    } = this.props;
    return (
      <div
        ref={inputRef}
        className={`search-input ${className}`}
        style={style}
        onClick={() => {
          const { onClick } = this.props;
          onClick && onClick();
        }}
      >
        {icon !== undefined && (
          <div className="icon">
            <i className={`icon-${icon}`}></i>
          </div>
        )}
        {placeholder && <div className="placeholder">{placeholder}</div>}
        <div className="values">
          {values?.map((value: SearchInputValue) => (
            <div
              className={`value ${value.className}`}
              style={{
                backgroundColor: value.backgroundColor,
                color: value.color,
              }}
            >
              {value.name}
            </div>
          ))}
        </div>
        <div className="extend">{children}</div>
      </div>
    );
  }
}

type SearchButtonProps = {
  inputId: number;
  inputRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  style?: {};
};
type SearchButtonState = {};

export class SearchButton extends React.Component<
  SearchButtonProps,
  SearchButtonState
> {
  constructor(props: SearchButtonProps) {
    super(props);
  }

  render() {
    const { inputRef, className, style } = this.props;
    return (
      <div className="search-button-box" ref={inputRef}>
        <button className={`search-button ${className}`} style={style}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default SearchInput;
