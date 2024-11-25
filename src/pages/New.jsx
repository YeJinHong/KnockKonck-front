import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const nav = useNavigate();
  usePageTitle("새 아이템 추가");

  return (
    <div>
      <Header
        title={"새 아이템 추가"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
      />
      <Editor />
    </div>
  );
};

export default New;
