import React from "react";
import Icon from "./Icon";

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Agni CRM home">
      <span className="brand-mark">
        <Icon name="bolt" size={19} stroke={2.4} />
      </span>
      <span>
        agni<span>crm</span>
      </span>
    </a>
  );
}

export default Brand;
