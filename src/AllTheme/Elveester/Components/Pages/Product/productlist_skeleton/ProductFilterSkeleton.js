import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Skeleton,
  useMediaQuery,
} from "@mui/material";

const ProductFilterSkeleton = () => {
  const cardsArray = Array.from({ length: 6 }, (_, index) => index + 1);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isMobile600 = useMediaQuery("(max-width: 600px)");
  const isMobile320 = useMediaQuery("(max-width: 450px)");

  return (
    <div style={{ display: "flex", flex: "1 1 80%", height: "auto", position: "relative" }}>
      <Grid item xs={12} container spacing={2} sx={{ height: "auto" }}>
        {cardsArray.map((item) => (
          <Grid
            item
            xs={isMobile320 ? 6 : isMobile600 ? 6 : isMobile ? 6 : 4}  // Two cards for small screens and 3 for larger screens
            key={item}
            sx={{ height: "fit-content" }}
          >
            <Skeleton
              animation="wave"
              variant="rect"
              width={"100%"}
              height={isMobile320 ? "25vh" : "40vh"}  // Smaller height for screens <= 320px
            />
            <CardContent>
              <Skeleton
                animation="wave"
                variant="text"
                width={"80%"}
                height={20}
                style={{ marginBottom: "10px" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={"60%"}
                height={20}
              />
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductFilterSkeleton;
