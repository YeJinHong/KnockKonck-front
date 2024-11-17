import Header from "../components/Header";
import Button from "../components/Button";
import ItemList from "../components/ItemList";
import usePageTitle from "../hooks/usePageTitle";
import { useNavigate } from "react-router-dom";

const Home = () => {
  usePageTitle("KnockKnock - 예약 정보 보기");

  const nav = useNavigate();

  return (
    <div>
      <Header
        title={"예약 정보 보기"}
        rightChild={<Button text={"아이템 추가"} onClick={() => nav("/new")} />}
      />
      <ItemList />
    </div>
  );
};

export default Home;
