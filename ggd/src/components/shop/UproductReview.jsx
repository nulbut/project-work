import React, { useCallback, useState } from "react";
import Button from "./Button";
import axios from "axios";

const UproductReview = ({ reviewCode, nid, uProduct }) => {
  const [ureview, setUreview] = useState("");

  const reviewWrite = () => {
    //e.preventDefault();

    const sendObj = {
      uCode: reviewCode,
      uId: nid,
      uProduct: uProduct,
      uPreivew: ureview,
    };

    console.log(sendObj);

    axios
      .post("/uproduct", sendObj)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onCh = useCallback(
    (e) => {
      setUreview(e.target.value);
    },
    [ureview]
  );

  return (
    <div className="Review">
      <h3>후기</h3>
      <textarea
        className="Textarea"
        name="ureview"
        onChange={onCh}
        value={ureview}
        required
      ></textarea>
      <div className="Button">
        <Button type="submit" size="large" wsize="s-40" onClick={reviewWrite}>
          등록
        </Button>
      </div>
    </div>
  );
};

export default UproductReview;
