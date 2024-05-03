import { useContext } from "react";
import { Heart } from "../common/Icon";
import { ProductInfo } from "../data/Product";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../cart/FavoriteContext";

const ProductList = (props: ProductInfo) => {
  const { setTabIndex } = useContext(AppContext);
  const navigate = useNavigate();
  const { dispatch } = useContext(FavoriteContext);
  return (
    <>
      <div className="flex w-full m-2">
        <div className="h32 w-1/4">
          <img
            src={props.pic}
            alt={props.name}
            onClick={() => {
              setTabIndex(3);
              navigate("/product/" + props.id.toString());
            }}
          />
        </div>
        <div className="h32 w-3/4 ml-2">
          <div className="font-mono text-xl  mt-4">{props.brand}</div>
          <div className="font-sans">{props.name}</div>
          <div className="font-sans text-orange-500">${props.price}</div>
          <div className="flex  place-items-center mt-2">
            <img src="/assets/favorite.svg" />
            <div className="">{props.rating} Rating</div>
            <div className="m-auto"></div>
            <div>
              <Heart
                className="mr-8 w-4"
                color="#ff4700"
                onClick={() => {
                  if (localStorage.getItem("user_token") == undefined) {
                    navigate("/login");
                    return;
                  }
                  dispatch != null &&
                    dispatch({
                      type: "ADD",
                      payload: {
                        id: props.id,
                        pic: props.pic,
                        brand: props.brand,
                        name: props.name,
                        price: props.price,
                      },
                    });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
