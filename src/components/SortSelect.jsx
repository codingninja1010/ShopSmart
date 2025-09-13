import React, { useEffect, useRef, useState } from "react";

const OPTIONS = [
  { value: "relevance", label: "Sort: Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const SortSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const selected = OPTIONS.find(o => o.value === value) || OPTIONS[0];

  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current || !btnRef.current) return;
      if (!menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="custom-select" role="combobox" aria-expanded={open} aria-haspopup="listbox">
      <button
        ref={btnRef}
        type="button"
        className="custom-select-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Sort products"
      >
        {selected.label}
        <span className="custom-select-caret"><i className={`fa fa-chevron-${open ? 'up' : 'down'}`}></i></span>
      </button>
      {open && (
        <div ref={menuRef} className="custom-select-menu" role="listbox">
          {OPTIONS.map(opt => (
            <div
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`custom-select-item ${value === opt.value ? 'active' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortSelect;
