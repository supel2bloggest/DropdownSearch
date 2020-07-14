import React, { useEffect, useState, useRef, useCallback } from "react";
import classes from "./DropdownSearch.module.css";

function useOutsideClick(ref, setShow) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShow]);
}

function DropdownSearch(props) {
  const { render, placeholder, onSelect, clearSubValue, value } = props;
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const textInputRef = useRef(null);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setShow);

  const onSelectItem = useCallback(
    function(raw_value) {
      setShow(false);
      setSearch("");
      onSelect(raw_value);
      if (clearSubValue) clearSubValue("");
    },
    [onSelect, clearSubValue]
  );

  useEffect(() => {
    if (show && render.length > 0) {
      textInputRef.current.focus();
    }
  });

  const filterName = useCallback(
    function(id) {
      const result = render.filter(x => x.id === id);
      return result.length > 0 ? result[0].name : "";
    },
    [render]
  );

  return (
    <React.Fragment>
      <div className={classes["dropdown"]}>
        <button
          type="button"
          className={classes["dropbtn"]}
          onClick={() => {
            setShow(!show);
          }}
        >
          {value
            ? filterName(value)
            : placeholder
            ? placeholder
            : "choose item..."}
        </button>
        {show && (
          <div
            ref={wrapperRef}
            className={[
              classes["dropdown-content"],
              show ? classes["show"] : ""
            ].join(" ")}
          >
            {render.length > 0 && (
              <input
                ref={textInputRef}
                type="text"
                onChange={e => setSearch(e.target.value)}
                value={search}
                className={classes.dropdownsearch}
                placeholder="search.."
              />
            )}
            <div className={classes["dropdown-item"]}>
              <div onClick={() => onSelectItem("")}>&nbsp;</div>
              {search
                ? render
                    .filter(x =>
                      x.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((x, i) => (
                      <div key={i} onClick={() => onSelectItem(x.id)}>
                        {x.name}
                      </div>
                    ))
                : render.map((x, i) => (
                    <div key={i} onClick={() => onSelectItem(x.id)}>
                      {x.name}
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default DropdownSearch;
