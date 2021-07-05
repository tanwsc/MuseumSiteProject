import * as React from "react";
import { Link } from "react-router-dom";

// classifications
// &classification=17 - photographs
// &classification=21 - drawings
// &classification=23 - prints
// &classification=26 - paintings
// &classification=80 - paintings with calligraphy

// &medium=2028195 - ink
// &medium=2028177 - oil
// &medium=2028387 - textile materials
// &medium=2028206 - watercolour
// &medium=2028955 - ink and opaque watercolour

const allOptions = [
  // { name: "photographs", link: "&classification=17" },
  { name: "drawings", link: "&classification=21" },
  { name: "prints", link: "&classification=23" },
  { name: "paintings", link: "&classification=26" },
  { name: "paintingswcalligraphy", link: "&classification=80" },
  { name: "ink", link: "&medium=2028195" },
  { name: "oil", link: "&medium=2028177" },
  { name: "textile", link: "&medium=2028387" },
  { name: "watercolour", link: "&medium=2028206" },
  { name: "ink&opaquewatercolour", link: "&medium=2028955" },
];

const ChooseSet = ({ style }) => {
  let options = allOptions.map((item) => {
    return (
      <div className="options" key={item.name}>
        <Link to={`/art/${item.name}`} style={style}>
          {item.name}
        </Link>
      </div>
    );
  });
  return options;
};

export default ChooseSet;
