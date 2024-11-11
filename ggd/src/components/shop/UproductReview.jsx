import React, { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";

const UproductReview = ({ productCode, nid, uProduct }) => {
  const [ureview, setUreview] = useState("");

  const reviewWrite =
    ((e) => {
      e.preventDefault();
      const sendObj = {
        uCode: productCode,
        uId: nid,
        uProduct: uProduct,
        uPreivew: ureview,
      };

      axios
        .post("/uproduct", sendObj)
        .then((res) => {
          console.log(res.data);
          setUreview(res.data);
        })
        .catch((err) => console.log(err));
    },
    []);

  const onCh = useCallback(
    (e) => {
      setUreview(e.target.value);
    },
    [ureview]
  );

  return (
    <form className="Review" onSubmit={reviewWrite}>
      <h1>후기</h1>
      <textarea
        className="Textarea"
        name="ureview"
        onChange={onCh}
        value={ureview}
        required
      ></textarea>
      <div className="Button">
        <Button type="submit" size="small" wsize="s-20">
          등록
        </Button>
      </div>
    </form>
  );
};

export default UproductReview;
