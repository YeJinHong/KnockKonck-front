import "./Editor.css";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BizesItem from "./BizesItem";
import { getBizesData, crawlingBizesData } from "../services/api";

const Editor = () => {
  const [newBizes, setNewBizes] = useState();

  const [input, setInput] = useState({
    mapUrl: "",
    bizesName: "",
  });

  const nav = useNavigate();
  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    const getData = async () => {
      const dbResult = await getBizesData(input.mapUrl);
      if (dbResult === "") {
        console.log("사업체 정보 없음", dbResult);
        const result = await crawlingBizesData(input.mapUrl);
        console.log(result);
        setNewBizes(result);
        return;
      }
      setNewBizes(dbResult);
    };
    getData();
  };

  return (
    <div className="Editor">
      <section className="url_section">
        <h3>Map Url 입력</h3>
        <input
          placeholder="https://map.naver.com/p..."
          onChange={onChangeInput}
          name="mapUrl"
          value={input.mapUrl}
          type="text"
        />
      </section>
      <section className="button_section">
        <Button
          onClick={onClickSubmitButton}
          text={"사업체 정보 끌어오기"}
          type={"POSITIVE"}
        />
      </section>
      <section className="search_result_section">
        <h3>검색 결과</h3>
        <BizesItem bizes={newBizes} />
      </section>
    </div>
  );
};

export default Editor;
