import styled from "styled-components";
import bg1 from "./images/12.JPG";
import bg2 from "./images/13.JPG";
import bg3 from "./images/14.JPG";
import bg4 from "./images/15.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const bgArr = [
    { images : bg1, key: 1},
    { images : bg2, key: 2},
    { images : bg3, key: 3},
    { images : bg4, key: 4},
];

export default Slide;