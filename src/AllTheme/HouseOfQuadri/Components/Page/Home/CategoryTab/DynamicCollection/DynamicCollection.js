import { Link, useParams } from "react-router-dom";
import "./DynamicCollection.modul.scss";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Product } from "../../../../Constants/DynamicValue";

const DynamicCollection = () => {
  const { query } = useParams();
  const [ShowMore, SetShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 28;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(Product.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  }, [currentPage]);
  return (
    <div className="hoq_dynamic_Collections">
      <Banner />
      <div className="collection_info">
        <h1>{query}</h1>
        <div className="para">
          <p>
            Symmetry is boring, imperfections make you perfect. But you know
            that because you dare to be different, you dare to be you.
          </p>
          {ShowMore && (
            <>
              <p>
                This collection symbolises just that. Spanning over the three
                shapes of diamond cuts, Emerald, Oval and Pear, these pieces
                bring out the various shades of your personality. Unique, edgy
                and unconventional yet unfailingly in vogue. A cut above the
                rest, these stones are intertwined with light weight white gold,
                that lets the diamonds do the talking.
              </p>
            </>
          )}
          <span onClick={() => SetShowMore(!ShowMore)}>Read More</span>
        </div>
      </div>
      <div className="collections_list">
        {Product?.slice(startIndex, endIndex)?.map((val, i) => {
          return (
            <C_Card
              img={val?.img}
              title={`1 ct Dome Pave ${val?.collection}`}
              price={`INR ${Math.abs(Math.floor(Math.random() * 150000))}`}
              isNew={i % 2 !== 0}
              link={`/collections/${query}/products/${val?.collection}`}
            />
          );
        })}
      </div>
      <PaginationBar
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DynamicCollection;

const Banner = () => {
  return (
    <div
      className="Banner"
      style={{
        backgroundImage: `url("https://houseofquadri.com/cdn/shop/files/Collection-02_2592x.png?v=1655799226")`,
      }}
    >
      <h1>Imperfectly Perfect. </h1>
    </div>
  );
};

const C_Card = ({ img, title, price, isNew, link }) => {
  return (
    <div className="C_Card">
      {isNew && (
        <div className="new">
          <span>New</span>
        </div>
      )}
      <Link to={link}>
        <div className="image">
          <img src={img} alt="" />
        </div>
        <div className="title">
          <h2>{title}</h2>
          <small>{price}</small>
        </div>
      </Link>
    </div>
  );
};

const PaginationBar = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination-bar">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        shape="rounded"
        className="pagination-btn"
      />
    </div>
  );
};
