import { Link, Outlet } from "react-router-dom";
import "./collection.modul.scss";

const CollectionPage = () => {
  const collections = [
    {
      title: "Askew",
      img: "https://houseofquadri.com/cdn/shop/collections/HOQ_April_22_-_720_1080x.jpg?v=1653571782",
    },
    {
      title: "Emra",
      img: "https://houseofquadri.com/cdn/shop/collections/HOQ_April_22_-_503_1080x.jpg?v=1656310597",
    },
    {
      title: "Stellar",
      img: "https://houseofquadri.com/cdn/shop/collections/HOQ_April_22_-_359_1080x.jpg?v=1653571979",
    },
  ];
  return (
    <div className="hoq_collection_Static">
      <div className="head">
        <h1>Catalog</h1>
      </div>
      <div className="card_col">
        {collections.map((val, i) => {
          return (
            <Card
              img={val?.img}
              title={val?.title}
              link={`/collections/${val?.title}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CollectionPage;

export const Card = ({ img, link, title }) => {
  return (
    <div className="b_card">
      <Link to={link}>
      <img src={img} alt="" />
        <h2>{title}</h2>
      </Link>
    </div>
  );
};
