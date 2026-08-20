import React, { useEffect, useRef } from "react";
import Icon from "../Icon";

export default function HeaderSearch({
  query = "",
  setQuery,
  isOpen = false,
  setIsOpen,
  placeholder = "Search clients, deals, or reports...",
}) {
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcut: Ctrl+K / Cmd+K to open, Escape to close
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Click outside to collapse if empty
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (!query.trim()) {
          setIsOpen(false);
        }
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, query, setIsOpen]);

  return (
    <div className="header-search-component" ref={containerRef}>
      {isOpen ? (
        <div className="header-search-expanded">
          <div className="header-search-icon-wrap">
            <Icon name="search" size={16} />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="header-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
          />
          {query ? (
            <button
              type="button"
              className="header-search-clear-btn"
              onClick={() => setQuery("")}
              title="Clear text"
            >
              ✕
            </button>
          ) : (
            <span className="header-search-esc-badge">ESC</span>
          )}
          <button
            type="button"
            className="header-search-close-btn"
            onClick={() => setIsOpen(false)}
            title="Close search"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="header-search-trigger"
          onClick={() => setIsOpen(true)}
          title="Search (Ctrl + K)"
        >
          <div className="header-search-trigger-inner">
            <Icon name="search" size={16} />
            <span className="header-search-trigger-text">Search...</span>
            <kbd className="header-search-trigger-kbd">⌘K</kbd>
          </div>
        </button>
      )}
    </div>
  );
}
