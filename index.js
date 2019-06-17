import isDOMNode from "is-dom";

export default doc => isDOMNode(doc) && isDOMNode(doc.documentElement);
