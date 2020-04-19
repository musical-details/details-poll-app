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
  isHover: boolean;
  icon?: string;
  placeholder?: string;
  className?: string;
  style?: {};
  values?: Array<any>;
  inputRef?: React.RefObject<HTMLDivElement>;
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
      isHover,
    } = this.props;
    return (
      <div
        ref={inputRef}
        className={`search-input ${className} ${isHover ? `_hover` : ``}`}
        style={style}
      >
        {icon !== undefined && (
          <div className="icon">
            <i className={`icon-${icon}`}></i>
          </div>
        )}
        <div className="placeholder">{placeholder}</div>
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

export default SearchInput;
