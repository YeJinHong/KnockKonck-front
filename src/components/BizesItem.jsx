import "./BizesItem.css";
import { ItemDispatchContext, ItemStateContext } from "../App";
import { useContext } from "react";

const BizesItem = ({ bizes }) => {
  const { onAddSubData, onDeleteSubData } = useContext(ItemDispatchContext);
  const subsData = useContext(ItemStateContext).subsData;

  const isItemExist = (bizesNumber, itemNumber) => {
    return (
      subsData.filter(
        (sub) =>
          String(sub.bizesNumber) === String(bizesNumber) &&
          String(sub.itemNumber) === String(itemNumber)
      ).length > 0
    );
  };

  const onClickSubscribeButton = (bizesNumber, itemNumber) => {
    onAddSubData(bizesNumber, itemNumber);
    alert("구독 처리 되었습니다.");
  };

  const onClickUnSubscribeButton = (bizesNumber, itemNumber) => {
    onDeleteSubData(bizesNumber, itemNumber);
    alert("구독 취소 되었습니다.");
  };

  if (!bizes) return <div>검색된 결과가 없습니다.</div>;
  return (
    <div className="BizesItem">
      <div className="img_section">
        <img src={bizes.bizesImageUrl} />
      </div>
      <div className="info_section">
        <h4>{bizes.bizesName}</h4>
        <h4>{bizes.address}</h4>
      </div>
      <div className="item_section">
        {bizes.itemList.map((item) => (
          <div key={item.itemNumber}>
            <label>{item.itemName}</label>
            {isItemExist(bizes.bizesNumber, item.itemNumber) ? (
              <button
                className="sub_delete_button"
                onClick={() =>
                  onClickUnSubscribeButton(bizes.bizesNumber, item.itemNumber)
                }
              >
                구독 취소
              </button>
            ) : (
              <button
                className="sub_add_button"
                onClick={() =>
                  onClickSubscribeButton(bizes.bizesNumber, item.itemNumber)
                }
              >
                구독하기
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BizesItem;
